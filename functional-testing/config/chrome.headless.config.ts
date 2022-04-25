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
                args: [
                    "--no-sandbox",
                    "--disable-dev-shm-usage", // https://stackoverflow.com/a/50725918/1689770
                    "--disable-browser-side-navigation", // https://stackoverflow.com/a/49123152/1689770
                    '--disable-infobars',
                    '--headless',
                    '--disable-gpu',
                    '--disable-popup-blocking',
                    '--no-default-browser-check',
                ],
            }
        }
    ]
};
const config = Object.assign({}, BaseConfig,ChromeOptions,ChromeConfig);
export  {config, ChromeOptions, ChromeConfig} ;