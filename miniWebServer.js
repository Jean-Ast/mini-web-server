const express = require("express");
const app = express(); 
const port = 3000;

app.use(express.json()); // With this line of code Express can understand json format
app.use(express.urlencoded({extended: false}))
let messagesJSON = [
{
  "Id": "1",
  "msg": "Hola"
},
{
  "Id": "2",
  "msg": "Mundo"
}
];

// 1) 
app.get("/messages", (req, resp) => {
    resp.json(messagesJSON);
  });

  // 2) 
  app.post("/messages", (req, resp) => {
    console.log(req.body);
    const NewMessage = {
      "Id": "3",  
      "msg": "Everythings fine bro"
    }
    // If a dont send a key
    // if(!NewMessage.id || !NewMessage.msg){
    //   return resp.status(400).json({msg: "Please add a id and name"})
    // }
    messagesJSON.push(NewMessage)
    resp.send(messagesJSON);
  });

  // 3)
  app.put("/messages/:msgId", (req, resp) => {
    const found = messagesJSON.some(m => m.Id == req.params.msgId);
    
    if(found){
      const updateMsg = req.body;
      messagesJSON.forEach(m => {
        m.msg = updateMsg.msg;
      });
      resp.send(messagesJSON)
    } else {
      resp.send({"msg": `Message Id ${req.params.msgId} not found`})
    }
    
    console.log(found);
  });

  // 4)
  app.delete("/messages/:msgId", (req, resp) => {
    const found = messagesJSON.some(m => m.Id == req.params.msgId);
    if ( found ) {
      resp.send({
        "msg": `User ${req.params.msgId} has been deleted`
      })
    } else {
      resp.send({"msg": `Message Id ${req.params.msgId} not found`})
    }
  });

  app.listen(port, () => console.log(`Listening on port ${port}`));
