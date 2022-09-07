const axios = require('axios');
import { getLastAccessedTenantIdWithToken } from './Tenants';
var entitlementId: string
var _token: string
export var activateEntitlement = async(email:string, effectiveDate: string, validForDays: number, quantity: number, catalogNumber: string, serviceKind: string, token: string) => {
    let tenantId = await getLastAccessedTenantIdWithToken(token)
    _token = token
    try {
        let url = `${process.env.API_CS}/api/users/entitlements`;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'tenantId': tenantId
            }
        }
        let body = {
            email: email,
            effectiveDate: effectiveDate,
            validForDays: Number(validForDays),
            quantity: quantity,
            catalogNumber: catalogNumber,
            serviceKind: serviceKind
        }
        let response = await axios.post(url, body, config);
        console.log(response)
        entitlementId = response.data 
    } catch (error) {
        console.log(error);
        return error.response.status;
    }
}

export var deactivateEntitlement = async() => {
    try {
        let url = `${process.env.API_CS}/api/users/entitlements/${entitlementId}?action=Cancelled`;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + _token
            }
        }
       await axios.delete(url, config); 
    } catch (error) {
        console.log(error);
        return error.response.status;
    }
}