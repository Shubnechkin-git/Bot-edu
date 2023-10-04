const mysql = require('mysql2');

// Создайте подключение к базе данных
const connection = mysql.createConnection({
    host: 'containers-us-west-56.railway.app',
    user: 'root',
    password: '74Nshn5TkIJb2IdFXCJl',
    database: 'railway',
    port: '6250'
});

// Подключение к базе данных


const insertNewUserToBase = async (chatId, username) => {
    connection.connect((err) => {
        if (err) {
            console.error('Ошибка подключения к базе данных:', err);
        } else {
            console.log('Подключение к базе данных успешно установлено');

            const data = {
                chatId: Number(chatId),
                username: username
            };

            getUserOfBase(chatId, (existingUser) => {
                if (existingUser !== chatId) {
                    connection.query('INSERT INTO Users SET ?', data, (err, results) => {
                        if (err) {
                            console.error('Ошибка выполнения INSERT:', err);
                        } else {
                            console.log('Новая запись успешно добавлена:', results);
                        }
                    });
                } else {
                    console.log("Пользователь существует!");
                }
            });
        }
    });
}

const getUserOfBase = async (chatId, callback) => {
    connection.query(`SELECT chatId FROM Users WHERE chatId = ${chatId}`, (err, results) => {
        if (err) {
            console.error('Ошибка выполнения SELECT:', err);
            callback(undefined); // Ошибка при запросе, передаем undefined в callback
        } else {
            if (results.length > 0) {
                console.log('Пользователь найден:', results[0].chatId);
                callback(results[0].chatId); // Передаем результат в callback
            } else {
                callback(undefined); // Пользователь не найден, передаем undefined в callback
            }
        }
    });
}

const countMessages = (chatId) => {
    connection.query(`UPDATE Users SET messages = messages + 1 WHERE chatId = ${chatId}` , (err, results) => {
        if (err) {
            console.error('Ошибка выполнения UPDATE:', err);
        } else {
            console.log('Число успешно увеличено и сохранено');
        }
    });
}

module.exports = {
    insertNewUserToBase, getUserOfBase, countMessages
}

// connection.query('SELECT * FROM Users', (err, results) => {
//     if (err) {
//         console.error('Ошибка выполнения запроса:', err);
//     } else {
//         console.log('Результаты запроса:', results);
//     }
// });
