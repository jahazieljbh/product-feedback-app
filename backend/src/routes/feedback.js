const express = require("express");
const router = express.Router();

const feedback = require("@controllers/feedback.js");
const auth = require("@middleware/auth.js");

router.get("/feedbacks", feedback.getFeedbacks);

router.get("/feedbacks/search", feedback.searchFeedback);

router.post("/feedbacks", auth.auth, feedback.createFeedback);

router.patch("/feedbacks/:id", auth.auth, feedback.updateFeedback);

router.delete("/feedbacks/:id", auth.auth, feedback.deleteFeedback);

router.patch("/feedbacks/:id/comment", auth.auth, feedback.commentFeedback);

router.patch("/feedbacks/:id/upvote", auth.auth, feedback.upvoteFeedback);

module.exports = router;