import { FC } from "react";
import IconDropdown, {
  ContentItem,
  ContentList,
  Props,
} from "./IconDropdown";
import DragDropArray from "../draggable/DragDropArray";
import { ClassNameType } from "../../../utils/interfaces/commonTypes";

interface DraggableDropdownType extends Props {
  contents: ContentItem[];
  contentId?: string; //use for key title in contents,
  contentClass?: ClassNameType;
  setShowOnlyColumns: any;
}
const DraggableDropdown: FC<
  DraggableDropdownType
> = ({
  contents,
  contentClass,
  contentId,
  setShowOnlyColumns,
  ...props
}) => {
  return (
    <IconDropdown {...props}>
      <DragDropArray
        setItems={setShowOnlyColumns}
        items={contents}
        renderItem={(item) => (
          <ContentList content={item} />
        )}
      />
    </IconDropdown>
  );
};

export default DraggableDropdown;
