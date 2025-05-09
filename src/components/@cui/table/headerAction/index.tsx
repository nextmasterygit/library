import React, { useState, JSX } from 'react';
import {
  ActionMenuList,
  ActionMenuListType,
  ActionStateTypes,
  ColumnType,
  NewActionMenu,
  NewDropDownMenu,
} from '../../../../utils/interfaces/tableInterface';

import { actionMenuContents, filterActionMenuCondition } from './function';

import Drawer from '../../drawer/Drawer';
import IconDropdown from '../../dropDown/IconDropdown';
import {
  handleExportCsv,
  handleArrangeCsvData,
} from '../../../../@core/utility';

interface TableHeaderActionType {
  data: Record<string, unknown>[];
  actionMenuList?: ActionMenuListType;
  selectedRows: Record<string, unknown>[];
  setSelectedRows: (rows: Record<string, any>[]) => void;
  newActionMenu?: ({}) => NewActionMenu[];
  removeSelection: () => void;
  columns: ColumnType[];
}
const TableHeaderAction = ({
  data,
  columns,
  actionMenuList,
  selectedRows,
  setSelectedRows,
  newActionMenu,
  removeSelection,
}: TableHeaderActionType) => {
  const [drawerToggle, setDrawerToggle] = useState(false);
  const [drawerContent, setDrawerContent] = useState<ActionStateTypes>({
    Component: <></>,
    title: '',
    multiSelected: false,
  });

  const toggleDrawer = (toggle?: boolean) => {
    setDrawerToggle(toggle ? toggle : !drawerToggle);
  };

  const handleActionMenuContents: any = (
    listCondition: ActionMenuList[] | undefined,
  ) => {
    return actionMenuContents(
      listCondition,
      selectedRows,
      setSelectedRows,
      toggleDrawer,
      setDrawerContent,
      removeSelection,
    );
  };
  //new Action Menu
  const newActionMenuRender = (
    actionMenu: NewDropDownMenu[],
  ): JSX.Element[] | any => {
    return actionMenu.map((menu, index) => {
      const contents = menu.contents({});
      const listCondition = filterActionMenuCondition(contents, selectedRows);
      return (
        listCondition &&
        listCondition.length > 0 && (
          <div key={index}>
            <IconDropdown
              mouseTrigger={true}
              icon={menu.icon}
              contents={handleActionMenuContents(listCondition)}
              style="dropdown"
            />
          </div>
        )
      );
    });
  };

  // main action
  const mainActionMenu = actionMenuList ? actionMenuList({}) : undefined;
  const menuListCondition = filterActionMenuCondition(
    mainActionMenu,
    selectedRows,
  );
  const singleIconAction = (icon: string, action: ({}) => JSX.Element) => {
    return (
      <div>
        <div>
          {action({
            icon,
          })}
        </div>
      </div>
    );
  };
  const ExportHandle: NewDropDownMenu[] = [
    {
      icon: 'lets-icons:import-duotone-line',
      contents: ({}: Record<string, any>) => [
        {
          title: 'Export All',
          icon: 'solar:file-download-bold',
          action: () => {
            handleExportCsv(data);
          },
        },
        {
          title: ' Export Selected',
          icon: 'solar:file-download-bold',
          action: () => {
            handleArrangeCsvData(selectedRows, columns);
          },
          visible: 'selected',
          multiSelected: true,
        },
      ],
    },
  ];
  return (
    <>
      <div>
        <div className="flex items-center relative">
          {menuListCondition && menuListCondition.length > 0 && (
            <IconDropdown
              mouseTrigger={true}
              icon="mdi:call-to-action"
              contents={handleActionMenuContents(menuListCondition)}
              style="dropdown"
            />
          )}
          {newActionMenu &&
            newActionMenu({}).map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {item.action && item.icon
                    ? singleIconAction(item.icon, item.action)
                    : item.dropdownMenu
                      ? newActionMenuRender(item.dropdownMenu)
                      : null}
                </React.Fragment>
              );
            })}
          <React.Fragment>{newActionMenuRender(ExportHandle)}</React.Fragment>
        </div>
      </div>
      <Drawer
        open={drawerToggle}
        close={toggleDrawer}
        title={drawerContent.title}
      >
        {typeof drawerContent.Component === 'function'
          ? drawerContent.Component({
              removeSelection,
              selectedRows,
              setSelectedRows,
            })
          : drawerContent.Component}
      </Drawer>
    </>
  );
};

export default TableHeaderAction;
