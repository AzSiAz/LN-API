const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
var server = require('../app');

chai.use(require('chai3-json-schema'));
chai.use(require('chai-http'));

describe("Server test", function() {
	describe("Different list route test", function() {
        it("/list/types", function(done) {
            this.timeout(3000);
            chai.request(server).get('/list/types').end(function(err, res) {
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            })
        })
        it("/list/type/:lang", function(done) {
            this.timeout(3000);
            chai.request(server).get('/list/type/english').end(function(err, res) {
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            })
        })
    })
    describe("Different novel route test", function() {
        it("/ln/:lang", function(done) {
            this.timeout(3000);
            chai.request(server).get('/ln/english').end(function(err, res) {
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            })
        })
        it("/wln/:lang", function(done) {
            this.timeout(3000);
            chai.request(server).get('/wln/english').end(function(err, res) {
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            })
        })
        it("/teaser/:lang", function(done) {
            this.timeout(3000);
            chai.request(server).get('/teaser/english').end(function(err, res) {
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            })
        })
        it("/:type/:lang", function(done) {
            this.timeout(3000);
            chai.request(server).get('/Light_novel/english').end(function(err, res) {
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            })
        })
    })
    describe('Detail novel et chapter content route', function() {
        it("/title/query/", function(done) {
            this.timeout(3000);
            chai.request(server).get('/title/query/?title=Absolute_Duo').end(function(err, res) {
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            })
        })
        it("/title/:page", function(done) {
            this.timeout(3000);
            chai.request(server).get('/title/Absolute_Duo').end(function(err, res) {
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            })
        })
        it("/chapter/:id", function(done) {
            this.timeout(5000);
            chai.request(server).get('/chapter/Absolute_Duo:Volume_1_Chapter_1').end(function(err, res) {
                expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                expect(res).to.have.status(200);
                expect(res).to.be.html;
                done();
            })
        })
    })
})