import { Given } from '@wdio/cucumber-framework';
import { indexPage } from '../support/Hooks'

Given(/^the user access the portal URL$/, async() => {
    await indexPage.open('')
    await indexPage.clickSignin();
})
