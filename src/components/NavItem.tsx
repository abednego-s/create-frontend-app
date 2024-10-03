import { NavLink } from 'react-router-dom';

export type NavItemProps = {
  to: string;
  logo: string;
  alt: string;
  text: string;
};

export function NavItem({ to, logo, alt, text }: NavItemProps) {
  return (
    <li className="mr-2">
      <NavLink
        to={to}
        className={({ isActive }) =>
          [isActive ? 'border-slate-800' : '', 'border-2 px-4 py-2 flex'].join(
            ' '
          )
        }
      >
        <img alt={alt} src={logo} width={25} className="mr-2" />
        <span>{text}</span>
      </NavLink>
    </li>
  );
}
