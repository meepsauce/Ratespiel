var Datastore = require('nedb')


export class dbClass {
    constructor() {
        this.db = new Datastore({ filename: "./lib/sets.db", autoload: true });
        this.recentDb = new Datastore({filename: "./lib/recent.db", autoload: true})
        this.recent = [];
        this.startTime = Date.now();
        console.log("ready!");
    }

    static questionObject(q, a, stat=false) {
        return {
            "question": q,
            "answer": a,
            "static": stat
        }
    }


    static cleanQuestions(questions) {
        for (var i = questions.length - 1; i >= 0; i--) {
            var q = questions[i];
            if(Object.keys(q) == 0) {
                questions.splice(index, 1)
            }
            
        }
    }

    static setObject(name, questions, creator="Anonymous", shuffle=true) {
        return {
            "name": name,
            "creator": creator,
            "shuffle": shuffle,
            "questions": questions
        }
    }

    static code() {
        return Math.random().toString(18).slice(2).slice(8);
    }

    async generateId() {
        var code = dbClass.code();
        if(!await this.find(code)) {
            return code;
        }
        else {
            return await this.generateId();
        }
    }

    async insertSet(set) {
        return new Promise(async(resolve, reject)=> {     
            set._id = await this.generateId();
            this.db.insert(set, (err, doc)=> {
                if(err) resolve(null);
                this.recentDb.insert(doc);
                this.recent.push(doc);
                resolve(doc);
            });
        });
    }

    async recentSets() {
        return new Promise((resolve, reject) => {
            this.recentDb.find({}, function(err, docs) {
                if(err) resolve(null);
                resolve(docs);
            });
        });
    }
   
    async find(id) {
        return new Promise((resolve, reject)=> {
            this.db.findOne({ _id: id }, function (err, doc) {
                if(err) resolve(null);
                resolve(doc)
            });
        })
          
    }
}
var db = new dbClass();

export function connectDb() {
    return db;
}

