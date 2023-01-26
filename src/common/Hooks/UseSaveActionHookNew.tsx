import React,{useState} from 'react'
import { initDocumentstatus } from '../constant'

function UseSaveActionHookNew(doctype:string,doctypetext:string) {
    const [currentdocument, modifydocument] = useState({})
  const [loaderDisplay, setloaderDisplay] = useState(false)
  const [documentstatus, setDocumentstatus] = useState(initDocumentstatus)
  const [redirect, setRedirect] = useState(false)
  const doctyp= doctype
  const doctyptxt= doctypetext
  return (
    <div>UseSaveActionHookNew</div>
  )
}

export default UseSaveActionHookNew