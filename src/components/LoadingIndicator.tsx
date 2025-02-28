import { LoadingIndicatorProps } from './interfaces';

function LoadingIndicator(props: LoadingIndicatorProps) {
  const { loadingState } = props;

  return (
    <div className="flex-grow text-center m-8">
      <h1 className="text-2xl font-bold text-yellow-700">{loadingState}</h1>
    </div>
  );
}

export default LoadingIndicator;
