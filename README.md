# Aquaplant Ecommerce Website
![aquaplant](/template/images/amazona.jpg)

## Índice
- 🔖 [Sobre](#-Sobre)
- 🚀 [Demo Website](#-Demo-Website)
- 🧰 [Stacks e Recursos](#-Stacks-e-Recursos)
- 📦 [Para rodar local](#-para-rodar-local)


## 🔖Sobre
### 🐠 Um e-commerce de aquarismo para quem curte a arte do aquascaping.
Aquascaping ou aquapaisagismo é a arte de utilizar elementos para criar representações naturais da própria natureza em aquários. Existem diversas técnicas mas basicamente podem ser utilizadas plantas aquáticas, peixes, crustáceos entre outras coisas.

## 🚀Demo Website

 - 👉 Heroku : [https://aquaplant-app.herokuapp.com/](https://aquaplant-app.herokuapp.com/)


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

### 1. Clone o repositório

```
$ git clone https://github.com/anderson-santiago-silva/aquaplant-app.git
$ cd aquaplant
```

### 2. Setup MongoDB

- Local MongoDB
  - Instale a partir daqui [here](https://www.mongodb.com/try/download/community)
  - Crie o arquivo .env na pasta raiz
  - Set MONGODB_URL=mongodb://localhost/amazona  
- Atlas Cloud MongoDB
  - Crie um database em [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - Crie o arquivo .env na pasta raiz
  - Set MONGODB_URL=mongodb+srv://your-db-connection

### 3. Execute Backend

```
$ npm install
$ npm start
```

### 4. Execute Frontend

```
# abra um novo terminal
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
