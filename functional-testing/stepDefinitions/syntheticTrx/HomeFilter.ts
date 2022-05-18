import { When, Then } from '@cucumber/cucumber'
import { homePage, question } from '../../support/Hooks';


When('the user filter by all cards', async() =>  {
  await homePage.clickAllAppsTab()
});

When('the user filter by design hub cards', async() =>  {
    await homePage.clickDesignHubTab()
});

When('the user filter by operation hub cards', async() =>  {
    await homePage.clickOperationsHubTab()
});

When('the user filter by maintenance hub cards', async() =>  {
    await homePage.clickMaintenanceHubTab()
});

Then('user should see all the service cards currently available', async() => {
    await question.checkServicesVisible("apps")
})

Then('user should see the service cards associated with design hub', async() => {
    await question.checkServicesVisible("designHub")
})

Then('user should see the service cards associated with operation hub', async() => {
    await question.checkServicesVisible("operationsHub")
})

Then('user should see the service cards associated with maintenance hub', async() => {
    await question.checkServicesVisible("maintenanceHub")
})