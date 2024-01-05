
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";



const WebSocketComponent = () => {
    const [id, setId] = useState('');
    const [randomNumbers, setRandomNumbers] = useState('');
    const [firstResponseReceived , setFirstResponseReceived] = useState(true)
  useEffect(() => {

    const socket = new WebSocket('ws://localhost:3000');

    // Event listener ==>  connection is established
    socket.addEventListener('open', (event) => {
      console.log('WebSocket connection opened:', event);

    });

    // Event listener for incoming messages
    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
        console.log(data)
        // PUT ID NAME when first response is received
        if (firstResponseReceived) {
            console.log('First response received taking in the id ');
            setId(data.id);
            setFirstResponseReceived(false);
          }
        
        setRandomNumbers(data.value)

    });

    // connection is closed
    socket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed:', event);
    });

    // close the socket when the component is unmounted
    return () => {
      socket.close();
    };
  }, []); //empty to run only when mounting 

  
  return (
    <div style={{background : 'black' , height: '20vh' , width: '30vw' ,borderRadius: '10px', padding:'10px'}}>
<Typography variant="body2" style={{ fontWeight: 'bold', marginBottom: '4px' ,color: 'white' }}>
        Company:
      </Typography>
      <Typography variant="h5" color={'white'}>
      {`${id}`}
      </Typography>

<Typography variant="body2" style={{ fontWeight: 'bold', marginBottom: '4px' ,color: 'white' }}>
        <span style={{background:'red'}}>Price:</span>
      </Typography>
      <Typography variant="h2" color={'lime'} fontWeight={'bold'}>
      ${`${randomNumbers}`}
      </Typography>

    </div>
  );
};

export default WebSocketComponent;
