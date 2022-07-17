import React from 'react'
import { FlatInput } from '../../../../common/InputFields/Input'

function CSP({currdoc,modifydoc,wd}:any) {
  return (
    <FlatInput wd={wd} label="CSP" name="csp" currdoc={currdoc} section={'csp'} modifydoc={modifydoc} />
  )
}

export default React.memo(CSP)