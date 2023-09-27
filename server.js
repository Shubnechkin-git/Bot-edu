const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '6694286870:AAE2h2tR4QQaBZY5VzWFhNnqxZuLY3eg1X0';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });


var fs = require('fs');
const { log } = require('console');
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});

let list = fs.readFileSync('list.json');
let pars = JSON.parse(list);

let dateGetDay = () => {
    let date = new Date()
    let daysArr = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    if (date.getDay() == 1) day = daysArr[0]
    if (date.getDay() == 2) day = daysArr[1]
    if (date.getDay() == 3) day = daysArr[2]
    if (date.getDay() == 4) day = daysArr[3]
    if (date.getDay() == 5) day = daysArr[4]
    if (date.getDay() == 6) day = daysArr[5]
    return day;
}

let sendUrok = (dateMessage) => {
    let date = new Date(dateMessage * 1000);
    let message = "Пар нет :)";
    let hours = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '2']//2 тестовая , доработать условия, так как возращается последний элемент из json
    let eventDay;
    for (let typeWeek in pars) {
        if (pars.hasOwnProperty(typeWeek)) {
            let daysOfWeek = pars[typeWeek];
            for (day in daysOfWeek) {
                if (daysOfWeek.hasOwnProperty(day)) {
                    if (dateGetDay() == day) {
                        eventDay = day;
                    }
                }
                let times = daysOfWeek[eventDay];
                for (time in times) {
                    if (times.hasOwnProperty(time)) {
                        message = `\nВремя: ${time}\nПара: ${times[time]}`;
                    }
                }
            }
        }
    }
    return message;
}

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    var date = new Date(msg.date * 1000);
    // send a message to the chat acknowledging receipt of their message
    if (msg.text != "/list" && msg.text != "Всё расписание" && msg.text != "Текущая пара" && msg.text != "Расписание на сегодня" && msg.text != "Расписание на неделю") {
        bot.sendMessage(chatId, `${msg.chat.first_name}, для получения расписания нажми на кнопку.`, {
            "reply_markup": {
                "keyboard": [[{ "text": "Текущая пара" }], [{ "text": "Расписание на сегодня", }, { "text": "Расписание на неделю" }], [{ "text": "Всё расписание" }]],
                'resize_keyboard': true
            }
        })
    }
    if (msg.text == "Всё расписание") {
        let message = "";
        for (let typeWeek in pars) {
            if (pars.hasOwnProperty(typeWeek)) {
                message += `\n\nНеделя: ${typeWeek}`;
                let daysOfWeek = pars[typeWeek];
                for (day in daysOfWeek) {
                    if (daysOfWeek.hasOwnProperty(day)) {
                        message += `\n\nДень: ${day}`;
                        let times = daysOfWeek[day];
                        for (time in times) {
                            if (times.hasOwnProperty(time)) {
                                message += `\nВремя: ${time}\nПара: ${times[time]}`;
                            }
                        }
                    }
                }
            }
        }
        bot.sendMessage(chatId, message);
    }
    if (msg.text == "Текущая пара") {
        bot.sendMessage(chatId, sendUrok(msg.date));
    }
});
