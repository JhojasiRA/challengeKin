import { getToken5 } from "../Token";
import {
  createUserWithToken,
  getEula,
  getPreferences,
  getUserIdWithToken,
} from "./Users";
import { accessRequest, approveAccessRequest } from "./AccesRequest";

var jp = require("jsonpath");

export var joinLastaccessedTenant = async (user: string, role: string) => {
  let tokenUser1 = await getToken5(process.env.USERNAME, process.env.PASSWORD);
  let tokenUser2 = await getToken5(user, process.env.PASSWORD);
  let userId = await getUserIdWithToken(tokenUser1);
  let userId2 = await getUserIdWithToken(tokenUser2);
  if (userId2 == 403) {
    await getEula();
    await createUserWithToken(tokenUser2);
  }
  let preferences = await getPreferences(userId, tokenUser1);
  let tenantId = await jp.query(
    preferences,
    "$..preferences.lastAccessedTenantId"
  )[0];
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
