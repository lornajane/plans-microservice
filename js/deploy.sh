#!/bin/bash

bx wsk package update plans-api --param postgres_url $POSTGRES_URL

cd get-plans
zip -rq get-plans.zip index.js node_modules
bx wsk action update --kind nodejs:6 --web raw plans-api/get-plans get-plans.zip
bx wsk api create /plans GET plans-api/get-plans --response-type http
cd ..


