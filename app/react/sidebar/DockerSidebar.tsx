import {
  Activity,
  BarChart,
  Clock,
  HardDrive,
  Image,
  Layout,
  List,
  Server,
} from 'react-feather';

import {
  type Environment,
  type EnvironmentId,
  EnvironmentStatus,
} from '@/portainer/environments/types';
import {
  Authorized,
  useUser,
  isEnvironmentAdmin,
} from '@/portainer/hooks/useUser';
import { useInfo, useVersion } from '@/docker/services/system.service';

import { SidebarItem } from './SidebarItem';

interface Props {
  environmentId: EnvironmentId;
  environment: Environment;
}

export function DockerSidebar({ environmentId, environment }: Props) {
  const { user } = useUser();
  const isAdmin = isEnvironmentAdmin(user, environmentId);

  const areStacksVisible =
    isAdmin || environment.SecuritySettings.allowStackManagementForRegularUsers;

  const envInfoQuery = useInfo(
    environmentId,
    (info) => !!info.Swarm?.NodeID && !!info.Swarm?.ControlAvailable
  );

  const envVersionQuery = useVersion(environmentId, (version) =>
    parseFloat(version.ApiVersion)
  );

  const isSwarmManager = envInfoQuery.data;
  const apiVersion = envVersionQuery.data || 0;

  const offlineMode = environment.Status === EnvironmentStatus.Down;

  const setupSubMenuProps = isSwarmManager
    ? {
        label: 'Swarm',
        iconClass: 'fa-object-group fa-fw',
        to: 'docker.swarm',
      }
    : {
        label: 'Host',
        iconClass: 'fa-th fa-fw',
        to: 'docker.host',
      };

  return (
    <>
      <SidebarItem
        to="docker.dashboard"
        params={{ endpointId: environmentId }}
        icon={BarChart}
        label="Dashboard"
      />

      {!offlineMode && (
        <SidebarItem
          label="App Templates"
          icon={Layout}
          to="docker.templates"
          params={{ endpointId: environmentId }}
        >
          <SidebarItem
            label="Custom Templates"
            to="docker.templates.custom"
            params={{ endpointId: environmentId }}
          />
        </SidebarItem>
      )}

      {areStacksVisible && (
        <SidebarItem
          to="docker.stacks"
          params={{ endpointId: environmentId }}
          icon={Server}
          label="Stacks"
        />
      )}

      {isSwarmManager && (
        <SidebarItem
          to="docker.services"
          params={{ endpointId: environmentId }}
          icon="fa-list-alt fa-fw"
          featherIcon={false}
          label="Services"
        />
      )}

      <SidebarItem
        to="docker.containers"
        params={{ endpointId: environmentId }}
        icon={List}
        label="Containers"
      />

      <SidebarItem
        to="docker.images"
        params={{ endpointId: environmentId }}
        icon={Image}
        label="Images"
      />

      <SidebarItem
        to="docker.networks"
        params={{ endpointId: environmentId }}
        icon={Activity}
        label="Networks"
      />

      <SidebarItem
        to="docker.volumes"
        params={{ endpointId: environmentId }}
        icon={HardDrive}
        label="Volumes"
      />

      {apiVersion >= 1.3 && isSwarmManager && (
        <SidebarItem
          to="docker.configs"
          params={{ endpointId: environmentId }}
          icon="fa-file-code fa-fw"
          featherIcon={false}
          label="Configs"
        />
      )}

      {apiVersion >= 1.25 && isSwarmManager && (
        <SidebarItem
          to="docker.secrets"
          params={{ endpointId: environmentId }}
          icon="fa-user-secret fa-fw"
          featherIcon={false}
          label="Secrets"
        />
      )}

      {!isSwarmManager && isAdmin && !offlineMode && (
        <SidebarItem
          to="docker.events"
          params={{ endpointId: environmentId }}
          icon={Clock}
          featherIcon={false}
          label="Events"
        />
      )}

      <SidebarItem
        label={setupSubMenuProps.label}
        icon={setupSubMenuProps.iconClass}
        featherIcon={false}
        to={setupSubMenuProps.to}
        params={{ endpointId: environmentId }}
      >
        <Authorized
          authorizations="PortainerEndpointUpdateSettings"
          adminOnlyCE
        >
          <SidebarItem
            to="docker.featuresConfiguration"
            params={{ endpointId: environmentId }}
            label="Setup"
          />
        </Authorized>

        <SidebarItem
          to="docker.registries"
          params={{ endpointId: environmentId }}
          label="Registries"
        />
      </SidebarItem>
    </>
  );
}
