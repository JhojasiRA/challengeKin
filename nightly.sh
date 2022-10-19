#!/usr/bin/env bash
output=$(node generateNightlyQTestResources.js)
echo $output
npx wdio functional-testing/config/parallel.chrome.config.ts --cucumberOpts.tagExpression="not @NotParallel" --parallel=true --testcycle=$output
MAX_INSTANCES=1 npx wdio functional-testing/config/parallel.chrome.config.ts --cucumberOpts.tagExpression="@NotParallel" --testcycle=$output