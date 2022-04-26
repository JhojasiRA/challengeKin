const { generate } = require('multiple-cucumber-html-reporter');
const { removeSync } = require('fs-extra');
import { logJSONresults } from '../support/SplunkLog'

var intStepsTimeoutDefault = 60000;
let intStepsTimeout = process.env.STEPS_TIMEOUT !== undefined ? parseInt(process.env.STEPS_TIMEOUT) : intStepsTimeoutDefault;
intStepsTimeout = isNaN(global.intElementsTimeout) ? intStepsTimeoutDefault : intStepsTimeout;

export const BaseConfig: WebdriverIO.Config = {
    specs: [
        [
            'functional-testing/features/syntheticTrx/*.feature',
            'functional-testing/features/API/*.feature',
        ]

    ],

    capabilities: [
        {
            maxInstances: 1,
        },
    ],

    maxInstances: 1,

    waitforTimeout: 30000,
    connectionRetryTimeout: 60000,

    framework: 'cucumber',

    logLevel: 'error',

    reporters: [
        'concise',
        'spec',
        ['cucumberjs-json', {
            jsonFolder: './reports/',
            language: 'en',
        },
        ],
    ],

    cucumberOpts: {
        require: ['functional-testing/stepDefinitions/*/*.ts'],
        backtrace: false,
        format: ['pretty'],
        snippets: true,
        source: true,
        profile: [],
        strict: false,
        tagExpression: '',
        timeout: intStepsTimeout,
        ignoreUndefinedDefinitions: true
    },
   /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    //@ts-ignore
    onPrepare: function (config, capabilities) {
        removeSync('./reports/');
    },

    //@ts-ignore
    afterScenario: async (world, result) => {
        await browser.reloadSession();
    },
    onComplete: async () => {
        const path = require('path')
        //@ts-ignore
        // TODO: Set test type from execution
        await logJSONresults(path.join(process.cwd(), `reports`), `CommonServices`, new Date().toUTCString(), process.argv[process.argv.length - 1])
            .then(() => { console.log(`Splunk logs sent`) })
            .catch((err) => console.log(`Splunk logs were not sent: ${err.message}`));

        await generate({
            jsonDir: './reports/',
            reportPath: './reports/',
            // for more options see https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
        });
    }

}
