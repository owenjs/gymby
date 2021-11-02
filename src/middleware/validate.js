export default validator => (req, res, next) => {
  const { error } = validator(req.body);
  if (error) return res.status(400).send(error.details.map(detail => detail.message).join("<br>"));

  next();
};
