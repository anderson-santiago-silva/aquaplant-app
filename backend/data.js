import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Anderson',
      email: 'admin@exemple.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@exemple.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },

  ],
  products: [
    {
      name: 'Kit manutenção / 5 pçs',
      category: 'Ferramentas',
      image: '/images/kit5pcas_manut.jpg',
      price: 120,
      countInStock: 10,
      brand: 'Ada',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Substrato Amazonia',
      category: 'Substratos',
      image: '/images/amazonia_substrato3.jpg',
      price: 350,
      countInStock: 10,
      brand: 'Ada',
      rating: 5,
      numReviews: 25,
      description: 'high quality product',
    },
    {
      name: 'Cilindro CO2 6kg',
      category: 'Cilindros',
      image: '/images/cilindroCo2.jpg',
      price: 500,
      countInStock: 10,
      brand: 'Ista',
      rating: 3.5,
      numReviews: 7,
      description: 'high quality product',
    },
    {
      name: 'Difusor Co2',
      category: 'Acessórios',
      image: '/images/difusor2.jpg',
      price: 15,
      countInStock: 10,
      brand: 'Sunsun',
      rating: 4.5,
      numReviews: 25,
      description: 'high quality product',
    },
    {
      name: 'Canister Sunsun HW-403A',
      category: 'Filtros',
      image: '/images/canister.jpg',
      price: 780,
      countInStock: 10,
      brand: 'Sunsun',
      rating: 5,
      numReviews: 32,
      description: 'high quality product',
    },
    {
      name: 'Ativador ADA',
      category: 'Substratos',
      image: '/images/ativadorAda.jpg',
      price: 320,
      countInStock: 0,
      brand: 'Ada',
      rating: 4.5,
      numReviews: 22,
      description: 'high quality product',
    },
  ],
};

export default data;