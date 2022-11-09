const { generate } = require('multiple-cucumber-html-reporter');
const { removeSync } = require('fs-extra');
import { logJSONresults } from '../support/SplunkLog'
import { sendResultsToqTest } from '../utils/SendResultsToqTest';

var intStepsTimeoutDefault = -1;
let intStepsTimeout = process.env.STEPS_TIMEOUT !== undefined ? parseInt(process.env.STEPS_TIMEOUT) : intStepsTimeoutDefault;
intStepsTimeout = isNaN(global.intElementsTimeout) ? intStepsTimeoutDefault : intStepsTimeout;
const jsonDirPath = './reports/';

export const BaseConfig: WebdriverIO.Config = {
    specs: [
        [
            'functional-testing/features/syntheticTrx/*.feature',
            'functional-testing/features/API/*.feature',
            'functional-testing/features/E2E/*.feature'
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
        let pathJson = jsonDirPath
        //@ts-ignore
        // TODO: Set test type from execution
        const argv = require("yargs").argv;
        let tagExecuted = argv.cucumberOpts.tagExpression != undefined ? argv.cucumberOpts.tagExpression : 'Not defined'
        await logJSONresults(path.join(process.cwd(), `reports`), `CommonServices`, new Date().toUTCString(), tagExecuted)
            .then(() => { console.log(`Splunk logs sent`) })
            .catch((err) => console.log(`Splunk logs were not sent: ${err.message}`));

        await generate({
            jsonDir: pathJson,
            reportPath: jsonDirPath,
        });

        if(process.env.SEND_REPORT_QTEST == "true") {await sendResultsToqTest(path.join(process.cwd(),`reports`))}

    }

}
