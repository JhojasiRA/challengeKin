import {BaseConfig} from "./wdio.conf";
/*
*   Notes:
*      driver is installed by chromedriver in lib/chromedriver of module folder.
*
* */

const ChromeOptions: WebdriverIO.Config = {
    hostname: process.env.HOSTNAME,
    port: parseInt(process.env.PORT), // default for ChromeDriver
    //services: ['chromedriver'],
    //@ts-ignore
    chromeDriverLogs: './logs'
};


const ChromeConfig = {
    capabilities: [
        {
            // Set maxInstances to 1 if screen recordings are enabled:
            maxInstances: parseInt(process.env.MAX_INSTANCES),
            browserName: 'chrome',
            acceptInsecureCerts : true,
            'goog:chromeOptions': {
                excludeSwitches: ['enable-logging'],
                args: [
                '--no-sandbox',
                '--disable-infobars',
                '--disable-gpu',
                'start-maximized',
                '--disable-dev-shm-usage',
                ]
            }
        },
        {
            maxInstances: parseInt(process.env.MAX_INSTANCES),
        browserName: 'firefox',
        acceptInsecureCerts : true,
        'moz:firefoxOptions': {
            // One 'args' should be always commented, args: [] is mainly used locally for debugging
            // args: ['-headless'],
            args: [],

            prefs: { credentials_enable_service: false }
        }
        }
    ]
    
};
const config = Object.assign({}, BaseConfig,ChromeOptions,ChromeConfig);
export  {config, ChromeOptions, ChromeConfig} ;