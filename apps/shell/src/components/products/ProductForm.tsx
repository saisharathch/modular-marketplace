import { useProductForm } from "../../features/products/model/useProductForm";
import type { ProductFormValues } from "../../features/products/model/productSchema";

interface ProductFormProps {
  title: string;
  submitLabel: string;
  initialValues: ProductFormValues;
  onSubmit: (values: ProductFormValues) => void;
}

const categories = ["Electronics", "Fashion", "Home", "Sports", "Books"];

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
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="mt-2 text-sm text-slate-400">
          Create and manage marketplace products with a cleaner, scalable form
          flow.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Title
          </label>
          <input
            value={values.title}
            onChange={(e) => setFieldValue("title", e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-slate-500"
            placeholder="Enter product title"
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-400">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            value={values.price}
            onChange={(e) => setFieldValue("price", Number(e.target.value))}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-slate-500"
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="mt-2 text-sm text-red-400">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Category
          </label>
          <select
            value={values.category}
            onChange={(e) =>
              setFieldValue(
                "category",
                e.target.value as ProductFormValues["category"],
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-slate-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-2 text-sm text-red-400">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Description
          </label>
          <textarea
            value={values.description}
            onChange={(e) => setFieldValue("description", e.target.value)}
            className="min-h-[140px] w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-slate-500"
            placeholder="Enter product description"
          />
          {errors.description && (
            <p className="mt-2 text-sm text-red-400">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Image URL
          </label>
          <input
            value={values.image}
            onChange={(e) => setFieldValue("image", e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-slate-500"
            placeholder="https://example.com/product-image.jpg"
          />
          {errors.image && (
            <p className="mt-2 text-sm text-red-400">{errors.image}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-slate-400">
            {isDirty ? "You have unsaved changes." : "No unsaved changes."}
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
