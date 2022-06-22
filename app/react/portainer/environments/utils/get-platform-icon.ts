import { getPlatformType } from '@/portainer/environments/utils';
import { EnvironmentType, PlatformType } from '@/portainer/environments/types';

import Docker from './docker.svg?c';
import Azure from './azure.svg?c';
import Kubernetes from './kubernetes.svg?c';
import Nomad from './nomad.svg?c';

export function getPlatformIcon(type: EnvironmentType) {
  const platform = getPlatformType(type);
  switch (platform) {
    case PlatformType.Docker:
      return Docker;
    case PlatformType.Kubernetes:
      return Kubernetes;
    case PlatformType.Azure:
      return Azure;
    case PlatformType.Nomad:
      return Nomad;
    default:
      return null;
  }
}
