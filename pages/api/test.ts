import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import multerS3 from "multer-s3";
import dayjs from "dayjs";
import AWS from "aws-sdk";

const app = nextConnect({
  onError(error, req, res: NextApiResponse) {
    res.status(501).json({ error: `Error: ${error.message}` });
  },
  onNoMatch(req, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' is Not Allowed` });
  },
});

const upload = multer({
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1MB
});

app.post(upload.array("images"), function (req, res) {
  try {
    const { files } = req as any;
    console.log(files);
    console.log(req.body);
    return res.status(200).end();
  } catch (error) {
    res.status(200).send({ error: error });
  }
});

export default app;

export const config = {
  api: {
    bodyParser: false,
  },
};
