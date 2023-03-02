const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");

beforeEach(async () => {
	await mongoose.connect(process.env.DB_URL);
});

afterEach(async () => {
	await mongoose.connection.close();
});

const mockMovieReqPayload = {
	title: "The Little Mermaid",
	poster: "",
	genre: "fantasy, supernatural",
	synopsis:
		"In Disney's beguiling animated romp, rebellious 16-year-old mermaid Ariel (Jodi Benson) is fascinated with life on land. On one of her visits to the surface, which are forbidden by her controlling father, King Triton, she falls for a human prince. Determined to be with her new love, Ariel makes a dangerous deal with the sea witch Ursula (Pat Carroll) to become human for three days. But when plans go awry for the star-crossed lovers, the king must make the ultimate sacrifice for his daughter.",
};

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
							poster: expect.any(String),
							genre: expect.any(String),
							// synopsis: expect.any(String),
							createdAt: expect.any(String),
							updatedAt: expect.any(String),
						}),
					])
				);
			});
	});

	it("should be able to create a movie", async () => {
		return await request(app)
			.post("/movies/create")
			.send(mockMovieReqPayload)
			.expect("Content-Type", /json/)
			.expect(201)
			.then((response) => {
				expect(response.body).toEqual(
					expect.objectContaining({
						title: expect.any(String),
						poster: expect.any(String),
						genre: expect.any(String),
						// synopsis: expect.any(String),
						createdAt: expect.any(String),
						updatedAt: expect.any(String),
					})
				);
			});
	});
});
