import {BaseConfig} from "./wdio.conf";

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
        }
    ]
    
};
const config = Object.assign({}, BaseConfig,ChromeOptions,ChromeConfig);
export  {config, ChromeOptions, ChromeConfig} ;