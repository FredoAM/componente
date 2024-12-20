import React, { useState } from "react";
import { treeData } from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const Tree = ({ data }) => {
  const [expandedNodes, setExpandedNodes] = useState({});
  const [selectedNodes, setSelectedNodes] = useState({});
  const [updatedTree, setUpdatedTree] = useState([]);

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

  const renderTree = (nodes, level = 0, input = "MULTIPLE", parentId = "") => {
    return nodes.map((node, index) => {
      const id = parentId ? `${parentId}-${index}` : `${level}-${index}`;
      const noChildren = !(node.values || node.children)?.length;
      const label = node.name || node.display;

      const checkInput = node.selectionType || input;

      // Verificar si el nodo padre (radio button) está seleccionado
      const isParentChecked =
        selectedNodes[parentId] === undefined || selectedNodes[parentId];

      return (
        <div key={id} style={{ marginLeft: level * 10 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
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
                  <FontAwesomeIcon icon={faMinus} />
                ) : (
                  <FontAwesomeIcon icon={faPlus} />
                )}
              </button>
            )}
            {!node.selectionType && (
              <input
                type={checkInput === "MULTIPLE" ? "checkbox" : "radio"}
                name={checkInput !== "MULTIPLE" ? `grupo-radio-${parentId}` : undefined}
                checked={!!selectedNodes[id]}
                onChange={(e) => toggleSelect(id, parentId, e)}
                style={{ marginRight: 8 }}
                disabled={!isParentChecked} // Deshabilitar si el nodo padre no está seleccionado
              />
            )}
            <span>{label}</span>
          </div>
          {!expandedNodes[id] && !noChildren && (
            <div>
              {renderTree(
                node.values || node.children,
                level + 1,
                checkInput,
                id
              )}
            </div>
          )}
        </div>
      );
    });
  };

  const addCheckedField = (nodes, selectedNodes, parentId = "") => {
    return nodes.map((node, index) => {
      const id = parentId ? `${parentId}-${index}` : generateId(0, index);
      const isChecked = !!selectedNodes[id];

      const newNode = {
        ...node,
        checked: isChecked,
      };

      if (node.children) {
        newNode.children = addCheckedField(node.children, selectedNodes, id);
      } else if (node.values) {
        newNode.values = addCheckedField(node.values, selectedNodes, id);
      }

      return newNode;
    });
  };

  const getCheckedTree = () => {
    return addCheckedField(data, selectedNodes);
  };

  const handleSave = () => {
    const updatedTree = getCheckedTree();
    setUpdatedTree(updatedTree);
    console.log(updatedTree);
  };

  const handleCancel = () => {
    setSelectedNodes({});
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

  const selectedTags = checkedTags(data, selectedNodes);

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
      <div style={{ marginBottom: 56, marginTop: 50 }}>{renderTree(data)}</div>
      <button onClick={handleCancel} style={{ marginRight: 50 }}>
        Cancel
      </button>
      <button onClick={handleSave} style={{ marginBottom: 16 }}>
        Save
      </button>
    </div>
  );
};

export default function Testp() {
  return (
    <div>
      <Tree data={treeData} />
    </div>
  );
}