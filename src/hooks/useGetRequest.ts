import { useState, useCallback } from 'react';
import loadingStatus from '../utils/loadingStatus';
import * as api from '../api/houses';

function useGetRequest(url: string | URL | Request) {
  const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);

  // ensures that get function is not recreated
  // when the same reference is sent accross the rerenders
  const get = useCallback(async () => {
    setLoadingState(loadingStatus.isLoading);
    try {
      const result = await api.get(url);

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
