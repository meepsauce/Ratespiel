
import styles from '../styles/Home.module.css'
import React from 'react';
import { find } from '../lib/api';
import JSConfetti from 'js-confetti'

var Objekt = null;
var korrektWurden = ["Korrekt", "Super", "Genau", "Richtig"];
var modalZeit = 1.5; 

class KorrektModal extends React.Component {
 	constructor(props) {
  	super(props);
    this.state = {
    	phrase: korrektWurden[Math.floor(Math.random()*korrektWurden.length)]
    };
  }
  render() {
    	return (
      <div className={styles.modal}>
        <div className={styles.modalcontent}>
        <h1 className={styles.big}>✓</h1>
        <h3>{this.state.phrase}</h3>
        </div>
      </div>
    	);
    } 
}

class FrageHalter extends React.Component {
	constructor(props) {
  	super(props);
    this.state = {
    	index: 0,
      maxIndex: Objekt.questions.length-1,
      done: false,
        antwortenwert: "",
        anzeigenModal: false,
        anzeigenUnrecht: false,
        ergebnis: 0
    };

    this.confetti = new JSConfetti()
    
   
    this.antwortenChange = this.antwortenChange.bind(this);
    this.pruefen = this.pruefen.bind(this);
    this.verbergenModal = this.verbergenModal.bind(this);
    this.verbergenUnrecht = this.verbergenUnrecht.bind(this);
    this.addChar = this.addChar.bind(this);
  }
  
  antwortenChange(val) { 
    this.setState({antwortenwert: val});
  }
  
  addChar(char) {
  	this.setState({antwortenwert: this.state.antwortenwert+char});
  }
  
  pruefen(event) {
  	const frage = Objekt.questions[this.state.index];
    if(frage.strict == false) {
      frage.answer = frage.answer.toLowerCase();
      this.state.antwortenwert =this.state.antwortenwert.toLowerCase();
    }
  	if(this.state.antwortenwert === frage.answer) {
      this.setState({anzeigenModal: true, 
        index: this.state.index+1,
         anzeigenUnrecht: false, 
         ergebnis: this.state.ergebnis+1,
        antwortenwert: ""});
      setTimeout(this.verbergenModal, modalZeit * 1000);
    }
    else {
    	  this.setState({anzeigenUnrecht: true});
        setTimeout(this.verbergenUnrecht, modalZeit * 1000);
    }

    if(this.state.index >= this.state.maxIndex) {
      this.confetti.addConfetti()
      this.setState({done: true});
      
    }
    event.preventDefault();
    event.stopPropagation();
  }
  
  verbergenModal() {
  	this.setState({anzeigenModal: false});
  }
  verbergenUnrecht() {
  	this.setState({anzeigenUnrecht: false});
  }
  
  render() {
  	

    if(!this.state.done) {
      const frage = Objekt.questions[this.state.index];
    
      return (
      <div>
        { this.state.anzeigenModal ? <KorrektModal /> : null }
        <form onSubmit={(event) => this.pruefen(event)}>
          <h1>Frage {this.state.index + 1}/{Objekt.questions.length}</h1>
          <h3>Ergebnis: {this.state.ergebnis}/{Objekt.questions.length}</h3>
          <hr></hr>
          <h2>„ {frage.question} ”</h2>
          <input type="text" value={this.state.antwortenwert} onChange={(e)=>this.antwortenChange(e.target.value)}/>
          <br/>
          <div>
          <button onClick={() =>this.addChar("ä")}>ä</button>
          <button onClick={() =>this.addChar("ö")}>ö</button>
          <button onClick={() =>this.addChar("ü")}>ü</button>
          <button onClick={() =>this.addChar("ß")}>ß</button>
  
          {this.state.anzeigenUnrecht ? <p className={styles.red}>Dass ist es nicht</p>: null}
          </div>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>
      )
    } else {
      return <div>
        
        <h1>All Done</h1>
        <hr></hr>
        <h3>You got {this.state.ergebnis} out of {Objekt.questions.length}</h3>
        <button onClick={()=>{window.location.reload()}}>Play Again</button>
      </div>
    }
  
  }
 }
 

class App extends React.Component {
 	constructor(props) {
  	super(props);
    this.state = {
      start: false,
      loaded: false,
    }

    this.load = this.load.bind(this);
    this.load();
  }

  async load() {
   if (typeof window !== 'undefined') { //forces it client side
      var url = window.location.href;

      var id = url.split("=")[1];
      try {
        var obj = await find(id);
      } catch {
        obj = null;
      }
      
      console.log(obj);
      if(obj == null) {
        alert("Provided Code does not exist :(");
        return null;
      }
      Objekt = obj;
      this.setState({loaded: true});
   } 
  }
  render() {

  	return (
    <div className={styles.centered}>
        <div className={styles.card}>
          {this.state.start ? (
            <FrageHalter/>
          ): (
            <div>
              {!this.state.loaded ? <h1>Loading....</h1> : (
                <div>
                  <h1>Bereit?</h1>
                  <hr></hr>
                  <h2>{Objekt.name} by {Objekt.creator}</h2>
                  <button onClick={()=>{this.setState({start: true})}}>Beginnen!</button>
                </div>
              )}
            </div>
          )}
        </div>
    </div>
    );
  }
 }
 

export default function Home() {
  return <App></App>
}
