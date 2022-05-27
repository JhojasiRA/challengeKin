const splunkLogging = require('splunk-logging')

var os = require("os");

/**
 * Prepares the payload that will be sent to Splunk and send the log using the library 'splunk-logging'. The method analyzes the parameters and creates the payload based on:
 * The argument used for executing the test 'suite'. Defines which type of test is running
 * If the test failed, the exception and the failed step is added to the payload
 * The hostname is obtained based on the OS that is running the test
 * @param {string} result Test result: it can be passed or failed
 * @param name Name of the scenario
 * @param duration Duration in seconds
 * @param feature Name of the feature
 * @param failedStep Step where the test failed
 * @param exception Exception thrown by the test runner
 * @param app Application that is under test
 * @param timeStamp Exact timestamp in which the logs will be sent
 * @param browserExecution Browser in which the tests were execute
 * @param suite Suite that the test is executing, it is related to the tag argument sent in to the test runner
 */
 var logIntoSplunk = async (result: string, 
    name: string, duration: number, 
    feature: string, failedStep :string = null, 
    exception: string = null, app: string, 
    timeStamp: string, browserExecution: string, 
    suite: string,
    testStartedAt: string,
    testFinalizedAt: string) => {
        var splunkLogger = splunkLogging.Logger;
        var config = {
            token: process.env.SPLUNK_TOKEN,
            url: process.env.SPLUNK_HOST,
            port: '443'
        };
        let logger = new splunkLogger(config);
        var sev = 'info'
        var finalMessage
        finalMessage = {
            suite: suite,
            app: app,
            timeStamp: timeStamp,
            feature: feature,
            testResult: result,
            testName: name,
            durationSeconds: duration,
            browserName: browserExecution,
            testFinalizedAt: testFinalizedAt,
            testStartedAt: testStartedAt
        }
        if (result=='failed') {
            finalMessage['failedStep'] = failedStep
            finalMessage['exception'] = exception
            sev='error'
        }
        var hostname = os.hostname();
        var payload = {
            message: finalMessage,
            metadata: {
                source: "wdioframework",
                sourcetype: "httpevent",
                host: hostname,  
            },
        severity: sev
        };

    console.log("\nSending payload: \n", payload);
    await logger.send(payload);
}

/**
 * Iterates through all the cucumber-js JSON report files that are located in a path received as a parameter and parses each of these files for obtaining the test
 * results and sending them to Splunk. It iterates through each feature, then it iterates through each scenario of the feature and then through each step of the scenario.
 * If the step is shown as failed, the method parses the exception. Finally, it sends the parsed values to Splunk.
 * @param jsonFolderPath Path in which the cucumber-js JSON reports are located
 * @param app App that is being tested
 * @param timeStamp Timestamp in which the method was invoked
 * @param suite Suite that is executed
 */
 export var logJSONresults = async(jsonFolderPath: string, app: string, timeStamp: string, suite: string): Promise<void> =>{
    let jsonRegex = new RegExp(/(.*).json/g);
    let fs = require('fs');
    var path = require('path')
    let filesList = await fs.readdirSync(jsonFolderPath)
    let jsonFilesList = await filesList.filter(x => x.match(jsonRegex))

    for(let n = 0; n < jsonFilesList.length; n++){
        const json = require(path.join(jsonFolderPath,jsonFilesList[n]));
        /**
         * Splits the error message based on the char string 'at ' that is present in the traceback
         * @param error_message Error message that will be parsed
         * @returns {string} Parsed exception
         */
        var parseErrorMessage = async(error_message) => {
            let firstSplit = error_message.split("at ")
            return firstSplit[0].trim()
        }
        
        for(let i = 0; i<json.length; i++){
            let feature = json[i]
            let featureName = feature.name
            for(let j = 0; j<feature.elements.length; j++){
                let scenario = feature.elements[j]
                let scenarioDuration = 0;
                let scenarioResult = 'passed'
                let scenarioName = scenario.name
                let testStartedAt = findValueInScenario(scenario, "testStartedAt" ) 
                let testFinalizedAt = findValueInScenario(scenario, "testFinalizedAt" ) 
                let stepFailed = ""
                let exception = null
                for(let k = 0; k<scenario.steps.length; k++){
                    let step = scenario.steps[k]
                    if(step.result.status == 'failed'){
                        scenarioResult = 'failed'
                        stepFailed = step.keyword + " " +(step.name? step.name : "")
                        exception = await parseErrorMessage(step.result.error_message)
                    }
                    scenarioDuration = (step.result.duration) ? scenarioDuration+=step.result.duration : scenarioDuration
                }
                scenarioDuration = scenarioDuration/10e8
                await logIntoSplunk(scenarioResult, scenarioName, scenarioDuration, featureName, stepFailed, exception, app, timeStamp, json[i].metadata.browser.name, suite, testStartedAt, testFinalizedAt)
                await new Promise(r => setTimeout(r, 500));
            }
        }
    }
    
}

/**
 * Iterates through an object that represents an scneario in the Cucumber JSON report looking for a value that matches the key received by parameter
 * @param scenarioObject Object that represents an scenario in the Cucumber JSON report
 * @param key key name that the method will search
 * @returns {string} value of the key present in the object
 */
function findValueInScenario(scenarioObject: any, key: string) {
    var res;
    scenarioObject.steps.forEach(
        function(step) {
            if(step.embeddings != null){
                    var embeddings = step.embeddings;
                    embeddings.forEach(function(embed) {
                        if(embed.data[key] != null){
                            res = embed.data[key]
                        }
                    })
            }
        }
    )
    return res
}
