import clsx from 'clsx';
import { PropsWithChildren, ReactNode } from 'react';

import styles from './SidebarSection.module.css';
import { useSidebarState } from './useSidebarState';

interface Props {
  title: ReactNode;
  label?: string;
}

export function SidebarSection({
  title,
  label,
  children,
}: PropsWithChildren<Props>) {
  const labelText = typeof title === 'string' ? title : label;
  const { isOpen } = useSidebarState();

  return (
    <div>
      {isOpen && (
        <li className={clsx(styles.sidebarTitle, 'ml-3 text-sm text-grey-8')}>
          {title}
        </li>
      )}

      <nav aria-label={labelText} className="mt-4">
        <ul>{children}</ul>
      </nav>
    </div>
  );
}
