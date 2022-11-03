import { When, Then } from '@cucumber/cucumber'
import { homePage, question, menuhomepage } from '../../support/Hooks';


When('the user filters by all cards', async() =>  {
    await menuhomepage.indexOption();
    await homePage.clickAllAppsTab()
});

When('the user filters by design hub cards', async() =>  {
    await homePage.clickDesignHubTab()
});

When('the user filters by operation hub cards', async() =>  {
    await homePage.clickOperationsHubTab()
});

When('the user filters by maintenance hub cards', async() =>  {
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