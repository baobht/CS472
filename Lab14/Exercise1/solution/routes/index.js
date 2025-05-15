import express from "express";
import {
  getAbout,
  getHome,
  getImage,
  getPDF,
} from "../controllers/homeController.js";

const router = express.Router();

router.get(["/", "/home"], getHome);
router.get("/image", getImage);
router.get("/pdf", getPDF);
router.get("/about", getAbout);

// 404 handler
router.use((req, res) => {
  res.status(404).send("404 Not Found");
});

export default router;
