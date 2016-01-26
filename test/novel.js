const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
var server = require('../server');

chai.use(require('chai3-json-schema'));
chai.use(require('chai-http'));

var schema = {
    "title": "Novel schema v1",
    "type": "object",
    "required": ["title", "synopsis", "one_off", "status", "author", "illustrator", "tome"],
    "properties": {
        "title": {
            "type": "string"
        },
        "cover": {
            "type": "string"
        },
        "synopsis": {
            "type": "string"
        },
        "one_off": {
            "type": "boolean"
        },
        "status": {
          "type": "string"  
        },
        "author": {
          "type": "string"  
        },
        "illustrator": {
          "type": "string"  
        },
        "tome": {
            "type": "array",
            "minItems": 1,
            "uniqueItems": true,
            "items": {
                "type": "object"
            }
        }
    }
};
var schemaAlt = {
    "title": "Novel schema v1",
    "type": "object",
    "required": ["title", "cover", "synopsis", "one_off", "status", "author", "illustrator", "tome"],
    "properties": {
        "title": {
            "type": "string"
        },
        "cover": {
            "type": "string"
        },
        "synopsis": {
            "type": "string"
        },
        "one_off": {
            "type": "boolean"
        },
        "status": {
          "type": "string"  
        },
        "author": {
          "type": "string"  
        },
        "illustrator": {
          "type": "string"  
        },
        "tome": {
            "type": "array",
            "minItems": 1,
            "uniqueItems": true,
            "items": {
                "type": "object"
            }
        }
    }
};

describe("Novel Detail test", function() {
    this.timeout(10000);
    var list = [];
    it("Download novel List", function(done) {
        chai.request(server).get('/ln/english').end(function(err, res) {
            list[0] = res.body;
            expect(res).to.be.json;
            done();
        })
    })
    it("Download teaser list", function(done) {
        chai.request(server).get('/teaser/english').end(function(err, res) {
            list[1] = res.body;
            expect(res).to.be.json;
            done();
        })
    })
    it("Download web novel list", function(done) {
        chai.request(server).get('/wln/english').end(function(err, res) {
            list[2] = res.body;
            expect(res).to.be.json;
            done();
        })
    })
    setTimeout(function() {
        describe("English Novel test", function() {
            list[0].titles.forEach(function(element, index) {
                it("Test " + index + " : " + element.title, function(done) {
                    chai.request(server).get('/title/query/?title=' + element.page).end(function(err, res) {
                        expect(res.body).to.be.jsonSchema(schema);
                        expect(res).to.be.json;
                        done();
                    })
                })
            }, this);
        })
        describe("English Teaser", function() {
            list[1].titles.forEach(function(element, index) {
                it("Test " + index + " : " + element.title, function(done) {
                    chai.request(server).get('/title/query/?title=' + element.page).end(function(err, res) {
                        expect(res.body).to.be.jsonSchema(schema);
                        expect(res).to.be.json;
                        done();
                    })
                })
            }, this);
        })
        describe("English Web Novel", function() {
            list[2].titles.forEach(function(element, index) {
                it("Test " + index + " : " + element.title, function(done) {
                   chai.request(server).get('/title/query/?title=' + element.page).end(function(err, res) {
                        expect(res.body).to.be.jsonSchema(schema);
                        expect(res).to.be.json;
                        done();
                    })
                })
            }, this);
        })
    }, 5000)
})