"use strict";
import express from "express";
import try_catch from "../middlewares/try_catch.js";
import {
  create_post,
  get_posts,
  post_comment,
  post_like,
} from "../controllers/post_controller.js";
import upload_image from "../middlewares/upload_image.js";

const router = express.Router();

router.get("/", try_catch(get_posts));
router.post("/", upload_image, try_catch(create_post));

router.post("/comment/:id", try_catch(post_comment));
router.patch("/like/:id", try_catch(post_like));

export default router;
