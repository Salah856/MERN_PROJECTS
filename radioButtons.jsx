import {RadioGroup, FormLabel, FormControl, FormControlLabel, Radio} from "@material-ui/core"
function App() {

  const handleChange = (e)=>{
    //console.log(e.target.value); 
    let choice = e.target.value; 
    
    if (choice === "URL"){
      console.log("url chosen")
    }
    if (choice === "Topic Flow"){
      console.log(" topic chosen")
    }
  }
  return (
    <div>
      <FormLabel 
        component="legend"
        style={{
          fontWeight: "bold", 
          marginBottom: "30px"
        }}
      
      >
        Action
      </FormLabel>
      <RadioGroup 
        row 
        aria-label="Action" 
        name="row-radio-buttons-group"
        onChange={handleChange}      
      >
        <FormControlLabel value="URL" control={<Radio style={{
          color: "blue"
        }} />} label="URL" />
        <FormControlLabel value="Topic Flow" control={<Radio style={{
          color: "blue"
        }} />} label="Topic Flow" />
      </RadioGroup>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
