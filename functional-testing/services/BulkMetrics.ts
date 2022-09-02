const axios = require('axios');

export var bulkReportMetrics = async(tenantId:string, planId:string, token:string, userId:string) =>{
    let d = new Date()
    d.setMonth(d.getMonth() -1)
    let timestamp = d.getTime()/1000
    let url  = `${process.env.API_CS}/api/metrics/${planId}/bulk`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type':'application/json'
        }
    }
    let body= {
        ts: timestamp,
        timeSpanSecs: 60,
        tid: tenantId,
        uid: userId,
        payload: {vmCores: 3, memGb:2.5}
    }
    const response = await axios.post(url,body,config);
    console.log(response)
}