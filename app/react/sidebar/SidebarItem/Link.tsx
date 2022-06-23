import { UISrefActive } from '@uirouter/react';
import { Children, ComponentProps, ReactNode } from 'react';
import _ from 'lodash';

import { Link as NavLink } from '@@/Link';

interface Props extends ComponentProps<typeof NavLink> {
  children: ReactNode;
}

export function Link({ children, to, options, params, title }: Props) {
  const label = title || getLabel(children);

  return (
    <UISrefActive class="bg-blue-1 be:bg-grey-7">
      <NavLink
        to={to}
        params={params}
        title={label}
        options={options}
        className="text-white no-underline hover:no-underline hover:text-white focus:no-underline focus:text-white w-full flex-1 rounded-md px-3"
      >
        {children}
      </NavLink>
    </UISrefActive>
  );
}

function getLabel(children: ReactNode) {
  return _.first(
    _.compact(
      Children.map(children, (child) => {
        if (typeof child === 'string') {
          return child;
        }

        return '';
      })
    )
  );
}
