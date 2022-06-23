import { ReactNode } from 'react';

import { Wrapper } from './Wrapper';
import { Menu } from './Menu';
import { Head } from './Head';

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
    <Head
      icon={icon}
      featherIcon={featherIcon}
      to={to}
      params={params}
      label={label}
    />
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
