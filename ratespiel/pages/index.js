
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
  var html;
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

  const goToSet = ()=> {
    window.location = window.location.href + `set?id=${code}`
  }
  
  return <div className={styles.centered}>
      <div className={styles.card}>
        <h1 className={styles.big}>Ratespiel</h1>
        <h5>Quizlet but worse</h5>
        <hr></hr>
        <h5>Database: { props.dbOn ? <span>&#9989;</span> : <span>&#10060;</span> } </h5>
        <h5>API: { props.apiOn ? <span>&#9989;</span> : <span>&#10060;</span> } </h5>
        <h4>{ props.dbOn ? <h5>Uptime: {formatTime(props.dbOn)}</h5> : null }</h4>
        <hr></hr>
        <h4 className={styles.red}>*As this software is in active development, your data will not be persistently saved</h4>
        <h2>[Content is supposed to be here]</h2>
        
        <label><b>Enter a set's code: </b></label><input type="text" value={code} onChange={(e)=>{setCode(e.target.value)}}></input>
        <button onClick={goToSet}>Go</button>

        <h2>Oder</h2>
        <Link href="/editor">
          <button>Create a new set (no account required)</button>
        </Link>
        
      </div>
      <br></br>
      <RecentList recent={props.recent}></RecentList>
      <br></br>
      <br></br>

     
    </div>
}
