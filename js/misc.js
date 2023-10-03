const keyboards = () => {
    return ({
        "reply_markup": {
            "keyboard": [[{ "text": "Текущая пара" }], [{ "text": "Расписание на сегодня", }, { "text": "Расписание на завтра" }], [{ "text": "Расписание на неделю" }, { "text": "Всё расписание" }]],
            'resize_keyboard': true
        }
    })
}

module.exports = { keyboards }