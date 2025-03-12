'use client';

import { useTheme } from '../../../@core/theme/themeContext';
import { colors } from '../../../@core/theme/chooseColor';
const ToggleColor = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      className="space-x-1 select-none"
      style={{
        display: 'flex',
        margin: '0 auto',
      }}
    >
      {colors.length > 0 &&
        colors.map((item, index) => (
          <div
            key={index}
            onClick={() => toggleTheme(item.label)}
            className={`rounded-3xl w-3 h-3 border border-accent-foreground cursor-pointer flex justify-center items-center`}
            style={{
              background: item.color,
            }}
          ></div>
        ))}
    </div>
  );
};

export default ToggleColor;
