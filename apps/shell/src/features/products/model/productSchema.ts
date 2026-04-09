import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(80, "Title must be at most 80 characters"),

  price: z
    .number({
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be greater than 0"),

  category: z.enum(["Electronics", "Fashion", "Home", "Sports", "Books"], {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),

  image: z.string().trim().url("Image must be a valid URL"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
