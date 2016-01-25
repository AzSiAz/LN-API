const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
var server = require('../server');

chai.use(require('chai3-json-schema'));
chai.use(require('chai-http'));

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
            list[0].titles.forEach(function(element) {
                it("Test : " + element.title, function(done) {
                    done()
                })
            }, this);
        })
        describe("English Teaser", function() {
            list[1].titles.forEach(function(element) {
                it("Test : " + element.title, function(done) {
                    done()
                })
            }, this);
        })
        describe("English Web Novel", function() {
            list[2].titles.forEach(function(element) {
                it("Test : " + element.title, function(done) {
                    done()
                })
            }, this);
        })
    }, 5000)
})