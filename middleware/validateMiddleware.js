const validate = (schema) => (req, res, next) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ status: false, errors: parsed.error.errors });
  }
  next();
};

module.exports = validate;
