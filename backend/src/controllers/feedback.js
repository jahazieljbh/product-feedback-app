const feedbackModel = require("@models/feedbacks.js");

const has = require("has-keys");

module.exports = {
	async getFeedbacksByStatus(req, res) {
		if (!has(req.query, "status")) {
			res.status(400).json({ message: "You must specify the status" });
		};

		let { status } = req.query;

		await feedbackModel.searchByStatus({ status } )
			.then((feedbacks) => {
				res.json(feedbacks);
			})
			.catch((err) => {
				res.status(404).json({ noFeedbacksFound: "noFeedbacksFound" });
				console.log(err);
			});
	},

	async getFeedbacks(req, res) {
		let { category, status } = req.query;

		if (category) {
			await feedbackModel.searchByCategory({ category })
				.then((feedbacks) => {
					res.status(200).json(feedbacks);
				})
				.catch((err) => {
					res.status(404).json({ noFeedbacksFound: "noFeedbacksFound" });
					console.log(err);
				});
		} else if (status) {
			await feedbackModel.searchByStatus({ status })
				.then((feedbacks) => {
					res.status(200).json(feedbacks);
				})
				.catch((err) => {
					res.status(404).json({ noFeedbacksFound: "noFeedbacksFound" });
					console.log(err);
				});
		} else {
			await feedbackModel.getAll()
				.then((feedbacks) => res.status(200).json(feedbacks))
				.catch((error) => {
					res.status(404).json(error);
				});
		}
	},

	async createFeedback(req, res) {
		try {
			if (!has(req.body, ["title", "description", "category"])) {
				res.status(400).json({ message: "You must specify the title, the description and the category"});
			}

			const feedback = req.body;

			if (!req.userId) {
				res.json({ message: "Unauthenticated" });
			}

			await feedbackModel.create({ ...feedback, creator: req.userId })
				.then((feedback) => res.json(feedback))
				.catch((err) => res.status(400).json({ error: err }));;

		} catch (error) {
			res.status(500).json({
				status: false,
				message: error.message,
			});
		}
	},

	async searchFeedback(req, res) {
		try {
			if (!has(req.query, "query")) {
				res.status(400).json({ message: "You must specify query" });
			};

			let { query } = req.query;

      const feedbacks = await feedbackModel.find({ query });

			res.status(200).json({ data: feedbacks });
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	},

	async updateFeedback(req, res) {
		if (!has(req.params, "id")) {
			res.status(400).json({ message: "You must specify the id" });
		};

    if (!has(req.body, ["title", "description", "category", "status",])) {
			res.status(400).json({ message: "You must specify the title, the description, the category, the status" });
		};

		let { id } = req.params;

		let { title, description, category, status } = req.body;

		const feedbackFound = await feedbackModel.findOne({ id });

		const data = { 
			title: title, 
			description: description, 
			category: category, 
			status: status, 
			name: feedbackFound.name, 
			profilePhoto: feedbackFound.profilePhoto, 
			creator: feedbackFound.creator, 
			upvotes: feedbackFound.upvotes, 
			comments: feedbackFound.comments, 
			id 
		}

		await feedbackModel.update(data)
			.then((feedback) => res.json(feedback.value))
			.catch((err) =>
				res.status(400).json({ error: "Unable to update the Database" })
      );
	},

	async deleteFeedback(req, res) {
		if (!has(req.params, "id")) {
			res.status(400).json({message: "You must specify the id" });
		}

		let { id } = req.params;

		if (!req.userId) {
			return res.json({ message: "Unauthenticated" });
		}

		await feedbackModel.delete({ id })
			.then((feedback) => res.json({ mgs: "feedback deleted successfully" }))
			.catch((err) => res.status(404).json({ error: "No such a Feedback" }));
	},

  async commentFeedback(req, res) {
		if (!has(req.params, "id")) {
			res.status(400).json({ message: "You must specify the id" })
		}

		if (!has(req.body, "comment")) {
			res.status(400).json({ message: "You must specify the value" });
		}

		if (!req.userId) {
			res.json({ message: "Unauthenticated" });
		}

		const { id } = req.params;
		const { comment } = req.body;

		const feedback = await feedbackModel.findOne({ id });
		feedback.comments.push(comment);

		const data = { 
			title: feedback.title, 
			description: feedback.description, 
			category: feedback.category, 
			status: feedback.status, 
			name: feedback.name, 
			profilePhoto: feedback.profilePhoto, 
			creator: feedback.creator, 
			upvotes: feedback.upvotes, 
			comments: feedback.comments, 
			id
		}

		await feedbackModel.update(data)
			.then((feedback) => res.json(feedback.value))
			.catch((err) =>
				res.status(400).json({ error: "Unable to update the Database" })
			);
	},

	async upvoteFeedback(req, res) {
		if (!has(req.params, "id")) {
				res.status(400).json({ message: "You must specify the id" })
		};

		const { id } = req.params;

		if (!req.userId) {
			return res.json({ message: "Unauthenticated" });
		}
	
		const feedback = await feedbackModel.findOne({ id });
	
		const index = feedback.upvotes.findIndex((id) => id === String(req.userId));
	
		if (index === -1) {
			feedback.upvotes.push(req.userId);
		} else {
			feedback.upvotes = feedback.upvotes.filter(
				(id) => id !== String(req.userId)
			);
		}

		const data = { 
			title: feedback.title, 
			description: feedback.description, 
			category: feedback.category, 
			status: feedback.status, 
			name: feedback.name, 
			profilePhoto: feedback.profilePhoto, 
			creator: feedback.creator, 
			upvotes: feedback.upvotes, 
			comments: feedback.comments, 
			id 
		}

		await feedbackModel.update(data)
			.then((feedback) => res.json(feedback.value))
			.catch((err) =>
				res.status(400).json({ error: "Unable to update the Database" })
			);
	}
};
