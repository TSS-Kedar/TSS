import React from 'react'

function UserCard({title,mobile,email,auth,cardclick,z_id}:any) {
  return (
    <div className="card-container" onClick={()=>cardclick(z_id,true)}>
     <div className="card-content">
       <h1>{title.trim()===""?"Not Disclosed":title}</h1>
       <h3>Mobile: {mobile}</h3>
       <div>Email: {email}</div>
       <div>User Type: {auth}</div>
     </div>
   </div>
  )
}

export default UserCard