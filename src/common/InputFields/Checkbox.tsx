import React from 'react'
import './checkbox.css'
import {
  setValue, getValue, getErrorValue, getErrorValueN, setCalValue,
  getDtFormat,
  getTimeFormat,
  getDateYYYYMMDD,
  getDateYYYYMMDDHHMI,
  getFromToDate
} from '../validationlib';
interface Iinput {
  wd?: string;
  label: string;
  name: string;
  currdoc: any;
  section: string;
  cal?:string;
  modifydoc:any;
  inpref?:any;
  onclick?:any;
}
export function Checkbox(props: Iinput) {
  let { wd, label, name, section, currdoc,modifydoc,cal } = props
  return (
    <div className={`col-${wd}`}>
      <div className="checkbox-container">
        <input type="checkbox" 
        id="cb1" 
        required
          placeholder=" "
          
          value={getValue(currdoc, section)}
          onChange={(event) => { setCalValue(currdoc, section, event.target.checked, modifydoc, cal) }}
          onBlur={event => modifydoc(setValue(currdoc, 'touched.' + section, true))}
        />
        <label htmlFor="cb1">{label}</label>
      </div>
    </div>
  )
}

export const M_Checkbox = React.memo(Checkbox)
