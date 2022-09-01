import { BaseConfig } from "./wdio.conf"


const EdgeConfig = {
    services: ['edgedriver'],
    path: '/',
    //hostname: "localhost",
    //port: 4444,
    port: 17556, // default for EdgeDriver
    //path: '/wd/hub',
    protocol: 'http',
    capabilities: [
        {
        maxInstances: 1,
        browserName: 'MicrosoftEdge',
        acceptInsecureCerts : true,
        'ms:edgeOptions':{
            args: ['--disable-gpu','--disable-popup-blocking', '--no-default-browser-check','--no-sandbox', 'start-maximized'],
            prefs: { 
                credentials_enable_service: false },
        }
    }
]
}

const config = Object.assign({}, BaseConfig, EdgeConfig)
export {config, EdgeConfig}