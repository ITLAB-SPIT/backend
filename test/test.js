let chai = require("chai");
let chaiHttp = require("chai-http");
let mocha = require("mocha");
// var describe = mocha.describe;
// var it = mocha.it;
chai.use(chaiHttp); // reason for this is to use chai.request
var assert = require("chai").assert;
let app = require("../app");
chai.should();

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNocmV5YXNoYi5kaGFtYW5lMEBnbWFpbC5jb20iLCJpYXQiOjE2Njk4NzA5NTUsImV4cCI6MTY2OTg3Mjc1NX0.9UT8oK4wAvUFYKJtVuxeeUmheNSsp7DTill5qfrXyeY";

chai.use(chaiHttp);

describe("Validate Event", () => {
  describe("Test 1 : Fetching blogs from database", () => {
    it("Posts should be fetched", (done) => {
      chai
        .request("http://localhost:8000")
        .get("/blogsData?token=" + token)
        .set({ Authorization: `${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      // .then((res) => {
      //   // chai.expect(res).to.have.status(200);
      //   // done();
      //   res.should.have.status(200);
      //   done();
      // })
    });
  });

  describe("Test 2 : Get Jobs data", () => {
    it("All questions fetched successfully", async () => {
      await chai
        .request("http://localhost:8000")
        .get("/getJobsData")
        .then((res) => {
          chai.expect(res).to.have.status(200);
        });
    });
  });
});
