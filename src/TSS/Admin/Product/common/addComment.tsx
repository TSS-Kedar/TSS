import React, { useCallback,useState,useEffect } from 'react'
import './addcomment.css'
import { FlatInput } from '../../../../common/InputFields/Input'
import { SelectInput } from '../../../../common/InputFields/Select'
import {
    runCheck, requiredCheck, getDtFormat, getTimeFormat, getFromToDate, getDateYYYYMMDDHHMI, getDateYYYYMMDD, maxLength40, maxLength128,
    setErrorValue, getValue, setValue,emailCheck,numberCheck
  } from '../../../../common/validationlib';
  import { getDocs, getDocconfig, getLblVal, checkTouched, nvl, checkItem, isCheckedbool, getDocumenForSave } from '../../../../common/CommonLogic';
  import {
     getErrorValue, getErrorValueN, setCalValue
  } from '../../../../common/validationlib';
const typeoption = [{ 'key': 's', 'value': 'Single' }, { 'key': '2', 'value': 'Double' }]
function AddComment({currdoc,modifydoc,wd,disabled,open,toggleComment}: any) {
    //const [open, setOpen] = useState(false)
    const [selectedCount, setCount] = useState("0")
    const [selectedType, setType] = useState({type:""})
    const count = 200

    const setType_m = useCallback((data) => {setType(data) },
      [],
    )
     
useEffect(() => {
   

  
}, [])

    
    const handleSaveCheck=(doc:any)=>{
        const newDoc:any = {...doc} 
    
    let type_check = runCheck(nvl(selectedType.type, ''), [requiredCheck]);
    let selectedCount_check = runCheck(nvl(selectedCount==="0"?"":selectedCount, ''), [requiredCheck]);
    newDoc.errorsAll = {
        type: type_check,
        selectedCount: selectedCount_check
    }
   
    return newDoc
    }
   const confirm=()=>{
    const currdoc1:any = {...currdoc}
    
    const selectedType1:any = handleSaveCheck(selectedType)
    let isSaveOk = !Object.keys(selectedType1.errorsAll).some((x: any) => selectedType1.errorsAll[x]);
    if(isSaveOk){
    if(selectedType.type==="s"){currdoc1["count"] = selectedCount+selectedType.type}
    else{currdoc1["count"] = selectedCount+"/"+selectedType.type}
    modifydoc(currdoc1)
    //setOpen(!open)
    }else{
        setType(selectedType1)
    }
    }
    let currentdocument1 = handleSaveCheck(selectedType);
    const errorMsg = getErrorValueN(currentdocument1, 'errorsAll.' + 'selectedCount')
   
    return (
        <>
        
        {open?<div className="textile-modal-container">
            <div className="center">
                
                <div className="comment-content">
                    <div className="header">
                        <h3>{"Add Comment"}</h3>
                        <label htmlFor="click" className="fas fa-times" onClick={()=>toggleComment(false)}></label>
                    </div>
                    <textarea rows={4} style={{display:"inline-block",width:"100%",padding:"1rem",fontSize:"1.3rem"}} placeholder="Add some comments"/>

                    <div className="line"></div>
                    
                    
                    {/* <label htmlFor="click" className="close-btn">close</label> */}
                    <div className="modal-buttons-section" >
                    <div className="modal-button" onClick={()=>toggleComment(false)}><span>Cancel</span></div>
                    <div className="modal-button confirm" onClick={()=>confirm()}><span>Confirm</span></div>
                    </div>


                </div>
            </div>
        </div>:<></>}
        </>
    )

    

}

export default React.memo(AddComment)