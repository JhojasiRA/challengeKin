# LeMans Testing Automation Common services - Load and Performance Tests

## How to run k6 test locally

You will need to have K6 installed in your computer. [Get started](https://k6.io/docs/getting-started/installation/)

1. Run the next command in the `non-functional-testing` folder
    Here an example
    USER=tester2 PASSWORD= AUTH0_URL=https://factorytalkhub.us.auth0.com API_CS_URL=https://common.lemans-sandbox.rockwellautomation.com k6 run  getOrganization.js

