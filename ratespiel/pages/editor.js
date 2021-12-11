
import Link from "next/link"
import styles from '../styles/Home.module.css'
import React from 'react';
import { db } from '../lib/db';


class stateStorage {
    constructor() {
        this.data = [];
    }

    addEntry() {
        this.data.push(null);
        return this.data.length-1;
    }

    setEntry(id, data) {
        this.data[id] = data;
    }
}

var storage = new stateStorage();

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return <input type="checkbox" onChange={(e)=>{this.props.onChange(e.target.value)}}></input>
    }
}

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: storage.addEntry(),
            question: "",
            answer: "",
            strict: false,
        }
    }
    componentDidUpdate() {
        storage.setEntry(this.state.index, {
            question: this.state.question,
            answer: this.state.answer,
            strict: this.state.strict
        });
    }
    render() {
        return <div className={styles.card} >
                <label><b>Q:</b></label><input type="text" value={this.state.question} onChange={(e) => {this.setState({question: e.target.value})}}></input>
                <br></br>
                <label><b>A:</b></label><input type="text" value={this.state.answer} onChange={(e) => {this.setState({answer: e.target.value})}}></input>
                <br></br>
                <label>Strict: </label><Checkbox onChange={(val)=>{this.setState({strict: val})}}></Checkbox>
        </div>
    }
}

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [<Question key={0}></Question>],
            secondPart: false,
            id: null,
            url: null,
            author: "Anonymous",
            name: "Very Cool set",
            shuffle: false,

        };
        this.generate = this.generate.bind(this);

        window.onbeforeunload = ()=>{
            return 'Are you sure you want to leave?';
        };
    }

    async generate() {
       var obj = db.setObject(this.state.name, storage.data, storage.author, this.state.shuffle);
       var id = await db.insertSet(obj, true);
       this.setState({id: id, url: window.location.href.replace("editor", `set?id=${id}`)});
    }
    
    render() {
        return <div className={styles.card}>
        <h1>Editor</h1>
            <hr></hr>
            {!this.state.secondPart ? (
                <div>
                    <h3>Questions:</h3>
                    {this.state.questions}
                    <button onClick={()=>{this.setState({questions: [...this.state.questions, <Question key={this.state.questions.length}></Question>]})}}>Add Question</button>
                    <br></br>
                    <br></br>
                    <button onClick={()=>{this.setState({secondPart: true})}}>Next</button>
                </div>   
            ) : (
                <div>
                    <h3>Settings: </h3>
                    {this.state.id ? (
                        <div>
                            <h1>Your Set Has Been Published!</h1>
                            <h2>Your code is <span className={styles.code}>{this.state.id}</span></h2>
                            <h2>Link: <Link href={this.state.url}>{this.state.url}</Link></h2>
                        </div>
                    ) : (
                    <div>
                        <label><b>Set Name:</b></label><input type="text"></input>
                        <br></br>
                        <label><b>Author Name:</b></label><input type="text"></input>
                        <br></br>
                        <label>Shuffle Set: </label><Checkbox onChange={()=>{}}></Checkbox>
                        <br></br>
                        <br></br>
                        <button onClick={()=>{this.setState({secondPart: false})}}>Back to Questions</button>
                        <button onClick={()=>{this.generate()}}><b>Publish Set</b></button>
                    </div>
                    )}
                </div>
            )}
            
        </div>
        
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: null
        }
    }
    render() {
        if(!this.state.mode) {
            return (
                <div className={styles.card}>
                    <h1>Edit a Existing Set</h1>
                    <button disabled>Edit Existing Set</button>
                    <hr></hr>
                    <h1>Create a New Set</h1>
                    <button onClick={()=>this.setState({mode: "new"})}>Create</button>
                </div>
            )
        }
        if(this.state.mode === "new") {
            return <Editor></Editor>
        }
    }
}

export default function editor(props) {
  
  return <div className={styles.centered}>
      <App></App>
      </div>
}
