import { Outlet, NavLink } from 'react-router-dom';
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
              <NavLink
                to="/"
                className={({ isActive }) =>
                  [
                    isActive ? 'border-slate-800' : '',
                    'border-2 px-4 py-2 flex',
                  ].join(' ')
                }
              >
                <img src={webpackLogo} width={25} className="mr-2" />
                <span>Webpack</span>
              </NavLink>
            </li>
            <li className="mr-2">
              <NavLink
                to="/parcel"
                className={({ isActive }) =>
                  [
                    isActive ? 'border-slate-800' : '',
                    'border-2 px-4 py-2 flex',
                  ].join(' ')
                }
              >
                <img src={parcelLogo} width={25} className="mr-2" />
                <span>Parcel</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/esbuild"
                className={({ isActive }) =>
                  [
                    isActive ? 'border-slate-800' : '',
                    'border-2 px-4 py-2 flex',
                  ].join(' ')
                }
              >
                <img src={esbuildLogo} width={25} className="mr-2" />
                <span>ESBuild</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <Outlet />
      </main>
      <footer className="mt-10 bg-gray-300">
        <div className="flex max-w-screen-lg py-10 mx-auto ">
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
        </div>
      </footer>
    </>
  );
}
