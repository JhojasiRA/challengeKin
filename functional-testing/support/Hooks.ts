import { Before, After } from '@wdio/cucumber-framework';
import { HomePage } from '../src/pages/HomePage';
import { IndexPage } from '../src/pages/IndexPage';
import { LoginPage } from '../src/pages/LoginPage';
import { SecurePage } from '../src/pages/SecurePage';
import { Auth0Page } from '../src/pages/Auth0Page';
import { FTRAPage } from '../src/pages/FTRAPage';
import { VaultPage } from '../src/pages/VaultPage';

import cucumberJson from 'wdio-cucumberjs-json-reporter';

export let auth0Page: Auth0Page;
export let indexPage: IndexPage;
export let loginPage: LoginPage;
export let homePage: HomePage;
export let securePage: SecurePage;
export let ftraPage: FTRAPage;
export let vaultPage: VaultPage;

Before(async(scenario) => {
    console.log("\n" + scenario.pickle.name +": ")
    auth0Page = new Auth0Page();
    indexPage = new IndexPage();
    loginPage = new LoginPage();
    homePage = new HomePage();
    securePage = new SecurePage();
    ftraPage = new FTRAPage();
    vaultPage = new VaultPage();

})

Before('@Test', async()=>{
    console.log('Test tag')
})

After(async(scenario) => {
    if(scenario.result.status == 'PASSED'){
        return;
    }
    cucumberJson.attach(await browser.takeScreenshot(), 'image/png')
})