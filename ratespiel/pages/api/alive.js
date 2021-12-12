import { connectDb } from "../../lib/db"

export default function handler(req, res) {
    var db = connectDb();
    var ok = false;
    if(db.startTime) {
        ok = true;
    }
    res.status(200).json({status: ok, time: db.startTime});
}