import { useState ,useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";

const Input = ({setValue , value }) => {
    const [input , setInput ] = useState('')

  const handleChange = (e) => {
    let inputValue = e.target.value;
 
    inputValue = inputValue.replace(/[^0-9]/g,'');

    // Ensure the value is within the range of 1 to 20
    if (inputValue !== '' && parseInt(inputValue) >= 1 && parseInt(inputValue) <= 20) {
      setInput(inputValue);
    }

 };


  function handleclick(){
    let inputValue = input; 
    setValue(inputValue);
}

  return (
    <div style={{marginTop : '10px' , display: 'flex' ,justifyContent:'flex-start' , alignItems:'center' ,background:'#fff8c5'}}>
      <label htmlFor="numberInput"><Typography variant="h5">Enter a number (1-20): </Typography></label>
      <TextField
        label="Enter text"
        variant="outlined"
        onChange={handleChange}
        
      />
      <Button variant="contained" onClick={handleclick}>
        Click
      </Button>
    </div>
  );
};


export default Input;
