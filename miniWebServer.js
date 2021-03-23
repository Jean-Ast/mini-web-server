const express = require("express");
const app = express(); 
const port = 3000;

app.use(express.json()); // With this line of code Express can understand json format
app.use(express.urlencoded({extended: false}))
let messagesJSON = [
{
  "id": "1",
  "msg": "Hola"
},
{
  "id": "2",
  "msg": "Mundo"
}
];

// 1) GET
app.get("/messages", (req, resp) => {
    resp.json(messagesJSON);
  });

  // 2) POST
  app.post("/messages", (req, resp) => {
    // console.log(req.body);
    const newMessage = {
      id: req.body.id,
      msg: req.body.msg
    }
    if (!newMessage.id || !newMessage.msg) {
      return resp.json({msg: 'Please enter an Id and message'})
    }
    messagesJSON.push(newMessage)
    resp.send(messagesJSON);
  });

  // 3) PUT
  app.put("/messages/:msgId", (req, resp) => {
    // Find message to update
    const found = messagesJSON.some(m => m.id == req.params.msgId);
    
    if(found){
      const updateMsg = req.body;
      messagesJSON.forEach(m => {
        if (m.id == req.params.msgId) {
          m.msg = updateMsg.msg;
        }
      });
      resp.send(messagesJSON)
    } else {
      resp.send({"msg": `Message Id ${req.params.msgId} not found`})
    }
    console.log(found);
  });

  // 4) DELETE
  app.delete("/messages/:msgId", (req, resp) => {
    // Find message to delete
    const found = messagesJSON.some(m => m.id == req.params.msgId);
    const idToDelete = req.params.msgId;

    if ( found ) {
      removeMsg(messagesJSON,idToDelete);
      resp.send({
        "msg": `User ${req.params.msgId} has been deleted`,
        messagesJSON: messagesJSON
      })

    } else {
      resp.send({"msg": `Message Id ${req.params.msgId} not found`})
    }
    console.log(found)
  });

  app.listen(port, () => console.log(`Listening on port ${port}`));

  const removeMsg = (arr, id) => {
    const index = arr.findIndex(elem => {
       return elem.id === String(id);
    });
    if(index === -1){
       return false;
    };
    return arr.splice(index, 1);
 };