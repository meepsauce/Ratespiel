import { connectDb } from "../../lib/db"
//not rly needed but ill expose it wtf
export default async function handler(req, res) {
    res.status(200).json(await connectDb().find(JSON.parse(req.body).id));
}