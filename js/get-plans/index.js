const pgp = require('pg-promise')();
var db;

function main(params) {
    return new Promise(function(resolve, reject) {
        console.log("get plans");
        var url = params.postgres_url;
        db = pgp(url, []);

        // one record or many?
        var plan_id;
        if(params.__ow_path) {
            var path_data = params.__ow_path.match(/^\/([0-9]+)/);
            plan_id = path_data[1];
        }

        if(plan_id) {
            db.any("SELECT * FROM plans WHERE plan_id = $1", [plan_id])
                .then(function(data) {
                    pgp.end();
                    resolve({body: {plans: data}, statusCode: 200});
                })
                .catch(function(error) {
                    console.log(error);
                    pgp.end();
                    reject({body: "An error occurred", statusCode: 400});
                });

        } else {
            db.any("SELECT * FROM plans", [true])
                .then(function(data) {
                    pgp.end();
                    resolve({body: {plans: data}, statusCode: 200});
                })
                .catch(function(error) {
                    console.log(error);
                    pgp.end();
                    reject({body: "An error occurred", statusCode: 400});
                });
        }
    });
}

exports.main = main;
