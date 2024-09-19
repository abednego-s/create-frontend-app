import { Outlet, Link } from 'react-router-dom';

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
              <Link to="/" className="px-4 py-2 border-2">
                Webpack
              </Link>
            </li>
            <li className="mr-2">
              <Link to="/parcel" className="px-4 py-2 border-2">
                Parcel
              </Link>
            </li>
            <li>
              <Link to="/esbuild" className="px-4 py-2 border-2">
                ESBuild
              </Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
}
