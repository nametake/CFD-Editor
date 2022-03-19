import { Dispatch, Reducer, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export type QueryStringIO<S> = {
  to: (t: S) => URLSearchParams;
  from: (t: URLSearchParams) => S;
};

export function useQueryStringReducer<S, A>(
  reducer: Reducer<S, A>,
  initialState: S,
  io: QueryStringIO<S>,
): [S, Dispatch<A>] {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState([...searchParams.keys()].length !== 0 ? io.from(searchParams) : initialState);


  const dispatch = useCallback(
    (action: A) => {
      const next = reducer(state, action)
      setSearchParams(io.to(next))
      setState(next)
    },
    [reducer, io, state, setState, setSearchParams]
  );

  return [state, dispatch];
}
