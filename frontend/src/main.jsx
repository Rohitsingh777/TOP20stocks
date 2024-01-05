import Input from "./input";
import Maindiv from "./maindiv";
import { useState } from "react";


function Mainpg(){
 const [value, setValue] = useState('');   

return (
    <div>
<Input value = {value} setValue={setValue}></Input>
<Maindiv value={value}></Maindiv>
    </div>
   
);}


export default Mainpg ;