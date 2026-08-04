const request = require("supertest");

const app = require("../server");

test("application health check", async () => {
  const response = await request(app).get("/");

  expect(response.statusCode).toBe(200);
});
