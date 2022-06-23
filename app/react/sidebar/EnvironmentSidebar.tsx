import { useCurrentStateAndParams, useRouter } from '@uirouter/react';
import { useEffect, useState } from 'react';
import { X } from 'react-feather';

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

export function EnvironmentSidebar() {
  const { query: currentEnvironmentQuery, clearEnvironment } =
    useCurrentEnvironment();
  const environment = currentEnvironmentQuery.data;

  if (!environment) {
    return null;
  }

  const platform = getPlatformType(environment.Type);
  const sidebar = getSidebar(environment);

  const EnvironmentIcon = getPlatformIcon(environment.Type);

  return (
    <div className="rounded border border-dotted py-2 be:bg-blue-7 bg-blue-8 be:border-grey-7 border-blue-2">
      <SidebarSection
        title={
          <div className="flex items-center gap-2 ">
            <span>Environment</span>
            {EnvironmentIcon && <EnvironmentIcon className="text-2xl" />}
            <span className="text-white">{environment.Name}</span>

            <button
              type="button"
              onClick={clearEnvironment}
              className="flex items-center justify-center be:bg-grey-3 bg-blue-5 rounded border-0 text-sm h-5 w-5 p-1 ml-auto mr-2 text-grey-8"
            >
              <X />
            </button>
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
  const router = useRouter();
  const [environmentId, setEnvironmentId] = useState<EnvironmentId>();

  useEffect(() => {
    const environmentId = parseInt(params.endpointId, 10);
    if (params.endpointId && !Number.isNaN(environmentId)) {
      setEnvironmentId(environmentId);
    }
  }, [params.endpointId]);

  return { query: useEnvironment(environmentId), clearEnvironment };

  function clearEnvironment() {
    if (params.endpointId) {
      router.stateService.go('portainer.home');
    }

    setEnvironmentId(undefined);
  }
}
