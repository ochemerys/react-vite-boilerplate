import { renderHook, waitFor } from '@testing-library/react';
import useGetRequest from '../useGetRequest';
import loadingStatus from '../../utils/loadingStatus';

describe('useGetRequest', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    vi.resetAllMocks();
  });

  it('should fetch data successfully', async () => {
    const mockData = { key: 'value' };

    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(Promise.resolve(mockData)),
    });

    const url = 'http://example.com/api';
    const { result } = renderHook(() => useGetRequest(url));

    expect(result.current.loadingState).toBe(loadingStatus.isLoading);

    const data = await result.current.get();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(url);
      expect(result.current.loadingState).toBe(loadingStatus.loaded);
      expect(data).toEqual(mockData);
    });
  });

  it('should handle fetch error', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Fetch failed'));

    const url = 'http://example.com/api';
    const { result } = renderHook(() => useGetRequest(url));

    expect(result.current.loadingState).toBe(loadingStatus.isLoading);
    const data = await result.current.get();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(url);
      expect(result.current.loadingState).toBe(loadingStatus.hasErrored);
      expect(data).toBeUndefined();
    });
  });

  it('should handle json parsing error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.reject(new Error('Json parsing failed')),
    } as Response);

    const url = 'http://example.com/api';
    const { result } = renderHook(() => useGetRequest(url));

    expect(result.current.loadingState).toBe(loadingStatus.isLoading);
    const data = await result.current.get();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(url);
      expect(result.current.loadingState).toBe(loadingStatus.hasErrored);
      expect(data).toBeUndefined();
    });
  });
});
