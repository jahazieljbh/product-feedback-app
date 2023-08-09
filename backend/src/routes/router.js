const router = require("express").Router();

// Users and Feedbacks routes

router.use(require("@routes/user"));
router.use(require("@routes/feedback"))

module.exports = router;
