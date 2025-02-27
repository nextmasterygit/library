import Iconify from '../../../../@core/common/icon';
export interface FullScreenTableType {
  fullScreen?: boolean;
  setFullScreen?: (b: boolean) => void;
}
const FullScreenTable = ({
  fullScreen = false,
  setFullScreen,
}: FullScreenTableType) => {
  return (
    setFullScreen && (
      <div>
        <Iconify
          onClick={() => setFullScreen(!fullScreen)}
          icon={'ant-design:fullscreen-outlined'}
          className="text-[2em] hover:scale-105 "
        />
      </div>
    )
  );
};

export default FullScreenTable;
