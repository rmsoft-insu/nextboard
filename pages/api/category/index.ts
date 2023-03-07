import client from "@/util/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { category } = req.query;

    if (category === "movie") {
      const data = await client.category.findMany({
        where: {
          category: "movie",
        },
      });
      res.status(200).send({ data: data });
    }

    if (category === "book") {
      const data = await client.category.findMany({
        where: {
          category: "book",
        },
      });
      res.status(200).send({ data: data });
    }

    const data = await client.category.findMany();
    res.status(200).send({ data: data });
  } catch (error) {
    res.status(400).send({ error: "Error" });
  }
}
