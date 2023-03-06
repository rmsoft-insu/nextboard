import { NextApiRequest, NextApiResponse } from "next";
import client from "@/util/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try{
  const requestData = JSON.parse(req.body);
  await client.category.create({ data: requestData });
  res.status(200).send({ message: "OK" });
} catch(error){
  res.status(400).send({errors:"Error"})
}
}
