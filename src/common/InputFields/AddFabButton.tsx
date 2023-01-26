import React from 'react'
import './AddFabButton.css'
function AddFabButton({action}:any) {
  return <button className="add-fab-button" onClick={()=>{action("NO-ID",true)}}>+</button>
}
export function BackFabButton({action}:any) {
  return <button className="add-fab-button" onClick={()=>{action("NO-ID",true)}}>{"<-"}</button>
}
export default AddFabButton
