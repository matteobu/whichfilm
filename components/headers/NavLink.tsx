'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { activeClassName, inactiveClassName } from './constants';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const isActive = usePathname() === href;

  return (
    <li>
      <Link
        href={href}
        className={`${isActive ? activeClassName : inactiveClassName}`}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavLink;
