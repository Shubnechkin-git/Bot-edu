const TelegramBot = require('node-telegram-bot-api');

const timeFunc = require('./js/time');
const sendFunc = require('./js/sendMessage');
const miscFunc = require('./js/misc');

const token = '6694286870:AAEAZEExv6BLL0AxhTlwsFZovYyrJos4ln4';

const bot = new TelegramBot(token, { polling: true });

var fs = require('fs');
const { log } = require('console');
const { exit } = require('process');

bot.onText(/\/echo (.+)/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1];

    bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    var date = new Date(msg.date * 1000);

    if (msg.text != "/list" && msg.text != "Всё расписание" && msg.text != "Текущая пара" && msg.text != "Расписание на сегодня" && msg.text != "Расписание на завтра" && msg.text != "Расписание на неделю") {
        bot.sendMessage(chatId, `${msg.chat.first_name}, для получения расписания нажми на кнопку.`,
            miscFunc.keyboards()
        )
    }
    if (msg.text == "Всё расписание") {
        try {
            bot.sendMessage(chatId, sendFunc.sendAll());
        } catch (e) {
            console.log(e);
        }
    }
    if (msg.text == "Текущая пара") {
        try {
            bot.sendMessage(chatId, (sendFunc.sendUrok(msg.date)));
        }
        catch (e) { console.log("Ошибка! ", e); }
    }
    if (msg.text == "Расписание на сегодня") {
        try {

            bot.sendMessage(chatId, sendFunc.sendYesterday(msg.date));
        }
        catch (e) { console.log("Ошибка! ", e); }
    }
    if (msg.text == "Расписание на завтра") {
        try {

            bot.sendMessage(chatId, sendFunc.sendTomorrow(msg.date));
        }
        catch (e) { console.log("Ошибка! ", e); }
    }
    if (msg.text == "Расписание на неделю") {
        try {
            bot.sendMessage(chatId, sendFunc.sendWeek(msg.date));
        }
        catch (e) { console.log("Ошибка! ", e); }
    }

    fs.appendFileSync("./users_log/" + msg.chat.username + ".txt", `${date.getHours() + ':' + date.getMinutes() + ' ' + date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear()}, ${msg.chat.first_name + ' ' + msg.chat.last_name + ' ' + msg.chat.username + '(' + msg.chat.id + '): ' + msg.text}\n`);
});