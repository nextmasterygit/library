'use client';
import { FC } from 'react';
import Iconify from '../../../@core/common/icon';
import { useTheme } from '../../../@core/theme/themeContext';
import { ClassNameTypes } from '../../../utils/interfaces/commonTypes';
import { IconProps } from '@iconify/react';

interface Props extends ClassNameTypes {
  lightIcon?: IconProps['icon'];
  darkIcon?: IconProps['icon'];
}
const ToggleMode: FC<Props> = ({
  className,
  lightIcon = 'tabler:bulb',
  darkIcon = 'tabler:bulb-filled',
}) => {
  const { toggleMode, theme } = useTheme();
  const icon = theme === 'light' ? lightIcon : darkIcon;
  return (
    <div className={`${className} select-none`}>
      <Iconify
        className="!text-primary"
        icon={icon}
        fontSize={'1.5em'}
        onClick={toggleMode}
      />
    </div>
  );
};

export default ToggleMode;
