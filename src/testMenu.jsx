import React, { useState } from "react";
import { treeData } from "./data";
import { Flex, Select, Text } from "@chakra-ui/react";

const TreeDropdown = ({ data }) => {
  const [selectedValues, setSelectedValues] = useState({});
  const [options, setOptions] = useState({ 0: data });

  const handleChange = (level, selectedValue) => {
    const newSelectedValues = { ...selectedValues, [level]: selectedValue };
    setSelectedValues(newSelectedValues);

    const selectedNode = options[level].find(
      (item) => item.values?.some((val) => val.display === selectedValue)
    );
    
    const nextOptions = selectedNode?.values.find((val) => val.display === selectedValue)?.children || [];

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
        options[level].map((section, index) => (
          <Flex key={`${level}-${index}`} direction="column" mt={4} maxW={400}>
            <Text fontWeight="bold" mb={2}>{section.name}</Text>
            <Select
              placeholder="Selecciona una opción"
              onChange={(e) => handleChange(Number(level), e.target.value)}
              value={selectedValues[level] || ""}
            >
              {section.values.map((option) => (
                <option key={option.value} value={option.display}>
                  {option.display}
                </option>
              ))}
            </Select>
          </Flex>
        ))
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
