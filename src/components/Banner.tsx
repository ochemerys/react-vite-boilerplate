import { BannerProps } from './interfaces';
// import svg as react component
import Logo from '../assets/react.svg?react';

function Banner(props: BannerProps) {
  const appName = import.meta.env.VITE_APP_NAME;
  const mode = import.meta.env.MODE;

  const { headerText, children } = props;
  if (!headerText && !children) {
    throw new Error('Either headerText or children must be provided.');
  }
  const innerHtml = headerText || children;
  return (
    <header className="flex items-center justify-between p-4 bg-gray-300">
      <div className="flex-shrink-0">
        {/* <img src="./icons/GloboLogo.png" alt="logo" className="w-28 h-24" /> */}
        <Logo />
      </div>
      <div className="flex-grow text-center">
        <h1 className="text-3xl font-bold text-blue-700">{ innerHtml }</h1>
        <p>
          <span>{appName}</span>
          <span> - Environment: </span>
          <span>{mode}</span>
        </p>
      </div>
    </header>
  );
}

export default Banner;
