#!/bin/bash

bx wsk package update plans-api --param postgres_url $POSTGRES_URL

cd get-plans
zip -rq get-plans.zip index.js node_modules
bx wsk action update --kind nodejs:6 --web raw plans-api/get-plans get-plans.zip
# set the API URL and for one endpoint only, put the URL as a package parameter
bx wsk api create /plans GET plans-api/get-plans --response-type http | tail -n1 | xargs bx wsk package update plans-api --param postgres_url $POSTGRES_URL --param base_url
bx wsk api create /plans POST plans-api/get-plans --response-type http
cd ..

cd write-plan
zip -rq write-plan.zip index.js node_modules
bx wsk action update --kind nodejs:6 --web raw plans-api/write-plan write-plan.zip
bx wsk api create /plans POST plans-api/write-plan --response-type http
cd ..


