import {When, Then } from '@cucumber/cucumber'
import { topBar,question } from '../../support/Hooks';

When('the user switchs from {string} to {string}', async(newOrgName:string,orgName:string) => {
    await topBar.switchOrganization(newOrgName,orgName);
});
Then('the user should see {string} profile on the navBar', async(organizationNavBarName) => {
    await question.assertElementText(topBar.getOrganizationName(),organizationNavBarName);
  });