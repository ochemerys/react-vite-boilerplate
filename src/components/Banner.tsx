import { BannerProps } from './interfaces';

function Banner(props: BannerProps) {
  const { headerText, children } = props;
  if (!headerText && !children) {
    throw new Error('Either headerText or children must be provided.');
  }
  const innerHtml = headerText || children;
  return (
    <header className="inline-flex items-center space-x-2">
      <div>
        <img src="./icons/GloboLogo.png" alt="logo" className="w-28 h-24" />
      </div>
      <div className="text-3xl font-bold text-blue-600">{ innerHtml }</div>
    </header>
  );
}

export default Banner;
