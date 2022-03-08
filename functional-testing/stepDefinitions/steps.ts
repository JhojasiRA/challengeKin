import { Then } from '@wdio/cucumber-framework';
import { securePage, homePage } from '../support/Hooks'


Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect(securePage.flashAlert).toBeExisting();
    await expect(securePage.flashAlert).toHaveTextContaining(message);
});

Then(/^the user is redirected to the landpage$/, async() => {
    await expect(homePage.rubikIcon).toBeExisting();
})
