import { useState, useEffect, useMemo, useRef } from 'react'
import DatePicker from '../../common/DatePicker'
import { FlatInput } from '../../common/InputFields/Input'
import { SelectInput } from '../../common/InputFields/Select'
import { SearchSelectInput } from '../../common/InputFields/SearchSelect'
import * as doctypes from '../../common/Doctypes';
import { getDocs, getDocconfig, getLblVal, checkTouched, nvl, checkItem, isCheckedbool, getDocumenForSave } from '../../common/CommonLogic';
import useSaveAction from '../../common/Hooks/useSaveAction'
//import { handleDelete, getSuppliers, handleSave,handlesendSupplierNotification } from './CrudSupplier'
import Messagesnackbar from '../../common/Alert'
import AlertDialog from '../../common/PopupModals/ConfirmationModal'
import {
  runCheck, requiredCheck, getDtFormat, getTimeFormat, getFromToDate, getDateYYYYMMDDHHMI, getDateYYYYMMDD, maxLength40, maxLength128,
  setErrorValue, getValue, setValue
} from '../../common/validationlib';
import { Redirect, withRouter } from 'react-router-dom'
import AppbarBottom from '../../common/AppbarBottom'
import { initDocumentstatus } from '../../common/constant'
import { fetchStocks, addstocks } from '../Redux/ActionCreators'
import { connect } from 'react-redux';
import * as ActionTypes from '../Redux/ActionTypes'
import Loader from '../../common/Loader/Loader'
//import deleteGQL from '../../common/mutations/DeleteSupplier'
import { FileuploadComponent } from '../../common/FileuploadComponent'
import { OnlineFileuploadComponent } from '../../common/OnlineFileuploadComponent'
import shortid from 'shortid'
import Stepper from '../../common/Stepper/Stepper'
import Step from '../../common/Stepper/Step'
const newDocument = (doctype: String, doctypetext: String) => {
  return {
    doctype,
    doctypetext,
    status: 'active',
    validatemode: 'touch',
    uploadfiles: [],
    onlineuploadfiles: [],
    t_id: shortid.generate()
  }
};





export const handleSaveCheck = (currentdocument: any) => {
  const { touched, name, recodate, cmp, addupto, sl, target1, target2, weightage, timeframe, validatemode } = currentdocument;


  console.log('nvl(target1, )', runCheck(nvl(target1, ''), [requiredCheck]))

  let name_check = runCheck(nvl(name, ''), [requiredCheck]);
  let recodate_check = runCheck(nvl(recodate, ''), [requiredCheck]);
  let cmp_check = runCheck(nvl(cmp, ''), [requiredCheck]);
  let addupto_check = runCheck(nvl(addupto, ''), [requiredCheck]);
  let sl_check = runCheck(nvl(sl, ''), [requiredCheck]);
  let target1_check = runCheck(nvl(target1, ''), [requiredCheck]);
  let target2_check = runCheck(nvl(target2, ''), [requiredCheck])
  let weightage_check = runCheck(nvl(weightage, ''), [requiredCheck]);
  let timeframe_check = runCheck(nvl(timeframe, ''), [requiredCheck]);
  console.log('currentdocument.errorsAll', currentdocument.errorsAll)
  if (validatemode == 'save') {
    currentdocument.errorsAll = {
      name: name_check,
      recodate: recodate_check,
      cmp: cmp_check,
      addupto: addupto_check,
      sl: sl_check,
      target1: target1_check,
      target2: target2_check,
      weightage: weightage_check,
      timeframe: timeframe_check,
    }
    validatemode == 'touch'
  }
  if (validatemode == 'touch' && touched != null) {
    currentdocument.errorsAll = {
      name: checkTouched(nvl(touched.name, false), name_check),
      recodate: checkTouched(nvl(touched.recodate, false), recodate_check),
      cmp: checkTouched(nvl(touched.cmp, false), cmp_check),
      addupto: checkTouched(nvl(touched.addupto, false), addupto_check),
      sl: checkTouched(nvl(touched.sl, false), sl_check),
      target1: checkTouched(nvl(touched.target1, false), target1_check),
      target2: checkTouched(nvl(touched.target2, false), target2_check),
      weightage: checkTouched(nvl(touched.weightage, false), weightage_check),
      timeframe: checkTouched(nvl(touched.timeframe, false), timeframe_check),
    }
  }


  return currentdocument;
}

