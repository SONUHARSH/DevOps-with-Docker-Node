const express = require("express");

const postController = require("../controllers/PostController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

//localhost:3009/:id

router
  .route("/")
  .get(protect, postController.getAllPosts)
  .post(protect, postController.createPost);

router
  .route("/:id")
  .get(protect, postController.getOnePost)
  .patch(protect, postController.updatePost)
  .delete(protect, postController.deletePost)
  
module.exports = router;  