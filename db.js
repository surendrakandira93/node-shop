var sqlDb = require("mssql");
var settings = require("./settings");

exports.executeSql = function (sql, callback) {

    var conn = new sqlDb.Connection(settings.dbConfig);
    conn.connect().then(function () {
        var req = new sqlDb.Request(conn);
        req.query(sql).then(function (resultSet) {
            conn.close();
            callback(resultSet);
        }).catch(function (error) {
            console.log(error);
            callback(null, error);
        });
    })
};