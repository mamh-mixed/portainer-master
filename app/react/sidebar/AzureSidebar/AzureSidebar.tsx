import { EnvironmentId } from '@/portainer/environments/types';

import { SidebarItem } from '../SidebarItem';

interface Props {
  environmentId: EnvironmentId;
}

export function AzureSidebar({ environmentId }: Props) {
  return (
    <>
      <SidebarItem
        to="azure.dashboard"
        params={{ endpointId: environmentId }}
        icon="fa-tachometer-alt fa-fw"
        featherIcon={false}
        label="Dashboard"
      />
      <SidebarItem
        to="azure.containerinstances"
        params={{ endpointId: environmentId }}
        icon="fa-cubes fa-fw"
        featherIcon={false}
        label="Container instances"
      />
    </>
  );
}
