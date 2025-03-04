import React, { useState } from 'react';
import { Box, Button, Collapse, VStack } from '@chakra-ui/react';
import { treeData } from "./data";


const renderMenuItems = (items, openMenus, handleToggle) => {
  return items.map((item) => (
    <Box key={item.value || item.name} mb={2}>
  
      <Button variant="link" onClick={() => handleToggle(item.value || item.name)}>
        {item.display || item.name}
      </Button>
      
      {(item.children && item.children.length > 0) || (item.values && item.values.length > 0) ? (
        <Collapse in={openMenus[item.value || item.name]}>
          <VStack align="start" pl={4}>
            {item.children && item.children.length > 0 && renderMenuItems(item.children, openMenus, handleToggle)}
            {item.values && item.values.length > 0 && renderMenuItems(item.values, openMenus, handleToggle)}
          </VStack>
        </Collapse>
      ) : null}
    </Box>
  ));
};

const DropdownMenu = () => {
  const [openMenus, setOpenMenus] = useState({});

  const handleToggle = (value) => {
    setOpenMenus((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  };

  return (
    <Box>
      {treeData.map((node) => (
        <Box key={node.name} mb={4}>
          <Button variant="link">{node.description}</Button>
          {node.values && renderMenuItems(node.values, openMenus, handleToggle)}
        </Box>
      ))}
    </Box>
  );
};

export default DropdownMenu;
