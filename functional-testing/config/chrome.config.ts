import {BaseConfig} from "./wdio.conf";
/*
*   Notes:
*      driver is installed by chromedriver in lib/chromedriver of module folder.
*
* */

const ChromeOptions: WebdriverIO.Config = {
    path: '/',
    port: 9515, // default for ChromeDriver
    services: ['chromedriver'],
    //@ts-ignore
    chromeDriverLogs: './logs'

    
};



const ChromeConfig = {
    capabilities: [
        {
            // Set maxInstances to 1 if screen recordings are enabled:
            maxInstances: 1,
            browserName  : 'chrome',
            'goog:chromeOptions': {
                excludeSwitches: ['enable-logging'],
                args: ['--start-maximized',]
            }
        }
    ],
    suites: {
        api: ['../../functional-testing/features/API/*.feature'],
        apinotification: ['../../functional-testing/features/back/notification_service.feature'],
        accessrequest: ['../../functional-testing/features/API/request_access.feature'],
        apiinvitation: ['../../functional-testing/features/back/userInvitation.feature'],
        login: ['../../functional-testing/features/syntheticTrx/common_services_login.feature'],
        vault: ['../../functional-testing/features/syntheticTrx/launch_services.feature'],
        topBar: ['../../functional-testing/features/E2E/top_bar.feature'],
        syntheticTrx: ['../../functional-testing/features/syntheticTrx/*.feature'],
        invitationsManagement: ['../../functional-testing/features/syntheticTrx/invitations_management.feature'],
        createOrg: ['../../functional-testing/features/syntheticTrx/create_organization.feature'],
        join: ['../../functional-testing/features/syntheticTrx/join_request.feature'],
        accessManagement: ['../../functional-testing/features/syntheticTrx/access_management.feature']
    },

   
};
const config = Object.assign({}, BaseConfig,ChromeOptions,ChromeConfig);
export  {config, ChromeOptions, ChromeConfig} ;