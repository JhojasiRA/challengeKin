import axios from 'axios'

export var sendResultsToqTest = async(jsonFolderPath) : Promise<void> => {
    let jsonRegex = new RegExp(/(.*).json/g);
    let fs = require('fs');
    var path = require('path')
    let filesList = await fs.readdirSync(jsonFolderPath)
    let jsonFilesList = await filesList.filter(x => x.match(jsonRegex))
    let results: any[] = []
    const argv = require("yargs").argv;

    for(let n = 0; n < jsonFilesList.length; n++){
        const json: any[] = require(path.join(jsonFolderPath,jsonFilesList[n]));
        results = [...results, ...json]
    }

    let payload = {
        projectId: process.env.QTEST_PROJECT_ID,
        testcycle: argv.testcycle,
        result: results
    }
    let response = await axios.post(process.env.QTEST_CUCUMBERJSON_WEBHOOK, payload, {maxBodyLength: Infinity, maxContentLength: Infinity},)
    console.log(response)
    console.log('Results sent to qTest')
}