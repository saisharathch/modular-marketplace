import { useProductForm } from "../../features/products/model/useProductForm";
import type { ProductFormValues } from "../../features/products/model/productSchema";
import {
  Button,
  Card,
  CardContent,
  Input,
  Select,
  Textarea,
  PageHeader,
} from "../ui";

interface ProductFormProps {
  title: string;
  submitLabel: string;
  initialValues: ProductFormValues;
  onSubmit: (values: ProductFormValues) => void;
}

const categories = [
  { label: "Electronics", value: "Electronics" },
  { label: "Fashion", value: "Fashion" },
  { label: "Home", value: "Home" },
  { label: "Sports", value: "Sports" },
  { label: "Books", value: "Books" },
];

export function ProductForm({
  title,
  submitLabel,
  initialValues,
  onSubmit,
}: ProductFormProps) {
  const { values, errors, isDirty, isSubmitting, setFieldValue, handleSubmit } =
    useProductForm({
      initialValues,
      onSubmit,
    });

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <PageHeader
        title={title}
        description="Create and manage products with a reusable form workflow."
      />

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Title"
              value={values.title}
              error={errors.title}
              onChange={(e) => setFieldValue("title", e.target.value)}
              placeholder="Enter product title"
            />

            <Input
              label="Price"
              type="number"
              step="0.01"
              value={values.price}
              error={errors.price}
              onChange={(e) => setFieldValue("price", Number(e.target.value))}
              placeholder="Enter price"
            />

            <Select
              label="Category"
              value={values.category}
              error={errors.category}
              options={categories}
              onChange={(e) =>
                setFieldValue(
                  "category",
                  e.target.value as ProductFormValues["category"],
                )
              }
            />

            <Textarea
              label="Description"
              value={values.description}
              error={errors.description}
              onChange={(e) => setFieldValue("description", e.target.value)}
              placeholder="Enter product description"
            />

            <Input
              label="Image URL"
              value={values.image}
              error={errors.image}
              onChange={(e) => setFieldValue("image", e.target.value)}
              placeholder="https://example.com/image.jpg"
            />

            <div className="flex items-center justify-between pt-2">
              <p className="text-sm text-slate-400">
                {isDirty ? "You have unsaved changes." : "No unsaved changes."}
              </p>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : submitLabel}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
