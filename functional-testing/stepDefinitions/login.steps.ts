import { When, After, Then } from '@wdio/cucumber-framework';
import { auth0Page, homePage, ftraPage, vaultPage } from '../support/Hooks'
import cucumberJson from 'wdio-cucumberjs-json-reporter';

// It can be used either regex or strings
When(/^the user types the credentials$/, async() => {
    await auth0Page.submitForm(process.env.USERNAME_APP,process.env.TESTUSERS_PASSWORD)
})

When("the user accesses the Vault", async() => {
    await homePage.accessVault();
})

When(/^the user accesses the FTRA app$/, async() => {
    await homePage.accessFTRA();
})

Then(/^the FTRA app is opened$/, async() => {
    await browser.pause(2000)
    await browser.switchWindow('Operation Hub')
    await expect(ftraPage.searchField).toBeExisting()
    await browser.switchWindow('FactoryTalk Hub')
    await browser.pause(1000)
    await expect(homePage.rubikIcon).toBeExisting    
})

Then(/^the Vault app is opened$/, async() => {
    await browser.pause(2000)
    await browser.switchWindow('Design Hub')
    await expect(vaultPage.inputField).toBeExisting();
    await browser.switchWindow('FactoryTalk Hub')
    await browser.pause(1000)
    await expect(homePage.rubikIcon).toBeExisting    
})

After(async(scenario) => {
    if(scenario.result.status == 'PASSED'){
        return;
    }
    cucumberJson.attach(await browser.takeScreenshot(), 'image/png')
})