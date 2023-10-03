let timeFunc = require('./time');
let miscFunc = require('./misc');

var fs = require('fs');

let list = fs.readFileSync('list.json');
let pars = JSON.parse(list);

const sendWeek = (dateMessage) => {
    let message = "";
    let week = timeFunc.getWeek((dateMessage));
    let date = new Date((dateMessage * 1000));
    date.setDate(date.getDate() + 1)
    for (let typeWeek in pars) {
        if (pars.hasOwnProperty(typeWeek)) {
            if (week == typeWeek) {
                message += `\n\nНеделя: ${typeWeek}`;
                let daysOfWeek = pars[typeWeek];
                for (day in daysOfWeek) {
                    if (daysOfWeek.hasOwnProperty(day)) {
                        message += `\n\nДень: ${day}`;
                        let times = daysOfWeek[day];
                        for (time in times) {
                            if (times.hasOwnProperty(time)) {
                                message += `\nВремя: ${timeFunc.getTime(time)}\nПара: ${times[time]}`;
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
    // date.setDate(date.getHours());
    // console.log(date);
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
                            message = `\nВремя: ${createMessage(result)}\nПара: ${times[time]}`;
                    }
                }
            }
        }
    }
    if (message.length == 0) message = "Занятия не проводятся!"
    return message;
}

let result = [1];

const indexOfPara = (dateMessage) => {
    // console.log(dateMessage);
    let now = new Date(dateMessage * 1000);
    // now.setHours(now.getHours() - 16);//-10 часов
    // console.log(now.getHours());
    const timeRanges = [
        { start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 30), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0) },
        { start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 40) },
        { start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 20), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 50) },
        { start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 30) },
        { start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 40), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 10) },
        { start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 20), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 50) },
        { start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 30) },
    ];

    // Проверяем каждый диапазон времени
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
    for (let typeWeek in pars) {
        if (pars.hasOwnProperty(typeWeek)) {
            if (week == typeWeek) {
                message += `\n\nНеделя: ${typeWeek}`;
                let daysOfWeek = pars[typeWeek];
                for (day in daysOfWeek) {
                    if (daysOfWeek.hasOwnProperty(day)) {
                        if (timeFunc.dateGetDay(date) == day) {
                            message = `\n\nДень: ${day}`;
                            let times = daysOfWeek[day];
                            for (time in times) {
                                if (times.hasOwnProperty(time)) {
                                    message += `\nВремя: ${timeFunc.getTime(time)}\nПара: ${times[time]}`;
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

const sendYesterday = (dateMessage) => {
    let message = "";
    let week = timeFunc.getWeek((dateMessage));
    let date = new Date((dateMessage * 1000));
    for (let typeWeek in pars) {
        if (pars.hasOwnProperty(typeWeek)) {
            if (week == typeWeek) {
                message += `\n\nНеделя: ${typeWeek}`;
                let daysOfWeek = pars[typeWeek];
                for (day in daysOfWeek) {
                    if (daysOfWeek.hasOwnProperty(day)) {
                        if (timeFunc.dateGetDay(date) == day) {
                            message = `\n\nДень: ${day}`;
                            let times = daysOfWeek[day];
                            for (time in times) {
                                if (times.hasOwnProperty(time)) {
                                    message += `\nВремя: ${timeFunc.getTime(time)}\nПара: ${times[time]}`;
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
                    message += `\n\nДень: ${day}`;
                    let times = daysOfWeek[day];
                    for (time in times) {
                        if (times.hasOwnProperty(time)) {
                            message += `\nВремя: ${timeFunc.getTime(time)}\nПара: ${times[time]}`;
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