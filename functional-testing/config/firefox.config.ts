import { BaseConfig } from "./wdio.conf"

const FirefoxConfig = {
    
    hostname: process.env.HOSTNAME,
    port: parseInt(process.env.PORT),
    path: '/wd/hub',
    protocol: 'http',
    services:[
        ['firefox-profile',{
            'security.insecure_field_warning.contextual.enabled': false,
            'security.certerrors.permanentOverride': false,
            'network.stricttransportsecurity.preloadlist': false,
            'security.enterprise_roots.enabled': true
        }]
    ],
    maxInstances: parseInt(process.env.MAX_INSTANCES),
    capabilities: [{​
        maxInstances: parseInt(process.env.MAX_INSTANCES),
        browserName: 'firefox',
        acceptInsecureCerts : true,
        'moz:firefoxOptions': {
            args: ['--no-sandbox',
            '--disable-infobars',
            '--disable-gpu',
            'start-maximized',
            '--disable-dev-shm-usage',
        ],
            prefs: { credentials_enable_service: false }
        }
    }]
}


const config = Object.assign({}, BaseConfig, FirefoxConfig)
export {config, FirefoxConfig}