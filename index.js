
const fs = require('fs');
require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api');
const express = require('express')
const app = express()
const port = process.env.PORT || 8080

const token = process.env.TOKEN || 'yourtoken';
const adminPassword = process.env.ADMINPASS || "1234";

const userFile = process.env.USERFILE || 'user.json';
const adminFile = process.env.ADMINFILE || 'admins.json';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
  polling: true
});

const clientsMap = loadMap();
let adminsSet = loadSet();
saveSet(adminsSet);

bot.on("polling_error", (msg) => console.log(msg));

function saveMap(map) {
    try {
        fs.writeFileSync(userFile, JSON.stringify([...map]));
      } catch (err) {
        console.error(err);
      }
}

function loadMap() {
    try {
        jsonStr = fs.readFileSync(userFile, 'utf8');
        return new Map(JSON.parse(jsonStr));
      } catch (err) {
        console.error(err)
        return new Map();
      }
}

function saveSet(map) {
    try {
        fs.writeFileSync(adminFile, JSON.stringify([...map]));
      } catch (err) {
        console.error(err);
      }
}

function loadSet() {
    try {
        jsonStr = fs.readFileSync(adminFile, 'utf8');
        return new Set(JSON.parse(jsonStr));
      } catch (err) {
        console.error(err)
        return new Set();
      }
}

bot.onText(/\/set_nickname (.+)/, (msg, match) => {

    const chatId = msg.chat.id;
    const nicname = match[1]; 
    
    if (clientsMap.has(nicname)) {
        bot.sendMessage(chatId, "nickename already in using. please choice another nickname");
    }else{

        clientsMap.set(nicname, chatId)
        saveMap(clientsMap);
        bot.sendMessage(chatId, "nickname added");
    }
});

bot.onText(/\/set_admin (.+)/, (msg, match) => {

    const chatId = msg.chat.id;
    const pass = match[1]; 
    
    if (pass === adminPassword){
        if (adminsSet.has(chatId)) {
            bot.sendMessage(chatId, "alredy admin");
        }else{
    
            adminsSet.add(chatId);
            saveSet(adminsSet);
            bot.sendMessage(chatId, "admin added");
        }
    }else{
        bot.sendMessage(chatId, "wrong pass");
    }

    
});

bot.onText(/\/unset_admin/, (msg) => {

    const chatId = msg.chat.id;
    
    if (adminsSet.has(chatId)) {

        adminsSet.delete(chatId);
        bot.sendMessage(chatId, "admin removed");

    }else{
        bot.sendMessage(chatId, "not admin");
    }
});

bot.onText(/\/start/, (msg) => {

    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `
    
    How to use this bot:

    First step, set your nickname using:
    /set_nickname <nick>

    Then you can use hooks, with wget, curl, e.g

    Bot uses query parameters:
    n - is your nickname, you can use nickname of another user, then this user will recieve message
    msg - is your message that will be displayed in bot message. 

    Example:
    curl "http//<>?n=max&msg=test"

    Use case:
    bash ./<very_long_task_or_script>.sh && curl "http//<>?n=max&msg=task_finished"

    Note that spaces is not allowed in query parameters, use '+' instead
    `);
});

function notifyAdminsSet(nickname, msg){
    for (let admin of adminsSet) {
        bot.sendMessage(admin, `Message for ADMIN:\nReciever: ${nickname}\nMessage:\n ${msg}`);
    };
}

function notifyUser(nickname, msg){
    bot.sendMessage(clientsMap.get(nickname), `Message for ${nickname}\nMessage:\n${msg}`);
}

app.get('/', (req, res) => {

  const { n, msg } = req.query;

  console.log(n, msg);

  if (clientsMap.has(n)){

    notifyUser(n, msg);
    notifyAdminsSet(n, msg);
    res.status(200).send('OK\n');
  }else{
    res.status(404).send(`user ${n} not found\n`);
  }

  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

