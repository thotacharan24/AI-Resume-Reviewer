'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trash2, Eye } from 'lucide-react';

interface Review {
  id: string;
  jobTitle: string;
  atsScore: number;
  createdAt: string;
}

export default function HistoryPage() {
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      jobTitle: 'Senior Software Engineer at Google',
      atsScore: 82,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      jobTitle: 'Product Manager at Microsoft',
      atsScore: 65,
      createdAt: '2024-01-14',
    },
    {
      id: '3',
      jobTitle: 'DevOps Engineer at AWS',
      atsScore: 75,
      createdAt: '2024-01-12',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReviews = reviews.filter(review =>
    review.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'outline';
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Review History</h1>
        <p className="text-muted-foreground">
          View and manage all your previous resume reviews
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {filteredReviews.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">No reviews found</p>
            <Button>Create Your First Review</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      {review.jobTitle}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Reviewed on {review.createdAt}</span>
                      <Badge variant={getScoreBadgeVariant(review.atsScore)}>
                        Score: {review.atsScore}%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
