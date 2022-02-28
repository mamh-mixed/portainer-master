import angular from 'angular';

import sidebarModule from './sidebar';
import gitFormModule from './forms/git-form';
import porAccessManagementModule from './accessManagement';
import formComponentsModule from './form-components';
import widgetModule from './widget';
import boxSelectorModule from './BoxSelector';
import headerModule from './PageHeader';

import { ReactExampleAngular } from './ReactExample';
import { TooltipAngular } from './Tip/Tooltip';
import { beFeatureIndicatorAngular } from './BEFeatureIndicator';

export default angular
  .module('portainer.app.components', [headerModule, boxSelectorModule, widgetModule, sidebarModule, gitFormModule, porAccessManagementModule, formComponentsModule])
  .component('portainerTooltip', TooltipAngular)
  .component('reactExample', ReactExampleAngular)
  .component('beFeatureIndicator', beFeatureIndicatorAngular).name;
