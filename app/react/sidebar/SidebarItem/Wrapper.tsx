import { PropsWithChildren, AriaAttributes } from 'react';
import clsx from 'clsx';

interface Props {
  className?: string;
  label?: string;
}

export function Wrapper({
  className,
  children,
  label,
  ...ariaProps
}: PropsWithChildren<Props> & AriaAttributes) {
  return (
    <li
      className={clsx('flex mx-4', className)}
      title={label}
      aria-label={label}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ariaProps}
    >
      {children}
    </li>
  );
}
