/**
 * User model
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Subscription model
 */
export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'pro';
  status: 'active' | 'canceled' | 'past_due';
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Review model
 */
export interface Review {
  id: string;
  userId: string;
  resumeText: string;
  jobDescription: string;
  jobTitle?: string;
  atsScore: number;
  summary?: string;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  matchedSkills: string[];
  grammarSuggestions?: string;
  improvedBullets: string[];
  recommendation?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Review API Response
 */
export interface ReviewResponse {
  atsScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  matchedSkills: string[];
  grammarSuggestions: string;
  improvedBullets: string[];
  recommendation: string;
}

/**
 * Dashboard stats
 */
export interface DashboardStats {
  todayReviews: number;
  totalReviews: number;
  averageScore: number;
  currentPlan: 'free' | 'pro';
}

/**
 * API Error Response
 */
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

/**
 * API Success Response
 */
export interface ApiSuccess<T> {
  message: string;
  data: T;
}

/**
 * Pagination
 */
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
