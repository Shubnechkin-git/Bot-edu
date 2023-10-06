const fs = require('fs');
const timeFunc = require('./time');
const list = fs.readFileSync('./list.json');
const pars = JSON.parse(list);

const sendWeek = (dateMessage) => {
    let message = "";
    let week = timeFunc.getWeek((dateMessage));
    let date = new Date((dateMessage * 1000));
    date.setDate(date.getDate() + 1)
    date.setHours(date.getHours() + 4);//Время для оригона
    for (let typeWeek in pars) {
        if (pars.hasOwnProperty(typeWeek)) {
            if (week == typeWeek) {
                message += `\n\nНеделя: ${typeWeek}`;
                let daysOfWeek = pars[typeWeek];
                for (day in daysOfWeek) {
                    if (daysOfWeek.hasOwnProperty(day)) {
                        message += `\n\n📆 День: ${day} \n\n🕒 Расписание: `;
                        let times = daysOfWeek[day];
                        for (time in times) {
                            if (times.hasOwnProperty(time)) {
                                if (times[time].toString() !== "Окно")
                                    message += `${addEmojyMessages(time)}\n⏰ Время: ${timeFunc.getTime(time)}\n📚 Предмет: ${times[time]}`;
                                else message += `${addEmojyMessages(time)} Окно\n⏰ Время: ${timeFunc.getTime(time)}`;
                            }
                        }
                    }
                }
            }
        }
    }
    if (message.length == 0) message = "Занятия не проводятся!";
    return message;
}

const sendUrok = (dateMessage) => {
    let week = timeFunc.getWeek(dateMessage);
    let date = new Date(dateMessage * 1000);
    date.setHours(date.getHours() + 4);//Время для оригона
    let message = "";
    let eventDay;
    let daysOfWeek;
    for (let typeWeek in pars) {
        if (pars.hasOwnProperty(typeWeek)) {
            if (week == typeWeek) {
                daysOfWeek = pars[typeWeek];
            }
            for (day in daysOfWeek) {
                if (daysOfWeek.hasOwnProperty(day)) {
                    if (timeFunc.dateGetDay(date) == day) {
                        eventDay = day;
                    }
                }
                let times = daysOfWeek[eventDay];
                for (time in times) {
                    if (times.hasOwnProperty(time)) {
                        if (indexOfPara(dateMessage).toString() == time)
                            message = `\nТекущая пара:${addEmojyMessages(time)}\n⏰ Время: ${createMessage(result)}\n📚 Предмет: ${times[time]}`;
                        if ((indexOfPara(dateMessage)).toString() + 1 == time + 1) {
                            console.log(`${result[0]}`);
                            if (times[Number(time) + 1] !== undefined) {
                                indexOfPara(dateMessage, 1)
                                message += `${addEmojyMessages(time, 1)}\n⏰ Время: ${createMessage(result)}\n📚 Предмет: ${times[Number(time) + 1]}`;
                            }
                            else if (times[Number(time) + 1] == undefined) {
                                message += "\n\nСледующая пара: занятия не проводятся!"
                            }
                        }
                    }
                }
            }
        }
    }
    if (message.length == 0) message = "Занятия не проводятся!"
    return message;
}

let result = [1];

const indexOfPara = (dateMessage, k = 0) => {

    let now = new Date(dateMessage * 1000);
    if (k == 0) {
        now.setHours(now.getHours() + 4);//Время для оригона
    } else if (k == 1) {
        now.setHours(now.getHours() + 5);//Время для оригона
        now.setMinutes(now.getMinutes()+30);
    }

    const timeRanges = [
        { start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 30), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0) },
        { start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 40) },
        { start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 20), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 50) },
        { start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 30) },
        { start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 40), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 10) },
        { start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 20), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 50) },
        { start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 30) },
    ];

    for (let i = 0; i < timeRanges.length; i++) {
        const startRange = timeRanges[i].start;
        const endRange = timeRanges[i].end;

        if (now >= startRange && now <= endRange) {
            result = [startRange, endRange, i + 1]
            return i + 1;
        }
    }

    return 404;
}

const createMessage = (array) => {
    return (`${array[0].getHours()}:${array[0].getMinutes()}-${array[1].getHours()}:${array[1].getMinutes()} `);
}

