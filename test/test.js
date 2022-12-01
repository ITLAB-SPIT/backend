let chai = require("chai");
let chaiHttp = require("chai-http");
let mocha = require("mocha");
// var describe = mocha.describe;
// var it = mocha.it;
chai.use(chaiHttp);
var assert = require("chai").assert;
let app = require("../app");
chai.should();

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haWwuc2h1YmhhbWdvbHdhbEBnbWFpbC5jb20iLCJpYXQiOjE2Njk4MTIxODQsImV4cCI6MTY2OTgxMzk4NH0.00PiayD6MqXY-MKc9lxLO9BYCtDVLGm9_6pXHVFiR6Y";

chai.use(chaiHttp);

describe("Validate Event", () => {
  describe("Test 1 : Posts are getting created", () => {
    it("Posts shouls created", (done) => {
      chai
        .request("http://localhost:8000")
        .get("/blogsData/")
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

  //   describe("Test 2 : Viewing a incorrect BnB", () => {
  //     it("It should return status code 400", async () => {
  //       await chai
  //         .request("https://travelzilla4u-io.onrender.com")
  //         .get("/bnbs/+bnbID")
  //         .then((res) => {
  //           chai.expect(res).to.have.status(500);
  //         });
  //     });
  //   });

  //   describe("Test 3 : Giving incomplete credentials", () => {
  //     it("It should return status code 400", async () => {
  //       await chai
  //         .request("https://travelzilla4u-io.onrender.com")
  //         .post("/register")
  //         .set("content-type", "application/x-www-form-urlencoded")
  //         .send({ username: "testtest" })
  //         .then((res) => {
  //           chai.expect(res).to.have.status(400);
  //         });
  //     });
  //   });

  // describe('Test 4 : Giving Complete details for registration', () => {
  //     it('It should register the user', async () => {
  //         await chai
  //             .request('https://travelzilla4u-io.onrender.com')
  //             .post('/register')
  //             .set('content-type', 'application/x-www-form-urlencoded')
  //             .send({ username:'test81',email:'test81@gmail.com',password:'12345' })
  //             .then((res) => {
  //                 chai.expect(res).to.have.status(200);
  //             })
  //     });
  // });
});
