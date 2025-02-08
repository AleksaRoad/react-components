import { useEffect, useMemo, useState } from 'react';

export const useLoadData = <T, FNARGS extends Array<unknown>>(
  apiFn: (...args: FNARGS) => Promise<T>,
  ...args: Parameters<typeof apiFn>
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const memoizedArgs = JSON.stringify(args);

  useEffect(() => {
    const parsedArgs: FNARGS = JSON.parse(memoizedArgs);

    setLoading(true);

    apiFn(...parsedArgs)
      .then((response: T) => {
        setData(response);
        setLoading(false);
      })
      .catch((error: unknown) => {
        const errorMessage =
          error instanceof Error ? error.message : `${error}`;

        setError(errorMessage);
        setData(null);
        setLoading(false);
      });
  }, [apiFn, memoizedArgs]);

  const retValue = useMemo(
    () => ({ data, error, isLoading }),
    [data, error, isLoading]
  );

  return retValue;
};
