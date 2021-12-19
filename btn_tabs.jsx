//  css 

// .Tabs{
//  background-color: white; 
//  width: 300px; 
//  height: 100px; 
// }

// .active{
//   color: white; 
//   background-color: blue; 
//   border-radius: 10px;
// }

// .inactive{
//   color: black; 
//   background-color: white;
//   border: none; 
// }





// react code
 
import React,{useState} from "react"; 
import "./styles.css";

export default function App() {

  const [tabValue, setTabValue] = useState("integration");

  const handleClick = (e)=>{
    if(e.target.value === "integration"){
      setTabValue("integration"); 
    }
    if(e.target.value === "config"){
      setTabValue("config"); 
    }
  }

  return (
    <div className="App">
     <div className="Tabs"> 
      <button 
        className={tabValue === "integration" ? "active" : "inactive"}
        value="integration"
        onClick={handleClick}
      > 
        Integration 
      </button>
      <button
        className={tabValue=== "config" ? "active" : "inactive"}
        value="config"
        onClick={handleClick}
      > Configuration </button>

      {tabValue === "integration"? 
      <div> hello from integ </div>
      : <div> hello from config </div>    
    }
     </div> 
    </div>
  );
}
