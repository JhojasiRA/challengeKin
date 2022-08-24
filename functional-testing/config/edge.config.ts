import { BaseConfig } from "./wdio.conf"


const EdgeConfig = {
    hostname: "localhost",
    port: 4444,
    path: '/wd/hub',
    protocol: 'http',
    capabilities: [
        {
        maxInstances: 1,
        browserName: 'MicrosoftEdge',
        acceptInsecureCerts : true,
        'ms:edgeOptions':{
            args: ['start-maximized'],
            prefs: { 
                credentials_enable_service: false },
        }
    }
]
}

const config = Object.assign({}, BaseConfig, EdgeConfig)
export {config, EdgeConfig}