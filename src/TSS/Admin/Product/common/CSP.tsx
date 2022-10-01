import React from 'react'
import { FlatInput } from '../../../../common/InputFields/Input'

function CSP({currdoc,modifydoc,wd}:any) {
  return (
    <FlatInput wd={wd} label="CSP" name="yarncsp" currdoc={currdoc} section={'yarncsp'} modifydoc={modifydoc} />
  )
}

export default React.memo(CSP)