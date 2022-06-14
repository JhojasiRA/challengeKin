import 'regenerator-runtime/runtime';
const axios = require('axios');
import {getToken,getToken2} from '../Token';
import { getLastAccessedTenantId } from './Tenants';

let tenantInfo = {id:"",status:""};
let eula = {version:"",status:""};
let ownerId = {id:""};
let ownerId2 = {id:""};

//------------Create User-----------

export var createUser = async() =>{
    try {
    let url  = `${process.env.API_CS}/api/users`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + global.accessToken,
            'Content-Type':'application/json'
        }
    }
    const response = await axios.post(url,{
        acceptedEulaVersion: `${eula.version}`
    },config);
    global.lastError = 'Error creating user1'
    return response.status;
    } catch (error) {
    return error.response.status;
    }
}

export var createUser2 = async() =>{
    let token = await getToken2();
    try {
    let url  = `${process.env.API_CS}/api/users`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type':'application/json'
        }
    }
    const response = await axios.post(url,{
        acceptedEulaVersion: `${eula.version}`
    },config);
    global.lastError = 'Error creating user2'
    return response.status;
    } catch (error) {
    return error.response.status;
    }
}

//-------------GetUserId-----------
export var getUserId = async() => {
    try {
    let url  = `${process.env.API_CS}/api/tenant`;
    let config = {
        headers: {
            'Authorization': 'Bearer ' + global.accessToken,
            'Content-Type':'application/json'
        }
    }
     const response = await axios.get(url,config);
     global.lastError = "Error getting userId from user"
     ownerId = {id:response.data.owner}
     return ownerId.id;
    } catch (error) {
        return error.response.status;
    }
}
//-------------GetUserId2-----------
export var getUserId2 = async() => {
    try {
    let url  = `${process.env.API_CS}/api/tenant`;
    let config = {
        headers: {
            'Authorization': 'Bearer ' + global.accessToken2,
            'Content-Type':'application/json'
        }
    }
     const response = await axios.get(url,config);
     global.lastError = "Error getting userId2 from user2"
     ownerId2 = {id:response.data.owner}
     return ownerId2;
    } catch (error) {
        return error.response.status;
    }
}

export var getUserIdWithParam = async(token: string) => {
    try {
    let url  = `${process.env.API_CS}/api/tenant`;
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type':'application/json'
        }
    }
     const response = await axios.get(url,config);
     ownerId = {id:response.data.owner}
     return ownerId.id;
    } catch (error) {
        return error.response.status;
    }
}

//---------------EULA----------------
export var  getEula = async() =>{
    let token = await getToken();
    try {
    let url  = `${process.env.API_CS}/api/eula`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type':'application/json'
        }
    }
    const response = await axios.get(url,config);
    global.lastError = 'Error gettin Eula version'
    eula = {version:response.data.eulaVersion , status:response.status};
    return eula;
    } catch (error) {
        return error.response.status;
    }
}
//---------Get User by Id-----------
   export var getUser = async() => {
        try {
        let url  = `${process.env.API_CS}/api/users/${ownerId.id}`;
        let config = {
            headers: {
                'Authorization': 'Bearer ' +  global.accessToken
            }
        }
         const response = await axios.get(url,config);
         global.lastError = 'Error get user by id'
         var userInfo = {status:response.status,item2:response.data.tenants[0].item2};
         return userInfo;
        } catch (error) {
            return error.response.status;
        }
    }
    export var getUserWithOtherToken = async() => {
        try {
        let url  = `${process.env.API_CS}/api/users/${ownerId.id}`;
        let config = {
            headers: {
                'Authorization': 'Bearer ' +  global.accessToken2
            }
        }
         const response = await axios.get(url,config);
         global.lastError = "User2 could access to user1 profile"
         return response.status;
        } catch (error) {
            return error.response.status;
         }
    }

//-------------Create a Org tenant
export var createOrgTenant = async() =>{
    try {
    let url  = `${process.env.API_CS}/api/tenants`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + global.accessToken,
            'Content-Type':'application/json'
        }
    }
    const response = await axios.post(url,{
        name:'org tenant',
        location: 'Milwaukee',
        description:'org tenant automation',
        visibility: "Private"
    },config);
    global.lastError = 'Error creating tenant'
    tenantInfo = {id:response.data.tenantId,status:response.status}
    return tenantInfo;
    } catch (error) {
        return error.response.status;
    }
}
//----------------edit tenant info

export var editTenantInfo = async() =>{
    try {
    let url  = `${process.env.API_CS}/api/tenant`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + global.accessToken,
            'Content-Type':'application/json',
            'tenantId':`${tenantInfo.id}`
        }
    }
    let newTextName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    const response = await axios.put(url,{
        name: newTextName,
        location:"Milwauke",
        description:'Testing edit functionality',
        visibility: "Public"
    },config);
    return response.status;
    } catch (error) {
        return error.response.status;
    }
}

//----------------Entitlements
export var  getEntitlements = async() =>{
    try {
    let url  = `${process.env.API_CS}/api/users/${ownerId.id}/entitlements`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + global.accessToken,
            'Content-Type':'application/json'
        }
    }
    global.lastError = 'Error creating tenant'
    const response = await axios.get(url,config);
    return response.status;
    } catch (error) {
        return error.response.status;
    }
}

//--------------------------Effective Roles------------
export var getEffectiveRoles = async() => {
    try {
    let url  = `${process.env.API_CS}/api/users/${ownerId.id}/tenanteffectiveroles`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + global.accessToken
        }
    }
     const response = await axios.get(url,config);
     var count = 0;
     var service = 0;
     var tenant = 0;
     var flag = false;
     while (flag == false) {
        var userInfo = {status:response.status,resourceType:response.data[count].resourceType,role:response.data[count].role,resourceName:response.data[count].resourceName,
            resourceType1:response.data[count + 1].resourceType,role1:response.data[count + 1].role,resourceName1:response.data[count + 1].resourceName};
        if (userInfo.resourceType == 'Tenant' && userInfo.role == 'Owner' && userInfo.resourceName == 'Personal Tenant') {
            tenant = 1;
        } 
        if (userInfo.resourceType1 == 'Service' && userInfo.role1 == 'Owner' && userInfo.resourceName1 == 'Vault') {
            service = 1;
        }
        if (service == 1 && tenant == 1) {
            flag = true;
        }
        else {
            count++;
        }
     }
     global.lastError = 'Error getting Effective roles'
     return userInfo;
    } catch (error) {
        return error.response.status;
    }
}

export var getPreferences = async(userId: string, token:string) => {
    try {
    let url  = `${process.env.API_CS}/users/${userId}/preferences`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
     const response = await axios.get(url,config);
     return response.data
    } catch (error) {
        return error.response.status;
    }
}

export var revokeRole = async(userId: string, resourceId:string, token:string, ) => {
    try{
        let url = `${process.env.API_CS}/api/users/${userId}/roles/?resid=${resourceId}`;
        let tenantId = await getLastAccessedTenantId()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'tenantid': tenantId
            }
       
        }
        const response = await axios.delete(url, config);
        return response.status

    }catch (error) {
        console.error(error)
        return error.response.status;
    }
}
