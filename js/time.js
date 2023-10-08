const getTime = (index) => {
    switch (index) {
        case '1':
            return "8:30-10:00"
            break;
        case '2':
            return "10:10-11:40"
            break;
        case '3':
            return "12:20-13:50"
            break;
        case '4':
            return "14:00-15:30"
            break;
        case '5':
            return "15:40-17:10"
            break;
        case '6':
            return "17:20-18:50"
            break;
        case '7':
            return "19:00-20:30"
            break;
    }
}

const getWeek = (dateMessage) => {
    let date = new Date(dateMessage * 1000);
    date.setHours(date.getHours() + 4);
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const firstDayOfWeek = 1; // Первый день недели (0 - воскресенье, 1 - понедельник, и т.д.)
    const daysPassed = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
    const currentWeek = Math.floor((daysPassed + startOfYear.getDay() - firstDayOfWeek) / 7) + 1;

    if (currentWeek % 2 == 0) return "Над чертой"
    else return "Под чертой"
}

const dateGetDay = (date) => {
    let daysArr = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    if (date.getDay() == 1) day = daysArr[0]
    if (date.getDay() == 2) day = daysArr[1]
    if (date.getDay() == 3) day = daysArr[2]
    if (date.getDay() == 4) day = daysArr[3]
    if (date.getDay() == 5) day = daysArr[4]
    if (date.getDay() == 6) day = daysArr[5]
    return day;
}

module.exports ={
    getTime,getWeek, dateGetDay
}
