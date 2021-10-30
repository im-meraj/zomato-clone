// Libraries
import express from 'express';
import multer from 'multer';

import { ImageModel } from '../../database/allModels';

// Upload to s3
import { s3Upload } from '../../Utils/AWS/s3';

const Router = express.Router();

// Multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });


/*
Route       /image
Desc        Uploads given image to S3 bucket and saves file link to mongoDB
Params      none
Access      Public
Method      POST
 */
Router.post("/", upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    // s3 Bucket options
    const bucketOptions = {
      Bucket: 'zomato-clone-meraj',
      Key: file.originalname,
      Body: file.buffer,
      contentType: file.mimetype,
      ACL: 'public-read',
    };


    const uploadImage = await s3Upload(bucketOptions);

    return res.status(200).json({uploadImage});

  } catch (error) {
    res.status(500).json({ message: error.message});
  }
});

export default Router;