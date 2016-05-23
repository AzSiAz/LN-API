var fs = require("fs");
var actu = require(__dirname + "/../../news/actu.json");

class News {
    static list(req, res) {
        res.json(actu);
    }
}

module.exports = News;