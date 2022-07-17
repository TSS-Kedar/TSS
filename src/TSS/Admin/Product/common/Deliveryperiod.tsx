import React from 'react'
import { FlatInput } from '../../../../common/InputFields/Input'
import { SelectInput } from '../../../../common/InputFields/Select'
const typeoption = [
            { 'key': 'Imm-dispatch-invoice', 'value': 'Imm dispatch invoice' },
            { 'key': '7-Days', 'value': '7-Days' },
            { 'key': '10-Days', 'value': '10-Days' },
            { 'key': '15-Days', 'value': '15-Days' },
            { 'key': 'Virgin', 'value': 'Virgin' },
            { 'key': 'Others(Custom)', 'value': 'Others(Custom)' }
        ]
function Deliveryperiod({currdoc,modifydoc,wd}:any) {
  return (
    <><SelectInput wd={wd} label="Delivery Period" options={typeoption} name="deliveryperiod" currdoc={currdoc} section={"deliveryperiod"} modifydoc={modifydoc} />
    {currdoc.deliveryperiod==="Others(Custom)" && <FlatInput wd={wd} label="Others" name="others" currdoc={currdoc} section={'others'} modifydoc={modifydoc} />}
    </>
  )
}

export default React.memo(Deliveryperiod)