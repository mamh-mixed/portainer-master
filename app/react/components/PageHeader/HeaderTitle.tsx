import { PropsWithChildren } from 'react';
import { Menu, MenuButton, MenuList, MenuLink } from '@reach/menu-button';
import clsx from 'clsx';
import { User, ChevronDown } from 'react-feather';
import { useSref } from '@uirouter/react';

import { useUser } from '@/portainer/hooks/useUser';

import { useHeaderContext } from './HeaderContainer';
import styles from './HeaderTitle.module.css';

interface Props {
  title: string;
}

export function HeaderTitle({ title, children }: PropsWithChildren<Props>) {
  useHeaderContext();
  const { user } = useUser();

  const accountAnchorProps = useSref('portainer.account');
  const logoutAnchorProps = useSref('portainer.logout');

  return (
    <div className="page white-space-normal">
      {title}
      <span className="header_title_content">{children}</span>
      <Menu>
        <MenuButton className={clsx('pull-right', styles.menuButton)}>
          <User className="feather" />
          {user && <span>{user.Username}</span>}
          <ChevronDown className="feather" />
        </MenuButton>
        <MenuList className={styles.menuList}>
          <MenuLink
            href={accountAnchorProps.href}
            onClick={accountAnchorProps.onClick}
            className={styles.menuLink}
          >
            My account
          </MenuLink>
          <MenuLink
            href={logoutAnchorProps.href}
            onClick={logoutAnchorProps.onClick}
            className={styles.menuLink}
          >
            Log out
          </MenuLink>
        </MenuList>
      </Menu>
    </div>
  );
}
