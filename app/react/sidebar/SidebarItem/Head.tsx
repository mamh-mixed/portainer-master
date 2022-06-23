import { UISrefActive } from '@uirouter/react';
import clsx from 'clsx';
import { ComponentProps } from 'react';

import { Link } from '@@/Link';
import { IconProps, Icon } from '@@/Icon';

import { useSidebarState } from '../useSidebarState';

interface Props extends IconProps, ComponentProps<typeof Link> {
  label: string;
}

export function Head({ to, options, params, label, icon, featherIcon }: Props) {
  const { isOpen } = useSidebarState();

  return (
    <UISrefActive class="bg-blue-1 be:bg-grey-7">
      <Link
        to={to}
        params={params}
        title={label}
        options={options}
        className="text-white no-underline hover:no-underline hover:text-white focus:no-underline focus:text-white w-full flex-1 rounded-md px-3"
      >
        <div
          className={clsx('w-full flex items-center h-8 space-x-4 text-sm', {
            'justify-start': isOpen,
            'justify-center': !isOpen,
          })}
        >
          {!!icon && (
            <Icon
              icon={icon}
              feather={featherIcon}
              className={clsx('flex [&>*]:w-4')}
            />
          )}
          {isOpen && <span>{label}</span>}
        </div>
      </Link>
    </UISrefActive>
  );
}
