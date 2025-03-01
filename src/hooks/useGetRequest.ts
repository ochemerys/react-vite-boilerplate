import { useState, useCallback } from 'react';
import loadingStatus from '../utils/loadingStatus';

function useGetRequest(url: string | URL | Request) {
  const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);

  // ensures that get function is not recreated
  // when the same reference is sent accross the rerenders
  const get = useCallback(async () => {
    setLoadingState(loadingStatus.isLoading);
    try {
      const resp = await fetch(url);
      const result = await resp.json();

      setLoadingState(loadingStatus.loaded);
      return result;
    } catch {
      setLoadingState(loadingStatus.hasErrored);
      return undefined;
    }
  }, [url]); // external dependency on url

  return { get, loadingState };
}

export default useGetRequest;
