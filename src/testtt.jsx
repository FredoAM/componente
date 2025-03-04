import React, { useState, useEffect } from "react";
import { treeData } from "./data";
import { Flex, Select } from "@chakra-ui/react";

const TreeDropdown = ({ data }) => {
  const [selectedValues, setSelectedValues] = useState({});
  const [options, setOptions] = useState({ 0: data });

  const handleChange = (level, selectedValue) => {
    const newSelectedValues = { ...selectedValues, [level]: selectedValue };
    setSelectedValues(newSelectedValues);

    const selectedNode = options[level].find(
      (item) => item.value === selectedValue || item.name === selectedValue || item.display === selectedValue
    );

    const nextOptions = selectedNode?.values || selectedNode?.children || [];

    if (nextOptions.length > 0) {
      setOptions({ ...options, [level + 1]: nextOptions });
    } else {
    
      const newOptions = { ...options };
      Object.keys(newOptions).forEach((key) => {
        if (key > level) {
          delete newOptions[key];
        }
      });
      setOptions(newOptions);
    }
  };

  return (
    <div>
      {Object.keys(options).map((level) => (
        <Flex key={level} direction="column" mt={4} maxW={400}>
          <Select
            placeholder="Selecciona una opción"
            onChange={(e) => handleChange(Number(level), e.target.value)}
            value={selectedValues[level] || ""}
          >
            {options[level].map((option) => (
              <option key={option.value || option.name} value={option.value || option.name || option.display}>
                {option.name || option.display}
              </option>
            ))}
          </Select>
        </Flex>
      ))}
    </div>
  );
};

export default function Test1() {


  return (
    <div style={{ padding: "20px" }}>
      {treeData && <TreeDropdown data={treeData} />}
    </div>
  );
}
