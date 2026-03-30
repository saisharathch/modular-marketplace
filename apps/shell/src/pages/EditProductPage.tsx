import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../providers/ProductsProvider";
import { useState } from "react";

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useProducts();

  const product = products.find((p) => p.id === id);

  const [title, setTitle] = useState(product?.title || "");
  const [price, setPrice] = useState(product?.price.toString() || "");
  const [category, setCategory] = useState(product?.category || "UI Kit");
  const [description, setDescription] = useState(product?.description || "");

  if (!product) {
    return <div className="text-white">Product not found</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateProduct(id!, {
      title,
      price: Number(price),
      category,
      description,
    });

    navigate("/admin");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="text-2xl font-semibold">Edit Product</h2>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 rounded-xl border border-slate-800 bg-slate-900 p-6"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 bg-slate-950 border border-slate-700"
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 bg-slate-950 border border-slate-700"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 bg-slate-950 border border-slate-700"
        >
          <option>UI Kit</option>
          <option>Template</option>
          <option>Tool</option>
        </select>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 bg-slate-950 border border-slate-700"
        />

        <button className="bg-white text-black px-4 py-2">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProductPage;
