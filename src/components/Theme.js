// ThemeToggle.js
import React from 'react';
import { IconButton, useColorMode,Tooltip } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const Theme = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Tooltip label={`Change theme ${colorMode==='light'?"dark":"light"}`}>
    <IconButton
      aria-label="Toggle theme"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}     
    />
    </Tooltip>
  );
};

export default Theme;
