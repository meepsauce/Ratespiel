import { connectDb } from "../../lib/db"
//not rly needed but ill expose it wtf
export default function handler(req, res) {
    console.log(req.body);
    res.status(200).json(connectDb().find(req.body.id))
    
}