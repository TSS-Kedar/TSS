import React from 'react'
import { SelectInput } from '../../../../common/InputFields/Select'
const typeoption = [{ 'key': 'Cotton', 'value': 'Cotton' },{ 'key': 'Synthetic', 'value': 'Synthetic' }, { 'key': 'Viscose', 'value': 'Viscose' }, { 'key': 'Fancy', 'value': 'Fancy' },{ 'key': 'Blends', 'value': 'Blends' }]
function Yarntype({currdoc,modifydoc,wd}:any) {
  return (
    <><SelectInput wd={wd} label="Yarntype" options={typeoption} name="yarntype" currdoc={currdoc} section={"yarntype"} modifydoc={modifydoc} /></>
  )
}

export default Yarntype