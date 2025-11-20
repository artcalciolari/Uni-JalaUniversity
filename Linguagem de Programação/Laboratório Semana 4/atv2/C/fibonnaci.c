#include <stdio.h>
#include <time.h>

int main()
{
  int n = 40;
  long long iterations = 100000000;
  int final_b = 0;

  clock_t start = clock();

  for (long long k = 0; k < iterations; k++)
  {
    int a = 0;
    int b = 1;
    int c;

    for (int i = 2; i <= n; i++)
    {
      c = a + b;
      a = b;
      b = c;
    }
    final_b = b;
  }

  clock_t end = clock();
  double time_spent = (double)(end - start) / CLOCKS_PER_SEC;

  printf("Fibonacci(%d) = %d\n", n, final_b);
  printf("Execution Time (C): %f seconds\n", time_spent);
  return 0;
}