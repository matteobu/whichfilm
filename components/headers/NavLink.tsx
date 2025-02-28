'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  activeButtonClassName,
  inactiveButtonClassName,
  oramaSearchButtonClassName,
} from '../utils-components/constants';
import { NavLinkProps } from '../utils-components/types';

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  let className = '';

  if (href === '/orama-search') {
    className = oramaSearchButtonClassName;
  } else {
    className = isActive ? activeButtonClassName : inactiveButtonClassName;
  }

  return (
    <li>
      <Link href={href} className={className}>
        {children}
      </Link>
    </li>
  );
};

export default NavLink;
