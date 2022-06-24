import 'regenerator-runtime/runtime';
const axios = require('axios');
import {creds} from '../constant.json';
import { getToken5 } from '../Token';

let requestId = {id:"", status:""};
let tenantId = "";
//------------Create acces request
export var createAccesRequest = async() =>{
    await browser.pause(2000);
    let tokenUser = await getToken5(creds.user,process.env.PASSWORD)
    try {
    let url  = `${process.env.API_CS}/api/accessrequests`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + tokenUser,
            'Content-Type':'application/json'
        }
    }
    const response = await axios.post(url,{
            resourceId: `${tenantId}`,
            tenantId: `${tenantId}`
    },config);
    requestId = {status:response.status, id:response.data.accessRequestId}
    return requestId;
    } catch (error) {
        return {status:error.response.status};
    }
}

//------------Create acces request with parameters
export var accessRequest = async(tenantId:string, resourceId:string, token:string) =>{
    await browser.pause(2000);
    try {
    let url  = `${process.env.API_CS}/accessrequests`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type':'application/json'
        }
    }
    const response = await axios.post(url,{
            resourceId: `${resourceId}`,
            tenantId: `${tenantId}`
    },config);
    requestId = {status:response.status, id:response.data.accessRequestId}
    return requestId;
    } catch (error) {
        return {status:error.response.status};
    }
}

//------------get acces request by id
export var getAccesRequestById = async() =>{
    let tokenUser2 = await getToken5(creds.user2,process.env.PASSWORD)
    await browser.pause(2000);
    try {
    let url  = `${process.env.API_CS}/api/accessrequests/${requestId.id}`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + tokenUser2,
            'Content-Type':'application/json',
            'tenantId': `${tenantId}`
        }
    }
    const response = await axios.get(url,config);
    var accessRequest = {status:response.status, condition:response.data.status}
    return accessRequest;
    } catch (error) {
        return {status:error.response.status, condition:error.response.data.status};
    }
}
//------------get acces request by tenantId
export var getAccesRequestByTenant = async() =>{
    let tokenUser2 = await getToken5(creds.user2,process.env.PASSWORD)
    try {
    let url  = `${process.env.API_CS}/api/accessrequests`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + tokenUser2,
            'Content-Type':'application/json',
            'tenantId': `${tenantId}`
        }
    }
    const response = await axios.get(url,config);
    return response.status;
    } catch (error) {
        return error.response.status;
    }
}

//------------delete acces request by id
export var deleteAccesRequestById = async() =>{
    let tokenUser2 = await getToken5(creds.user2,process.env.PASSWORD)
    try {
    let url  = `${process.env.API_CS}/api/accessrequests/${requestId.id}`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + tokenUser2,
            'Content-Type':'application/json',
            'tenantId': `${tenantId}`
        }
    }
    const response = await axios.delete(url,config);
    return response.status;
    } catch (error) {
        return error.response.status;
    }
}

//------------Aprrove an acces request
export var approveAccesRequest = async() =>{
    let tokenUser2 = await getToken5(creds.user2,process.env.PASSWORD)
    try {
    let url  = `${process.env.API_CS}/api/accessrequests/${requestId.id}/approve`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + tokenUser2,
            'Content-Type':'application/json',
            'tenantId': `${tenantId}`
        }
    }
    const response = await axios.post(url,{
        role:"Contributor"
    },config);
    return response.status;
    } catch (error) {
        return error.response.status;
    }
}

export var approveAccessRequest = async(tenantId:string, token:string, role:string) =>{
    
    try {
    let url  = `${process.env.API_CS}/api/accessrequests/${requestId.id}/approve`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type':'application/json',
            'tenantId': `${tenantId}`
        }
    }
    const response = await axios.post(url,{
        role:role
    },config);
    return response.status;
    } catch (error) {
        return error.response.status;
    }
}

//----------------Create org tenant
export var createOrgTenant = async() =>{
    let tokenUser2 = await getToken5(creds.user2,process.env.PASSWORD)
    try {
    let url  = `${process.env.API_CS}/api/tenants`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + tokenUser2,
            'Content-Type':'application/json'
        }
    }
    const response = await axios.post(url,{
        name:'test automation tenant',
        location: 'Milwaukee',
        description:'org tenant automation'
    },config);
    tenantId = response.data.tenantId;
    return tenantId;
    } catch (error) {
        return error.response.status;
    }
}