import React, { JSX } from 'react';
import { ClassNameType } from './commonTypes';

// export interface MenuListAction {
//   selectedRows: Record<string, any>[];
// }

export interface ActionMenuList {
  title: string;
  icon: string;
  Component?: JSX.Element;
  visible?: 'selected' | 'unselected';
  multiSelected?: boolean;
  deleted?: boolean;
  action?: (props: Record<string, any>) => JSX.Element;
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
  Component: JSX.Element;
  multiSelected?: boolean;
  title: string;
}
export type ExpandingTableType = (props: {
  data: Record<string, any>[];
  row: Record<string, any>;
  index: number;
}) => React.ReactNode;
export type ActionMenuListType = ({}) => ActionMenuList[];

export interface TableMainClassesType {
  tableWrapperClass?: ClassNameType;
  tableClass?: ClassNameType;
  tHeadClass?: ClassNameType;
  tableInsideClass?: ClassNameType;
  trHeadClass?: ClassNameType;
  thHeadClass?: ClassNameType;
  tBodyClass?: ClassNameType;
  trBodyClass?: ClassNameType;
  striped?: boolean;
  stripedClass?: ClassNameType;
  tdBodyClass?: ClassNameType;
}

export interface TableType {
  data: Record<string, any>[];
  columns: ColumnType[];
  actionMenuList?: ActionMenuListType; // function to generate action menu items based on row data.
  newActionMenu?: ({}) => NewActionMenu[];
  expandable?: boolean;
  multiExpandable?: boolean;
  expandingContent?: ExpandingTableType;
  titleTable?: string | JSX.Element;
  tabs?: TableType[];
}
