import React, { JSX } from 'react';
import { ClassNameType } from './commonTypes';

// export interface MenuListAction {
//   selectedRows: Record<string, any>[];
// }

interface ActionType {
  selectedRows: Record<string, unknown>[];
  setSelectedRows: (rows: Record<string, any>[]) => void;
  removeSelection: () => void;
}
export interface ActionMenuList {
  title: string;
  icon: string;
  Component?: ((props: ActionType) => JSX.Element) | JSX.Element;
  visible?: 'selected' | 'unselected';
  multiSelected?: boolean;
  deleted?: (props: ActionType) => void | JSX.Element;
  action?: (props: ActionType) => void | JSX.Element;
}

export interface RenderType {
  row: number | string | Record<string, any> | null;
  index: number;
  data: Record<string, any>[];
  cell: string | number | Record<string, any> | null;
}
export interface ColumnType {
  title: string;
  accessor: string;
  filterId?: string;
  type?: 'date' | 'currency';
  currency?: 'PKR' | 'SAR' | 'EUR' | 'JPY' | 'USD' | 'INR';
  format?: 'en-PK' | 'en-US' | 'de-DE' | 'ja-JP' | 'en-IN';
  render?: ({ row, index, data, cell }: RenderType) => void;
  className?: React.ComponentProps<'div'>['className'];
}
export type ColumnKey = 'title' | 'accessor' | 'filterId';
export interface ColumnFilterType {
  id: string;
  value: string;
}
export interface NewDropDownMenu {
  icon: string;
  contents: (props: Record<string, any>) => ActionMenuList[];
}
export interface NewActionMenu {
  dropdownMenu?: NewDropDownMenu[];
  icon?: string;
  action?: (props: Record<string, any>) => JSX.Element;
}
export interface ActionStateTypes {
  Component: ((props: ActionType) => JSX.Element) | JSX.Element;
  multiSelected?: boolean;
  title: string;
}
export type ExpandingTableType = (props: {
  data: Record<string, any>[];
  row: Record<string, any>;
  index: number;
}) => React.ReactNode;
export type ActionMenuListType = ({}) => ActionMenuList[];
export type NewActionMenuType = ({}) => NewActionMenu[];

export interface TableMainClassesType {
  tableClass?: ClassNameType;
  tHeadClass?: ClassNameType;
  tableInsideClass?: ClassNameType;
  trHeadClass?: ClassNameType;
  thHeadClass?: ClassNameType;
  tBodyClass?: ClassNameType;
  trBodyClass?: ClassNameType;
  tdBodyClass?: ClassNameType;
}

export interface TableTabsType {
  data: Record<string, any>[];
  columns: ColumnType[];
  total?: number;
  actionMenuList?: ActionMenuListType; // function to generate action menu items based on row data.
  newActionMenu?: NewActionMenuType;
  expandable?: boolean;
  multiExpandable?: boolean;
  ExpandingContent?: ExpandingTableType;
  titleTable?: string | JSX.Element;
  rowId?: string;
}

export interface TableType extends TableTabsType {}
