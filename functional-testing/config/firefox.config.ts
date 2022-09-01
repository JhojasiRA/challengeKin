import { BaseConfig } from "./wdio.conf"

const FirefoxConfig = {
    
    hostname: process.env.HOSTNAME,
    port: parseInt(process.env.PORT),
    path: '/wd/hub',
    protocol: 'http',
    capabilities: [{​
        maxInstances: parseInt(process.env.MAX_INSTANCES),
        browserName: 'firefox',
        acceptInsecureCerts : true,
        'moz:firefoxOptions': {
            args: ['--disable-gpu','--no-sandbox', 'start-maximized'],
            prefs: { credentials_enable_service: false }
        }
    }]
}


const config = Object.assign({}, BaseConfig, FirefoxConfig)
export {config, FirefoxConfig}