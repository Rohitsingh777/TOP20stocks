const fs = require('fs');

// key 
const apiKey = 'y1WY6goShQKpPozQaV9RDM2Uv815aCoC';

// endpoints for all the stock 
const endpoint = `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-09?adjusted=true&apiKey=${apiKey}`

let stockArr = [] ;
let top20 ;
console.log(endpoint)
// fetching all and filtering top 20 
fetch(endpoint)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {

    stockArr.push(...data.results.map(stock => 
        (
            {
                "Symbol" : stock.T,
                "Opening_Price" : stock.o
            }
        )
    ))
stockArr.sort((a, b) => b.Opening_Price - a.Opening_Price);
 top20  = stockArr.slice(0, 20);

//writing to a file 
const top20txt = JSON.stringify(top20, null, 2);


console.log(top20txt)

fs.writeFile('stock.txt', top20txt, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Output written to stock.txt');
    }
  });

  })
  .catch(error => console.error('Error:', error));
////websocket logic /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const websocket = require('ws');
const wss = new websocket.Server({ port: 3000 });
const clients = new Map();

///websocket id


wss.on('listening', () => {
    console.log('Server is listening on port 3000');
  });

let id =0 ; 
// [{
//     "Symbol" : stock.T,
//     "Opening_Price" : stock.o
// },...]


wss.on('connection', (ws) => {

    const I = id++;
    const clientId = top20[I].Symbol;


    clients.set(clientId, ws);
  
    console.log(`Client connected with ID: ${clientId}`);
    let op = top20[I].Opening_Price;

    ws.send(JSON.stringify({ "id" : clientId , "value":  op }));
    
    ws.on('message', (message) => {
      console.log(`Received message from client ${clientId}: ${message}`);
    });
  
    ws.on('close', () => {
        //decrementing as array exausts at 20
        --id;
      console.log(`Client ${clientId} disconnected`);
      clients.delete(clientId);
    });


  });


//get random numbers 

function generateRandomNumber() {
    return Math.floor(Math.random() * 1000);
  }



  // Send a random number to each connected client every 5 seconds
setInterval(() => {
    clients.forEach((ws, clientId) => {
      const randomNumber = generateRandomNumber();
      ws.send(JSON.stringify({  id: clientId, value: randomNumber }));
    });
  }, 5000);