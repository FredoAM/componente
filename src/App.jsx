import React, { useState, useEffect } from "react";
import { treeData } from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleDown, faX } from "@fortawesome/free-solid-svg-icons";
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';

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
  
  
  
  const generateId = (level, index) => `${level}-${index}`;

  const renderTree = (nodes, level = 0, parentId = "", parentChecked = true) => {
    return nodes.map((node, index) => {
      const id = parentId ? `${parentId}-${index}` : `${level}-${index}`;
      const noChildren = !(node.values || node.children)?.length;
      const label = node.name || node.display;
      const checkType = node.type || "checkbox";
  
      const isChecked = !!selectedNodes[id];
  
      const isDisabled = parentChecked
        ? false 
        : node.type === "checkbox" || node.type === "radio"; 
  
      const showCheckbox = checkType === "checkbox" && (node.children?.length === 0 || !node.children);
  
      return (
        <div key={id} style={{ marginLeft: 10 }}>
          <div style={{ display: "flex", alignItems: "center", height: 36 }}>
            {!noChildren && (
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
                  <FontAwesomeIcon icon={faAngleRight} />
                ) : (
                    <FontAwesomeIcon icon={faAngleDown} />
                )}
              </button>
            )}
            {!node.selectionType && checkType === "radio" && (
              <Radio
                name={checkType === "radio" ? `grupo-radio-${parentId}` : undefined}
                checked={isChecked}
                onChange={(e) => toggleSelect(id, parentId, e)}
                style={{ marginRight: 5 }}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                disabled={checkType === "radio" ? !parentChecked : isDisabled}
              />
            )}
            {!node.selectionType && checkType === "checkbox" && showCheckbox && ( 
              <Checkbox
                checked={isChecked}
                onChange={(e) => toggleSelect(id, parentId, e)}
                style={{ marginRight: 5 }}
                disabled={isDisabled} 
              />
            )}
            <span>{label}</span>
          </div>
          {!expandedNodes[id] && !noChildren && (
            <div>
              {renderTree(
                node.values || node.children,
                level + 1,
                id,
                checkType === "radio" ? isChecked : parentChecked 
              )}
            </div>
          )}
        </div>
      );
    });
  };
  
  const handleSave = () => {
    console.log(newData);
  };

  const handleCancel = () => {
    setSelectedNodes({}); 
  };
  
  const handleRemoveTag = (id) => {
    setSelectedNodes((prev) => {
      const updated = { ...prev };
      delete updated[id]; 
      return updated;
    });
  };
  

  const checkedTags = (nodes, selectedNodes, parentId = "") => {
    let tags = [];
    nodes.forEach((node, index) => {
      const id = parentId ? `${parentId}-${index}` : generateId(0, index);
      if (selectedNodes[id]) {
        tags.push(node.name || node.display);
      }
      if (node.values || node.children) {
        tags = tags.concat(
          checkedTags(node.values || node.children, selectedNodes, id)
        );
      }
    });
    return tags;
  };

  const selectedTags = checkedTags(newData, selectedNodes);
  const visibleTags = showAll ? selectedTags : selectedTags.slice(0, 5);
  const hiddenCount = selectedTags.length - 5;

  return (
    <div>
      <div>
      {visibleTags.map((tag, index) => (
        <span
          key={index}
          style={{
            margin: "0 8px",
            padding: "8px 15px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#3782bf",
            color: "#fff",
          }}
        >
          {tag}
          <FontAwesomeIcon
            icon={faX}
            style={{
              marginLeft: "10px",
              fontSize: "13px",
              cursor: "pointer",
            }}
            onClick={() => handleRemoveTag(Object.keys(selectedNodes)[index])}
          />
        </span>
      ))}

      {!showAll && hiddenCount > 0 && (
        <span
          onClick={() => setShowAll(true)} 
          style={{
            margin: "0 8px",
            padding: "8px 15px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#eee",
            color: "#000",
            cursor: "pointer",
          }}
        >
          +{hiddenCount} More
        </span>
      )}
      {showAll && selectedTags.length > 5 && (
        <span
          onClick={() => setShowAll(false)} 
          style={{
            margin: "0 8px",
            padding: "8px 15px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#eee",
            color: "#000",
            cursor: "pointer",
          }}
        >
          Show Less
        </span>
      )}
    </div>
      <div style={{ marginBottom: 56, marginTop :50 }}>{renderTree(newData)}</div>
      <div style={{ display: "flex", justifyContent: "right" }}>
      <div onClick={handleCancel} style={{
            margin: "0 8px",
            padding: "8px 5px",
            color: "#3782bf",
            cursor: "pointer",
          }}>
        Cancel
      </div>
      <button onClick={handleSave} style={{
            margin: "0 8px",
            padding: "8px 15px",
            border: "1px solid #ccc",
            borderRadius: "15px",
            backgroundColor: "#3782bf",
            color: "#fff",
            cursor: "pointer",
          }}>
        Apply
      </button>
      </div>
    </div>
  );
};

export default function App() {
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
      {newData && (
        <>
          <Tree newData={newData} setNewData={setNewData} />
        </>
      )}
    </div>
  );
}
