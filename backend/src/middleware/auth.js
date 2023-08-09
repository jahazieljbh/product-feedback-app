const jwt = require("jsonwebtoken");

const { SECRET } = process.env;

const auth = {
  async auth(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const isCustomAuth = token.length < 500;
      let decodedData;
  
      if (token && isCustomAuth) {
        decodedData = jwt.verify(token, SECRET);
        req.userId = decodedData?.id;
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthenticated" });
    }
  }
};

module.exports = auth;