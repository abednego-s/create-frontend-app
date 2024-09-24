import { Outlet, NavLink } from 'react-router-dom';

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
                    'border-2 px-4 py-2',
                  ].join(' ')
                }
              >
                Webpack
              </NavLink>
            </li>
            <li className="mr-2">
              <NavLink
                to="/parcel"
                className={({ isActive }) =>
                  [
                    isActive ? 'border-slate-800' : '',
                    'border-2 px-4 py-2',
                  ].join(' ')
                }
              >
                Parcel
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/esbuild"
                className={({ isActive }) =>
                  [
                    isActive ? 'border-slate-800' : '',
                    'border-2 px-4 py-2',
                  ].join(' ')
                }
              >
                ESBuild
              </NavLink>
            </li>
          </ul>
        </nav>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
}
