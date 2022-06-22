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
    <div className={styles.root}>
      {process.env.PORTAINER_EDITION === 'CE' && <UpdateNotification />}
      <div className={clsx('text-xs space-x-1', styles.copyright)}>
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
