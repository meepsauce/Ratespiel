import Link from "next/link"
import styles from '../styles/Home.module.css'
import React from 'react';
import { recentSets, alive } from "../lib/api";



export async function getServerSideProps(context) {
  var data = await alive();
  var recent = await recentSets();
  return {
    props: {
      dbOn: data.time ?? null,
      apiOn: data.status ?? null,
      recent : recent 
    }
  }
}

function formatTime(millis) {
  var time = (Date.now() - millis) / 60000;
  var min = Math.floor(time);
  var sec = (time - Math.floor(time)) * 60;
  return `${min} min ${sec} sec`;
}

function RecentList(props) {
  
  var recent = props.recent;
  while(recent.length > 15) {
    recent.pop();
  }
  console.log(recent);
  if(Object.keys(recent).length >= 1) {
    
    recent = recent.map((item,i) => {
      
      return (
        <Link href={`http://localhost:3000/set?id=${item._id}`}>
          <div key={i} className={styles.card}>
          <h3>{item.name} -- By: {item.creator} - {item.questions.length} questions</h3>
          </div>
        </Link>
      );
    });
  }
  else {
    recent = "No recent sets available :(";
  }
  return <div className={styles.card}>
  <h2>Recently made sets:</h2>
    {recent}
  </div>
}


export default function Home(props) {

  const [code, setCode] = React.useState(null);
  const [codeError, setCodeError] = React.useState(null);

  const goToSet = ()=> {
    if(code) {
      if(code.length >= 2) {
        window.location = window.location.href + `set?id=${code}`
      }
      else {
        setCodeError("Invalid Code");
      }
    }
    else {
      setCodeError("Invalid Code");
      
    }
   
  }
  
  return <div className={styles.centered}>
    <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
      <div className={styles.card}>
        <h1 className={styles.big}>Ratespiel</h1>
        <h5>Quizlet but worse</h5>
        <hr></hr>
        <h5>Database: { props.dbOn ? <span>&#9989;</span> : <span>&#10060;</span> } </h5>
        <h5>API: { props.apiOn ? <span>&#9989;</span> : <span>&#10060;</span> } </h5>
        <h5>{ props.dbOn ? <h5>Uptime: {formatTime(props.dbOn)}</h5> : null }</h5>
        <hr></hr>
        <h2>Create Configurable Learning Sets</h2>
        
        <label><b>Enter a set's code: </b></label><input type="text" value={code} onChange={(e)=>{setCode(e.target.value)}}></input>
        <p className={styles.red}>{codeError}</p>
        <button onClick={goToSet}>Go</button>

        <h2>Or:</h2>
        <Link href="/editor">
          <button>Create a new set (no account required)</button>
        </Link>
        <Link href="https://github.com/meepsauce/Ratespiel">
          <button>View GitHub Repository <span className="fa fa-github" style={{fontSize: "16px"}}></span></button>
        </Link>
        <Link href="/docs">
          <button>View API Docs </button>
        </Link>
        
      </div>
      <br></br>
      <RecentList recent={props.recent}></RecentList>
      <br></br>
      <br></br>

     
    </div>
}
