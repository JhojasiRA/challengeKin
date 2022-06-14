const axios = require('axios');
import { getToken5 } from '../Token';
import { getLastAccessedTenantId } from './Tenants';

export var activateEntitlement = async(email:string, effectiveDate: string, validForDays: number, catalogNumber: string, serviceKind: string) => {
    let token = await getToken5(process.env.USERNAME, process.env.PASSWORD);
    let tenantId = await getLastAccessedTenantId()
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
            validForDays: validForDays,
            value: 1,
            catalogNumber: catalogNumber,
            serviceKind: serviceKind
        }
        let response = await axios.post(url, body, config);
        let entitlementId = '' 
    } catch (error) {
        console.log(error);
        return error.response.status;
    }
}