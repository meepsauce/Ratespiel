
import Link from "next/link"
import styles from '../styles/Home.module.css'
import React from 'react';
import { db } from '../lib/db';


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
            index: 0,
            question: "",
            answer: "",
            strict: false,
        }
    }
    componentDidUpdate() {
        //saving
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
            
        };
        this.generate = this.generate.bind(this);
    }

    generate() {

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
                    <button onClick={()=>{this.setState({secondPart: true})}}>Next</button>
                </div>   
            ) : (
                <div>
                    <h3>Settings: </h3>
                    <button onClick={()=>{this.setState({secondPart: false})}}>Back to Questions</button>
                    <button onClick={()=>{}}>Publish Set</button>
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
