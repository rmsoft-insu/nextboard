import client from "@/util/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const movie = await client.kind.findMany({
      where: {
        menuIdx: 1,
      },
    });
    const book = await client.kind.findMany({
      where: {
        menuIdx: 2,
      },
    });
    res.status(200).send({ movie: movie, book: book });
  } catch (error) {
    res.status(400).send({ error: error });
  }
}
