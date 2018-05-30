#!/bin/bash

ibmcloud wsk package update plans-api
ibmcloud wsk service bind compose-for-postgresql plans-api

cd get-plans
zip -rq get-plans.zip index.js node_modules
ibmcloud wsk action update --kind nodejs:8 --web raw plans-api/get-plans get-plans.zip
# set the API URL
ibmcloud wsk api create /plans GET plans-api/get-plans --response-type http
cd ..

cd write-plan
zip -rq write-plan.zip index.js node_modules
ibmcloud wsk action update --kind nodejs:6 --web raw plans-api/write-plan write-plan.zip
ibmcloud wsk api create /plans POST plans-api/write-plan --response-type http
cd ..


