import jwt, { decode } from "jsonwebtoken";

const generateToken = ({ _id, name, email }) => {
  return jwt.sign({
    _id: _id,
    name: name,
    email: email
  }, process.env.JWT_PW, {
    expiresIn: "7d",
  });
};

const isAuth = async (req, res, next) => {
  const auth = req.headers.authorization
  if (auth) {
    const token = auth.split(" ")[1];
    jwt.verify(token, process.env.JWT_PW, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid token" })
      }
      else {
        req.user = decode;
        next();
      }
    })
  }
  else {
    res.status(401).send({ message: "No token" })
  }
}

export { generateToken, isAuth };
