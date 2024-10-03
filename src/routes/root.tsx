import { Outlet } from 'react-router-dom';
import { NavItem } from '../components/NavItem';
import webpackLogo from '../../assets/webpack.svg';
import parcelLogo from '../../assets/parcel.svg';
import esbuildLogo from '../../assets/esbuild.svg';

export default function Root() {
  return (
    <>
      <header>
        <h1 className="mt-4 mb-10 text-4xl font-bold text-center">
          Front-end Project Boilerplate Generator
        </h1>
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
                to="/esbuild"
                logo={esbuildLogo}
                alt="esbuild"
                text="ESBuild"
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
