const status = require("http-status");

const userModel = require("@models/users.js");

const has = require("has-keys");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { SECRET } = process.env;

module.exports = {
	async getUserById(req, res) {
		if (!has(req.params, "id"))
			throw { code: status.BAD_REQUEST, message: "You must specify the id" };

		let { id } = req.params;

		let data = await userModel.findOne({ where: { id } });

		if (!data) throw { code: status.BAD_REQUEST, message: "User not found" };

		res.json({ status: true, message: "Returning user", data });
	},

	async getUsers(req, res) {
		let data = await userModel.getAll();

		res.json({ status: true, message: "Returning users", data });
	},

	async signup(req, res) {
		try {
			if (
				!has(req.body, [
					"name",
					"username",
					"profilePhoto",
					"email",
					"password",
				])
			)
				throw {
					code: status.BAD_REQUEST,
					message:
						"You must specify the name, the username, the profile photo, email and password",
				};

			let { name, username, profilePhoto, email, password } = req.body;

			let userFound = await userModel.searchByEmail({ email });

			if (userFound)
				throw { code: status.BAD_REQUEST, message: "A user is already registered with that email address." };

			const hashedPassword = await bcrypt.hash(password, 12);

			const result = await userModel.create({
				name,
				username,
				profilePhoto,
				email,
				password: hashedPassword,
			});

			const token = jwt.sign(
				{
					name: result.name,
					email: result.email,
					username: result.username,
					id: result._id,
				},
				SECRET,
				{
					expiresIn: "1h",
				},
			);

			res.status(200).json({ result: result, token });
		} catch (error) {
			res.status(500).json({ message: "Something went wrong" });
		}
	},

	async signin(req, res) {
		try {
			if (!has(req.body, ["email", "password"]))
				throw {
					code: status.BAD_REQUEST,
					message: "You must specify the email and password",
				};

			let { email, password } = req.body;

			let userFound = await userModel.searchByEmail({ email });

			if (!userFound)
				throw { code: status.BAD_REQUEST, message: "User not found" };

			const isPasswordCorrect = await bcrypt.compare(
				password,
				userFound.password,
			);

			if (!isPasswordCorrect)
				throw { code: status.BAD_REQUEST, message: "User Invalid Credentials" };

			const token = jwt.sign(
				{ email: userFound.email, id: userFound._id },
				SECRET,
				{ expiresIn: "1h" },
			);

			res.status(200).json({ result: userFound, token });
		} catch (error) {
			res.status(500).json({ message: "Something went wrong" });
		}
	},

	async updateUser(req, res) {
		if (!has(req.params, "id"))
			throw {
				code: status.BAD_REQUEST,
				message: "You must specify the id",
			};
		
		let { id } = req.params;
		let { name, username, email, profilePhoto, password, confirmPassword } = req.body;

		let userFound = await userModel.findOne({ where: { id } });

		if (!userFound)
			throw { code: status.BAD_REQUEST, message: "User not found" };

		const isPasswordCorrect = await bcrypt.compare(
			confirmPassword,
			userFound.password,
		);

		if (!isPasswordCorrect)
			throw { code: status.BAD_REQUEST, message: "User Invalid Password" };

		const hashedPassword = await bcrypt.hash(password, 12);

		let user = await userModel.update({ name, username, email, profilePhoto, password: hashedPassword, id });

		res.json({ user: user.value });
	},

	async deleteUser(req, res) {
		if (!has(req.params, "id"))
			throw { code: status.BAD_REQUEST, message: "You must specify the id" };

		let { id } = req.params;

		await userModel.delete({ id });

		res.json({ status: true, message: "User deleted" });
	},

};
