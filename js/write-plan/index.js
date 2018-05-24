const pgp = require('pg-promise')();
var db;

function main(params) {
    var postgres_url = params['__bx_creds']['compose-for-postgresql']['uri'];
    var base_url = params['__ow_headers']['x-forwarded-url'];
    return new Promise(function(resolve, reject) {
        console.log("make plan");
        db = pgp(postgres_url, []);

        var incoming = new Buffer(params.__ow_body, 'base64').toString('utf-8');
        var decoded = JSON.parse(incoming);
        var location = decoded.location;
        var travel_date = decoded.travel_date

        db.one("INSERT INTO plans (location, travel_date) VALUES  ($1, $2) RETURNING plan_id",
            [location, travel_date])
            .then(function(data) {
                console.log("created plan with ID " + data.plan_id);
                pgp.end();
                var redirect_to = base_url + "/" + data.plan_id;
                console.log ("Redirecting to: " + redirect_to);
                resolve({headers: {"Location": redirect_to}, statusCode: 303})
            })
            .catch(function(error) {
                console.log(error);
                pgp.end();
                reject({body: "An error occurred", statusCode: 400});
            });
    });
}

exports.main = main;

