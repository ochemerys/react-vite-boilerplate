// useHouses.test.ts
// import { renderHook, waitFor } from '@testing-library/react';
// import useHouses from '../useHouses';
// import useGetRequest from '../useGetRequest';
// import loadingStatus from '../../utils/loadingStatus';
// import { IHouse } from '../../types/IHouse';

describe('useHouses', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch and set houses on mount', async () => {
    // // Mock data
    // const mockHouses: IHouse[] = [
    //   {
    //     id: 1, address: '123 Main St', country: 'USA', price: 100000,
    //   },
    //   {
    //     id: 2, address: '456 Oak Ave', country: 'Canada', price: 200000,
    //   },
    // ];

    // // Mock useGetRequest to resolve with mockHouses
    // global.fetch = vi.fn().mockReturnValue({
    //   get: vi.fn().mockResolvedValue(mockHouses),
    //   loadingState: loadingStatus.loaded,
    // });

    // // Render the hook
    // const { result } = renderHook(() => useHouses());

    // // Wait for the asynchronous operation to complete
    // await waitFor(() => {
    //   // Assert that houses state is set to the mocked array
    //   expect(result.current.houses).toEqual(mockHouses);
    // });

    // // Ensure that useGetRequest get method is called once
    // expect(vi.fn().mock.results[0].value.get).toHaveBeenCalledTimes(1);
  });

  // it('should handle loading state', async () => {
  //   // Mock useGetRequest to resolve with mockHouses
  //   global.fetch = vi.fn().mockReturnValue({
  //     get: vi.fn().mockResolvedValue([{
  //       id: 1, address: '123 Main St', country: 'USA', price: 100000,
  //     }]),
  //     loadingState: loadingStatus.isLoading,
  //   });

  //   // Render the hook
  //   const { result } = renderHook(() => useHouses());

  //   // check if initial state is loading
  //   expect(result.current.loadingState).toBe(loadingStatus.isLoading);
  //   await waitFor(() => {
  //     // check if final state is loaded.
  //     expect(result.current.loadingState).toBe(loadingStatus.loaded);
  //   });
  // });

  // it('should handle error state', async () => {
  //   // Mock useGetRequest to reject
  //   global.fetch = vi.fn().mockReturnValue({
  //     get: vi.fn().mockRejectedValue(new Error('Fetch failed')),
  //     loadingState: loadingStatus.hasErrored,
  //   });

  //   // Render the hook
  //   const { result } = renderHook(() => useHouses());

  //   // check if initial state is loading
  //   expect(result.current.loadingState).toBe(loadingStatus.isLoading);
  //   await waitFor(() => {
  //     // check if final state is errored.
  //     expect(result.current.loadingState).toBe(loadingStatus.hasErrored);
  //     expect(result.current.houses).toEqual([]);
  //   });
  // });
});
