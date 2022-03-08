import { BaseConfig } from "./wdio.conf";



const GridConfig = {
    hostname: "192.168.1.105",
    port: 4444,
    path: '/wd/hub',
    protocol: 'http',
    //runner: 'local',
    maxInstances: 2,
    capabilities: [
        {
    
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: 1,
        //
        browserName: 'chrome',
        'goog:chromeOptions': {
        //     args: ['--headless','--disable-gpu','--window-size=2000,1024','--disable-infobars','--disable-dev-shm-usage','--no-sandbox']
            args: ['--start-maximized',]
        },
        acceptInsecureCerts: true
        // If outputDir is provided WebdriverIO can capture driver session logs
        // it is possible to configure which logTypes to include/exclude.
        // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
        // excludeDriverLogs: ['bugreport', 'server'],
        },
    {
        maxInstances: 1,
        browserName:'firefox',
        'moz:firefoxOptions':{
            args:['-start-maximized']
        //     args:['-headless','--disable-gpu','--window-size=2000,1024','--disable-infobars','--disable-dev-shm-usage','--no-sandbox']
        }

    },
    {
        maxInstances: 1,
        browserName:'MicrosoftEdge',
        'ms:edgeOptions':{
            args:['--start-maximized']
        //     args:['-headless','--disable-gpu','--window-size=2000,1024','--disable-infobars','--disable-dev-shm-usage','--no-sandbox']
        }
    }
    ]
};
const config = Object.assign({}, BaseConfig, GridConfig);
export  {config, GridConfig} ;