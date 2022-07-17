import React from 'react'
import { FlatInput } from '../../../../common/InputFields/Input'

function Difference({currdoc,modifydoc,wd}:any) {
  return (
    <FlatInput wd={wd} label="Diff" name="diff" currdoc={currdoc} section={'diff'} modifydoc={modifydoc} />
  )
}

export default React.memo(Difference)