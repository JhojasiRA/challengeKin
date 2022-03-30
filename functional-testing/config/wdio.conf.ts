const { generate } = require('multiple-cucumber-html-reporter');
const { removeSync } = require('fs-extra');
//@ts-ignore
import { logJSONresults } from '../support/SplunkLog'

var intStepsTimeoutDefault = 60000;
let intStepsTimeout = process.env.STEPS_TIMEOUT !== undefined ? parseInt(process.env.STEPS_TIMEOUT) : intStepsTimeoutDefault;
intStepsTimeout = isNaN(global.intElementsTimeout) ? intStepsTimeoutDefault : intStepsTimeout;

export const BaseConfig: WebdriverIO.Config = {
    specs: [
        'functional-testing/features/*/*.feature'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 1,
    capabilities: [
        {
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
        // <string[]> (file/dir) require files before executing features
        require: ['functional-testing/stepDefinitions/*/*.ts'],
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        requireModule: [],
        // <boolean> invoke formatters without executing steps
        dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        format: ['pretty'],
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <string[]> (name) specify the profile to use
        profile: [],
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string> (expression) only execute the features or scenarios with tags matching the expression
        tagExpression: '@create',
        // <number> timeout for step definitions
        timeout: intStepsTimeout,
        // <boolean> Enable this config to treat undefined definitions as warnings.
        ignoreUndefinedDefinitions: false
    },
    
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
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
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     * @param {String} cid worker id (e.g. 0-0)
     */
    // beforeSession: function (config, capabilities, specs, cid) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    // before: function (capabilities, specs) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Cucumber Hooks
     *
     * Runs before a Cucumber Feature.
     * @param {String}                   uri      path to feature file
     * @param {GherkinDocument.IFeature} feature  Cucumber feature object
     */
    // beforeFeature: function (uri, feature) {
    // },
    /**
     *
     * Runs before a Cucumber Scenario.
     * @param {ITestCaseHookParameter} world world object containing information on pickle and test step
     */
    // beforeScenario: function (world) {
    // },
    /**
     *
     * Runs before a Cucumber Step.
     * @param {Pickle.IPickleStep} step     step data
     * @param {IPickle}            scenario scenario pickle
     */
    // beforeStep: function (step, scenario) {
    // },
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
    // afterStep: function (step, scenario, result) {
    // },
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
    afterScenario: async (world,result) => {
        await browser.reloadSession();
    },


    /**
     *
     * Runs after a Cucumber Feature.
     * @param {String}                   uri      path to feature file
     * @param {GherkinDocument.IFeature} feature  Cucumber feature object
     */
    // afterFeature: function (uri, feature) {
    // },
    
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    //@ts-ignore
    onComplete: async() => {
        const path = require('path')
        //@ts-ignore
        // TODO: Set test type from execution
        await logJSONresults(path.join(process.cwd(),`reports`), `WDIO Template`, new Date().toUTCString(), process.argv[process.argv.length - 1])
            .then(() => {console.log(`Splunk logs sent`)})
            .catch((err) => console.log(`Splunk logs were not sent: ${err.message}`));
        
        await generate({
            // Required
            // This part needs to be the same path where you store the JSON files
            // default = '.tmp/json/'
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
    //onReload: function(oldSessionId, newSessionId) {
    //}
}


