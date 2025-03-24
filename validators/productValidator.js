const { z } = require("zod");

const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be a positive number"),
  stockStatus: z.enum(["inStock", "notInStock"]),
});

module.exports = productSchema;
