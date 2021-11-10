import angular from 'angular';

import { apiServicesModule } from './api';
import { HttpRequestHelperAngular } from './http-request.helper';

export default angular
  .module('portainer.app.services', [apiServicesModule])
  .factory('HttpRequestHelper', HttpRequestHelperAngular).name;
