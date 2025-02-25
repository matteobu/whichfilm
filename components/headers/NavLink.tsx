'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  activeButtonClassName,
  inactiveButtonClassName,
  oramaSearchButtonClassName,
} from '../utils-components/constants';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  console.log(href);
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
