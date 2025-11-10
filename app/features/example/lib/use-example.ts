import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchExamples, createExample } from '../api/example-api';

export function useExamples() {
  return useQuery({
    queryKey: ['examples'],
    queryFn: fetchExamples,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useCreateExample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExample,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examples'] });
    },
  });
}

