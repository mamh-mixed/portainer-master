import { useCurrentStateAndParams } from '@uirouter/react';
import {
  Children,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useMemo,
  useReducer,
} from 'react';
import { ChevronDown, ChevronLeft } from 'react-feather';

import { useSidebarState } from '../useSidebarState';

interface Props {
  head: ReactNode;
  openOnPaths?: string[];
}

export function Menu({
  children,
  head,
  openOnPaths = [],
}: PropsWithChildren<Props>) {
  const { isOpen: isSidebarOpen } = useSidebarState();

  const paths = useMemo(
    () => [
      ...getPaths(head, []),
      ...getPathsForChildren(children),
      ...openOnPaths,
    ],
    [children, openOnPaths, head]
  );

  const { isOpen, toggleOpen } = useIsOpen(isSidebarOpen, paths);

  const CollapseButtonIcon = isOpen ? ChevronDown : ChevronLeft;

  return (
    <div className="flex-1">
      <div className="flex w-full justify-between items-center relative ">
        {head}
        {isSidebarOpen && Children.count(children) > 0 && (
          <button
            className="bg-transparent border-0 w-6 h-6 flex items-center justify-center absolute right-2 text-grey-1"
            onClick={handleClickArrow}
            type="button"
            aria-label="Collapse button"
          >
            <CollapseButtonIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && <ul className="!pl-8">{children}</ul>}
    </div>
  );

  function handleClickArrow(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    toggleOpen();
  }
}

function useIsOpen(
  isSidebarOpen: boolean,

  paths: string[] = []
) {
  const { state } = useCurrentStateAndParams();
  const currentStateName = state.name || '';
  const isOpenByState = paths.some((path) => currentStateName.startsWith(path));

  const [forceOpen, toggleForceOpen] = useReducer((state) => !state, false);

  const isOpen = checkIfOpen();

  return { isOpen, toggleOpen };

  function toggleOpen() {
    if (!isOpenByState) {
      toggleForceOpen();
    }
  }

  function checkIfOpen() {
    if (!isSidebarOpen) {
      return false;
    }

    if (forceOpen) {
      return true;
    }

    return isOpenByState;
  }
}

function isReactElement(element: ReactNode): element is ReactElement {
  return (
    !!element &&
    typeof element === 'object' &&
    'type' in element &&
    'props' in element
  );
}

function getPathsForChildren(children: ReactNode): string[] {
  return Children.map(children, (child) => getPaths(child, []))?.flat() || [];
}

function getPaths(element: ReactNode, paths: string[]): string[] {
  if (!isReactElement(element)) {
    return paths;
  }

  if (typeof element.props.to === 'undefined') {
    return Children.map(element.props.children, (child) =>
      getPaths(child, paths)
    );
  }

  return [element.props.to, ...paths];
}