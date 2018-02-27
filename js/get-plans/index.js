const pgp = require('pg-promise')();
var db;

function main(params) {
    return new Promise(function(resolve, reject) {
        console.log("get plans");
        var url = params.postgres_url;
        db = pgp(params.postgres_url, []);

        db.any("SELECT * FROM plans", [true])
            .then(function(data) {
                console.log(JSON.stringify(data));
                pgp.end();
                resolve({body: {plans: data}, statusCode: 200});
            })
            .catch(function(error) {
                console.log(error);
                pgp.end();
                reject({body: "An error occurred", statusCode: 400});
            });
    });
}

exports.main = main;
