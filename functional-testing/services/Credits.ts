const axios = require('axios');


export var bulkReportMetrics = async (tenantId: string,planId: string,token: string,userId: string,timestamp: number) => {
  try {
    let url = `${process.env.METRICS_API_URL}/api/metrics/${planId}`;
    let config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    let body = [
      {
        ts: timestamp,
        timeSpanSecs: 60,
        tid: tenantId,
        uid: userId,
        p: "Automated test",
        r: tenantId,
        payload: { vmCores: 3, memGb: 2.5 },
      },
    ];
    return (await axios.post(url, body, config)).data;
  } catch (error) {
    return error.response.status;
  }
};

export var provisionFooService= async(tokenM2M:string, tenantId:string, serviceId:string, userId:string) =>{
    let url  = `${process.env.API_CS}/serviceprovisioning/complete/${serviceId}/${userId}`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + tokenM2M,
            'Content-Type':'application/json',
            'tenantId': tenantId
        }
    }
    await axios.post(url,'{}',config);

}

export var getUtilityTokens= async(token:string, tenantId:string) =>{
  let url  = `${process.env.API_CS}/tenant/utilitytokens`
  let config = {
      headers: {
          'Authorization': 'Bearer ' + token,
          'tenantid': tenantId
      }
  }
  let response = await axios.get(url,config);
  return response.data
}