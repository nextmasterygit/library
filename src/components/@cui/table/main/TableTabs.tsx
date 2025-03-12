import { ReactNode } from 'react';

import { TableType } from '../../../../utils/interfaces/tableInterface';
import Iconify from '../../../../@core/common/icon';

export interface TabPropsType {
  tabs?: TableType[];
  activeTab: number;
  setActiveTab: (n: number) => void;
  setSelectedRows?: (rows: Record<string, any>[]) => void;
}
interface Props extends TabPropsType {
  tableMain: () => ReactNode;
}
const TableTabs = ({
  tabs,
  activeTab,
  setActiveTab,
  setSelectedRows,
  tableMain,
}: Props) => {
  return (
    <div className="">
      {/* {openModal && modelContent()} */}
      {tabs && tabs.length > 0 && setActiveTab ? (
        <>
          <div className="flex text-center items-center justify-between">
            {tabs.map((item, index) => {
              const isActive = index === activeTab;
              return (
                <div
                  key={index}
                  className={` relative cursor-pointer text-center w-full border-none shadow-2xl font-semibold  hover:bg-primary/90 select-none  ${
                    isActive
                      ? 'bg-primary text-primary-foreground '
                      : 'bg-primary/40 text-foreground/50 '
                  }`}
                  onClick={() => {
                    setActiveTab(index);
                  }}
                >
                  {/* {activeTab === index && (
                    <div className=" absolute top-0 left-0  text-white/80 cursor-pointer hover:text-white">
                      <div
                        onClick={() =>
                          setSelectedRows ? setSelectedRows([]) : {}
                        }
                        className={`text-[0.7em]`}
                      >
                        <div className="flex item-center">
                          <Iconify icon="mdi:close-box" fontSize="1em" />
                          unselect
                        </div>
                      </div>
                    </div>
                  )} */}
                  <div className={`text-[0.7em]`}>{item.titleTable}</div>
                </div>
              );
            })}
          </div>
          {tableMain()}
          {/* {tabs[activeTab]?.content ? tabs[activeTab]?.content() : tableMain()} */}
        </>
      ) : (
        tableMain()
      )}
    </div>
  );
};

export default TableTabs;
