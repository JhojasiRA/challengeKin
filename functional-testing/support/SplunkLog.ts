const splunkLogging = require('splunk-logging')

var os = require("os");

var logIntoSplunk = async (result:string, name:string, duration:number,feature, failedStep : string = null, exception : string = null, app:string, timeStamp:string, browserExecution: string, suite: string) => {
    var splunkLogger = splunkLogging.Logger;
    var typeOfTest: string = suite;
    var testType: string;
    if(typeOfTest==='e2eregression'){testType='E2E'}else{testType='Synthetic transaction'}
    var config = {
        token: process.env.SPLUNK_TOKEN,
        url: process.env.SPLUNK_HOST,
        port: '443'
    };
    let logger = new splunkLogger(config);
    var sev = 'info'
    var finalMessage
    finalMessage = {
        testType: testType,
        app: app,
        timeStamp: timeStamp,
        feature: feature,
        testResult: result,
        testName: name,
        durationSeconds: duration,
        browserName: browserExecution
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
            source: "protractorframework",
            sourcetype: "httpevent",
            host: hostname,  
        },
        severity: sev
    };

    console.log("\nSending payload: \n", payload);
    await logger.send(payload);
    return console.log('Sent')
}

export var logJSONresults = async(jsonFolderPath: string, app: string, timeStamp: string, suite: string) =>{
    let jsonRegex = new RegExp(/(.*).json/g);
    let fs = require('fs');
    var path = require('path')
    let filesList = await fs.readdirSync(jsonFolderPath)
    let jsonFilesList = await filesList.filter(x => x.match(jsonRegex))

    for(let n = 0; n < jsonFilesList.length; n++){
        const json = require(path.join(jsonFolderPath,jsonFilesList[n]));
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
                let stepFailed = null
                let exception = null
                for(let k = 0; k<scenario.steps.length; k++){
                    let step = scenario.steps[k]
                    if(step.result.status == 'failed'){
                        scenarioResult = 'failed'
                        stepFailed = step.keyword + (step.name? step.name : "")
                        exception = await parseErrorMessage(step.result.error_message)
                    }
                    scenarioDuration = (step.result.duration) ? scenarioDuration+=step.result.duration : scenarioDuration
                }
                scenarioDuration = scenarioDuration/10e8
                await logIntoSplunk(scenarioResult, scenarioName, scenarioDuration, featureName, stepFailed, exception, app, timeStamp, json[i].metadata.browser.name, suite)
                await new Promise(r => setTimeout(r, 500));
            }
        }
    }
    
}