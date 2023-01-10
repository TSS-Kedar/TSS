import React from 'react'

function BuyerCard({title,mobile,email,companyname,status,buyid,cardclick,z_id,approveDoc}:any) {
  return (
    <div className="card-container" >
     <div className="card-content"onClick={()=>cardclick(z_id,true)}>
       <h1>{title.trim()===""?"Not Disclosed":title}</h1>
       <h3>Mobile: {mobile}</h3>
       <div>Buyer ID: {buyid}</div>
       <div>Email: {email}</div>
       <div>Company: {companyname}</div>
       <div>Status: {status}</div>
     </div>
     {status!=="Approved" &&<div className="approve-btn" onClick={()=>approveDoc(z_id)}>Approve</div>}
   </div>
  )
}

export default BuyerCard