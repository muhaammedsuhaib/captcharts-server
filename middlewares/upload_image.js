"use strict";
import cloudinary from "../configs/cloudinary.js";
import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const upload_image = (req, res, next) => {
  upload.single("file")(req, res, async (error) => {
    if (error) {
      return res.status(400).json({ message: "Error uploading file" });
    }

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              return next(error);
            }
            req.cloudinaryImageUrl = result.secure_url;
            next();
          }
        );
        result.end(req.file.buffer);
      } catch (error) {
        return next(error);
      }
    } else {
      next();
    }
  });
};

export default upload_image;
