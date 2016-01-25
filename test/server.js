const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const logger = require('morgan');
var request = require('supertest');
var server = require('../server');

chai.use(require('chai3-json-schema'));
chai.use(require('chai-http'));

describe("Server test", function() {
	describe("/list test", function() {
        it("/list/types", function(done) {
            this.timeout(3000);
            request(server)
                .get('/list/types')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done)
                // .end(function(err, res){
                //     if (err) return done(err);
                //     done();
                // });
        })
        it("/list/type/:lang", function(done) {
            this.timeout(3000);
            request(server)
                .get('/list/type/english')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done)
        })
        it("/ln/:lang", function(done) {
            this.timeout(3000);
            request(server)
                .get('/ln/english')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done)
        })
        it("/wln/:lang", function(done) {
            this.timeout(3000);
            request(server)
                .get('/wln/english')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done)
        })
        it("/teaser/:lang", function(done) {
            this.timeout(3000);
            request(server)
                .get('/teaser/english')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done)
        })
        it("/title/query/", function(done) {
            this.timeout(3000);
            request(server)
                .get('/title/query/?title=Absolute_Duo')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done)
        })
        it("/title/:page", function(done) {
            this.timeout(3000);
            request(server)
                .get('/title/Absolute_Duo')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done)
        })
        it("/chapter/:id", function(done) {
            this.timeout(5000);
            request(server)
                .get('/chapter/Absolute_Duo:Volume_1_Chapter_1')
                .set('Accept', 'application/html')
                .expect('Content-Type', /html/)
                .expect(200, done)
        })
        it("/:type/:lang", function(done) {
            this.timeout(3000);
            request(server)
                .get('/Light_novel/english')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done)
        })
	})
})