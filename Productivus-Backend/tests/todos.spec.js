/* eslint-disable no-undef */
const app = require("../index");
const supertest = require("supertest");
const request = supertest(app);

describe("GET /", function () {
  it("responds with status 200", async function (done) {
    await request.get("/api/").expect(200, done);
  });
});
