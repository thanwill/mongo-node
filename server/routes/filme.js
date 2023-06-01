var express = require('express');
var router = express.Router();
const Filme = require('../controllers/filme');

// lista os filmes cadastrados
router.get('/', Filme.listar);

// Cria um novo filme
router.post('/', async (req, res) => {
    try {
        await Filme.criar(req, res);
    } catch (error) {
        res.status(500).json({
            error: `${error}`
        });
    }
});
// busca um filme pelo id
router.get('/:id', async (req ,res) => {
    try {
        await Filme.buscarId(req, res);
    } catch (error) {
        res.status(500).json({
            error: `${error}`
        });
    }
});

// deleta um filme existente
router.delete('/:id', async (req, res) => {
    try {
        await Filme.deletar(req, res);
    } catch (error) {
        res.status(500).json({
            error: `${error}`
        });
    }
});

module.exports = router;