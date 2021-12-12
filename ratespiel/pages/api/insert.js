import { connectDb } from "../../lib/db"
//not rly needed but ill expose it wtf
export default async function handler(req, res) {
    var id = await connectDb().insertSet(req.body);
    console.log("doc from db: " + id);
    res.status(200).json({"id": id});
}