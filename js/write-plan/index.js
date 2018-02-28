const pgp = require('pg-promise')();
var db;

function main(params) {
    return new Promise(function(resolve, reject) {
        console.log("make plan");
        var url = params.postgres_url;
        db = pgp(params.postgres_url, []);

        var incoming = new Buffer(params.__ow_body, 'base64').toString('utf-8');
        console.log(incoming);
        resolve({body: "good enough for now"});

        pgp.end();
    });
}

exports.main = main;

