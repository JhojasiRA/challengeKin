import 'regenerator-runtime/runtime';
const axios = require('axios');
import { getToken, getToken5 } from '../Token';
import { expect } from 'chai';
import { toUUID } from 'to-uuid'
import { getLastAccessedTenantId, getTenantById } from './Tenants';
var jp = require('jsonpath')


let invitationId = { id: "", status: "" };
let infTenantidCreator = { id: "", serviceId: "" };
let infoCurrentTenant = { id: "", inviteCode: "", vaultId: "", ftraId: "" }
let ownerId = {id:""};
export class Invitation {
    id: string
    toEmail: string
    acceptedByUser: string
    acceptedByUserName: string
    createdBy: string
    sentDate: string
    tenantId: string
    tenantName: string
    resourceId: string
    resourceType: string
    resourceName: string
    role: string
    status: string
    expiry: string
    apiStatus:string
    
    constructor(){
        this.id = ""
        this.toEmail = ""
        this.acceptedByUser = ""
        this.acceptedByUserName = ""
        this.createdBy = ""
        this.sentDate = ""
        this.tenantId = ""
        this.tenantName = ""
        this.resourceId = ""
        this.resourceType = ""
        this.resourceName = ""
        this.role = ""
        this.status = ""
        this.expiry = ""
        this.apiStatus = ""
    }
    
    public getId() {
        return this.id
    }
}
var invitation = new Invitation()




//------------Create invitation----------
export var createInvitation = async (target: string, role: string, resource: string) => {
    await browser.pause(1000);
    let tenantId = await getLastAccessedTenantId()
    let tenant = await getTenantById(tenantId)
    let resourceId = resource == "Vault" ? jp.query(tenant, "$.services[?(@.kind=='Vault')].serviceId")[0] : resource == "FTRA" ? jp.query(tenant, "$.services[?(@.kind=='SecureRemoteAccess')].serviceId")[0] : resource == "Machine Monitoring" ? jp.query(tenant, "$.services[?(@.kind=='MachineMonitoring')].serviceId")[0] : tenantId
    let token = await getToken5(process.env.USERNAME, process.env.PASSWORD)
    try {
        let url = `${process.env.API_CS}/api/invitations`
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'tenantId': tenantId

            }
        }
        var response = await axios.post(url, {
            tenantId: tenantId,
            resourceId: resourceId,
            toEmail: target,
            role: role
        }, config);
        await browser.pause(2000);
        invitationId = { status: response.status, id: response.data.invitationId }
        url = `${process.env.API_CS}/invitations/${invitationId.id}`
        response = await axios.get(url, config)
        invitation = new Invitation()
        invitation.id = response.data.id
        invitation.toEmail = response.data.toEmail
        invitation.createdBy = response.data.createdBy
        invitation.sentDate = response.data.sentDate
        invitation.tenantId = response.data.tenantId
        invitation.tenantName = response.data.tenantName
        invitation.resourceId = response.data.resourceId
        invitation.resourceType = response.data.resourceType
        invitation.resourceName = response.data.resourceName
        invitation.role = response.data.role
        invitation.status = response.data.status
        invitation.expiry = response.data.expiry
        invitation.acceptedByUserName = response.data.acceptedByUserName
        invitation.acceptedByUser = response.data.acceptedByUser
        invitation.apiStatus = response.status
        return invitation;

    } catch (error) {
        console.log(error)
        return error.response.status;
    }
}

//------------get tenant id-----------
export var getTenant = async () => {
   // await browser.sleep(2000);
    let token = await getToken5(process.env.USERNAME, process.env.PASSWORD);
    try {
        let url = `${process.env.API_CS}/api/tenant`;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'

            }
        }
        let response = await axios.get(url, config);
        let userId = await toUUID(response.data.id)
        let inviCode = response.data.inviteCode
        infTenantidCreator = { id: userId, serviceId: response.data.services[0].serviceId }
        url = `${process.env.API_CS}/Users/${userId}`

        response = await axios.get(url, config)

        infoCurrentTenant = { id: infTenantidCreator.serviceId, inviteCode: inviCode, vaultId: jp.query(response.data, '$..tenants[0].item1'), ftraId: jp.query(response.data, '$..tenants[0].item1') }
        return infTenantidCreator;
    } catch (error) {
        console.log(error);
        return error.response.status;
    }
}



//------------delete invitation by id
export var deleteInvitationById = async () => {
   // await browser.sleep(2000);
    try {
        let url = `${process.env.API_CS}/api/invitations/${invitationId.id}`
        let config = {
            headers: {
                'Authorization': 'Bearer ' + global.accessToken,
                'Content-Type': 'application/json',
                'tenantid': `${infoCurrentTenant.vaultId}`
            }
        }

        const response = await axios.delete(url, config);
        return response.status;
    } catch (error) {
        return error.response.status;
    }
}



//------------get invitation by id
export var getInvitationById = async () => {
    await browser.pause(1000);
    let token = await getToken5(process.env.USERNAME, process.env.PASSWORD)
    let tenantId = await getLastAccessedTenantId()
    try {
        let url = `${process.env.API_CS}/api/invitations/${invitationId.id}`
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'tenantid': tenantId,
            }
        }
        const response = await axios.get(url, config);
        await browser.pause(2000)
        invitation.id = response.data.id
        invitation.toEmail = response.data.toEmail
        invitation.createdBy = response.data.createdBy
        invitation.sentDate = response.data.sentDate
        invitation.tenantId = response.data.tenantId
        invitation.tenantName = response.data.tenantName
        invitation.resourceId = response.data.resourceId
        invitation.resourceType = response.data.resourceType
        invitation.resourceName = response.data.resourceName
        invitation.role = response.data.role
        invitation.status = response.data.status
        invitation.expiry = response.data.expiry
        invitation.acceptedByUserName = response.data.acceptedByUserName
        invitation.acceptedByUser = response.data.acceptedByUser
        invitation.apiStatus = response.status
        return invitation;
    } catch (error) {
        return error.response.status;
    }
}

//------------get all invitations
export var getAllInvitations = async (username: string, password: string) => {
    let token = await getToken5(username, password);
    await getTenant()
    try {
        let url = `${process.env.API_CS}/api/invitations`
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'tenantid': `${infoCurrentTenant.vaultId}`
            }
        }
        const response = await axios.get(url, config);
        expect(await response).to.have.property("status").to.be.equal(200)
        var invitation = { status: response.status, records: response.data.records }
        return invitation;

    } catch (error) {
        return error.response.data
    }
}



//------------Accept an invitation
export var acceptInvitation = async () => {
    await getUserId();
   // await browser.sleep(2000);
    try {
        let url = `${process.env.API_CS}/api/invitations/${invitationId.id}-${invitation.resourceId}/accept`
        let config = {
            headers: {
                'Authorization': 'Bearer ' + global.accessToken,
                'Content-Type': 'application/json'

            }
        }
        const response = await axios.post(url, {
            tenantId: `${ownerId.id}`
        }, config);
        global.lastError = "Error approving invitation"
        return response.status;
    } catch (error) {
        return error.response.status;
    }
}

export var getUserId = async() => {
    let token = await getToken();
    try {
    let url  = `${process.env.API_CS}/api/tenant`;
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type':'application/json'
        }
    }
     const response = await axios.get(url,config);
     global.lastError = "Error getting userId from user"
     ownerId = {id:response.data.owner}
     return ownerId;
    } catch (error) {
        return error.response.status;
    }
}