import { BannerProps } from './interfaces';

function Banner(props: BannerProps) {
  const { headerText, children } = props;
  if (!headerText && !children) {
    throw new Error('Either headerText or children must be provided.');
  }
  const innerHtml = headerText || children;
  return (
    <header className="flex items-center justify-between p-4 bg-gray-300">
      <div className="flex-shrink-0">
        <img src="./icons/GloboLogo.png" alt="logo" className="w-28 h-24" />
      </div>
      <div className="flex-grow text-center">
        <h1 className="text-3xl font-bold text-blue-700">{ innerHtml }</h1>
      </div>
    </header>
  );
}

export default Banner;
