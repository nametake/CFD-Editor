import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type QueryStringIO<T> = {
  to: (t: T) => URLSearchParams;
  from: (t: URLSearchParams) => T;
};

export type UseQueryStringArgs<T> = {
  initialState: T;
  io: QueryStringIO<T>;
};

export function useQueryString<T>({
  initialState,
  io,
}: UseQueryStringArgs<T>): [T, (v: T) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const [desiredState, setDesiredState] = useState(() =>
    [...searchParams.keys()].length !== 0 ? io.from(searchParams) : initialState
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchParams(io.to(desiredState));
    }, 10);

    return () => clearTimeout(handler);
  }, [io, setSearchParams, desiredState]);

  return [desiredState, setDesiredState];
}
