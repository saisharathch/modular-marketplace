import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../providers/ProductsProvider";

function AddProductPage() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("UI Kit");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addProduct({
      title,
      price: Number(price),
      category,
      description,
    });

    navigate("/admin");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div>
        <h2 className="text-2xl font-semibold">Add Product</h2>
        <p className="mt-1 text-sm text-slate-400">
          Create a new product for the marketplace
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 rounded-xl border border-slate-800 bg-slate-900 p-6"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">Title</label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Category</label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
          >
            <option>UI Kit</option>
            <option>Template</option>
            <option>Tool</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={5}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;
