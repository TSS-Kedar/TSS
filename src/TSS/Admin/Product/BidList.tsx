import React,{useEffect,useState} from 'react'
import { execGql, execGql_xx } from '../../../common/gqlclientconfig';
import requirementQuery from '../../../common/queries/requirementQuery'
import bidQuery from '../../../common/queries/bidQuery'
import Table from '../../../common/table/Table';
import Column from '../../../common/table/Column';
import { FlatInput } from '../../../common/InputFields/Input';
import Yarntype from './common/Yarntype';
import CottonComponent from './CottonComponent';
import SyntheticComponent from './SyntheticComponent';
import ViscoseComponent from './ViscoseComponent';
import FancyComponent from './FancyComponent';
import BlendsComponent from './BlendsComponent';
import Deliveryperiod from './common/Deliveryperiod';
import CSP from './common/CSP';
import { Checkbox } from '../../../common/InputFields/Checkbox';

async function getBid(values: any) {
    var result: any = '', errorMessage = '', errors = new Array();
    try {
      result = await execGql('query', bidQuery, values)
      if (!result) {
        console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
        return [];
        // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
      }
      else {
        //return result.data;
        console.log(result.data)
        return result.data.bids;
      }
    }
    catch (err: any) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      console.log({ "errors": errors, "errorMessage": errorMessage })
      // return callback({"errors":errors,"errorMessage":errorMessage},'' );
    }
  }
  async function getRequirement(values: any) {
    var result: any = '', errorMessage = '', errors = new Array();
    try {
      result = await execGql('query', requirementQuery, values)
      if (!result) {
        console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
        return [];
        // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
      }
      else {
        //return result.data;
        return result.data.requirements;
      }
  
    }
    catch (err: any) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      console.log({ "errors": errors, "errorMessage": errorMessage })
      // return callback({"errors":errors,"errorMessage":errorMessage},'' );
    }
  
  }
export const BidList = (props:any) => {
    const [currentdocument, modifydocument] = useState({})
    const [loaderDisplay, setloaderDisplay] = useState(false)
    useEffect(() => {
        console.log(props.authenticated)
        
        let z_id = new URLSearchParams(window.location.search).get("z_id")
        let code = new URLSearchParams(window.location.search).get("code")
        let currdoc:any = {...currentdocument}
        currdoc['supid']=code
        
        if (z_id != 'NO-ID') {
          setloaderDisplay(true)
          
          getRequirement({ client: '45004500', lang: 'EN', z_id,applicationid:"15001500" }).then((data: any) => {
            currdoc = {...currdoc,...data[0]}

            modifydocument(currdoc)
            
            //setloaderDisplay(false)
            getBid({ client: '45004500', lang: 'EN', z_id:"",applicationid:"15001500",supid:code,reqid:data[0].reqid }).then((data1: any) => {
            
              if(data1[0]){
                currdoc = {...currdoc,biddata:data1}
                modifydocument(currdoc)
            }
          });
          
          setloaderDisplay(false)
          });
        }
        if (z_id == 'NO-ID') {
        //   let newdoc=newDocument(doctype, doctypetext)
        //   newdoc.buyid=props.authuser.username;
        //     modifydocument(newdoc);
    
        }
  
  
  
      }, []);
      console.log("Kedar",currentdocument)
      let buyerComp;
      let disabled = true
    //if (props.authuser.userauthorisations=='Buyer') {
      buyerComp = <FlatInput wd="3" label="Buyer" name="buyid" currdoc={currentdocument} section={'buyid'} modifydoc={modifydocument} disabled={disabled}/>;
   // }
    
  return (
    <div className="container">
        <div className="grid">
        <div className="row">
            <FlatInput wd="3" label="Requirement Id" name="reqid" currdoc={currentdocument} section={'reqid'} modifydoc={modifydocument} disabled={true}/>
            {buyerComp}
            <div className={"col-6"}></div>
          </div>
          <div className="row">
            <Yarntype wd="3" currdoc={currentdocument} modifydoc={modifydocument}  disabled={disabled}/>
          </div>
        </div>
        {currentdocument.yarntype === "Cotton" && <CottonComponent currdoc={currentdocument} modifydoc={modifydocument} disabled={disabled}/>}
        {currentdocument.yarntype === "Synthetic" && <SyntheticComponent currdoc={currentdocument} modifydoc={modifydocument} disabled={disabled}/>}
        {currentdocument.yarntype === "Viscose" && <ViscoseComponent currdoc={currentdocument} modifydoc={modifydocument} disabled={disabled}/>}
        {currentdocument.yarntype === "Fancy" && <FancyComponent currdoc={currentdocument} modifydoc={modifydocument} disabled={disabled}/>}
        {currentdocument.yarntype === "Blends" && <BlendsComponent currdoc={currentdocument} modifydoc={modifydocument} disabled={disabled}/>}
        <div className="grid">
          <div className="row">
            <Deliveryperiod wd="3" currdoc={currentdocument} modifydoc={modifydocument} disabled={disabled}/>
            <FlatInput wd="3" label="Required Qty" name="reqqty" currdoc={currentdocument} section={'reqqty'} modifydoc={modifydocument} disabled={disabled}/>

            <CSP wd="3" currdoc={currentdocument} modifydoc={modifydocument} disabled={disabled}/>
            <div className={"col-3"}></div>
          </div>
          <div className="row">
            <FlatInput wd="3" label="Target Price" name="targetprice" currdoc={currentdocument} section={'targetprice'} modifydoc={modifydocument} disabled={disabled}/>
            <Checkbox wd="3" label={"Test Report"} name={"restreportreq"} currdoc={currentdocument} section={"restreportreq"} modifydoc={modifydocument} disabled={disabled}/>
            <div className={"col-6"}></div>
          </div>
          <div className="row">
            <FlatInput wd="12" label="Target Mills" name="targetmills" currdoc={currentdocument} section={'targetmills'} modifydoc={modifydocument} disabled={disabled}/>
          </div>
        </div>
        <Table
                 data={currentdocument.biddata?currentdocument.biddata:[]}
                 defaultNoOfRows={10}
                 actionColWidth={80}
                 headerText="Products"
                  addNew={()=>{}}
                  onRowClick={()=>{}}
                  actions={[
                    {
                        action: (id: any) => {                         
                        },
                        icon: 'fas fa-thumbs-up',
                        text: 'Edit',
                        className: 'table-button submit',
                        fieldname:"apprstatus"
                      }
                  ]}
                 
               >
                 <Column fieldname="supid" columnname="Supplier Id"></Column>
                 {/* <Column fieldname="reqid" columnname="Request Id"></Column> */}
                 <Column fieldname="amount1" columnname="Amount with transportation"></Column>
                 <Column fieldname="amount2" columnname="Amount without transportation"></Column>
                 <Column fieldname="supremark" columnname="Supplier remark"></Column>
               </Table>
    </div>
  )
}

export default BidList