const sendTomorrow = (dateMessage) => {
    let message = "";
    let week = timeFunc.getWeek((dateMessage));
    let date = new Date((dateMessage * 1000));
    date.setDate(date.getDate() + 1)
    date.setHours(date.getHours() + 4);//Время для оригона
    for (let typeWeek in pars) {
        if (pars.hasOwnProperty(typeWeek)) {
            if (week == typeWeek) {
                message += `\n\nНеделя: ${typeWeek}`;
                let daysOfWeek = pars[typeWeek];
                for (day in daysOfWeek) {
                    if (daysOfWeek.hasOwnProperty(day)) {
                        if (timeFunc.dateGetDay(date) == day) {
                            message = `\n\n📆 День: ${day} \n\n🕒 Расписание: `;
                            let times = daysOfWeek[day];
                            for (time in times) {
                                if (times.hasOwnProperty(time)) {
                                    if (times[time].toString() !== "Окно")
                                        message += `${addEmojyMessages(time)}\n⏰ Время: ${timeFunc.getTime(time)}\n📚 Предмет: ${times[time]}`;
                                    else message += `${addEmojyMessages(time)} Окно\n⏰ Время: ${timeFunc.getTime(time)}`;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (message.length == 0) message = "Занятия не проводятся!";
    return message;
}

const addEmojyMessages = (time, k = 0) => {
    let emojys = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']
    let emojy = "";
    let message = "";
    if (k == 0)
        for (i = 0; i < emojys.length; i++) {
            if (Number(time) == Number(i + 1) && i < emojys.length) {
                emojy = emojys[i];
                return `\n\n${emojy} Пара ${i + 1}:`;
            } else if (Number(time) == Number(i) && i == emojys.length) {
                emojy = emojys[i];
                message += `\n\n${emojy} Пара ${i + 1}:`;
            }
        }
    if (k == 1) {
        for (i = 0; i < emojys.length; i++) {
            if (Number(time) + 1 == Number(i + 1) && i < emojys.length) {
                emojy = emojys[i];
                message += `\n\nСледующая пара: \n\n${emojy} Пара ${i + 1}:`;
            } else if (Number(time) + 1 == Number(i) && i == emojys.length) {
                emojy = emojys[i];
                message += `\n\nСледующая пара: \n\n${emojy} Пара ${i + 1}:`;
            }
        }
    }
    return message;
}

const sendYesterday = (dateMessage) => {
    let message = "";
    let i = 0;
    let week = timeFunc.getWeek((dateMessage));
    let date = new Date((dateMessage * 1000));
    date.setHours(date.getHours() + 4);//Время для оригона
    for (let typeWeek in pars) {
        if (pars.hasOwnProperty(typeWeek)) {
            if (week == typeWeek) {
                message += `\n\nНеделя: ${typeWeek}`;
                let daysOfWeek = pars[typeWeek];
                for (day in daysOfWeek) {
                    if (daysOfWeek.hasOwnProperty(day)) {
                        if (timeFunc.dateGetDay(date) == day) {
                            message = `\n\n📆 День: ${day} \n\n🕒 Расписание: `;
                            let times = daysOfWeek[day];
                            for (time in times) {
                                if (times.hasOwnProperty(time)) {
                                    if (times[time].toString() !== "Окно")
                                        message += `${addEmojyMessages(time)}\n⏰ Время: ${timeFunc.getTime(time)}\n📚 Предмет: ${times[time]}`;
                                    else message += `${addEmojyMessages(time)} Окно\n⏰ Время: ${timeFunc.getTime(time)}`;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (message.length == 0) message = "Занятия не проводятся!";
    return message;
}

const sendAll = () => {
    let message = "";
    for (let typeWeek in pars) {
        if (pars.hasOwnProperty(typeWeek)) {
            message += `\n\nНеделя: ${typeWeek}`;
            let daysOfWeek = pars[typeWeek];
            for (day in daysOfWeek) {
                if (daysOfWeek.hasOwnProperty(day)) {
                    message += `\n\n📆 День: ${day} \n\n🕒 Расписание: `;
                    let times = daysOfWeek[day];
                    for (time in times) {
                        if (times.hasOwnProperty(time)) {
                            if (times[time].toString() !== "Окно")
                                message += `${addEmojyMessages(time)}\n⏰ Время: ${timeFunc.getTime(time)}\n📚 Предмет: ${times[time]}`;
                            else message += `${addEmojyMessages(time)} Окно\n⏰ Время: ${timeFunc.getTime(time)}`;
                        }
                    }
                }
            }
        }
    }
    return message;
}

module.exports = {
    sendWeek, sendUrok, sendTomorrow, sendYesterday, sendAll, indexOfPara
}
