import { Outlet } from 'react-router-dom';
import { NavItem } from '../components/NavItem';
import githubLogo from '../../assets/github.svg';
import webpackLogo from '../../assets/webpack.svg';
import parcelLogo from '../../assets/parcel.svg';
import rollupLogo from '../../assets/rollup.svg';

export default function Root() {
  return (
    <>
      <header className="relative">
        <h1 className="pt-4 pb-10 text-4xl font-bold text-center">
          Front-end Project Boilerplate Generator
        </h1>
        <div className="absolute top-[-50px] right-[-50px] w-[100px] h-[100px] bg-gray-300 rotate-45">
          <a href="https://github.com/abednego-s/create-frontend-app">
            <img
              src={githubLogo}
              width={30}
              height={30}
              className="absolute bottom-0 left-[33px]"
            />
          </a>
        </div>
      </header>
      <main className="max-w-screen-lg mx-auto">
        <nav className="flex justify-center mb-10">
          <ul className="flex">
            <li className="mr-2">
              <NavItem to="/" logo={webpackLogo} alt="webpack" text="Webpack" />
            </li>
            <li className="mr-2">
              <NavItem
                to="/parcel"
                logo={parcelLogo}
                alt="parcel"
                text="Parcel"
              />
            </li>
            <li>
              <NavItem
                to="/rollup"
                logo={rollupLogo}
                alt="rollup"
                text="Rollup"
              />
            </li>
          </ul>
        </nav>
        <Outlet />
      </main>
      <footer className="mt-10 bg-gray-300">
        <nav className="flex max-w-screen-lg py-10 mx-auto ">
          <ul className="flex">
            <li className="mr-10">
              <a href="https://x.com/abednego_s">Twitter</a>
            </li>
            <li>
              <a href="https://github.com/abednego-s/create-frontend-app">
                Github
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}
