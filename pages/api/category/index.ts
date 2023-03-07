import client from "@/util/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { category } = req.query;
    const { kind } = req.query;

    if (category !== "") {
      if (kind !== "") {
        const data = await client.category.findMany({
          where: {
            category: category as string,
            kind: kind as string,
          },
        });
        return res.status(200).send({ data: data });
      } else {
        const data = await client.category.findMany({
          where: {
            category: category as string,
          },
        });
        return res.status(200).send({ data: data });
      }
    }

    const data = await client.category.findMany();
    res.status(200).send({ data: data });
  } catch (error) {
    res.status(400).send({ error: "Error" });
  }
}
