const { generate } = require('multiple-cucumber-html-reporter');
const { removeSync } = require('fs-extra');
import { logJSONresults } from '../support/SplunkLog'

var intStepsTimeoutDefault = 60000;
let intStepsTimeout = process.env.STEPS_TIMEOUT !== undefined ? parseInt(process.env.STEPS_TIMEOUT) : intStepsTimeoutDefault;
intStepsTimeout = isNaN(global.intElementsTimeout) ? intStepsTimeoutDefault : intStepsTimeout;

export const BaseConfig: WebdriverIO.Config = {

    specs: [
        [
            'functional-testing/features/syntheticTrx/common_services_login.feature',
            'functional-testing/features/syntheticTrx/create_organization.feature',
            'functional-testing/features/syntheticTrx/join_request.feature',
            'functional-testing/features/syntheticTrx/access_management.feature',
            'functional-testingfeatures/syntheticTrx/launch_services.feature',
            'functional-testingfeatures/syntheticTrx/invitations_management.feature'
        ]

    ],

    exclude: [
    ],


    // host: "localhost",
    // port: 4444,
    // path: '/wd/hub',
    // protocol: 'http',
    // runner: 'local',


    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 1,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [
        {

            // maxInstances can get overwritten per capability. So if you have an in-house Selenium
            // grid with only 5 firefox instances available you can make sure that not more than
            // 5 instances get started at a time.
            maxInstances: 1,
        },
        // {
        //     maxInstances: 1,
        //     browserName:'firefox',
        //     'moz:firefoxOptions':{
        //         args:['-start-maximized']
        //     //     args:['-headless','--disable-gpu','--window-size=2000,1024','--disable-infobars','--disable-dev-shm-usage','--no-sandbox']
        //     }

        // },
        // {
        //     maxInstances: 1,
        //     browserName:'MicrosoftEdge',
        //     'ms:EdgeOptions':{
        //         args:['start-maximized']
        //     //     args:['-headless','--disable-gpu','--window-size=2000,1024','--disable-infobars','--disable-dev-shm-usage','--no-sandbox']
        //     }
        // }
    ],
    logLevel: 'error',
    bail: 0,
    waitforTimeout: 30000,
    connectionRetryTimeout: 60000,
    connectionRetryCount: 1,
    framework: 'cucumber',

    reporters: [
        "spec",
        ['cucumberjs-json', {
            jsonFolder: './reports/',
            language: 'en',
        },
        ],
    ],

    cucumberOpts: {
        require: ['functional-testing/stepDefinitions/*/*.ts'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        format: ['pretty'],
        snippets: true,
        source: true,
        profile: [],
        strict: false,
        tagExpression: '',
        timeout: intStepsTimeout,
        ignoreUndefinedDefinitions: false
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
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */

    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     * @param {String} cid worker id (e.g. 0-0)
     */

    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */

    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */

    /**
     * Cucumber Hooks
     *
     * Runs before a Cucumber Feature.
     * @param {String}                   uri      path to feature file
     * @param {GherkinDocument.IFeature} feature  Cucumber feature object
     */

    /**
     *
     * Runs before a Cucumber Scenario.
     * @param {ITestCaseHookParameter} world world object containing information on pickle and test step
     */

    /**
     *
     * Runs before a Cucumber Step.
     * @param {Pickle.IPickleStep} step     step data
     * @param {IPickle}            scenario scenario pickle
     */

    /**
     *
     * Runs after a Cucumber Step.
     * @param {Pickle.IPickleStep} step     step data
     * @param {IPickle}            scenario scenario pickle
     * @param {Object}             result   results object containing scenario results
     * @param {boolean}            result.passed   true if scenario has passed
     * @param {string}             result.error    error stack if scenario failed
     * @param {number}             result.duration duration of scenario in milliseconds
     */

    /**
     *
     * Runs before a Cucumber Scenario.
     * @param {ITestCaseHookParameter} world  world object containing information on pickle and test step
     * @param {Object}                 result results object containing scenario results
     * @param {boolean}                result.passed   true if scenario has passed
     * @param {string}                 result.error    error stack if scenario failed
     * @param {number}                 result.duration duration of scenario in milliseconds
     */
    //@ts-ignore
    afterScenario: async (world, result) => {
        await browser.reloadSession();
    },


    /**
     *
     * Runs after a Cucumber Feature.
     * @param {String}                   uri      path to feature file
     * @param {GherkinDocument.IFeature} feature  Cucumber feature object
     */


    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */

    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */

    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */

    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    //@ts-ignore
    onComplete: async () => {
        const path = require('path')
        //@ts-ignore
        // TODO: Set test type from execution
        await logJSONresults(path.join(process.cwd(), `reports`), `WDIO Template`, new Date().toUTCString(), process.argv[process.argv.length - 1])
            .then(() => { console.log(`Splunk logs sent`) })
            .catch((err) => console.log(`Splunk logs were not sent: ${err.message}`));

        await generate({
            jsonDir: './reports/',
            reportPath: './reports/',
            // for more options see https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
        });
    }

    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */

}