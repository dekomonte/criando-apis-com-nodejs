'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//Conexao com o banco de dados
mongoose.connect('mongodb://root:Flamengo_2019$%40@localhost:27017/admin');

//Carrega os Models
const Product = require('./models/product');

//Carrega as rotas
const indexRoutes = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRoutes);
app.use('/products', productRoute);

module.exports = app; 