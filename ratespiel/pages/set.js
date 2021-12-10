import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react';


class Frage {
	constructor(frage, antworten) {
  	this.frage = frage;
    this.antworten = antworten;
  }
}

var Fragen = [new Frage("Was ist Blau", "b"), new Frage("ee", "eee")];
var korrektWurden = ["Korrekt", "Super", "Genau", "Richtig"];
var modalZeit = 1.5; //sekunden



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
        antwortenwert: "",
        anzeigenModal: false,
        anzeigenUnrecht: false,
        ergebnis: 0
    };
    
   
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
  	const frage = Fragen[this.state.index];
  	if(this.state.antwortenwert === frage.antworten) {
      this.setState({anzeigenModal: true, index: this.state.index+1, anzeigenUnrecht: false, ergebnis: this.state.ergebnis+1});
      setTimeout(this.verbergenModal, modalZeit * 1000);
      
    }
    else {
    	this.setState({anzeigenUnrecht: true, index: this.state.index+1});
        setTimeout(this.verbergenUnrecht, modalZeit * 1000);
    }
    //this.setState({anzeigenModal: true, index: this.state.index+1, anzeigenUnrecht: false});
    event.preventDefault();
  }
  
  verbergenModal() {
  	this.setState({anzeigenModal: false});
  }
  verbergenUnrecht() {
  	this.setState({anzeigenUnrecht: false});
  }
  
  render() {
  	
  	const frage = Fragen[this.state.index];
    
  	return (
    <div>
      { this.state.anzeigenModal ? <KorrektModal /> : null }
      <form onSubmit={this.pruefen}>
        <h1>Frage {this.state.index + 1}/{Fragen.length}</h1>
        <h3>Ergebnis: {this.state.ergebnis}/{Fragen.length}</h3>
        <h2>„ {frage.frage} ”?</h2>
        <input type="text" value={this.state.antwortenwert} onChange={(e)=>this.antwortenChange(e.target.value)}/>
        <br/>
        <div>
        <button onClick={() =>this.addChar("ä")}>ä</button>
        <button onClick={() =>this.addChar("ö")}>ö</button>
        <button onClick={() =>this.addChar("ü")}>ü</button>
        <button onClick={() =>this.addChar("ß")}>ß</button>

        {this.state.anzeigenUnrecht ? <p>Dass ist es nicht</p>: null}
        </div>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    </div>
    )
  }
 }
 

class App extends React.Component {
 	constructor(props) {
  	super(props);
  }
  render() {
  	return (
    <div className={styles.centered}>
        <div className={styles.card}>
            <FrageHalter/>
        </div>
    </div>
    );
  }
 }
 

export default function Home() {
  return <App></App>
}
