import { NextApiRequest, NextApiResponse } from "next";
import client from "@/util/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const requestData = JSON.parse(req.body);
    await client.post.create({
      data: {
        title: requestData.title,
        description: requestData.description,
        kindIdx: parseInt(requestData.kind),
        menuIdx: parseInt(requestData.menu),
      },
    });
    res.status(200).send({ message: "OK" });
  } catch (error) {
    res.status(400).send({ errors: "Error" });
  }
}
