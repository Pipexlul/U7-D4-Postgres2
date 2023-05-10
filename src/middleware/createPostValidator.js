const validate = (req, res, next) => {
  const { titulo, img, descripcion } = req.body;

  if (!titulo || !img || !descripcion) {
    res.status(400).json({
      error: "Todos los campos son obligatorios",
    });

    return;
  }

  next();
};

export default validate;
