import gql from 'graphql-tag';
export default gql`mutation saveBid(
    $applicationid:String,
      $client:String,
      $lang:String,
      $z_id:String,
      $t_id:String,
      $supid:String,
      $reqid:String,
    $amount1:String,
    $amount2:String,
    $supremarks:String,
    $status:String
  )
      {
          saveBid(
            applicationid:$applicationid,
            client: $client,
            lang: $lang,
            z_id:$z_id,
            t_id:$t_id,
            supid:$supid,
            reqid:$reqid,
            amount1:$amount1,
            amount2:$amount2,
            supremarks:$supremarks,
            status:$status
        )
        {
          applicationid,
          client,
          lang,
     
      z_id,
      t_id,
      supid,
      reqid,
      bidid,
      bidnoid,
      status,
      amount1,
      amount2,
      supremarks,
      cdate,
      ctime,
      cuser,
      udate,
      utime,
      uuser,
      ddate,
      dtime,
      duser,
      isdel
        }
      }`