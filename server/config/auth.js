const jwt = require("jsonwebtoken");
const auth = require("./app.json");
const bcryptjs = require("bcryptjs");

// inclui o token no objeto usuario
async function incluirToken(usuario) {

  const token = jwt.sign({ id: usuario.cod_usuario }, auth.appId, {
    expiresIn: 86400, // expira em 24 horas
  });
  
  usuario.token = token;
  usuario.senha = undefined; // não retorna a senha na consulta
}

async function gerarHash(usuario) {
  if (typeof usuario.senha !== "undefined") {
    const hash = await bcryptjs.hash(usuario.senha, 10);
    usuario.senha = hash;
  }
  return usuario;
}

function autorizar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "O token não foi enviado!" });
  }

  const partes = authHeader.split(" ");

  if (partes && partes.length !== 2) {
    return res.status(401).send({ error: "Token incompleto!" });
  }

  const [tipo, token] = partes;

  if (!/^Bearer$/i.test(tipo)) {
    return res.status(401).send({ error: "Token mal formado!" });
  }

  jwt.verify(token, auth.appId, (err, usuario) => {
    if (err) {
      return res.status(401).send({ error: "Token inválido!" });
    }
    req.usuarioLogadoId = usuario.id;
    return next(); // autorizado
  });
}

module.exports = {
  gerarHash,
  incluirToken,
  autorizar,
};
