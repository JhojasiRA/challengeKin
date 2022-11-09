import { Given, When, Then } from '@cucumber/cucumber'
import { activateEntitlement, deactivateEntitlement} from '../../services/Entitlements';
import {getUtilityTokens} from '../../services/Credits';
import { menuhomepage, entitlements, inviteUsersPage } from '../../support/Hooks';
import { catalogNumberEntitlements, planIds } from '../../constant.json'
import { question } from '../../support/Hooks';
import { bulkReportMetrics, provisionFooService } from '../../services/Credits';
import { getTenantById, getTenantId } from '../../services/Tenants';
import { getToken5, getM2MToken } from '../../Token';
import { getUserIdWithToken } from '../../services/Users';
var jp = require("jsonpath");
var chai = require('chai');
chai.use(require('chai-string'))
var expect = chai.expect;
var timestamp

  When(/^the user allocates "([^"]*)" credits entitlement with email "([^"]*)" and valid for "([^"]*)" days$/, async(quantity,email,validForDays) => {
    let effectiveDate = new Date()
    //@ts-ignore
    await browser.setupInterceptor()
    await menuhomepage.entitlementsOption()
    await browser.pause(2000)
    //@ts-ignore
    let requests = await browser.getRequests(false, false)
    let requestEntitlements = requests.filter(request => request.url.startsWith(process.env.API_CS))[0]
    let token = requestEntitlements.headers.authorization
    if(typeof token === 'string'){
      token = token.split(' ')[1]
    }else{
      throw new Error("Service intercepted does not have a token header param: "+requestEntitlements.url)
    }
    await activateEntitlement(email,effectiveDate.toDateString(),validForDays, quantity, catalogNumberEntitlements.credits.catalogNumber, "", token)
    await browser.refresh()
    await entitlements.allocateEntitlement(catalogNumberEntitlements.credits.catalogNumber)
    await browser.pause(1000)
    await inviteUsersPage.closeInvitation()
  });

  
Then(/^the user should see "([^"]*)" credit allocated to that organization$/, async(credits) => {
	await menuhomepage.entitlementsOption()
  await question.assertAllocatedCredits(credits)
});


When(/^the user consumes Foo service with a date from the past month$/, async() => {
  let d = new Date();
  d.setMonth(d.getMonth() - 1);
  //@ts-ignore
  timestamp = parseInt(d.getTime()/1000);
});



Given(/^the user has provisioned Foo service$/, async() => {
  let tokenM2M = await getM2MToken(process.env.CLIENT_ID_FOO, process.env.CLIENT_SECRET_FOO)
  let token = await getToken5(process.env.USERNAME, process.env.PASSWORD)
  let tenantId = (await getTenantId(token)).id
  let serviceId = jp.query(await getTenantById(tenantId), `$.pendingServices[0].serviceId`)[0]
  let userId = await getUserIdWithToken(token)
	await provisionFooService(tokenM2M, tenantId, serviceId, userId)
});


Then(/^the user should see the consumption is not carried out$/, async() => {
  let token = await getToken5(process.env.USERNAME, process.env.PASSWORD)
  let tenantId = (await getTenantId(token)).id
  let tokenM2M = await getM2MToken(process.env.CLIENT_ID_FOO, process.env.CLIENT_SECRET_FOO)
  let userId = await getUserIdWithToken(token)
  let response = await bulkReportMetrics(tenantId, planIds.Foo, tokenM2M, userId, timestamp)
  await expect(response).to.equal(400)
});


Given(/^the user has purchased an entitlement that already has expired$/, async() => {
  let effectiveDate = new Date()
  let time = effectiveDate.getTime()
  effectiveDate.setTime(time+1728000000) //plus 2 days
    //@ts-ignore
    await browser.setupInterceptor()
    await menuhomepage.entitlementsOption()
    await browser.pause(2000)
    //@ts-ignore
    let requests = await browser.getRequests(false, false)
    let requestEntitlements = requests.filter(request => request.url.startsWith(process.env.API_CS))[0]
    let token = requestEntitlements.headers.authorization
    if(typeof token === 'string'){
      token = token.split(' ')[1]
    }else{
      throw new Error("Service intercepted does not have a token header param: "+requestEntitlements.url)
    }
    await activateEntitlement(process.env.USERNAME,effectiveDate.toDateString(),1, 1000, catalogNumberEntitlements.credits.catalogNumber, "", token)
    await deactivateEntitlement()
  });

  
When(/^the user tries to allocate the credits entitlement$/, async() => {
	await browser.refresh()
  await entitlements.allocateEntitlement(catalogNumberEntitlements.credits.catalogNumber)
  await browser.pause(5000)
  await browser.refresh()
});


Then(/^the user should see that is not possible to allocate expired credits$/, async() => {
  await question.assertAllocatedCredits(0)
});


Given(/^the user has purchased an entitlement that is about to expire$/, async() => {
  let effectiveDate = new Date()
    //@ts-ignore
    await browser.setupInterceptor()
    await menuhomepage.entitlementsOption()
    await browser.pause(2000)
    //@ts-ignore
    let requests = await browser.getRequests(false, false)
    let requestEntitlements = requests.filter(request => request.url.startsWith(process.env.API_CS))[0]
    let token = requestEntitlements.headers.authorization
    if(typeof token === 'string'){
      token = token.split(' ')[1]
    }else{
      throw new Error("Service intercepted does not have a token header param: "+requestEntitlements.url)
    }
    await activateEntitlement(process.env.USERNAME,effectiveDate.toDateString(),1, 1000, catalogNumberEntitlements.credits.catalogNumber, "", token)
});


When(/^the user purchases new utility credits$/, async() => {    
    let token = await getToken5(process.env.USERNAME, process.env.PASSWORD)
    await activateEntitlement(process.env.USERNAME,new Date().toDateString(),365, 1000, catalogNumberEntitlements.credits.catalogNumber, "", token)
});


Then(/^the users should see all their utility tokens have the expiry date updated to the last acquisition$/, async() => {
	console.log("It hasn't been implemented in sandbox")
});


Then(/^the user should see the just allocated credits have expiry date of 1 year from that moment$/,
  async () => {
    let token = await getToken5(process.env.USERNAME, process.env.PASSWORD);
    let tenantId = (await getTenantId(token)).id;
    let response = await getUtilityTokens(token, tenantId);
    let date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    let tokenExpiration = jp.query(response, `$.tokenExpiration`);
    await expect(tokenExpiration[0]).to.startWith(date.getFullYear().toString());
  }
);


When(/^the user consumes the allocated credits for FOO service$/, async() => {
	let token = await getToken5(process.env.USERNAME, process.env.PASSWORD)
  let tenantId = (await getTenantId(token)).id
  let tokenM2M = await getM2MToken(process.env.CLIENT_ID_FOO, process.env.CLIENT_SECRET_FOO)
  let userId = await getUserIdWithToken(token)
  let d = new Date();
  //@ts-ignore
  timestamp = parseInt(d.getTime()/1000);
  let response = await bulkReportMetrics(tenantId, planIds.Foo, tokenM2M, userId, timestamp)
  console.log(response)
});


Then(/^the user should see "([^"]*)" credits consumed$/, async(credits:number) => {
  await browser.pause(90000)
  await menuhomepage.entitlementsOption()
  await question.assertConsumedCredits(credits)
});











