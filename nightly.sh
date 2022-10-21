#!/usr/bin/env bash
output=$(node generateNightlyQTestResources.js)
echo $output
npx wdio functional-testing/config/chromeGrid.config.ts --cucumberOpts.tagExpression="@SyntheticTrx" --testcycle=$output
