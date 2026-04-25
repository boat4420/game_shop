'use client';

export default function GameForm({ game, onSubmit, onCancel }) {
  const isEditing = !!game;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      price: parseFloat(formData.get('price')),
      original_price: parseFloat(formData.get('original_price')),
      category: formData.get('category'),
      image_url: formData.get('image_url'),
      is_new: formData.get('is_new') === 'on',
    };
    onSubmit(data);
  };

  const inputStyle = "bg-[#1A1D24] border border-gray-700 text-white p-2 rounded focus:border-amber-500 outline-none placeholder-gray-500";

  return (
    <form onSubmit={handleSubmit} className="bg-[#23272F] p-6 rounded-xl shadow-2xl mb-8 border border-gray-800">
      <h2 className="text-xl font-bold mb-6 text-amber-500">{isEditing ? 'Edit Game' : 'Add New Game'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Game Name</label>
          <input name="name" defaultValue={game?.name || ''} placeholder="E.g. Elden Ring" required className={inputStyle} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Current Price</label>
          <input name="price" type="number" step="0.01" defaultValue={game?.price || ''} placeholder="1200.00" required className={inputStyle} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Original Price (For Strike-through)</label>
          <input name="original_price" type="number" step="0.01" defaultValue={game?.original_price || ''} placeholder="1500.00" className={inputStyle} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Category</label>
          <input name="category" defaultValue={game?.category || ''} placeholder="Action RPG" required className={inputStyle} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Image URL</label>
          <input name="image_url" defaultValue={game?.image_url || ''} placeholder="https://..." required className={inputStyle} />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input name="is_new" type="checkbox" defaultChecked={game?.is_new} className="w-5 h-5 accent-amber-500" />
          <label className="text-gray-300">Mark as New Product</label>
        </div>
      </div>
      <div className="mt-8 flex gap-3">
        <button type="submit" className="bg-amber-500 text-black font-bold px-6 py-2 rounded-lg hover:bg-amber-600 transition shadow-lg">
          {isEditing ? 'Update Game Data' : 'Save Game'}
        </button>
        {isEditing && (
          <button type="button" onClick={onCancel} className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
