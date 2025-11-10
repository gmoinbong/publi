'use client';

import { ExampleList } from '@/app/features/example';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared';

export function ExampleWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Widget</CardTitle>
        <CardDescription>
          This widget demonstrates how to compose features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ExampleList />
      </CardContent>
    </Card>
  );
}

