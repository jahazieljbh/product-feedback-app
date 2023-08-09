const database = require("@config/database.js");

const { ObjectId } = require('mongodb');

const feedbacks = {
	async getAll() {
		const dbo = await database.getDbo();

		return await dbo.collection("feedbacks").find().toArray();
	},

	async findOne(good) {
		const dbo = await database.getDbo();

		const { id } = good;

		return await dbo
			.collection("feedbacks")
			.findOne({ _id: new ObjectId(id) });
	},

	async find(good) {
		const dbo = await database.getDbo();

		const { query } = good;

		const title = new RegExp(query, "i");

		return await dbo
			.collection("feedbacks")
			.find({
        $or: [{ title }, { description: title }],
      })
			.toArray();
	},

	async searchByStatus(good) {
		const dbo = await database.getDbo();

		const { status } = good;

		return await dbo
			.collection("feedbacks")
			.find({ status }).toArray();
	},

	async searchByCategory(good) {
		const dbo = await database.getDbo();

		const { category } = good;

		return await dbo
			.collection("feedbacks")
			.find({ category }).toArray();
	},

	async search(good) {
		const dbo = await database.getDbo();

		const { _id } = good;

		return await dbo
			.collection("feedbacks")
			.find({ _id: new ObjectId(_id) })
			.toArray();
	},

	async create(good) {
		const dbo = await database.getDbo();

		const document = await dbo.collection("feedbacks").insertOne({
			title: good.title,
			description: good.description,
			category: good.category,
			status: good.status,
			name: good.name,
			profilePhoto: good.profilePhoto,
			creator: good.creator,
			upvotes: [],
			comments: [],
			createdAt: new Date(),
			updatedAt: new Date(),
			__v: 0
		});

		const { insertedId } = document;

		return await dbo
			.collection("feedbacks")
			.findOne({ _id: insertedId });
	},

	async update(good) {
		const dbo = await database.getDbo();

		const { id } = good;

		const data = {
			title: good.title,
			description: good.description,
			category: good.category,
			status: good.status,
			name: good.name,
			profilePhoto: good.profilePhoto,
			creator: good.creator,
			upvotes: good.upvotes,
			comments: good.comments,
			updatedAt: new Date(),
			__v: 0
		}

		return await dbo
			.collection("feedbacks")
			.findOneAndUpdate(
				{ _id: new ObjectId(id) },
				{ $set: data },
				{ returnDocument: "after" }
			);
	},

	async delete(good) {
		const dbo = await database.getDbo();

		const { id } = good;

		await dbo.collection("feedbacks").findOneAndDelete({ _id: new ObjectId(id) }, { returnDocument: true });
	},
};

module.exports = feedbacks;
