#!bin/bash
set -xe

echo " Fetching the NPM Token from Secret Manager and storing it to npmrc file"
NPM_TOKEN=$(aws secretsmanager get-secret-value --secret-id npm_registry_token --region ap-southeast-1 | jq '.SecretString' | tr -d '"')
echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc

echo "######################################################################"
echo "    Installing Packages    "
echo "######################################################################"
npm ci

echo "######################################################################"
echo "    Lint Check    "
echo "######################################################################"
npm run lint

echo "######################################################################"
echo "    Executing Test cases    "
echo "######################################################################"
npm run test