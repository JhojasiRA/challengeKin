import  {getToken5}  from '../Token';
import { getPreferences, getUserIdWithParam } from './Users';
import { accessRequest, approveAccessRequest} from './AccesRequest'


var jp = require('jsonpath')

export var joinLastaccessedTenant = async(user:string, role:string)=>{
    await browser.pause(1000);
    let tokenUser1 = await getToken5(process.env.USERNAME, process.env.PASSWORD)
    let tokenUser2 = await getToken5(user,process.env.PASSWORD)
    let userId = await getUserIdWithParam(tokenUser1)
    let preferences = await getPreferences(userId, tokenUser1)
    let tenantId = await jp.query(preferences, '$..preferences.lastAccessedTenantId')[0]
    await accessRequest(tenantId, tenantId, tokenUser2)
    await approveAccessRequest(tenantId, tokenUser1, role)
}

export var joinRequest = async (user: string)=>{
    let tokenUser1 = await getToken5(process.env.USERNAME, process.env.PASSWORD)
    let tokenUser2 = await getToken5(user,process.env.PASSWORD)
    let userId = await getUserIdWithParam(tokenUser1)
    let preferences = await getPreferences(userId, tokenUser1)
    let tenantId = await jp.query(preferences, '$..preferences.lastAccessedTenantId')[0]
    await accessRequest(tenantId, tenantId, tokenUser2)
}
