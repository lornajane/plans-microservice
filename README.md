# Serverless Microservices: the Plans Microservices

This is a simple project to demonstrate use of serverless technology to build a couple of simple microservices (in JavaScript initially) to track the travel plans of a busy globetrotter.  Feel free to clone this repo and deploy the code yourself, and to use it as the basis for your own projects.

## Dependencies

You will need a PostgreSQL database for this code to work as-is.  I created mine on IBM Cloud using the following command:

`bx service create compose-for-postgresql Standard lj-plans-api`

Create some credentials for the new service:

`bx service key-create lj-plans-api creds1`

And then inspect them:

`bx service key-show lj-plans-api creds1`

Copy the URL and put it in an environment variable called `POSTGRES_URL` - `deploy.sh` expects this and will set the parameter on the package according (to be updated when we can bind services to packages)
