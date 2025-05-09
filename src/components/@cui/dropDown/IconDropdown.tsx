'use client';
import React, { FC, useState } from 'react';
import {
  PopOver,
  PopOverContent,
  PopOverTrigger,
} from '../../../@core/common/popOver/PopOver';
import Iconify from '../../../@core/common/icon';
import Shadow from '../../../@core/tag/Shadow';
import {
  ClassNameType,
  ChildrenType,
} from '../../../utils/interfaces/commonTypes';
import { twMerge } from 'tailwind-merge';

export interface ContentItem {
  [key: string]: any;
  icon?: string;
  title?: string | number;
  click?: () => void;
  className?: ClassNameType;
}
export interface ContentListType {
  content: ContentItem;
  contentId?: string; //use for key title in contents,
  contentTitle?: string; //use for value  in contents,
  contentClass?: ClassNameType;
  setValue?: (v: any) => void;
  value?: any;
}
// Inside Icon Dropdown
export const ContentList: FC<ContentListType> = ({
  content,
  contentClass,
  contentId = 'title',
}) => {
  const handleToggle = (click?: () => void) => {
    if (click) {
      click();
    }
  };

  return (
    <span
      className={twMerge(
        `w-full   flex items-center space-x-2 cursor-pointer hover:bg-accent`,
        ` ${contentClass}`,
        `${content.className}`,
      )}
      onClick={() => handleToggle(content?.click)}
    >
      {content?.icon && <Iconify fontSize="0.9rem" icon={content.icon} />}

      <span className="text-sm px-2 py-1">{content[contentId]}</span>
    </span>
  );
};

export interface Props {
  icon?: string;
  contents?: ContentItem[];
  contentId?: string; //use for key title in contents,
  contentClass?: ClassNameType;
  customTitle?: (b: boolean) => React.ReactNode;
  style?: 'dropdown' | 'popover';
  title?: string;
  mouseTrigger?: boolean;
  toggleOnContent?: boolean;
  children?: ChildrenType;
}

// Main Component
const IconDropdown = ({
  icon,
  title,
  contents = [
    {
      title: 'Create',
      icon: 'tabler:plus',
      click: () => {},
    },
    {
      title: 'Edit',
      icon: 'tabler:edit',
      click: () => {},
    },
  ],
  contentClass,
  contentId,
  style,
  customTitle,
  mouseTrigger,
  toggleOnContent,
  children,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <PopOver
        style={style}
        toggle={true}
        mouseTrigger={mouseTrigger}
        setIsOpen={setIsOpen}
      >
        <PopOverTrigger>
          <div className="flex">
            {customTitle
              ? customTitle(isOpen)
              : icon && (
                  <Iconify
                    fontSize="2rem"
                    icon={icon || 'mdi:call-to-action'}
                    className={`iconPrimary `}
                  />
                )}

            {title && title}
          </div>
        </PopOverTrigger>
        <PopOverContent toggleOnContent={toggleOnContent}>
          <Shadow space="0" className="border border-border bg-background">
            <div className=" flex flex-col select-none ">
              {children
                ? children
                : contents?.map((content: ContentItem, key: number) => (
                    <span key={key} className="">
                      <ContentList
                        content={content}
                        contentClass={contentClass}
                        contentId={contentId}
                      />
                    </span>
                  ))}
            </div>
          </Shadow>
        </PopOverContent>
      </PopOver>
    </>
  );
};

export default IconDropdown;
