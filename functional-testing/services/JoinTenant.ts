import { getToken5 } from "../Token";
import { createUserWithToken,getEulaWithToken,getPreferences,getUserIdWithToken,} from "./Users";
import { accessRequest, approveAccessRequest } from "./AccesRequest";
import { createOrganization } from "./Tenants";

var jp = require("jsonpath");

export var joinLastaccessedTenant = async (user: string, role: string) => {
  let tokenUser1 = await getToken5(process.env.USERNAME, process.env.PASSWORD);
  let tokenUser2 = await getToken5(user, process.env.PASSWORD);
  let userId = await getUserIdWithToken(tokenUser1);
  let userId2 = await getUserIdWithToken(tokenUser2);
  if (userId == 403) {
    await getEulaWithToken(tokenUser1);
    await createUserWithToken(tokenUser1);
  }
  if (userId2 == 403) {
    await getEulaWithToken(tokenUser2);
    await createUserWithToken(tokenUser2);
  }
  let preferences = await getPreferences(userId, tokenUser1);
  let tenantId = await jp.query(
    preferences,
    "$..preferences.lastAccessedTenantId"
  )[0];
  if(tenantId==undefined){
    let org = await createOrganization(tokenUser1, "Test Automation Org", "Automatic World","Organization generated automatically","Private")
    tenantId = org.id
  }
  await accessRequest(tenantId, tenantId, tokenUser2);
  await approveAccessRequest(tenantId, tokenUser1, role);
};

export var joinRequest = async (user: string) => {
  let tokenUser1 = await getToken5(process.env.USERNAME, process.env.PASSWORD);
  let tokenUser2 = await getToken5(user, process.env.PASSWORD);
  let userId = await getUserIdWithToken(tokenUser1);
  let preferences = await getPreferences(userId, tokenUser1);
  let tenantId = await jp.query(
    preferences,
    "$..preferences.lastAccessedTenantId"
  )[0];
  await accessRequest(tenantId, tenantId, tokenUser2);
};
