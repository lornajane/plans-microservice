const pgp = require('pg-promise')();
var db;

function main(params) {
    var postgres_url = params['__bx_creds']['compose-for-postgresql']['uri'];
    var base_url = params['__ow_headers']['x-forwarded-url'];
    return new Promise(function(resolve, reject) {
        console.log("delete plan");
        db = pgp(postgres_url, []);

        // one record or many?
        var plan_id;
        if(params.__ow_path) {
            var path_data = params.__ow_path.match(/^\/([0-9]+)/);
            plan_id = path_data[1];
        }

        if(plan_id) {
            db.any("DELETE FROM plans WHERE plan_id = $1", [plan_id])
                .then(function(data) {
                    pgp.end();
                    resolve({statusCode: 204});
                })
                .catch(function(error) {
                    console.log(error);
                    pgp.end();
                    reject({body: "An error occurred", statusCode: 400});
                });

        } else {
            reject({body: "No plan ID supplied", statusCode: 400});
        }
    });
}

exports.main = main;
