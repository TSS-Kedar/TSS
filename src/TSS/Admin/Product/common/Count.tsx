import React, { useCallback,useState,useEffect } from 'react'
import './count.css'
import { FlatInput } from '../../../../common/InputFields/Input'
import { SelectInput } from '../../../../common/InputFields/Select'
const typeoption = [{ 'key': 's', 'value': 'Single' }, { 'key': '2', 'value': 'Double' }]
function TextileCount({currdoc,modifydoc,wd}: any) {
    const [open, setOpen] = useState(false)
    const [selectedCount, setCount] = useState("0")
    const [selectedType, setType] = useState({type:""})
    const count = 200

    const setType_m = useCallback((data) => {setType(data) },
      [],
    )
     
useEffect(() => {
    let count = currdoc?.count
  if(count?.includes("s")){
    setType({type:"s"})
    count = count.substring(0, (count.length-1))
    setCount(count)
  }else if(count?.includes("/2")){
    setType({type:"2"})
    count = count.substring(0, (count.length-2))
    setCount(count)
  }

  
}, [currdoc?.count])

    const getCount=()=>{
        const arrCount = []; 
        for (let i = 1; i <= 200; i++) {
            if(i===parseInt(selectedCount)){
            arrCount.push(
                <div className={"count-div count-div-active"}>{i}</div>
            )}else{
                arrCount.push(
                    <div className={"count-div"} onClick={()=>setCount(i)}>{i}</div>
                ) 
            }
        }
        return arrCount
    }
   const confirm=()=>{
    const newDoc = {...currdoc} 
    if(selectedType.type==="s"){newDoc["count"] = selectedCount+selectedType.type}
    else{newDoc["count"] = selectedCount+"/"+selectedType.type}
    modifydoc(newDoc)
    setOpen(!open)
    }
    return (
        <>
        <FlatInput wd={wd} label="Count" name="count" currdoc={currdoc} section={"count"} modifydoc={modifydoc} onclick={setOpen}/>
        {open?<div className="textile-modal-container">
            <div className="center">
                
                <div className="content">
                    <div className="header">
                        <h3>{"Count"}</h3>
                        <label htmlFor="click" className="fas fa-times" onClick={()=>setOpen(!open)}></label>
                    </div>
                    <div className={"count-container"}>{getCount()}</div>

                    {/* <label htmlFor="click" className="fas fa-check"></label> */}
                    {/* <p>{dailogtext}</p>
                    <p>{dailogtext}</p>
                    */}

                    <div className="line"></div>
                    
                    <div className="row" style={{padding:"5px 0 5px 5px"}}>
                    <SelectInput wd={wd} label="Type" options={typeoption} name="type" currdoc={selectedType} section={'type'} modifydoc={setType_m} />
                    </div>
                    {/* <label htmlFor="click" className="close-btn">close</label> */}
                    <div className="modal-buttons-section" >
                    <div className="modal-button" onClick={()=>setOpen(!open)}><span>Cancel</span></div>
                    <div className="modal-button confirm" onClick={()=>confirm()}><span>Confirm</span></div>
                    </div>


                </div>
            </div>
        </div>:<></>}
        </>
    )

    

}

export default React.memo(TextileCount)