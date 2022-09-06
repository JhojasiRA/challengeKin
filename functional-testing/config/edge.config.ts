import { BaseConfig } from "./wdio.conf"


const EdgeConfig = {
    path: '/wd/hub',
    hostname: process.env.HOSTNAME,
    port: parseInt(process.env.PORT),
    protocol: 'http',
    capabilities: [
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
}

const config = Object.assign({}, BaseConfig, EdgeConfig)
export {config, EdgeConfig}