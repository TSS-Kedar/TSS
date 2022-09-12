import React from 'react'
import {Checkbox} from '../../../../common/InputFields/Checkbox'
function Slug({currdoc,modifydoc,wd}:any) {
  return (
  <Checkbox wd={wd} label={"Slub"}  name={"slub"} currdoc={currdoc} section={"slug"} modifydoc={modifydoc} />
  )
}

export default React.memo(Slug)