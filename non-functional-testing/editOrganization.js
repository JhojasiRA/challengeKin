import http from 'k6/http';
// import { check } from 'k6';
// import { Rate } from 'k6/metrics';

export const options = {
    vus: 2,
    duration: '1s',
  };
  
export function setup() {
    return {
      1: {
        userInfo: getAccessToken(__ENV.USER, __ENV.PASSWORD)
      },
      2:{
        userInfo: getAccessToken(__ENV.USER, __ENV.PASSWORD)
      }
    }
};

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

export default function getList(data) {
  let auth = "Bearer " +data[__VU]["userInfo"][0];

  let raw = {
    "name":"TestingOrg9", 
    "location": "USA",
    "description": "org",
    "visibility": "Private"
  };

    const options = {
      headers: {'Authorization': auth,'Content-Type': "application/json"}
    };

    let organization = http.post(__ENV.API_CS_URL+'/api/tenants',JSON.stringify(raw),options);  
    let tenantId= organization.body;
    let tenant = organization.json('tenantId');
    console.log(tenant);

    let raw2 = {
      "name": "TestingAutomation",
      "location": "AUS",
      "description": "org ",
      "visibility": "Public"
  }
    const config = {'Authorization': auth, 'Content-Type': "application/json",'tenantId': tenant };
    sleep(2000);
    let organizationEdit= http.put(__ENV.API_CS_URL+ '/api/tenant',JSON.stringify(raw2), {headers: config});
         
}

export function  getAccessToken (user,password) {    
    const headers = {'Content-Type': "application/x-www-form-urlencoded"};
    let payload = `grant_type=password&username=${user}&password=${password}&audience=https://lemans.common&scope=openid profile email address phone&client_id=aaBfPCIAl15xFjeRLXIFSFryVWP5j63M&client_secret=2DzuchrxHhUSueR87yAEO6BqiPHxHV_ma6yx9EdlsLoYQxAqkYTBLPzj2sc8i2PI`;
    let response = http.post(__ENV.AUTH0_URL+'/oauth/token', payload, {headers:headers});
    let accessToken = response.json('access_token');
    return [accessToken]
};

