## Пользователи:

### Получить данные пользователя с idUser = {id}
##### GET /user/{id}

Если {id} отсутствует (запрос на /user) вернет аторизованного пользователя(или ошибку 401)

Пример запроса: http://localhost:8000/user/1

Пример ответа: [{"idUser":1,"LastName":"Klemeshov","FirstName":"Dima","Email":"dima-0510@mail.ru","RegistrationDate":"2020-09-28T18:26:54.000Z"}]

### Создать пользователя
##### POST /user

В запросе необходимо указать: LastName, FirstName, Email, Password

При ошибки создания нового пользователя вернется объект вида {"error": (вызваная ошибка)}

Пример запроса: http://localhost:8000/user<br/>
Body{
    "LastName": "Иванов",
    "FirstName": "Иван",
    "Email": "Ivan@ivanov.com",
    "Password": "ivanov228"
}

Пример ответа:
{
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 8,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "",
    "protocol41": true,
    "changedRows": 0
}
