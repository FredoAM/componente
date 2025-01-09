// import React, { useState, useEffect } from "react";
// import { treeData } from "./data";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleRight, faAngleDown, faX } from "@fortawesome/free-solid-svg-icons";
// import { Radio, Checkbox, Button } from "@chakra-ui/react";

// const Tree = ({ newData}) => {
//   const [expandedNodes, setExpandedNodes] = useState({});
//   const [selectedNodes, setSelectedNodes] = useState({});
//   const [showAll, setShowAll] = useState(false);
//   const toggleExpand = (id) => {
//     setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const toggleSelect = (id, parentId, e) => {
//     const { type } = e.target; 
  
//     setSelectedNodes((prev) => {
//       const updated = { ...prev };
  
//       if (type === "radio") {
//         Object.keys(updated).forEach((key) => {
//           if (key.startsWith(`${parentId}-`)) { 
//             updated[key] = false;
//           }
//         });
//       }
  
//       updated[id] = type === "checkbox" ? !prev[id] : true; 
//       return updated;
//     });
//   };
  
  
  
//   const generateId = (level, index) => `${level}-${index}`;

//   const renderTree = (nodes, level = 0, parentId = "", parentChecked = true) => {
//     return nodes.map((node, index) => {
//       const id = parentId ? `${parentId}-${index}` : `${level}-${index}`;
//       const noChildren = !(node.values || node.children)?.length;
//       const label = node.name || node.display;
//       const checkType = node.type || "checkbox";
  
//       const isChecked = !!selectedNodes[id];
  
//       const isDisabled = parentChecked
//         ? false 
//         : node.type === "checkbox" || node.type === "radio"; 
  
//       const showCheckbox = checkType === "checkbox" && (node.children?.length === 0 || !node.children);
  
//       return (
//         <div key={id} style={{ marginLeft: 10 }}>
//           <div style={{ display: "flex", alignItems: "center", height: 36 }}>
//             {!noChildren && (
//               <button
//                 onClick={() => toggleExpand(id)}
//                 style={{
//                   marginRight: 8,
//                   cursor: "pointer",
//                   border: "none",
//                   background: "transparent",
//                 }}
//               >
//                 {expandedNodes[id] ? (
//                   <FontAwesomeIcon icon={faAngleRight} />
//                 ) : (
//                     <FontAwesomeIcon icon={faAngleDown} />
//                 )}
//               </button>
//             )}
//             {!node.selectionType && checkType === "radio" && (
//               <Radio
//                 name={checkType === "radio" ? `grupo-radio-${parentId}` : undefined}
//                 isChecked={isChecked}
//                 _checked={{
//                     bg: "white",
//                     borderColor: "#3782bf", 
//                     _before: {
//                       content: '""',
//                       display: "block",
//                       width: "8px", 
//                       height: "8px",
//                       borderRadius: "50%", 
//                       bg: "#3782bf", 
//                       position: "absolute", 
//                     },
//                   }}
//                 onChange={(e) => toggleSelect(id, parentId, e)}
//                 style={{ marginRight: 5 }}
//                 sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
//                 isDisabled={checkType === "radio" ? !parentChecked : isDisabled}
//               />
//             )}
//             {!node.selectionType && checkType === "checkbox" && showCheckbox && ( 
//               <Checkbox
//                 isChecked={isChecked}
//                 _checked={{
//                     bg: "#3782bf",
                    
//                   }}
//                 onChange={(e) => toggleSelect(id, parentId, e)}
//                 style={{ marginRight: 5 }}
//                 isDisabled={isDisabled} 
//               />
//             )}
//             <span>{label}</span>
//           </div>
//           {!expandedNodes[id] && !noChildren && (
//             <div>
//               {renderTree(
//                 node.values || node.children,
//                 level + 1,
//                 id,
//                 checkType === "radio" ? isChecked : parentChecked 
//               )}
//             </div>
//           )}
//         </div>
//       );
//     });
//   };
  
//   const addCheckedField = (nodes, selectedNodes, parentId = "") => {
//     return nodes.map((node, index) => {
//       const id = parentId ? `${parentId}-${index}` : generateId(0, index);
//       const isChecked = !!selectedNodes[id];

//       const newNode = {
//         ...node,
//         checked: isChecked,
//       };

//       if (node.children) {
//         newNode.children = addCheckedField(node.children, selectedNodes, id);
//       } else if (node.values) {
//         newNode.values = addCheckedField(node.values, selectedNodes, id);
//       }

//       return newNode;
//     });
//   };


//   const getCheckedTree = () => {
//     return addCheckedField(newData, selectedNodes);
//   };

//   const validateSelection = (nodes) => {
//     let isValid = true; 

//     const traverse = (nodes) => {
//         nodes.forEach((node) => {
//             node.values.map((value) =>{
//                 if(value.children.length === 0 && value.type === "checkbox"){
//                     const hasChecked = node.values.some(
//                         (valu) =>
//                             valu.children.length === 0 &&
//                             valu.type === "checkbox" &&
//                             valu.checked === true
//                     );
                   
//                     if (!hasChecked) {
                        
