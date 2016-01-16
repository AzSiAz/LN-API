const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

chai.use(require('chai3-json-schema'));
chai.use(require('chai-http'));

describe("travis test", function() {
	it("test", function() {
		var res = true;
		expect(res).to.be.equal(true);
	})
})