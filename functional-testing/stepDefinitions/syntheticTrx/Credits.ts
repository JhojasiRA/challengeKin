import { Given, When, Then } from '@cucumber/cucumber'
import { activateEntitlement } from '../../services/Entitlements';
import { menuhomepage, entitlements, inviteUsersPage } from '../../support/Hooks';
import { catalogNumberEntitlements, planIds } from '../../constant.json'
import { question } from '../../support/Hooks';
import { bulkReportMetrics, provisionFooService } from '../../services/Credits';
import { getTenantById, getTenantId } from '../../services/Tenants';
import { getToken5, getM2MToken } from '../../Token';
import { getUserIdWithToken } from '../../services/Users';
var jp = require("jsonpath");

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
  let token = await getToken5(process.env.USERNAME, process.env.PASSWORD)
  let tenantId = (await getTenantId(token)).id
  let tokenM2M = await getM2MToken(process.env.CLIENT_ID_FOO, process.env.CLIENT_SECRET_FOO)
  let userId = await getUserIdWithToken(token)
  await bulkReportMetrics(tenantId, planIds.Foo, tokenM2M, userId)
});



Given(/^the user has provisioned Foo service$/, async() => {
  let tokenM2M = await getM2MToken(process.env.CLIENT_ID_FOO, process.env.CLIENT_SECRET_FOO)
  let token = await getToken5(process.env.USERNAME, process.env.PASSWORD)
  let tenantId = (await getTenantId(token)).id
  let serviceId = jp.query(await getTenantById(tenantId), `$.pendingServices[0].serviceId`)[0]
	await provisionFooService(tokenM2M, tenantId, serviceId)
});


Then(/^the user should see the consumption is not carried out$/, async() => {
	
});


