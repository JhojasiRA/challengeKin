import 'regenerator-runtime/runtime';
import { getToken5 } from '../Token';
import { getPreferences, getUserIdWithToken } from './Users';
const axios = require('axios');
var jp = require('jsonpath')

let statusAndTenantId = { id: "", status: "", role: "" };
let ownerId = { id: "" }

//-----------get tenant----------
export var getTenantId = async (token: string) => {
    try {
        let userId = await getUserId(token);
        let url = `${process.env.API_CS}/api/users/${userId}`;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        const response = await axios.get(url, config);
        global.lastError = 'Error getting tenant by id'
        statusAndTenantId = { id: response.data.tenants[0].item1, status: response.status, role: response.data.tenants[0].item2 };
        return statusAndTenantId;
    } catch (error) {
        return error.response.status;
    }
}
//-------------GetUserId-----------
export var getUserId = async (token: string) => {
    try {
        let url = `${process.env.API_CS}/api/tenant`;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.get(url, config);
        global.lastError = "Error getting userId from user"
        ownerId = { id: response.data.owner }
        return ownerId.id;
    } catch (error) {
        return error.response.status;
    }
}
//------------get tenant info-----------
export var getTenant = async () => {
    try {
        let url = `${process.env.API_CS}/api/tenant`;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + global.accessToken,
                'Content-Type': 'application/json',
                'tenantId': `${statusAndTenantId.id}`
            }
        }
        const response = await axios.get(url, config);
        global.lastError = 'Error getting tenant by id'
        var tenantInfo = { status: response.status, tenantStatus: response.data.tenantStatus, name: response.data.name, description: response.data.description, emailDomain: response.data.emailDomain, location: response.data.location, visibility: response.data.visibility };
        return tenantInfo;
    } catch (error) {
        console.log(error);
        return error.response.status;
    }
}

export var getTenantById = async (tenantId: string) => {
    let token = await getToken5(process.env.USERNAME, process.env.PASSWORD)
    try {
        let url = `${process.env.API_CS}/api/tenant`;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'tenantId': tenantId
            }
        }
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.status;
    }
}

//------------get Tenant by Resources-----------
export var getTenantResources = async () => {
    try {
        let url = `${process.env.API_CS}/api/tenant/resources`;
        if (statusAndTenantId.id == '') {
            await getTenantId(global.accessToken)
        }
        let config = {
            headers: {
                'Authorization': 'Bearer ' + global.accessToken,
                'Content-Type': 'application/json',
                'tenantId': `${statusAndTenantId.id}`
            }
        }
        global.lastError = 'Error getting tenant by resources'
        const response = await axios.get(url, config);
        return response.status;
    } catch (error) {
        console.log(error);
        return error.response.status;
    }
}

//------------get Tenant by Roles-----------
export var getTenantResourceRole = async () => {
    try {
        let url = `${process.env.API_CS}/api/tenant/resourceroles`;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + global.accessToken,
                'Content-Type': 'application/json',
                'tenantId': `${statusAndTenantId.id}`
            }
        }
        global.lastError = 'Error getting tenant by resource roles'
        const response = await axios.get(url, config)
        return response.status;
    } catch (error) {
        console.log(error);
        return error.response.status;
    }
}

//------------get Tenant by resource with id to roles-----------
export var getTenantResourceId = async () => {
    try {
        let url = `${process.env.API_CS}/api/tenant/resources/${statusAndTenantId.id}/resourceroles`;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + global.accessToken,
                'Content-Type': 'application/json',
                'tenantId': `${statusAndTenantId.id}`
            }
        }
        global.lastError = 'Error getting tenant by resource with id roles'
        const response = await axios.get(url, config)
        return response.status;
    } catch (error) {
        console.log(error);
        return error.response.status;
    }
}

//----------------Invite Code-------------------
export var CreateinvitCode = async () => {
    try {
        let url = `${process.env.API_CS}/api/tenant/invitecode`;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + global.accessToken,
                'Content-Type': 'application/json',
                'tenantId': `${statusAndTenantId.id}`
            }
        }
        global.lastError = 'Error generating new invite code'
        const response = await axios.post(url, config)
        return response.status;
    } catch (error) {
        console.log(error);
        return error.response.status;
    }
}

export var editTenantInfo = async () => {
    try {
        let url = `${process.env.API_CS}/api/tenants/${statusAndTenantId.id}`
        let config = {
            headers: {
                'Authorization': 'Bearer ' + global.accessToken,
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.put(url, {
            name: 'Tenant Automation',
            location: 'Medellin',
            description: 'Testing edit functionality',
            visibility: "Public"
        }, config);
        return response.status;
    } catch (error) {
        return error.response.status;
    }
}

export var editTenantInfoWithParams = async (name: string, location: string, description: string, visibility: string) => {
    try {
        let url = `${process.env.API_CS}/api/tenant/`
        let token = await getToken5(process.env.USERNAME, process.env.PASSWORD);
        let tenantId = await getTenantId(token)
        tenantId = tenantId.id
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'tenantid': tenantId,
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.put(url, {
            name: name,
            location: location,
            description: description,
            visibility: visibility
        }, config);
        return response.status;
    } catch (error) {
        return error.response.status;
    }
}

export var getTenantEffectiveRoles = async (userId: string, token: string) => {
    let tenantId = await getLastAccessedTenantId()
    try {
        let url = `${process.env.API_CS}/api/users/${userId}/tenanteffectiveroles`;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'tenantId': tenantId
            }
        }
        global.lastError = 'Error getting tenant effective roles'
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        console.error(error);
        return error.response.status;
    }
}

export var getLastAccessedTenantId = async () => {
    let token = await getToken5(process.env.USERNAME, process.env.PASSWORD);
    let userId = await getUserIdWithToken(token);
    let preferences = await getPreferences(userId, token);
    return await jp.query(preferences, '$..preferences.lastAccessedTenantId')[0];
}

export var getLastAccessedTenantIdWithToken = async (token: string) => {
    let userId = await getUserIdWithToken(token);
    let preferences = await getPreferences(userId, token);
    return await jp.query(preferences, '$..preferences.lastAccessedTenantId')[0];
}