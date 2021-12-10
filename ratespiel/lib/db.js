var Datastore = require('nedb')


class dbClass {
    constructor() {
        this.db = new Datastore({ filename: "./sets.db", autoload: true });
        this.tempDb = new Datastore({autoload: true });
    }

    static questionObject(q, a, static=false) {
        return {
            "question": q,
            "answer": a,
            "static": static
        }
    }

    static setObject(questions, creator="Anonymous") {
        return {
            "creator": creator,
            "question": questions
        }
    }

    async insertSet(set, temporary=true) {
        return new Promise((resolve, reject) => {
            if(temporary) {
                this.tempDb.insert(set, (err, doc)=> {
                    if(err) reject(err);
                    resolve(doc._id);
                });
            }
            else {
                this.db.insert(set, (err, doc)=> {
                    if(err) reject(err);
                    resolve(doc._id);
                });
            }
        });
    }

    async find(id) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ _id: id }, function (err, doc) {
                if(err) reject(err);
                if(!doc) {
                    this.tempDb.findOne({ _id: id }, function (err, doc) {
                        if(err) reject(err);
                        if(doc) {
                            resolve(doc)
                        }
                        else {
                            resolve(null)
                        }
                    });
                }
                else {
                    resolve(doc)
                }
            });
        })   
    }
}

var db = new dbClass();
module.exports = {db}