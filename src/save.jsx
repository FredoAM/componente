import React, { useState } from "react";
import { treeData } from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const TreeView = ({ data }) => {
  const [expandedNodes, setExpandedNodes] = useState({});
  const [selectedNodes, setSelectedNodes] = useState({});

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

  // Función para agregar el campo 'checked' basado en el estado actual de 'selectedNodes'
  const addCheckedField = (nodes, selectedNodes) => {
    return nodes.map((node) => {
      const id = node.value || node.name;
      const isChecked = !!selectedNodes[id];

      const newNode = {
        ...node,
        checked: isChecked, // Agrega el campo 'checked'
      };

      // Si tiene hijos, recursivamente añadir el campo 'checked'
      if (node.values || node.children) {
        newNode.values = addCheckedField(node.values || node.children, selectedNodes);
      }

      return newNode;
    });
  };

  // Generar una nueva estructura con el campo 'checked'
  const getTreeWithChecked = () => {
    return addCheckedField(treeData, selectedNodes);
  };

  // Ejemplo de uso para guardar o visualizar el árbol actualizado
  const handleSave = () => {
    const updatedTree = getTreeWithChecked();
    console.log(updatedTree); // Aquí puedes usar o guardar el nuevo árbol
  };

  return (
   <div>
     <div>
      <button onClick={handleSave} style={{ marginBottom: 16 }}>
        Guardar estado
      </button>
      {renderTree(data)}
    </div>
    <div>
      {updatedTree && updatedTree.map((data,index)=>{
        <span key={index}>
          {data.checked && data.name || data.display }
        </span>
      })}
    </div>
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
