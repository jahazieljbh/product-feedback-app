const database = require("@config/database.js");

const { ObjectId } = require('mongodb');

const users = {
	async getAll() {
		const dbo = await database.getDbo();

		return await dbo.collection("users").find().toArray();
	},

	async findOne(good) {
		const dbo = await database.getDbo();

		const { id } = good;

		return await dbo
			.collection("users")
			.findOne({ id });
	},

	async searchByEmail(good) {
		const dbo = await database.getDbo();

		const { email } = good;

		return await dbo
			.collection("users")
			.findOne({ email });
	},

	async search(good) {
		const dbo = await database.getDbo();

		const { _id } = good;

		return await dbo
			.collection("users")
			.find({ _id: new ObjectId(_id) })
			.toArray();
	},

	async create(good) {
		const dbo = await database.getDbo();

		const response = await dbo.collection("users").insertOne({
			name: good.name,
			username: good.username,
			profilePhoto: good.profilePhoto,
			email: good.email,
			password: good.password,
			createdAt: new Date(),
			updatedAt: new Date(),
			__V:0
		},{
			writeConcern:  "majority"
		});

		if(response.insertedId != null || response.acknowledged === true) {
			return { 
				name: good.name,
				username: good.username,
				profilePhoto: good.profilePhoto,
				email: good.email,
				password: good.password,
				_id: response.insertedId.toString()
			};
		}

	},

	async update(good) {
		const dbo = await database.getDbo();

		const { id } = good;

		const data = {
			name: good.name,
			username: good.username,
			profilePhoto: good.profilePhoto,
			email: good.email,
			password: good.password,
			updatedAt: new Date()
		}

		return await dbo
			.collection("users")
			.findOneAndUpdate(
				{ _id: new ObjectId(id) },
				{ $set: data },
				{ returnDocument: "after" }
			);
	},

	async delete(good) {
		const dbo = await database.getDbo();

		const { id } = good;

		await dbo.collection("users").deleteOne({ _id: new ObjectId(id) });
	},
};

module.exports = users;
