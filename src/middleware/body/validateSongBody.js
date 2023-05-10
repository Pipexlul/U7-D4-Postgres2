const validate = (req, res, next) => {
  const { titulo, url, descripcion } = req.body;

  if (!titulo || !url || !descripcion) {
    res.status(400).json({
      error: "Todos los campos son obligatorios",
    });

    return;
  }

  next();
};

export default validate;
