import { LoadingIndicatorProps } from './interfaces';

function LoadingIndicator(props: LoadingIndicatorProps) {
  const { loadingState } = props;

  return (
    <div className="m-8 flex-grow text-center">
      <h1 className="text-2xl font-bold text-yellow-700">{loadingState}</h1>
    </div>
  );
}

export default LoadingIndicator;
