# API Documentation

## Auth Endpoints

### Login
```
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "your_username", "password": "your_password"}'
```

### Refresh Token
```
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "your_refresh_token"}'
```

## User Endpoints

### Create User
```
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_access_token" \
  -d '{"name": "John Doe", "email": "john.doe@example.com", "password": "your_password"}'
```

### Get All Users
```
curl -X GET "http://localhost:3000/users?page=1&limit=10" \
  -H "Authorization: Bearer your_access_token"
```

### Get User by ID
```
curl -X GET http://localhost:3000/users/{id} \
  -H "Authorization: Bearer your_access_token"
```

### Update User
```
curl -X PATCH http://localhost:3000/users/{id} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_access_token" \
  -d '{"name": "John Doe Updated", "email": "john.doe.updated@example.com"}'
```

### Delete User
```
curl -X DELETE http://localhost:3000/users/{id} \
  -H "Authorization: Bearer your_access_token"
```