const timeframeoptions = [{ 'key': '0', 'value': '0' },
{ 'key': '1', 'value': '1' },
{ 'key': '3', 'value': '3' },
{ 'key': '6', 'value': '6' },
{ 'key': '12', 'value': '12' },
{ 'key': '12|18', 'value': '12|18' },
{ 'key': '12|24', 'value': '12|24' },
{ 'key': '3|6', 'value': '3|6' },
{ 'key': '3|6|9', 'value': '3|6|9' },
{ 'key': '3|6|9|12', 'value': '3|6|9|12' },
{ 'key': '3|9', 'value': '3|9' },
{ 'key': '6|24', 'value': '6|24' }
]

export const SupplierComponent = (props: any) => {
  const compinp: any = useRef(0)
  const doctype = doctypes.SUPPLIER;
  const doctypetext = 'Supplier';
  const resetFocus = () => {
    setTimeout(() => compinp.current.focus(), 1000)
  }
  const [setDocumentAction, documentstatus, setDocumentstatus, currentdocument, modifydocument, redirect, goBack, closeSnackBar, loaderDisplay, setloaderDisplay]: any = useSaveAction(() => { }, handleSaveCheck, doctype, doctypetext, resetFocus, {})
  const [stocklist, setstocklist] = useState([])
  const [contactList, setContactList] = useState([{contactName:"", phoneNo:"", email:""}])
  const addNewcontact=()=>{
    const contact_arr=[...contactList];
    contact_arr.push({contactName:"", phoneNo:"", email:""})
    setContactList(contact_arr)
  }

  //   useEffect(() => {
  //     let z_id = new URLSearchParams(props.location.search).get("z_id")
  //     compinp.current.focus()
  //     if (z_id != 'NO-ID') {
  //       setloaderDisplay(true)
  //     //   getSuppliers({ applicationid: '15001500', client: '45004500', lang: 'EN', z_id }).then((data: any) => {
  //     //     modifydocument(data[0])
  //     //     setloaderDisplay(false)
  //     //   });
  //     }
  //     if (z_id == 'NO-ID') {
  //       modifydocument(newDocument(doctype, doctypetext));
  //     }
  //   }, [])
  //   const getStockcmp = () => {
  //     setloaderDisplay(true); compinp.current.focus()
  //     fetchStocks({},
  //       (err: any, result: any): any => {
  //         if (err == '') { console.log(result); props.addstocks(result); setloaderDisplay(false) }
  //         else { console.log(err, result) }
  //       })
  //   }

  const { action, yesaction, noaction, dailogtext, dailogtitle } = documentstatus;
  if (stocklist && props?.stocks && stocklist?.length !== props?.stocks?.length) {
    setstocklist(props.stocks.map((el: any) => { return { value: el.name, label: el.name } }));
  }




  const M_stocklist = useMemo(() => stocklist, [stocklist])
  if (redirect) {
    let redirectpath = '/Suppliers'
    return <Redirect push to={redirectpath} />;
  } else {



    let currentdocument1 = handleSaveCheck(currentdocument);

    return (
      <>
        <Loader display={loaderDisplay} />
        <Stepper>
          <Step name={"Step 1"} title="Basic Profile">
            <div className="grid">
              <div className="row">
                <FlatInput wd="3" label="First Name" name="fname" currdoc={currentdocument1} section={'fname'} modifydoc={modifydocument} />
                <FlatInput wd="3" label="Last Name" name="lname" currdoc={currentdocument1} section={'lname'} modifydoc={modifydocument} />
                <div className={"col-3"}></div>
                <div className={"col-3"}></div>
              </div>
              <div className="row">
                <SelectInput wd="3" label="Country" options={timeframeoptions} name="country" currdoc={currentdocument1} section={'country'} modifydoc={modifydocument} />
                <SelectInput wd="3" label="City" options={timeframeoptions} name="city" currdoc={currentdocument1} section={'city'} modifydoc={modifydocument} />
                <SelectInput wd="3" label="In business Since" options={timeframeoptions} name="inbusiness" currdoc={currentdocument1} section={'inbusiness'} modifydoc={modifydocument} />
                <div className={"col-3"}></div>
              </div>
              <div className="row">
                <FlatInput wd="3" label="Email" name="email" currdoc={currentdocument1} section={'email'} modifydoc={modifydocument} />
                <FlatInput wd="3" label="Primary number" name="primarynumber" currdoc={currentdocument1} section={'primarynumber'} modifydoc={modifydocument} />
                <FlatInput wd="3" label="Website" name="website" currdoc={currentdocument1} section={'website'} modifydoc={modifydocument} />
                <div className={"col-3"}></div>
              </div>
              {contactList.map((contact, i) => 
                (<div className="row" key={i+""}>
                  <FlatInput wd="3" label="Email1" name="email" currdoc={currentdocument1} section={'email'} modifydoc={modifydocument} />
                  <FlatInput wd="3" label="Primary number1" name="primarynumber" currdoc={currentdocument1} section={'primarynumber'} modifydoc={modifydocument} />
                  <FlatInput wd="3" label="Website1" name="website" currdoc={currentdocument1} section={'website'} modifydoc={modifydocument} />
                  <div className={"col-3"}><div onClick={()=>{addNewcontact()}}>+</div></div>
                </div>)
              )}

              {/* <div className="row">
              <OnlineFileuploadComponent
                section={'reffiles'}
                autoupload={true}
               
                saveasis={() => {  }}
                currdoc={currentdocument1}
                modifydoc={modifydocument}
              />

            </div> */}
            </div>
          </Step>
          <Step name={"Step 2"} title="Business Details">
            <div className="grid">
              <div className="row">
                <FlatInput wd="3" label="Company Name" name="companyname" currdoc={currentdocument1} section={'companyname'} modifydoc={modifydocument} />
                <FlatInput wd="3" label="Account Type" name="accounttype" currdoc={currentdocument1} section={'accounttype'} modifydoc={modifydocument} />
                <SearchSelectInput inpref={compinp} wd="3" label="" options={timeframeoptions} name="name" currdoc={currentdocument1} section={'name'} modifydoc={modifydocument} refresh={()=>{}} isMulti={true}/>
                <FlatInput wd="3" label="Edit Category" name="editcategory" currdoc={currentdocument1} section={'editcategory'} modifydoc={modifydocument} />
                <div className={"col-3"}></div>
              </div>
              <div className="row">
                <FlatInput wd="6" label="Address" name="address" currdoc={currentdocument1} section={'address'} modifydoc={modifydocument} />
              </div>
              <div className="row">
                <FlatInput wd="12" label="Complete Address" name="completeaddress" currdoc={currentdocument1} section={'completeaddress'} modifydoc={modifydocument} />
              </div>
              <div className="row">
                <FlatInput wd="3" label="GST Number" name="gstnumber" currdoc={currentdocument1} section={'gstnumber'} modifydoc={modifydocument} />
                <FlatInput wd="3" label="TAN Number" name="tannumber" currdoc={currentdocument1} section={'tannumber'} modifydoc={modifydocument} />
                <FlatInput wd="3" label="Business PAN Number" name="businesspannumber" currdoc={currentdocument1} section={'businesspannumber'} modifydoc={modifydocument} />
                <div className={"col-3"}></div>
              </div>
              <div className="row">
                <div className={"col-3"}>
                  Attach GST Document
                  <OnlineFileuploadComponent
                    section={'reffiles'}
                    autoupload={true}

                    saveasis={() => { }}
                    currdoc={currentdocument1}
                    modifydoc={modifydocument}
                  />
                </div>
                <div className={"col-3"}>
                  Attach Pan Card
                  <OnlineFileuploadComponent
                    section={'reffiles'}
                    autoupload={true}

                    saveasis={() => { }}
                    currdoc={currentdocument1}
                    modifydoc={modifydocument}
                  />
                </div>
              </div>
            </div>
          </Step>
          <Step name={"Step 3"} title="Change Password">
            <div className="grid">
              <div className="row">
              <FlatInput wd="6" label="Old Password" name="oldpassword" currdoc={currentdocument1} section={'oldpassword'} modifydoc={modifydocument} />
              <div className={"col-6"}></div>
              </div>
              <div className="row">
                <FlatInput wd="6" label="New Password" name="newpassword" currdoc={currentdocument1} section={'newpassword'} modifydoc={modifydocument} />
                <div className={"col-6"}></div>
              </div>
            </div>
          </Step>
        </Stepper>
        <AlertDialog open={action} handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle} />
        <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext} />

      </>
    )

  }
}

const mapDispatchToProps = (dispatch: any) => ({
  addstocks: (stocks: any, callback: any) => {
    console.log(addstocks(stocks)); dispatch(addstocks(stocks));
    if (callback && typeof callback === "function") {
      callback();
    }
  }
})

const mapStateToProps = (state: any) => {

  return {
    stocks: state.stocks.stocks.stocks,

  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SupplierComponent));

