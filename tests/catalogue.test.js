const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");

beforeEach(async () => {
	await mongoose.connect(process.env.DB_URL);
});

afterEach(async () => {
	await mongoose.connection.close();
});

const mockCatalogueReqPayload = {
	title: "6400d1b35b60ed7fadc4def1",
};

describe("CATALOGUES", () => {
	it("should get your catalogue", async () => {
		return await request(app)
			.get("/catalogue")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(
					expect.objectContaining({
						name: expect.any(String),
						createdAt: expect.any(String),
						updatedAt: expect.any(String),
					})
				);
			});
	});
});
