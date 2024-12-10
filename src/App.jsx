import React, { useState } from "react";
import { treeData } from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const TreeView = ({ data }) => {
  const [expandedNodes, setExpandedNodes] = useState({});
  const [selectedNodes, setSelectedNodes] = useState({});
  const [updatedTree, setUpdatedTree] = useState([]); 

  const toggleExpand = (id) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSelect = (id) => {
    setSelectedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderTree = (nodes, level = 0, input = "MULTIPLE") => {
    return nodes.map((node) => {
      const id = node.value || node.name;
      const isLeaf = !(node.values || node.children)?.length;
      const label = node.name || node.display;

      const checkInput = node.selectionType || input;

      return (
        <div key={id} style={{ marginLeft: level * 10 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {!isLeaf && (
              <button
                onClick={() => toggleExpand(id)}
                style={{
                  marginRight: 8,
                  cursor: "pointer",
                  border: "none",
                  background: "transparent",
                }}
              >
                {expandedNodes[id] ? (
                  <FontAwesomeIcon icon={faMinus} />
                ) : (
                  <FontAwesomeIcon icon={faPlus} />
                )}
              </button>
            )}
            {node.selectionType ? (
              <input
                type="checkbox"
                checked={selectedNodes[id] || false}
                onChange={() => toggleSelect(id)}
                style={{ marginRight: 8 }}
              />
            ) : (
              <input
                type={checkInput === "MULTIPLE" ? "checkbox" : "radio"}
                checked={selectedNodes[id] || false}
                onChange={() => toggleSelect(id)}
                style={{ marginRight: 8 }}
              />
            )}
            <span>{label}</span>
          </div>
          {expandedNodes[id] && !isLeaf && (
            <div>{renderTree(node.values || node.children, level + 1, checkInput)}</div>
          )}
        </div>
      );
    });
  };

  
  const addCheckedField = (nodes, selectedNodes) => {
    return nodes.map((node) => {
      const id = node.value || node.name;
      const isChecked = !!selectedNodes[id];

      const newNode = {
        ...node,
        checked: isChecked, 
      };

    
      if (node.values || node.children) {
        newNode.values = addCheckedField(node.values || node.children, selectedNodes);
      }

      return newNode;
    });
  };

  const getTreeWithChecked = () => {
    return addCheckedField(treeData, selectedNodes);
  };

 
  const handleSave = () => {
    const updatedTree = getTreeWithChecked();
    setUpdatedTree(updatedTree); 
    console.log(updatedTree)
  };

  const extractCheckedTags = (nodes, selectedNodes) => {
    let tags = [];
    nodes.forEach((node) => {
      const id = node.value || node.name;
      if (selectedNodes[id]) {
        tags.push(node.name || node.display);
      }
      if (node.values || node.children) {
        tags = tags.concat(
          extractCheckedTags(node.values || node.children, selectedNodes)
        );
      }
    });
    return tags;
  };

  const selectedTags = extractCheckedTags(data, selectedNodes);

  return (
    <div>
        <div>
        {selectedTags.map((tag, index) => (
          <span
            key={index}
            style={{
              margin: "0 8px",
              padding: "4px 8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            {tag}
        </span>
        ))}
      </div>
      <div>
        
        {renderTree(data)}
      </div>
   
      <button onClick={handleSave} style={{ marginBottom: 16 }}>
          Guardar 
        </button>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <TreeView data={treeData} />
    </div>
  );
}
