
const mongoose = require("mongoose");
const valida = require("./valida");
const categoriaSchema = new mongoose.Schema({
  //código, nome e descrição
  cod_categoria: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return valida.gerarCodigo("CAT");
    },
  },
  nome: { type: String, required: true },
  descricao: {type: String, required: false},
});

const produtosSchema = new mongoose.Schema({
  //código, nome, descrição, preço, categoria, fornecedor
  cod_produto: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return valida.gerarCodigo("PROD");
    },
  },
  nome: { type: String, required: true },
  descricao: String,
  // preco float
  preco: { type: Number, required: true },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" },
});

const depositoSchema = new mongoose.Schema({
  // código, nome, endereco (referencia)
  cod_deposito: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return valida.gerarCodigo("DEP");
    },
  },
  nome: { type: String, required: true },
  endereco: { type: mongoose.Schema.Types.ObjectId, ref: "Endereco" },
});

const movimentacaoSchema = new mongoose.Schema({
  // id, produto (referencia), quantidade, tipo (entrada ou saída), data
  cod_movimento: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return valida.gerarCodigo("MOV");
    },
  },
  produto: { type: mongoose.Schema.Types.ObjectId, ref: "Produto" },
  quantidade: { type: Number, required: true },
  tipo: { type: String, required: true },
  data_criacao: { type: Date, required: true, default: Date.now },
});



const Movimento = mongoose.model("Movimento", movimentacaoSchema);
const Categoria = mongoose.model("Categoria", categoriaSchema);
const Produto = mongoose.model("Produto", produtosSchema);
const Deposito = mongoose.model("Deposito", depositoSchema);

module.exports = { Categoria, Produto, Deposito, Movimento };