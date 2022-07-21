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

export default function getList(data) {
   let auth = "Bearer " + data[__VU]["userInfo"][0];
   let userid= data[__VU]["userInfo"][1];

   const options = {
    headers: {
      'Authorization': auth,'Content-Type': "application/json"}
  };
  let preferences = http.get(__ENV.API_CS_URL + '/api/users/'+userid+'/preferences',options); 
 
};

export function  getAccessToken (user,password) {    
  const headers = {'Content-Type': "application/x-www-form-urlencoded"};
  let payload = `grant_type=password&username=${user}&password=${password}&audience=https://lemans.common&scope=openid profile email address phone&client_id=aaBfPCIAl15xFjeRLXIFSFryVWP5j63M&client_secret=2DzuchrxHhUSueR87yAEO6BqiPHxHV_ma6yx9EdlsLoYQxAqkYTBLPzj2sc8i2PI`;
  let response = http.post(__ENV.AUTH0_URL +'/oauth/token', payload, {headers:headers});
  let accessToken = response.json('access_token');
  let auth= "Bearer " + accessToken;
  const options = {
  headers: {
    'Authorization': auth,'Content-Type': "application/json"}
};

  let userid = http.get(__ENV.AUTH0_URL + '/userinfo', options);            
  let uid = JSON.parse(userid.body)["https://cloud.rockwellautomation.com/uid"].replace(/-/g, "");
  return [accessToken, uid];
};
