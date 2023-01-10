import React from 'react'

function BuyerCard({title,count,type,quality,nature,status,buyid,cardclick,z_id}:any) {
  return (
    <div className="card-container" onClick={()=>cardclick(z_id,true)}>
     <div className="card-content">
       <h1>{title.trim()===""?"Not Disclosed":title}</h1>
       <h3>Count: {count}</h3>
       <div>Buyer ID: {buyid}</div>
       <div>Type: {type}</div>
       <div>Quality: {quality}</div>
       <div>Nature: {nature}</div>
       <div>Status: {status}</div>
     </div>
   </div>
  )
}

export default BuyerCard