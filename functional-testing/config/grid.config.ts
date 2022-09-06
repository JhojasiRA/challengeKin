import {BaseConfig} from "./wdio.conf";

const ChromeOptions: WebdriverIO.Config = {
    hostname: process.env.HOSTNAME,
    port: parseInt(process.env.PORT), // default for ChromeDriver
    //services: ['chromedriver'],
    //@ts-ignore
    chromeDriverLogs: './logs'
};

const ChromeConfig = {
    path: '/wd/hub',
    protocol: 'http',
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
        },
        {
            maxInstances: parseInt(process.env.MAX_INSTANCES),
            browserName: 'MicrosoftEdge',
            acceptInsecureCerts : true,
            'ms:edgeOptions':{
                args: ['--disable-gpu','--disable-popup-blocking', '--no-default-browser-check','--no-sandbox', 'start-maximized'],
                prefs: { 
                    credentials_enable_service: false },
            }
        },
        {​
            maxInstances: parseInt(process.env.MAX_INSTANCES),
            browserName: 'firefox',
            acceptInsecureCerts : true,
            'moz:firefoxOptions': {
                args: ['--disable-gpu','--disable-popup-blocking', '--no-default-browser-check','--no-sandbox', 'start-maximized'],
                prefs: { credentials_enable_service: false }
            }
        }
    ]
    
};
const config = Object.assign({}, BaseConfig,ChromeOptions,ChromeConfig);
export  {config, ChromeOptions, ChromeConfig} ;