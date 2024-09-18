import { Outlet, Link } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <header>Header</header>
      <main>
        <nav>
          <ul>
            <li>
              <Link to="/">Webpack</Link>
            </li>
            <li>
              <Link to="/parcel">Parcel</Link>
            </li>
            <li>
              <Link to="/esbuild">ESBuild</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
}
