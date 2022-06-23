import clsx from 'clsx';
import { Home } from 'react-feather';

import { useUser } from '@/portainer/hooks/useUser';
import { useIsTeamLeader } from '@/portainer/users/queries';
import { usePublicSettings } from '@/portainer/settings/queries';

import styles from './Sidebar.module.css';
import { EdgeComputeSidebar } from './EdgeComputeSidebar';
import { EnvironmentSidebar } from './EnvironmentSidebar';
import { SettingsSidebar } from './SettingsSidebar';
import { SidebarItem } from './SidebarItem';
import { Footer } from './Footer';
import { Header } from './Header';
import { SidebarProvider } from './useSidebarState';

export function Sidebar() {
  const { isAdmin, user } = useUser();
  const isTeamLeader = useIsTeamLeader(user);

  const settingsQuery = usePublicSettings();

  if (!settingsQuery.data) {
    return null;
  }

  const { EnableEdgeComputeFeatures, LogoURL } = settingsQuery.data;

  return (
    /* in the future (when we remove r2a) this should wrap the whole app - to change root styles */
    <SidebarProvider>
      <nav
        id="sidebar-wrapper"
        className={clsx(
          styles.root,
          'p-5 flex flex-col be:bg-blue-6 bg-blue-5 '
        )}
        aria-label="Main"
      >
        <Header logo={LogoURL} />

        <div className="mt-6 overflow-y-auto flex-1">
          <ul className={clsx(styles.sidebar, 'space-y-9')}>
            <SidebarItem
              to="portainer.home"
              icon={Home}
              featherIcon
              label="Home"
            />

            <EnvironmentSidebar />

            {isAdmin && EnableEdgeComputeFeatures && <EdgeComputeSidebar />}

            {(isAdmin || isTeamLeader) && <SettingsSidebar isAdmin={isAdmin} />}
          </ul>
        </div>

        <div className="mt-auto pt-8">
          <Footer />
        </div>
      </nav>
    </SidebarProvider>
  );
}
