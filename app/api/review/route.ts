import { NextRequest, NextResponse } from 'next/server';
import { getOpenAIClient } from '@/lib/openai';

const SYSTEM_PROMPT = `You are an expert recruiter and resume analyst. Analyze the provided resume against the job description and return a structured JSON response with the following fields:
{
  "atsScore": (number 0-100, how well the resume passes ATS systems),
  "summary": (string, 2-3 sentence summary of the resume and job fit),
  "strengths": [array of 3-5 strengths],
  "weaknesses": [array of 3-5 areas for improvement],
  "missingSkills": [array of 3-5 skills from job description not in resume],
  "matchedSkills": [array of 3-5 skills from job description found in resume],
  "grammarSuggestions": (string, brief grammar and formatting feedback),
  "improvedBullets": [array of 2-3 improved bullet points based on job description],
  "recommendation": (string, overall recommendation for improvement)
}`;

type ReviewPayload = {
  resume?: string;
  jobDescription?: string;
  jobTitle?: string;
};

type ReviewResult = {
  atsScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  matchedSkills: string[];
  grammarSuggestions: string;
  improvedBullets: string[];
  recommendation: string;
};

function normalizeReviewData(data: unknown): ReviewResult {
  const review = data as Partial<ReviewResult>;

  return {
    atsScore: Number(review.atsScore ?? 0),
    summary: typeof review.summary === 'string' ? review.summary : '',
    strengths: Array.isArray(review.strengths) ? review.strengths.filter((item): item is string => typeof item === 'string') : [],
    weaknesses: Array.isArray(review.weaknesses) ? review.weaknesses.filter((item): item is string => typeof item === 'string') : [],
    missingSkills: Array.isArray(review.missingSkills) ? review.missingSkills.filter((item): item is string => typeof item === 'string') : [],
    matchedSkills: Array.isArray(review.matchedSkills) ? review.matchedSkills.filter((item): item is string => typeof item === 'string') : [],
    grammarSuggestions: typeof review.grammarSuggestions === 'string' ? review.grammarSuggestions : '',
    improvedBullets: Array.isArray(review.improvedBullets) ? review.improvedBullets.filter((item): item is string => typeof item === 'string') : [],
    recommendation: typeof review.recommendation === 'string' ? review.recommendation : '',
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ReviewPayload;
    const resume = body.resume?.trim();
    const jobDescription = body.jobDescription?.trim();
    const jobTitle = body.jobTitle?.trim() ?? 'Unknown role';

    if (!resume || !jobDescription) {
      return NextResponse.json(
        { message: 'Missing resume or job description' },
        { status: 400 }
      );
    }

    const openai = getOpenAIClient();

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: `Job Title: ${jobTitle}\n\nJob Description:\n${jobDescription}\n\nResume:\n${resume}`,
        },
      ],
      temperature: 0.2,
      max_tokens: 1800,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ message: 'OpenAI returned no content' }, { status: 502 });
    }

    let parsed: unknown;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(content);
    } catch {
      return NextResponse.json({ message: 'Failed to parse AI response' }, { status: 502 });
    }

    const review = normalizeReviewData(parsed);

    return NextResponse.json(
      {
        message: 'Review completed successfully',
        review,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message || 'Failed to generate review' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
