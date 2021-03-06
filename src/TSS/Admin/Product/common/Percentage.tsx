import React from 'react'
import { SelectInput } from '../../../../common/InputFields/Select'
const typeoption = [
        { 'key': '	10/100', 'value': '	10/100' },
        { 'key': '20/100', 'value': '20/100' },
        { 'key': '30/100', 'value': '30/100' },
        { 'key': '40/100', 'value': '40/100' },
        { 'key': '50/100', 'value': '50/100' },
        { 'key': '60/100', 'value': '60/100' },
        { 'key': '70/100', 'value': '70/100' },
        { 'key': '80/100', 'value': '80/100' },
        { 'key': '90/100', 'value': '90/100' },
        { 'key': '100/100', 'value': '100/100' },
    ]
function Percentage({currdoc,modifydoc,wd,label,section}:any) {
  return (
    <SelectInput wd={wd} label={label} options={typeoption} name={section} currdoc={currdoc} section={section} modifydoc={modifydoc} />
  )
}

export default React.memo(Percentage)