//                         isValid = false;
//                     }
//                 }
//                 traverse(value.children && value.children)
//             })
//         });
//     };

//     traverse(nodes);
//     return isValid;
   
// };



  

//   const handleSave = () => {
    
  
    
//     const updatedTree = getCheckedTree();
//     const allValid = validateSelection(updatedTree);
    
//     if (!allValid) {
//         alert("Select checkbox")
//     } 
   
//     function removeFields(nodes) {
//       return nodes.map((node) => {
//         const { type, ...cleanedNode } = node;
  
    
//         if (node.selectionType) {
//           delete cleanedNode.checked;
//         }
  
        
//         if (node.children) {
//           cleanedNode.children = removeFields(node.children);
//         }
  
      
//         if (node.values) {
//           cleanedNode.values = removeFields(node.values);
//         }
  
//         return cleanedNode;
//       });
//     }
  
//     const cleanedTree = removeFields(updatedTree);
  
//     console.log(cleanedTree); 
//   };
  
  

//   const handleCancel = () => {
//     setSelectedNodes({}); 
//   };
  
//   const handleRemoveTag = (id) => {
//     setSelectedNodes((prev) => {
//       const updated = { ...prev };
  
     
//       const removeWithChildren = (parentId) => {
//         Object.keys(updated).forEach((key) => {
//           if (key.startsWith(parentId)) {
//             delete updated[key];
//           }
//         });
//       };
  
//       removeWithChildren(id);
//       return updated;
//     });
//   };
  
  
  

//   const checkedTags = (nodes, selectedNodes, parentId = "") => {
//     let tags = [];
//     nodes.forEach((node, index) => {
//       const id = parentId ? `${parentId}-${index}` : generateId(0, index);
//       if (selectedNodes[id]) {
//         tags.push({ name: node.name || node.display, id });
//       }
//       if (node.values || node.children) {
//         tags = tags.concat(
//           checkedTags(node.values || node.children, selectedNodes, id)
//         );
//       }
//     });
//     return tags;
//   };
  

//   const selectedTags = checkedTags(newData, selectedNodes);
//   const visibleTags = showAll ? selectedTags : selectedTags.slice(0, 5);
//   const hiddenCount = selectedTags.length - 5;

//   return (
//     <div>
//       <div>
//       {visibleTags.map((tag) => (
//         <span
//             key={tag.id}
//             style={{
//             margin: "0 8px",
//             padding: "8px 15px",
//             border: "1px solid #ccc",
//             borderRadius: "5px",
//             backgroundColor: "#3782bf",
//             color: "#fff",
//             }}
//         >
//             {tag.name}
//             <FontAwesomeIcon
//             icon={faX}
//             style={{
//                 marginLeft: "10px",
//                 fontSize: "13px",
//                 cursor: "pointer",
//             }}
//             onClick={() => handleRemoveTag(tag.id)}
//             />
//         </span>
//         ))}

//       {!showAll && hiddenCount > 0 && (
//         <span
//           onClick={() => setShowAll(true)} 
//           style={{
//             margin: "0 8px",
//             padding: "8px 15px",
//             color: "#3782bf",
//             cursor: "pointer",
//             fontWeight: "bold",
//             fontSize: "18px",
//           }}
//         >
//           +{hiddenCount} More
//         </span>
//       )}
//       {showAll && selectedTags.length > 5 && (
//         <span
//           onClick={() => setShowAll(false)} 
//           style={{
//             margin: "0 8px",
//             padding: "8px 15px",
//             color: "#3782bf",
//             cursor: "pointer",
//             fontWeight: "bold",
//             fontSize: "18px",
//           }}
//         >
//           Show Less
//         </span>
//       )}
//     </div>
//       <div style={{ marginBottom: 56, marginTop :50 }}>{renderTree(newData)}</div>
//       <div style={{ display: "flex", justifyContent: "right" }}>
//       <div onClick={handleCancel} style={{
//             margin: "0 8px",
//             padding: "8px 5px",
//             color: "#3782bf",
//             cursor: "pointer",
//           }}>
//         Cancel
//       </div>
//       <Button onClick={handleSave} style={{
//             margin: "0 8px",
//             padding: "8px 15px",
//             border: "1px solid #ccc",
//             borderRadius: "15px",
//             backgroundColor: "#3782bf",
//             color: "#fff",
//             cursor: "pointer",
//           }}>
//         Apply
//       </Button>
//       </div>
//     </div>
//   );
// };

// export default function Test() {
//   const [newData, setNewData] = useState(treeData);

//   useEffect(() => {
//     const addNewField = (nodes) => {
//       return nodes.map((node) => {
//         if (node.values) {
//           node.values = node.values.map((value) => {
//             value.checked = false;
//             value.type = node.selectionType === "MULTIPLE" ? "checkbox" : "radio";
//             addNewField(value.children);
//             return value;
//           });
//         }
//         return node;
//       });
//     };

//     const updatedData = addNewField(treeData);
//     setNewData(updatedData);
//   }, []);

//   return (
//     <div>
//       {newData && (
//         <>
//           <Tree newData={newData} setNewData={setNewData}/>
//         </>
//       )}
//     </div>
//   );
// }
