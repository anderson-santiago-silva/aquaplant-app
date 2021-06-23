# Aquaplant Ecommerce Website
![aquaplant](/template/images/amazona.jpg)


# 🔖Um e-commerce de aquarismo para quem curte a arte do aquascaping.
Aquascaping ou aquapaisagismo é a arte de utilizar elementos para criar representações naturais da própria natureza em aquários. Existem diversas técnicas mas basicamente podem ser utilizadas plantas aquáticas, peixes, crustáceos entre outras coisas.

## Demo Website

## 🚀 Heroku : [https://aquaplant-app.herokuapp.com/](https://aquaplant-app.herokuapp.com/)


## 🧰 Stacks e Recursos

- MERN (MongoDB, ExpressJS, ReactJS e NodeJS)
- React: Components, Props, Events, Hooks, Router, Axios
- Redux: Store, Reducers, Actions
- Node & Express: Web API, Body Parser, File Upload, JWT
- MongoDB: Mongoose, Aggregation
- Development: ESLint, Babel, Git, Github,
- Deployment: Heroku
- Watch React & Node Tutorial

## 📦 Para rodar local

### 1. Clone repo

```
$ git clone git@github.com:basir/amazona.git
$ cd amazona
```

### 2. Setup MongoDB

- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)
  - Create .env file in root folder
  - Set MONGODB_URL=mongodb://localhost/amazona  
- Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - Create .env file in root folder
  - Set MONGODB_URL=mongodb+srv://your-db-connection

### 3. Run Backend

```
$ npm install
$ npm start
```

### 4. Run Frontend

```
# open new terminal
$ cd frontend
$ npm install
$ npm start
```

### 5. Usuários e Produtos

- Execute isto no chrome: http://localhost:5000/api/users/seed
- Isto retornará o email e a senha de administrador
- Execute isto no chrome: http://localhost:5000/api/products/seed
- Isto criará 10 produtos

### 6. Admin Login

- Execute http://localhost:3000/signin
- Entre com o email admin e senha e clique signin
