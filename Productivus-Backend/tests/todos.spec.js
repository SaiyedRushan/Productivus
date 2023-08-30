const app = require("../index");
const supertest = require("supertest");
const request = supertest(app);

describe("GET /", function () {
  it("responds with status 200", function (done) {
    request.get("/api/").expect(200, done);
  });
});
