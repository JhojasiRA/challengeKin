import { BaseConfig } from "./wdio.conf"


const FirefoxConfig = {
    path: '/wd/hub',
    hostname: process.env.HOSTNAME,
    port: parseInt(process.env.PORT),
    protocol: 'http',
    capabilities: [{​
        maxInstances: parseInt(process.env.MAX_INSTANCES),
        browserName: 'firefox',
        acceptInsecureCerts : true,
        'moz:firefoxOptions': {
            args: [],
            prefs: { credentials_enable_service: false
            }
        }
    },]
}


const config = Object.assign({}, BaseConfig, FirefoxConfig)
export {config, FirefoxConfig}