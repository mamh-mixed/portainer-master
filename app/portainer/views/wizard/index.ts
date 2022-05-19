import angular from 'angular';
import { StateRegistry } from '@uirouter/angularjs';

import { r2a } from '@/react-tools/react2angular';

import { EnvironmentCreationViewAngular } from './EnvironmentsCreationView';
import { EnvironmentTypeSelectViewAngular } from './EnvironmentTypeSelectView';
import { HomeView } from './HomeView';

export const wizardModule = angular
  .module('portainer.app.wizard', [])
  .component(
    'wizardEnvironmentTypeSelectView',
    EnvironmentTypeSelectViewAngular
  )
  .component(
    'wizardEnvironmentCreationViewAngular',
    EnvironmentCreationViewAngular
  )
  .component('wizardMainView', r2a(HomeView, []))
  .config(config).name;

function config($stateRegistryProvider: StateRegistry) {
  $stateRegistryProvider.register({
    name: 'portainer.wizard',
    url: '/wizard',
    views: {
      'content@': {
        component: 'wizardMainView',
      },
    },
  });

  $stateRegistryProvider.register({
    name: 'portainer.wizard.endpoints.create',
    url: '/create?envType',
    views: {
      'content@': {
        component: 'wizardEnvironmentCreationViewAngular',
      },
    },
    params: {
      envType: '',
    },
  });

  $stateRegistryProvider.register({
    name: 'portainer.wizard.endpoints',
    url: '/endpoints',
    views: {
      'content@': {
        component: 'wizardEnvironmentTypeSelectView',
      },
    },
    params: {
      localEndpointId: 0,
    },
  });
}
