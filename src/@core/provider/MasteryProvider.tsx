import { ChildrenType } from '../../props';

interface Props {
  children: ChildrenType;
}
const MasteryProvider = ({ children }: Props) => {
  return (
    <div>
      <div id="modal-root"></div>
      {children}
    </div>
  );
};

export default MasteryProvider;
