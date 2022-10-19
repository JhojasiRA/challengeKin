process.env.QTEST_TOKEN = `437558b4-83d4-4429-aa2f-bfd9599f2a3b`
process.env.QTEST_URL = `https://ra.qtestnet.com`

const axios = require('axios')

const config = {
    headers: {
        Authorization: `Bearer ${process.env.QTEST_TOKEN}`
    }
}

let generateNightlyQTestResources = async() => {

    let url = `${process.env.QTEST_URL}/api/v3/projects/${process.env.QTEST_PROJECT_ID}/releases`
    let getReleases = await axios.get(url, config)

    const RELEASES = getReleases.data

    let activeRelease = RELEASES.filter( (release) => {
        return release.properties.some( (el) => {
            return el.field_name === "Status" && el.field_value_name === "In Progress"
        })
    })

    let releaseId = activeRelease[0].id

    let today = new Date()
    let formattedDate = today.toLocaleDateString('es-CO')

    if(releaseId === undefined){
        parentId = 0
        parentType = 'root'
    }
    else {
        parentId = releaseId
        parentType = 'release'
    }

    url = `${process.env.QTEST_URL}/api/v3/projects/${process.env.QTEST_PROJECT_ID}/test-cycles?parentId=${parentId}&parentType=${parentType}`
    let getTestCycles = await axios.get(url,config)

    let testCycles = getTestCycles.data
    let nightlyTestCycle = testCycles.filter( x => x.name = "Nightly")
    let nightlyId

    if(nightlyTestCycle.length == 0){
        nightlyId = (await createTestCycleUnderParent({name: "Nightly", description: "Nightly executions"}, parentId, parentType)).data.id
    }
    else{
        nightlyId = nightlyTestCycle[0].id
    }

    let body = {
        name: `${formattedDate}`,
        description: `This is the test result for the nightly execution made in ${formattedDate}`
    }

    let createTestCycle = await createTestCycleUnderParent(body, nightlyId, 'test-cycle')
    console.log(createTestCycle.data.id)
}

let createTestCycleUnderParent = async(body, parentId, parentType) => {
    url = `${process.env.QTEST_URL}/api/v3/projects/${process.env.QTEST_PROJECT_ID}/test-cycles?parentId=${parentId}&parentType=${parentType}`
    return await axios.post(url, body, config)
}

try{
    generateNightlyQTestResources()
}
catch{
    console.log("3492384")
}