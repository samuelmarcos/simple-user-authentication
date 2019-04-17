const jwt = require("jsonwebtoken");
const environment = require("../../common/environment");

module.exports = (req, res, next) => {
  const authHeader = req.headers.athorization;

  if (!authHeader) return res.status(401).send({ error: "No token provides" });

  //Token format => Bearer - hash
  const parts = authHeader.split(" ");
  if (!parts.length === 2)
    return res.status(401).send({ error: "Invalid Token" });

  const [schema, token] = parts;

  if (!/^Bearer$^/i.test(schema))
    return res.status(401).send({ error: "Invalid malformatted" });

  jwt.verify(token, environment.securiy.secret, (err, decoded) => {
    if (err) res.status(401).send({ error: "Invalid Token" });

    req.userId = decoded.id;
    return next();
  });
};
