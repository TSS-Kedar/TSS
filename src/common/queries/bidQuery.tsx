import gql from 'graphql-tag';
//export default tmasterdocList ()
export default gql`query bids($applicationid:String!,
    $client:String!,
    $lang:String!,
    $z_id:String,
    $supid:String,
      $reqid:String)
  {
    bids(
        applicationid:$applicationid,
      client:$client,
      lang:$lang,
      z_id:$z_id,
      supid:$supid,
      reqid:$reqid
    )
    {
      applicationid
      client,
      lang,
      z_id,
      t_id,
      status,
      amount1,
      amount2,
      supremarks,
      supid,
      reqid,
      cdate,
      ctime,
      cuser,
      udate,
      utime,
      uuser,
      ddate,
      dtime,
      duser,
      isdel,
    }
  }`