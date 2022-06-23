import { ReactNode } from 'react';

import { Icon } from '@@/Icon';

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
  const head = (
    <Link to={to} params={params}>
      {!!icon && <Icon icon={icon} feather={featherIcon} />}
      {label}
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
