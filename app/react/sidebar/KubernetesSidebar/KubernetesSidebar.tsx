import { EnvironmentId } from '@/portainer/environments/types';
import { Authorized } from '@/portainer/hooks/useUser';

import { SidebarItem } from '../SidebarItem';

import { KubectlShellButton } from './KubectlShell';

interface Props {
  environmentId: EnvironmentId;
}

export function KubernetesSidebar({ environmentId }: Props) {
  return (
    <>
      <KubectlShellButton environmentId={environmentId} />

      <SidebarItem
        to="kubernetes.dashboard"
        params={{ endpointId: environmentId }}
        icon="fa-tachometer-alt fa-fw"
        featherIcon={false}
        label="Dashboard"
      />

      <SidebarItem
        to="kubernetes.templates.custom"
        params={{ endpointId: environmentId }}
        icon="fa-rocket fa-fw"
        featherIcon={false}
        label="Custom Templates"
      />

      <SidebarItem
        to="kubernetes.resourcePools"
        params={{ endpointId: environmentId }}
        icon="fa-layer-group fa-fw"
        featherIcon={false}
        label="Namespaces"
      />

      <Authorized authorizations="HelmInstallChart">
        <SidebarItem
          to="kubernetes.templates.helm"
          params={{ endpointId: environmentId }}
          icon="fa-dharmachakra fa-fw"
          featherIcon={false}
          label="Helm"
        />
      </Authorized>

      <SidebarItem
        to="kubernetes.applications"
        params={{ endpointId: environmentId }}
        icon="fa-laptop-code fa-fw"
        featherIcon={false}
        label="Applications"
      />

      <SidebarItem
        to="kubernetes.configurations"
        params={{ endpointId: environmentId }}
        icon="fa-file-code fa-fw"
        featherIcon={false}
        label="ConfigMaps & Secrets"
      />

      <SidebarItem
        to="kubernetes.volumes"
        params={{ endpointId: environmentId }}
        icon="fa-database fa-fw"
        featherIcon={false}
        label="Volumes"
      />

      <SidebarItem
        icon="fa-server fa-fw"
        label="Cluster"
        to="kubernetes.cluster"
        featherIcon={false}
        params={{ endpointId: environmentId }}
      >
        <Authorized authorizations="K8sClusterSetupRW" adminOnlyCE>
          <SidebarItem
            to="portainer.k8sendpoint.kubernetesConfig"
            params={{ id: environmentId }}
            label="Setup"
          />
        </Authorized>

        <Authorized authorizations="K8sClusterSetupRW" adminOnlyCE>
          <SidebarItem
            to="portainer.k8sendpoint.securityConstraint"
            params={{ id: environmentId }}
            label="Security constraints"
          />
        </Authorized>

        <SidebarItem
          to="kubernetes.registries"
          params={{ endpointId: environmentId }}
          label="Registries"
        />
      </SidebarItem>
    </>
  );
}
