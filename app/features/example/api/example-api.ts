import { apiClient } from '@/shared';
import type { ExampleItem, ExampleFormData } from '../model/types';

export async function fetchExamples(): Promise<ExampleItem[]> {
  return apiClient.get<ExampleItem[]>('/api/example');
}

export async function createExample(
  data: ExampleFormData
): Promise<ExampleItem> {
  return apiClient.post<ExampleItem>('/api/example', data);
}

