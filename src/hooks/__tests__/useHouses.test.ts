// useHouses.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import useHouses from '../useHouses';

describe('useHouses', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should have initial state with loadingState "loading" and houses empty', () => {
    const { result } = renderHook(() => useHouses());
    // Assuming the initial loadingState is "loading"
    expect(result.current.loadingState).toBe('Loading...');
    expect(result.current.houses).toEqual([]);
  });

  it('should fetch houses data successfully', async () => {
    // Arrange: simulate a successful fetch returning house objects.
    const housesData = [{ id: 1, name: 'House 1' }, { id: 2, name: 'House 2' }];
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: vi.fn().mockResolvedValue(housesData),
    } as unknown as Response);
    // Act: Render the hook.
    const { result } = renderHook(() => useHouses());
    // Wait until loadingState changes from "loading" to "loaded"
    await waitFor(() => expect(result.current.loadingState).toBe('loaded'));
    // Assert: check that houses are correctly set.
    expect(result.current.houses).toEqual(housesData);
  });

  it('should handle fetch errors', async () => {
    // Arrange: simulate a failed fetch.
    const errorMessage = 'Failed to fetch';
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error(errorMessage));
    // Act: Render the hook.
    const { result } = renderHook(() => useHouses());
    // Wait until loadingState indicates an error.
    await waitFor(() => expect(result.current.loadingState).toBe('An error occured while loading'));
    // Assert: On error, houses remains empty.
    expect(result.current.houses).toBeUndefined();
  });
});
