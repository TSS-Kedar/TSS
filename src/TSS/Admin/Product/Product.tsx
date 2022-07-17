import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { FlatInput } from "../../../common/InputFields/Input"
import Loader from '../../../common/Loader/Loader'
import BlendsComponent from './BlendsComponent'
import Yarntype from './common/Yarntype'
import CottonComponent from './CottonComponent'
import FancyComponent from './FancyComponent'
import SyntheticComponent from './SyntheticComponent'
import ViscoseComponent from './ViscoseComponent'


export const Product = (props:any) => {
    const [currentdocument, modifydocument] = useState({yarntype:"",count:"100s"})
    useEffect(() => {
      const newDoc={...currentdocument} 
      const tempdoc = {yarntype:newDoc.yarntype,count:"100s"}
      modifydocument(tempdoc)
    },[currentdocument.yarntype]);
    
    
  return (
    <>
     <div className="container">
     <Loader display={false}/>
              
                  <div className="grid">
                    <div className="row">
                    <Yarntype wd="3"  currdoc={currentdocument}  modifydoc={modifydocument}/>
                    </div>
                  </div>
                  {currentdocument.yarntype ==="Cotton" && <CottonComponent currdoc={currentdocument}  modifydoc={modifydocument}/>}
        {currentdocument.yarntype ==="Synthetic" && <SyntheticComponent currdoc={currentdocument}  modifydoc={modifydocument}/>}
        {currentdocument.yarntype ==="Viscose" && <ViscoseComponent currdoc={currentdocument}  modifydoc={modifydocument}/>}
        {currentdocument.yarntype ==="Fancy" && <FancyComponent currdoc={currentdocument}  modifydoc={modifydocument}/>}
        {currentdocument.yarntype ==="Blends" &&<BlendsComponent currdoc={currentdocument}  modifydoc={modifydocument}/>}
             {JSON.stringify(currentdocument)} 
              <button type="button" onClick={()=>{console.log(currentdocument)}}>Submit</button>:<></>
          </div>
    
       
        
    </>
    
  )
}

const mapStateToProps = (state:any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Product)