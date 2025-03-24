'use client';
import { FC, ReactNode } from 'react';
import Shadow from '../../../@core/tag/Shadow';
import Iconify from '../../../@core/common/icon';
import useScreenState from '../../../@core/customHooks/useScreenState';
import { extractChildComponents } from '../../../@core/customHooks/extraChildComponents';
import { ClassNameType } from '../../../props';

interface Props {
  open?: boolean;
  type?: 'fixed' | 'absolute';
  position?: 'right' | 'left';
  children?: ReactNode;
  //   data: SidebarContentType[];
  title?: string;
  showOn?: number;
  sidebarSize?: string;
  className?: ClassNameType;
  wrapperClass?: ClassNameType;
}

export const DashboardSidebar: FC<Props> = ({
  children,
  open = true,
  type = 'fixed',
  position = 'left',
  title = 'Sidebar Title',
  showOn = 976,
  sidebarSize = '256px',
  className,
  wrapperClass,
  //   data,
}) => {
  const { isOpen, toggleSidebar } = useScreenState({
    open,
    defaultWidth: showOn,
  });

  const { matches, rest: bodyChildren } = extractChildComponents(children, [
    '__TITLE_CONTENT',
    '__SIDEBAR_CONTENT',
  ]);
  const titleChildren = matches[0] || null;
  const sidebarChildren = matches[1] || null;
  return (
    <div className={wrapperClass}>
      <div className={`max-h-screen relative ${className}`}>
        <Shadow
          space="0"
          style={{ width: sidebarSize }}
          className={`shadow-md ${type} ${
            position === 'right' ? 'right-0' : 'left-0'
          } top-0 h-full  overflow-auto  transition-transform transform ${
            isOpen
              ? position === 'right'
                ? 'translate-x-0'
                : 'translate-x-0'
              : position === 'right'
                ? 'translate-x-[110%]'
                : '-translate-x-[110%]'
          } `}
        >
          {titleChildren ? (
            titleChildren
          ) : (
            <h2 className="p-4 text-xl text-center">{title}</h2>
          )}
          {sidebarChildren}
        </Shadow>
      </div>
      <div
        className={` fixed  top-0  ${position === 'left' ? 'left-0' : 'right-0'} `}
      >
        <Iconify
          icon={`${
            isOpen
              ? position === 'left'
                ? 'mdi:hamburger-open'
                : 'mdi:hamburger-close'
              : position === 'left'
                ? 'mdi:hamburger-close'
                : 'mdi:hamburger-open'
          }`}
          fontSize={'1.5em'}
          onClick={toggleSidebar}
          className={`  iconPrimary `}
          style={{
            marginLeft:
              isOpen && position === 'left'
                ? `calc(${sidebarSize} - 25px)`
                : '',
            marginRight:
              isOpen && position !== 'left'
                ? `calc(${sidebarSize} - 25px)`
                : '',
          }}
        >
          {isOpen ? 'Hide Sidebar' : 'Show Sidebar'}
        </Iconify>
      </div>
      <div
        style={{
          marginLeft: isOpen && position === 'left' ? sidebarSize : '',
          marginRight: isOpen && position !== 'left' ? sidebarSize : '',
        }}
        className={` transition-all duration-300`}
      >
        {bodyChildren}
      </div>
    </div>
  );
};

interface ChildrenType {
  children: ReactNode;
  className?: ClassNameType;
}
export const DashboardSidebarTitle = ({
  children,
  className = 'p-4 text-center text-xl font-bold',
}: ChildrenType) => {
  return <div className={className}>{children}</div>;
};
(DashboardSidebarTitle as any).__TITLE_CONTENT = true;

export const DashboardSidebarContent = ({
  children,
  className = 'flex items-center justify-center',
}: ChildrenType) => {
  return <div className={className}>{children}</div>;
};
(DashboardSidebarContent as any).__SIDEBAR_CONTENT = true;
