const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");

beforeEach(async () => {
	await mongoose.connect(process.env.DB_URL);
});

afterEach(async () => {
	await mongoose.connection.close();
});

describe("MOVIES", () => {
	it("should get a list of movies", async () => {
		return await request(app)
			.get("/movies")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							title: expect.any(String),
						}),
					])
				);
			});
	});

	it("should be able to create a movie", () => {});
});
