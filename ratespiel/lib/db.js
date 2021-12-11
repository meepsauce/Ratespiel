var Datastore = require('nedb')


class dbClass {
    constructor() {
        this.db = new Datastore({ filename: "./lib/sets.db", autoload: true });
        this.tempDb = new Datastore({autoload: true });
        this.recent = [];
        this.startTime = Date.now();
    }

    questionObject(q, a, stat=false) {
        return {
            "question": q,
            "answer": a,
            "static": stat
        }
    }



    cleanQuestions(questions) {
        for (var i = questions.length - 1; i >= 0; i--) {
            var q = questions[i];
            if(Object.keys(q) == 0) {
                questions.splice(index, 1)
            }
            
        }
    }

    setObject(name, questions, creator="Anonymous", shuffle=true) {
        return {
            "name": name,
            "creator": creator,
            "shuffle": shuffle,
            "questions": questions
        }
    }

    async insertSet(set, temporary=true) {
        return new Promise((resolve, reject) => {
            if(temporary) {
                this.recent.push(set);
                this.tempDb.insert(set, (err, doc)=> {
                    if(err) resolve(null);
                    resolve(doc._id);
                });
            }
            else {
                this.recent.push(set);
                this.db.insert(set, (err, doc)=> {
                    if(err) resolve(null);
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
                        if(err) resolve(null);
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