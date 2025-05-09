import { Dispatch, JSX, SetStateAction } from 'react';
import {
  ActionMenuList,
  ActionStateTypes,
} from '../../../../utils/interfaces/tableInterface';

// condition on show menu
export const filterActionMenuCondition = (
  actionMenuList: ActionMenuList[] | undefined,
  selectedRows: Record<string, unknown>[],
): ActionMenuList[] | undefined => {
  if (actionMenuList) {
    const menuList = actionMenuList?.filter((item) => {
      if (selectedRows?.length === 1 && item.visible === 'selected') {
        return item;
      } else if (
        selectedRows?.length > 1 &&
        item.visible === 'selected' &&
        item.multiSelected
      ) {
        return item;
      } else if (
        (!selectedRows || selectedRows?.length === 0) &&
        item.visible === 'unselected'
      ) {
        return item;
      } else if (!item.visible) {
        return item;
      }
    });
    return menuList;
  }
};

export const handleActionMenu = (
  toggleDrawer: () => void,
  setDrawerContent: Dispatch<SetStateAction<ActionStateTypes>>,
  Component: JSX.Element,
  title: string,
  multiSelected?: boolean,
) => {
  toggleDrawer();
  setDrawerContent((prev) => ({
    ...prev,
    Component,
    title,
    multiSelected,
  }));
};

// click menu action
export const actionMenuContents = (
  listCondition: ActionMenuList[] | undefined,
  selectedRows: Record<string, unknown>[],
  setSelectedRows: (rows: Record<string, any>[]) => void,
  toggleDrawer: () => void,
  setDrawerContent: Dispatch<SetStateAction<ActionStateTypes>>,
  removeSelection: () => void,
) =>
  listCondition?.map((item, index) => ({
    key: index,
    title: item.title,
    icon: item.icon ? item.icon : 'tabler:plus',

    click: item.action
      ? () =>
          // @ts-expect-error
          item.action({
            selectedRows: selectedRows,
            setSelectedRows,
            removeSelection,
          })
      : item.deleted
        ? // @ts-expect-error
          () => item.deleted({ setSelectedRows, selectedRows, removeSelection })
        : item.Component
          ? () =>
              handleActionMenu(
                //drawer form
                toggleDrawer,
                setDrawerContent,
                item.Component as JSX.Element,
                item.title,
                item.multiSelected,
              )
          : () => {},
  }));
