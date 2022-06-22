import { ReactNode } from 'react';
import clsx from 'clsx';

import { Icon } from '@@/Icon';

import { useSidebarState } from '../useSidebarState';

import styles from './SidebarItem.module.css';
import { Wrapper } from './Wrapper';
import { Link } from './Link';
import { Menu } from './Menu';

interface Props {
  icon?: ReactNode;
  featherIcon?: boolean;
  to: string;
  params?: object;
  label: string;
  children?: ReactNode;
  openOnPaths?: string[];
}

export function SidebarItem({
  children,
  icon,
  featherIcon = true,
  to,
  params,
  label,
  openOnPaths,
}: Props) {
  const { isOpen } = useSidebarState();

  const head = (
    <Link to={to} params={params}>
      <div
        className={clsx('w-full flex items-center h-8 space-x-4 text-sm', {
          'justify-start': isOpen,
          'justify-center': !isOpen,
        })}
      >
        {!!icon && (
          <Icon
            icon={icon}
            feather={featherIcon}
            className={clsx('flex', styles.sidebarItemIcon)}
          />
        )}
        {isOpen && <span>{label}</span>}
      </div>
    </Link>
  );

  return (
    <Wrapper label={label}>
      {children ? (
        <Menu head={head} openOnPaths={openOnPaths}>
          {children}
        </Menu>
      ) : (
        head
      )}
    </Wrapper>
  );
}
