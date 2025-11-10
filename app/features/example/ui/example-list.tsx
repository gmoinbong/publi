'use client';

import { useExamples } from '../lib/use-example';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared';

export function ExampleList() {
  const { data, isLoading, error } = useExamples();

  if (isLoading) {
    return <div className="text-muted-foreground">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-destructive">Error loading examples</div>
    );
  }

  if (!data || data.length === 0) {
    return <div className="text-muted-foreground">No examples found</div>;
  }

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
          </CardHeader>
          {item.description && (
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}

