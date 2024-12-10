import React, { useState } from "react";
import { treeData } from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const TreeView = ({ treeData }) => {
   
    let testo = [...treeData];
  
    const aver = (nodes) => {
      nodes.forEach((node) => {
       
        if (node.checked === undefined) {
          node.checked = false;
        }
  
        const children = node.values || node.children;
  
       
        if (children) {
          aver(children);
        }
      });
    };
  
   
    aver(testo);
  
 
    return <pre>{JSON.stringify(testo, null, 2)}</pre>;
  };
  

export default function Testo() {

    


  return (
    <div>
      {/* <pre>{JSON.stringify(treeData, null, 2)}</pre> */}
    <TreeView treeData={treeData}/>  
      
    </div>
  );
}
