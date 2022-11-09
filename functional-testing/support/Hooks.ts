import { Before, After } from '@wdio/cucumber-framework';
import {AccesManagement} from '../src/pages/AccessManagement';
import {ApproveUser} from '../src/pages/ApproveUser';
import {Eula} from '../src/pages/Eula';
import {ExternalAccount} from '../src/pages/ExternalAccount';
import {HomePage} from '../src/pages/HomePage';
import {IndexPage} from '../src/pages/IndexPage';
import {MenuHomePage} from '../src/pages/menuHomePage';
import {Organization} from '../src/pages/Organization';
import {TopBar} from '../src/pages/TopBar';
import {Question} from '../src/globalTasks/Question';
import {Action} from '../src/globalTasks/Action';
import { InviteUsers } from '../src/pages/InviteUsers';
import { InvitationManagement } from '../src/pages/InvitationManagement';
import { Notification } from '../src/pages/Notification';
import { Entitlements } from '../src/pages/Entitlements';
import { Provisioning } from '../src/pages/Provisioning';
import cucumberJson from 'wdio-cucumberjs-json-reporter';

export let accesManagement: AccesManagement;
export let approveUser: ApproveUser;
export let eula: Eula;
export let externalAccount: ExternalAccount;
export let homePage: HomePage;
export let indexPage: IndexPage;
export let menuhomepage: MenuHomePage;
export let organization: Organization;
export let topBar: TopBar;
export let question: Question;
export let action: Action;
export let inviteUsersPage: InviteUsers;
export let invitationManagementPage: InvitationManagement;
export let notification: Notification;
export let entitlements: Entitlements;
export let provisioning: Provisioning;

Before(async (scenario) => {
    //@ts-ignore
    cucumberJson.attach({"testStartedAt": new Date()}, 'application/json')
    console.log("\n" + scenario.pickle.name + ": ")
    accesManagement = new AccesManagement();
    approveUser = new ApproveUser();
    eula = new Eula();
    externalAccount = new ExternalAccount();
    homePage = new HomePage();
    indexPage = new IndexPage();
    topBar = new TopBar();
    menuhomepage = new MenuHomePage();
    organization = new Organization();
    accesManagement = new AccesManagement();
    question = new Question();
    inviteUsersPage = new InviteUsers();
    invitationManagementPage = new InvitationManagement();
    notification = new Notification();
    entitlements = new Entitlements();
    provisioning = new Provisioning();
    action = new Action();

})

Before('@Test', async()=>{
    console.log('Test tag')
})

After(async(scenario) => {
    //@ts-ignore
    cucumberJson.attach({"testFinalizedAt": new Date()}, 'application/json')
    if(scenario.result.status == 'PASSED'){
        return;
    }
    cucumberJson.attach(await browser.takeScreenshot(), 'image/png')
})

/*
After(async function (scenario){
    var duration = (scenario.result.duration/10e8);
    myLogger.logIntoSplunk(scenario.result.status,scenario.pickle.name,duration)
    await browser.sleep(1500)
});
*/