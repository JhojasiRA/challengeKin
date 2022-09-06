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
            // One 'args' should be always commented, args: [] is mainly used locally for debugging
            // args: ['-headless'],
            args: ['--disable-gpu','--disable-popup-blocking', '--no-default-browser-check','--no-sandbox', 'start-maximized'],

            prefs: { credentials_enable_service: false }
        }
    }]
}


const config = Object.assign({}, BaseConfig, FirefoxConfig)
export {config, FirefoxConfig}