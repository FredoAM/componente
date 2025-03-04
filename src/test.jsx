import React,{useEffect, useState} from "react";
import { treeData } from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuOptionGroup,
  MenuItemOption,
  Flex,
  Radio,
  Checkbox
} from "@chakra-ui/react";

const Tree = ({ newData }) => {

const [expandedNodes, setExpandedNodes] = useState({});
  const [selectedNodes, setSelectedNodes] = useState({});
  const [showAll, setShowAll] = useState(false);
  const toggleExpand = (id) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSelect = (id, parentId, e) => {
    const { type } = e.target; 
  
    setSelectedNodes((prev) => {
      const updated = { ...prev };
  
      if (type === "radio") {
        Object.keys(updated).forEach((key) => {
          if (key.startsWith(`${parentId}-`)) { 
            updated[key] = false;
          }
        });
      }
  
      updated[id] = type === "checkbox" ? !prev[id] : true; 
      return updated;
    });
  };
  




  const renderTree = (nodes, level = 0, parentId = "", parentChecked = true) => {
    return nodes.map((node, index) => {
        const id = parentId ? `${parentId}-${index}` : `${level}-${index}`;
      const noChildren = !(node.values || node.children)?.length;
      const label = node.name || node.display;
      const checkType = node.type || "checkbox";
  
        const showIcon = node.children?.length === 0 ;
        const isDisabled = parentChecked
        ? false 
        : node.type === "checkbox" || node.type === "radio";
        const showCheckbox = checkType === "checkbox" && (node.children?.length === 0 || !node.children);

        const isChecked = !!selectedNodes[id];

        return (
                 <Menu   as={MenuItem} closeOnSelect={false} key={index} style={{border:"none"}}>
                 <MenuButton 
                 style={{border:"none"}}
                     as={Button}
                     rightIcon={!showIcon ? <FontAwesomeIcon icon={faAngleRight} /> : false}
                     textAlign={"left"}
                     marginLeft={20}
                     w={"100%"}
                     px={4}
                     py={2}
                     transition='all 0.2s'
                     bg={"gray.200"}
                     borderRadius={"none"}
                     _hover={{ bg: "gray.400"}}
                 >
                <Flex>
                {!node.selectionType && checkType === "radio" && (
                    <Radio
                        name={checkType === "radio" ? `grupo-radio-${parentId}` : undefined}
                        isChecked={isChecked}
                        _checked={{
                            bg: "white",
                            borderColor: "#3782bf", 
                            _before: {
                            content: '""',
                            display: "block",
                            width: "8px", 
                            height: "8px",
                            borderRadius: "50%", 
                            bg: "#3782bf", 
                            position: "absolute", 
                            backgroundColor:"black"
                            },
                        }}
                        onChange={(e) => toggleSelect(id, parentId, e)}
                        style={{ marginRight: 5 }}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                        isDisabled={checkType === "radio" ? !parentChecked : isDisabled}
                    />
                    )}
                    {!node.selectionType && checkType === "checkbox" && showCheckbox && ( 
                    <Checkbox
                        isChecked={isChecked}
                        _checked={{
                            bg: "#3782bf",
                            
                        }}
                        onChange={(e) => toggleSelect(id, parentId, e)}
                        style={{ marginRight: 5 }}
                        isDisabled={isDisabled} 
                    />
                    )}
                    {label}
                </Flex>
                 
                 </MenuButton>
                 <MenuList maxWidth='300px' style={{border:"none"}}>
                     {renderTree(node.values || node.children)}
                 </MenuList>
             </Menu>
           
        );
        });
    };

  return (
    <div style={{ marginBottom: 56, marginTop: 50,   maxWidth:300}}>
        {renderTree(newData)}
    </div>
  );
};

export default function Test() {
  const [newData, setNewData] = useState(treeData);


 useEffect(() => {
    const addNewField = (nodes) => {
      return nodes.map((node) => {
        if (node.values) {
          node.values = node.values.map((value) => {
            value.checked = false;
            value.type = node.selectionType === "MULTIPLE" ? "checkbox" : "radio";
            addNewField(value.children);
            return value;
          });
        }
        return node;
      });
    };

    const updatedData = addNewField(treeData);
    setNewData(updatedData);
  }, []);

  return (
    <div>
      {treeData && <Tree newData={newData} />}
    </div>
  );
}
