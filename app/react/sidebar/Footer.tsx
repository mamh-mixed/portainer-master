import { useQuery } from 'react-query';
import clsx from 'clsx';

import { getStatus } from '@/portainer/services/api/status.service';

import { UpdateNotification } from './UpdateNotifications';
import styles from './Footer.module.css';

export function Footer() {
  const statusQuery = useStatus();

  if (!statusQuery.data) {
    return null;
  }

  const { Edition, Version } = statusQuery.data;

  return (
    <div className={clsx(styles.root, 'text-center')}>
      {process.env.PORTAINER_EDITION === 'CE' && <UpdateNotification />}
      <div className="text-xs space-x-1 text-grey-8">
        <span>&copy;</span>
        <span>Portainer {Edition}</span>

        <span data-cy="portainerSidebar-versionNumber">{Version}</span>
      </div>
    </div>
  );
}

function useStatus() {
  return useQuery(['status'], () => getStatus());
}
