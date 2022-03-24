# LeMans Testing Automation - Template
This repo contains a template for start a testing automation project based on the [framework defined](https://rockwellautomation.atlassian.net/wiki/spaces/RLD/pages/1258029272/Test+Automation+Strategy) for the Le Mans project
## GitFlow
When you've tested changes in your own branch. You must then create a Pull Request to test, merge and deploy your changes to the develop branch.

### Branches

| Branch    | Description                                                               | URL                                              |
| --------- | ------------------------------------------------------------------------- | ------------------------------------------------ |
| `develop` | Deploy to the Sandbox/FFA subscription.                                   | ```Sandbox app URL``` |
| `release` | Deploy to Non-production, and automatically create a tagged `prerelease`. | ```Non-production app URL```|
| `master`  | Deploy to Production, and automaticall create a tagged release.           | ```Production app URL```|

What you merge to `develop`, `release` and `master` is tested and deployed automatically -- Tagging is performed automatically on successful deployments for `release` and `master`! Pull Requests and code review are important toll-gates to deployment, but if you label your PR with the `automerge` label, then the branch will be automatically merged once all checks and reviews have been completed.

### Release strategy

The release strategy for the testing automation repositories must be aligned to the release strategy of the corresponding development team. This [confluence page](https://rockwellautomation.atlassian.net/wiki/spaces/RLD/pages/2216398462/Built-in+Quality) has an example of how it can be managed.

## General description
This repo hosts all the tools and frameworks used for executing and automating tests that will run on any application of the Le Mans. It applies the framework defined in the Le Mans testing strategy. It also hosts a couple of automated tests that log into FT Hub Home page and access the FT Remote Access and FT Vault apps.

## How to run the automated tests locally

You will need to have [NodeJS 16.x](https://nodejs.org/es/download/)

1. Run the next command (bash console is highly recommended) in the `Template-WDIO-TestingAutomation` folder to install the required dependencies and update the webdriver manager.
    ``` bash
    npm install
    ```

2. As it is stated in the `package.json` file, there are different scripts defined for running the tests. Those are the ones listed below the line 6.

4. Run `npm run SCRIPT` where *SCRIPT* corresponds to one of the options detailed in previous numeral. For example:
    ``` bash
    npm run chrome
    ```
    This will run `chrome` config protractor file (windowed). However, we still need to set the needed environment variables.

3. **Setting up environment variables:** The template project make use of 5 enviroment variables
    - `TESTUSERS_PASSWORD`: Password of the user that will log in
    - `SPLUNK_HOST`: Splunk endpoint to report cucumber json results
    - `STEPS_TIMEOUT`: Timeout for a cucumber step to be completed [miliseconds] (default is 30000)
    - `ELEMENTS_TIMEOUT`: Timeout used when waiting for an element [miliseconds] (default is 60000)
    - `USERNAME_APP`: Username of the user that will login.
    - `HOME_URL`: FT Hub Home URL
    - `SPLUNK_TOKEN`: Token for logging cucumber json results into Splunk

    Once we define the variables, the final command to run in **Bash** would be something like this:
    ``` bash
    HOME_URL=https://home.lemans-sandbox.rockwellautomation.com SPLUNK_HOST=http-inputs-ra.splunkcloud.com SPLUNK_TOKEN=TH1S-15-4-DUMMY-TOKEN STEPS_TIMEOUT=60000 ELEMENTS_TIMEOUT=30000 USERNAME_APP=tester1 TESTUSERS_PASSWORD=tester1Password npm run chrome
    ```
### How to debug the automation scripts with VSCode
If you already have a `launch.json` file in the `.vscode`, skip the next 3 steps

1. Go to *"Run and Debug"* section in VSCode (Ctrl+Shift+D)
2. Click on *"create a launch.json file"*
3. Select *"Node.js"*

The `launch.json` file should look like this

``` javascript

{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
"version": "0.2.0",
    "configurations": [
        {
            "name": "Debug sandbox",
            "type": "node",
            "request": "launch",
            "args": ["functional-testing/config/${input:configname}.config.ts", "--cucumberOpts.tagExpression", "${input:tag}"],
            "cwd": "${workspaceFolder}",
            "autoAttachChildProcesses": true,
            "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
            "console": "externalTerminal",
            "internalConsoleOptions": "openOnSessionStart",
            "skipFiles": [
                "${workspaceFolder}/node_modules/**/*.js",
                "${workspaceFolder}/lib/**/*.js",
                "<node_internals>/**/*.js"
            ],
            "env":{
                "ELEMENTS_TIMEOUT": "30000",
                "STEPS_TIMEOUT": "60000",
                "SPLUNK_HOST":"http-inputs-ra.splunkcloud.com",
                "SPLUNK_TOKEN":"BC52A2C6-44D3-44AC-9A72-1EE326278672",
                "USERNAME":"testuser20@rockwellautomation.com",
                "PASSWORD":"Lr53B3yds",
                "AUTH0_URL":"https://factorytalkhub.us.auth0.com",
                "HOME_URL":"https://home.lemans-sandbox.rockwellautomation.com",
                "IS_URL": "https://factorytalkhub.us.auth0.com/oauth/token",
                "API_CS": "https://common.lemans-sandbox.rockwellautomation.com",
                "URL_NOTIF": "https://api-notifications.lemans-sandbox.rockwellautomation.com",
                "CLIENT_SECRET": "2DzuchrxHhUSueR87yAEO6BqiPHxHV_ma6yx9EdlsLoYQxAqkYTBLPzj2sc8i2PI"
            },
        },

        {
            "name": "Debug nonprod",
            "type": "node",
            "request": "launch",
            "args": ["functional-testing/config/${input:configname}.config.ts", "--cucumberOpts.tagExpression", "${input:tag}"],
            "cwd": "${workspaceFolder}",
            "autoAttachChildProcesses": true,
            "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
            "console": "externalTerminal",
            "internalConsoleOptions": "openOnSessionStart",
            "skipFiles": [
                "${workspaceFolder}/node_modules/**/*.js",
                "${workspaceFolder}/lib/**/*.js",
                "<node_internals>/**/*.js"
            ],
            "env":{
                "ELEMENTS_TIMEOUT": "30000",
                "STEPS_TIMEOUT": "60000",
                "SPLUNK_HOST":"http-inputs-ra.splunkcloud.com",
                "SPLUNK_TOKEN":"BC52A2C6-44D3-44AC-9A72-1EE326278672",
                "USERNAME":"[USERNAME]",
                "PASSWORD":"[PASSWORD]",
                "AUTH0_URL":"https://factorytalkhub.us.auth0.com",
                "HOME_URL":"https://home.cloud-dev.rockwellautomation.com",
                "IS_URL": "https://factorytalkhub.us.auth0.com/oauth/token",
                "API_CS": "https://common.cloud-dev.rockwellautomation.com",
                "URL_NOTIF": "https://api-notifications.lemans-sandbox.rockwellautomation.com",
                "CLIENT_SECRET": "2DzuchrxHhUSueR87yAEO6BqiPHxHV_ma6yx9EdlsLoYQxAqkYTBLPzj2sc8i2PI"
            },
        },
        {
            "name": "Debug prod",
            "type": "node",
            "request": "launch",
            "args": ["functional-testing/config/${input:configname}.config.ts", "--cucumberOpts.tagExpression", "${input:tag}"],
            "cwd": "${workspaceFolder}",
            "autoAttachChildProcesses": true,
            "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
            "console": "externalTerminal",
            "internalConsoleOptions": "openOnSessionStart",
            "skipFiles": [
                "${workspaceFolder}/node_modules/**/*.js",
                "${workspaceFolder}/lib/**/*.js",
                "<node_internals>/**/*.js"
            ],
            "env":{
                "ELEMENTS_TIMEOUT": "30000",
                "STEPS_TIMEOUT": "60000",
                "SPLUNK_HOST":"http-inputs-ra.splunkcloud.com",
                "SPLUNK_TOKEN":"BC52A2C6-44D3-44AC-9A72-1EE326278672",
                "USERNAME":"[USERNAME]",
                "PASSWORD":"[PASSWORD]",
                "AUTH0_URL":"https://factorytalkhub.us.auth0.com",
                "HOME_URL":"https://home.cloud.rockwellautomation.com",
                "IS_URL": "https://factorytalkhub.us.auth0.com/oauth/token",
                "URL_NOTIF": "https://api-notifications.lemans-sandbox.rockwellautomation.com",
                "CLIENT_SECRET": "2DzuchrxHhUSueR87yAEO6BqiPHxHV_ma6yx9EdlsLoYQxAqkYTBLPzj2sc8i2PI"
            },
        },
    ],
    "inputs": [
        {
            "type": "pickString",
            "id": "configname",
            "description": "What config?",
            "options": [
                "chrome",
                "chrome.headless",
                "grid",
            ],
            "default": "chrome"
        },
        {
            "type": "pickString",
            "id": "tag",
            "description": "What tag?",
            "options": [
                "@Test",
                "@invitationManagement"
            ],
            "default": ""
        }
    ]
}

```

This `launch.json` example file will allow you to choose in which environment you want to run the tests, the config file you would like to execute and it will ask you for a certain tag you want to execute in case you have your suites organized by tags. In this case, we only use the `@Test` tag.

When you correctly set up the `launch.json` file, follow the next steps

1. Go again to *"Run and debug"*
2. On the right of the *play* green button, there is a list dropdown
3. Select *"debug sandbox"* on that dropdown (or the environment in which you want to run the tests)
4. Click on the *play* green button to start debug execution.
5. Select the config file you want to execute. For demoing, we suggest to select *"chrome"*
6. Select the tag you want to execute. For demoing, we suggest to select *""* (the empty option)

This will open a new *cmd* window where the execution logs are shown. This will also allow you to put breakpoints in the code and make the script debugging easier.

## How to run the tests in your local Docker

1. Set environment variables in the Dockerfile
2. Run the next commands to build and run the image. Once the image is ran, you can have access to the container CLI directly.
    ``` bash
    docker build -t imagename .
    docker run -it imagename bash
    ```
3. Run the command defined in 3's last section. **NOTE: Containers only supports headless mode. For this reason, run the command `npm run chrome.headless` inside the container**

