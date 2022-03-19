import { Dispatch, Reducer, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type QueryStringIO<S> = {
  to: (t: S) => URLSearchParams;
  from: (t: URLSearchParams) => S;
};


export function useQueryString<S>(
  initialState: S,
  io: QueryStringIO<S>,
): [S, (v: S) => void] {
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


export function useQueryStringReducer<S, A>(
  reducer: Reducer<S, A>,
  initialState: S,
  io: QueryStringIO<S>,
): [S, Dispatch<A>] {

  const [state, setState] = useQueryString(initialState, io,);

  const dispatch = useCallback(
    (action: A) => setState(reducer(state, action)),
    [reducer, state, setState]
  );

  return [state, dispatch];
}
