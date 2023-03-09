import client from "@/util/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const menu = await client.menu.findMany({
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });
    const totalCount = await client.post.count();

    res.status(200).send({ menu: menu, totalCount: totalCount });
  } catch (error) {
    res.status(400).send({ error: error });
  }
}
