const express = require("express");
const router = express.Router();

const topicController = require("../controllers/topicController")

router.get("/topics", topicController.index);
Topic.hasMany(models.Banner, {
  foreignKey: "topicId",
  as: "banners",
});

module.exports = router;
