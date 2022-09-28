import { When } from '@cucumber/cucumber'
import MailosaurClient = require('mailosaur');
import { indexPage,topBar,externalAccount } from '../../support/Hooks';

//const MailosaurClient = require('mailosaur')
//const API_KEY = 'BWgGLl6gHnHGektK';
const mailosaur = new MailosaurClient('BWgGLl6gHnHGektK')
const serverId = 'hfdfqcah';
// const serverDomain = 'hfdfqcah.mailosaur.net';


When('Mailosaur gets the invitation URL and navigate the url', async () => {
      // user to invite from mailosaur client. User should already have a myRockwell account
        const inviteEmail = 'mailosaur-test1@hfdfqcah.mailosaur.net';
        const searchCriteria = {
          sentTo: inviteEmail,
        };
    const message = await mailosaur.messages.get(serverId, searchCriteria);
    const joinNowLink = message.html.links[0];  //'Join now' link 

    console.log("Invit URL: " + joinNowLink.href);

    await browser.pause(3000);
    await topBar.signOutOption();

    await indexPage.openInvitUrl(joinNowLink.href);
    await indexPage.goToSignIn();
    await externalAccount.submitForm("tester3","Lr43B3yds");
    await browser.pause(20000);
    
   // await browser.newWindow(joinNowLink.href)
   // await t.navigateTo(joinNowLink.href);
   // await expect(joinNowLink.text).contains('Join now', `wrong link: ${joinNowLink.text}`);

});