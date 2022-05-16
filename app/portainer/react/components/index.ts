import angular from 'angular';

import { r2a } from '@/react-tools/react2angular';
import { TagSelector } from '@/react/components/TagSelector';
import { Loading } from '@/react/components/Widget/Loading';
import {
  ForcePasswordUpdateHint,
  PasswordCheckHint,
} from '@/react/components/PasswordCheckHint';

import { fileUploadField } from './file-upload-field';
import { switchField } from './switch-field';

export const componentsModule = angular
  .module('portainer.app.react.components', [])
  .component(
    'tagSelector',
    r2a(TagSelector, ['allowCreate', 'onChange', 'value'])
  )
  .component('fileUploadField', fileUploadField)
  .component('porSwitchField', switchField)
  .component('forcePasswordUpdateHint', r2a(ForcePasswordUpdateHint, []))
  .component('passwordCheckHint', r2a(PasswordCheckHint, []))
  .component('rdLoading', r2a(Loading, [])).name;
