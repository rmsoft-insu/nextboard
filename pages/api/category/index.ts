import client from "@/util/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.query);
    const data = await client.category.findMany();
    res.status(200).send({ data: data });
  } catch (error) {
    res.status(400).send({ error: "Error" });
  }
}
