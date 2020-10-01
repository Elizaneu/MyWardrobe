# Пользователи:
##GET /user/{id}
Получить данные пользователя с idUser = {id}

Если {id} отсутствует (запрос на /user) вернет аторизованного пользователя(или ошибку 401)

Пример запроса: http://localhost:8000/user/1

Пример ответа: [{"idUser":1,"LastName":"Klemeshov","FirstName":"Dima","Email":"dima-0510@mail.ru","RegistrationDate":"2020-09-28T18:26:54.000Z"}]
