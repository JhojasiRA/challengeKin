import http from 'k6/http';
// import { check } from 'k6';
// import { Rate } from 'k6/metrics';

export const options = {
  stages: [
    { duration: '2s', target: 5 },
  
],
};
  
export function setup() {
  return  {tokenandUid: getAccessToken(__ENV.PERF_USER, __ENV.PASSWORD)};

}
 
export default function getList(data) {
  let auth = "Bearer " + data.tokenandUid.token;
  let userid= data.tokenandUid.id;
  console.log(auth);
  console.log(userid)
    const options = {
     headers: {
      'Authorization': auth,'Content-Type': "application/json"}
  };
   let preferences = http.get(__ENV.API_CS + '/api/users/'+userid+'/preferences',options); 
   /*
  const resultpreferences = check(preferences, { 'code 200': (r) => r.status == 200 });
  errorRate.add(!result);
  console.log(response.status)
  console.log('Response time was ' + String(response.timings.duration) + ' ms');
  */
 
};

export function  getAccessToken (user,password) {    
  const headers = {'Content-Type': "application/x-www-form-urlencoded"};
  let payload = `grant_type=password&username=${user}&password=${password}&audience=https://lemans.common&scope=openid profile email address phone&client_id=aaBfPCIAl15xFjeRLXIFSFryVWP5j63M&client_secret=${__ENV.CLIENT_SECRET}`;
  let response = http.post(__ENV.AUTH0_URL+'/oauth/token', payload, {headers:headers});
  let accessToken = response.json('access_token');
  console.log(accessToken)
  let auth= "Bearer " + accessToken;
  const options = {
  headers: {
    'Authorization': auth,'Content-Type': "application/json"}
    
};

  let userid = http.get(__ENV.AUTH0_URL + '/userinfo', options);            
  let uid = JSON.parse(userid.body)["https://cloud.rockwellautomation.com/uid"].replace(/-/g, "");
  let tokenandUid={token:accessToken,id:uid}
  return tokenandUid;
};