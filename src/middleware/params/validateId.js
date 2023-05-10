const validate = (req, res, next) => {
  const { id: idOrig } = req.params;

  const id = parseInt(idOrig);
  if (isNaN(id)) {
    res
      .status(400)
      .json({ error: "Parametro 'id' debe ser un número entero." });

    return;
  }

  req.params.id = id;
  next();
};

export default validate;
