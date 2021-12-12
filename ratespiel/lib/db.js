var Datastore = require('nedb')


export class dbClass {
    constructor() {
        this.db = new Datastore({ filename: "./lib/sets.db", autoload: true });
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

    generateId() {
        var code = this.code();
        if(!this.find(code)) {
            return code;
        }
        else {
            return this.generateId();
        }
    }

    async insertSet(set) {
        return new Promise((resolve, reject)=> {
            console.log("pushed to lingering");
            set._id = this.generateId();
            this.recent.push(set);
            this.db.insert(set, (err, doc)=> {
                if(err) resolve(null);
                resolve(doc);
            });
        });
    }

   
    find(id) {
        this.db.findOne({ _id: id }, function (err, doc) {
                if(err) return(null);
                
                return(doc)
                
        });  
    }
}
var db = new dbClass();
db.insertSet({"testing": "sucks"});
export function connectDb() {
    return db;
}

