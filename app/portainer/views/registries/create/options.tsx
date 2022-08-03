import Docker from '@/assets/ico/vendor/docker.svg?c';
import Aws from '@/assets/ico/vendor/aws.svg?c';
import Quay from '@/assets/ico/vendor/quay.svg?c';
import Proget from '@/assets/ico/vendor/proget.svg?c';
import Azure from '@/assets/ico/vendor/azure.svg?c';
import Gitlab from '@/assets/ico/vendor/gitlab.svg?c';
import Custom from '@/assets/ico/custom.svg?c';

export const options = [
  {
    id: 'registry_dockerhub',
    icon: Docker,
    label: 'DockerHub',
    description: 'DockerHub authenticated account',
    value: '6',
  },
  {
    id: 'registry_aws_ecr',
    icon: Aws,
    label: 'AWS ECR',
    description: 'Amazon elastic container registry',
    value: '7',
  },
  {
    id: 'registry_quay',
    icon: Quay,
    label: 'Quay.io',
    description: 'Quay container registry',
    value: '1',
  },
  {
    id: 'registry_proget',
    icon: Proget,
    label: 'ProGet',
    description: 'ProGet container registry',
    value: '5',
  },
  {
    id: 'registry_azure',
    icon: Azure,
    label: 'Azure',
    description: 'Azure container registry',
    value: '2',
  },
  {
    id: 'registry_gitlab',
    icon: Gitlab,
    label: 'Gitlab',
    description: 'Gitlab container registry',
    value: '4',
  },
  {
    id: 'registry_custom',
    icon: Custom,
    label: 'Custom registry',
    description: 'Define your own registry',
    value: '3',
  },
];
