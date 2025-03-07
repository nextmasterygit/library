import React from 'react';
import { Icon, IconProps } from '@iconify/react';
import { twMerge } from 'tailwind-merge';

interface props extends IconProps {
  className?: React.ComponentProps<'div'>['className'];
  fontSize?: string;
  hover?: boolean;
}

const Iconify = ({
  icon,
  className,
  hover,
  fontSize = '1.5em',
  ...rest
}: props) => {
  const mergedClassName = twMerge(
    `cursor-pointer text-foreground ${hover && 'duration-300 transition-all hover:text-ring'}`,
    className,
  );
  return (
    <Icon
      icon={icon}
      fontSize={fontSize}
      {...rest}
      className={`${mergedClassName} `}
    />
  );
};

export default Iconify;
