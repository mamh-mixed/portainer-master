import { useCurrentStateAndParams } from '@uirouter/react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import {
  PlatformType,
  EnvironmentId,
  Environment,
} from '@/portainer/environments/types';
import { getPlatformType } from '@/portainer/environments/utils';
import { useEnvironment } from '@/portainer/environments/queries/useEnvironment';

import { getPlatformIcon } from '../portainer/environments/utils/get-platform-icon';

import { AzureSidebar } from './AzureSidebar';
import { DockerSidebar } from './DockerSidebar';
import { KubernetesSidebar } from './KubernetesSidebar';
import { SidebarSection } from './SidebarSection';
import styles from './EnvironmentSidebar.module.css';

export function EnvironmentSidebar() {
  const currentEnvironmentQuery = useCurrentEnvironment();
  const environment = currentEnvironmentQuery.data;

  if (!environment) {
    return null;
  }

  const platform = getPlatformType(environment.Type);
  const sidebar = getSidebar(environment);

  const EnvironmentIcon = getPlatformIcon(environment.Type);

  return (
    <div className={clsx(styles.root, 'rounded border border-dashed py-2')}>
      <SidebarSection
        title={
          <div className="flex items-center gap-2">
            <span>Environment</span>
            {EnvironmentIcon && <EnvironmentIcon className="text-2xl" />}
            <span className="text-white">{environment.Name}</span>
          </div>
        }
        label={PlatformType[platform]}
      >
        {sidebar}
      </SidebarSection>
    </div>
  );

  function getSidebar(environment: Environment) {
    switch (platform) {
      case PlatformType.Azure:
        return <AzureSidebar environmentId={environment.Id} />;
      case PlatformType.Docker:
        return (
          <DockerSidebar
            environmentId={environment.Id}
            environment={environment}
          />
        );
      case PlatformType.Kubernetes:
        return <KubernetesSidebar environmentId={environment.Id} />;
      default:
        return null;
    }
  }
}

function useCurrentEnvironment() {
  const { params } = useCurrentStateAndParams();

  const [environmentId, setEnvironmentId] = useState<EnvironmentId>();

  useEffect(() => {
    const environmentId = parseInt(params.endpointId, 10);
    if (params.endpointId && !Number.isNaN(environmentId)) {
      setEnvironmentId(environmentId);
    }
  }, [params.endpointId]);

  return useEnvironment(environmentId);
}
