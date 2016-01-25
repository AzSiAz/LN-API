const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
var utils = require('../server/utils/utils');

chai.use(require('chai3-json-schema'));
chai.use(require('chai-http'));

describe("utils.js test", function() {
	it("utils.get should work correctly (return and check if it's an ip)", function(done) {
        this.timeout(1000);
        return utils.get('https://httpbin.org/ip', 0).then(function(res) {
            res.should.have.property('origin').to.be.an.ip;
            // expect('127.0.0.1')
            done()
        })
	})
})