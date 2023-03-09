import client from "@/util/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { category } = req.query;
    const { kind } = req.query;

    if (category) {
      if (kind) {
        const data = await client.post.findMany({
          where: {
            kindIdx: parseInt(kind as string),
            menuIdx: parseInt(category as string),
          },
        });
        return res.status(200).send({ data: data });
      } else {
        const data = await client.post.findMany({
          where: {
            menuIdx: parseInt(category as string),
          },
        });
        return res.status(200).send({ data: data });
      }
    }

    if (kind) {
    }

    const data = await client.post.findMany();
    res.status(200).send({ data: data });
  } catch (error) {
    res.status(400).send({ error: "Error" });
  }
}
