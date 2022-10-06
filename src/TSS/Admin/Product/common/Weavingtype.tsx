import React from 'react'
import { SelectInput } from '../../../../common/InputFields/Select'
const typeoption = [{ 'key': 'Warp', 'value': 'Warp' },{ 'key': 'Weft', 'value': 'Weft' },{ 'key': 'Both', 'value': 'Both' }]
function Weavingtype({currdoc,modifydoc,wd}:any) {
  return (
    <SelectInput wd={wd} label="Type" options={typeoption} name="type" currdoc={currdoc} section={"type"} modifydoc={modifydoc} />
  )
}

export default React.memo(Weavingtype)


