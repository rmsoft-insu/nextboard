import client from "@/util/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestData = JSON.parse(req.body);
  const registerData = {
    postTitle: requestData.postTitle as string,
    postContent: JSON.stringify(requestData.postContents),
  };
  try {
    console.log(registerData);
    await client.board.create({ data: registerData });
    res.status(200).send({ message: "Success" });
  } catch (error) {
    res.status(200).send({ error: error });
  }
}
