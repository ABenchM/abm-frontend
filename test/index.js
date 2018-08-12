
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let assert = chai.assert;
let should = chai.should();
let server = require('../index.js');
describe('/POST login ', () => {
    let path = "/rest/login";
      it('Able to get JSESSIONID', (done) => {
         chai.request(server)
             .post(path)
             .send({ username: "demo", password: "demo" })
             .end((err, res) => {
                 res.should.have.status(200);
                 res.should.have.header('set-cookie');
                 assert(res.header['set-cookie'].length > 0, "Length should be one");
                 done();
             });
     });

});
