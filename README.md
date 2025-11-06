# Feedback API

## **Аутентификация**

### `POST /api/auth/register`

**Описание:** Регистрация нового пользователя.
**Body:**

```json
{
  "username": "string (min 3 символа)",
  "password": "string (min 6 символов)",
  "email": "string (необязательно)"
}
```

**Ответ (201 Created):**

```json
{
  "success": true,
  "token": "JWT токен",
  "user": { "id": 123, "username": "user", "email": "user@example.com" }
}
```

**Ошибки:**

* 400 — недостающие поля или слишком короткие username/password
* 409 — username уже существует

---

### `POST /api/auth/login`

**Описание:** Логин пользователя.
**Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Ответ:**

```json
{
  "success": true,
  "token": "JWT токен",
  "user": { "id": 123, "username": "user", "email": "user@example.com" }
}
```

**Ошибки:**

* 400 — недостающие поля
* 401 — неправильный username или password

---

### `GET /api/auth/me` (PROTECTED)

**Описание:** Получение информации о текущем пользователе по JWT.
**Header:** `Authorization: Bearer <token>`
**Ответ:**

```json
{
  "id": 123,
  "username": "user",
  "email": "user@example.com",
  "createdAt": "2025-11-06T12:00:00.000Z"
}
```

**Ошибки:**

* 401 — токен отсутствует
* 403 — токен недействителен
* 404 — пользователь не найден

---

## **Сообщения**

### `GET /api/messages`

**Описание:** Получение списка всех сообщений, отсортированных по дате (сначала новые).
**Ответ:**

```json
[
  {
    "id": 123,
    "content": "Текст сообщения",
    "userId": 1,
    "username": "user",
    "likes": 5,
    "reports": 0,
    "likedBy": [1,2],
    "createdAt": "2025-11-06T12:00:00.000Z"
  }
]
```

---

### `POST /api/messages` (PROTECTED)

**Описание:** Создание нового сообщения.
**Header:** `Authorization: Bearer <token>`
**Body:**

```json
{
  "content": "Текст сообщения (макс 500 символов)"
}
```

**Ответ (201 Created):** Новое сообщение в формате выше.
**Ошибки:**

* 400 — пустой контент или слишком длинный

---

### `DELETE /api/messages/:id` (PROTECTED)

**Описание:** Удаление сообщения по `id`.
**Header:** `Authorization: Bearer <token>`
**Ответ:**

```json
{ "success": true, "message": "Message deleted" }
```

**Ошибки:**

* 403 — пользователь не автор сообщения
* 404 — сообщение не найдено

---

### `POST /api/messages/:id/like` (PROTECTED)

**Описание:** Лайк/дизлайк сообщения (toggle).
**Header:** `Authorization: Bearer <token>`
**Ответ:** Обновлённое сообщение с новым количеством лайков и массивом `likedBy`.

---

### `POST /api/messages/:id/report` (PROTECTED)

**Описание:** Пожаловаться на сообщение.
**Header:** `Authorization: Bearer <token>`
**Ответ:**

```json
{ "success": true, "message": "Message reported" }
```

**Ошибки:**

* 400 — уже жаловались
* 404 — сообщение не найдено

---

## **Статистика**

### `GET /api/stats`

**Описание:** Получение общей статистики по пользователям и сообщениям.
**Ответ:**

```json
{
  "totalMessages": 10,
  "totalUsers": 5,
  "totalLikes": 15,
  "totalReports": 2
}
```
