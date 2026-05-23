import React, { useState, memo } from 'react';
import { Plus, Search, Edit2, Trash2, Package, X } from 'lucide-react';

const initialInventory = [
  { id: 1, name: 'Espresso Maker', sku: 'EMP-001', category: 'Equipment', stock: 15, price: 299.99 },
  { id: 2, name: 'Premium Coffee Beans', sku: 'PCB-002', category: 'Consumables', stock: 120, price: 24.99 },
  { id: 3, name: 'Ceramic Mug Set', sku: 'CMS-003', category: 'Accessories', stock: 45, price: 34.50 },
  { id: 4, name: 'Barista Apron', sku: 'BAP-004', category: 'Apparel', stock: 8, price: 19.99 },
  { id: 5, name: 'Milk Frother', sku: 'MFR-005', category: 'Equipment', stock: 3, price: 49.00 },
  { id: 6, name: 'French Press', sku: 'FPR-006', category: 'Equipment', stock: 22, price: 39.99 },
];

const emptyForm = { name: '', sku: '', category: 'Equipment', stock: '', price: '' };
const categories = ['Equipment', 'Consumables', 'Accessories', 'Apparel', 'Other'];

const inputClass =
  'w-full px-3 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-gray-50 dark:bg-gray-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white placeholder-gray-400';

const Inventory = memo(function Inventory() {
  const [inventory, setInventory] = useState(initialInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const filtered = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Product name is required';
    if (!form.sku.trim()) e.sku = 'SKU is required';
    if (!form.stock || isNaN(form.stock) || Number(form.stock) < 0) e.stock = 'Enter a valid stock quantity';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = 'Enter a valid price';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const newProduct = {
      id: Date.now(),
      name: form.name.trim(),
      sku: form.sku.trim().toUpperCase(),
      category: form.category,
      stock: Number(form.stock),
      price: parseFloat(form.price),
    };
    setInventory(prev => [newProduct, ...prev]);
    setShowModal(false);
    setForm(emptyForm);
    setErrors({});
  };

  const handleDelete = (id) => setInventory(prev => prev.filter(i => i.id !== id));

  const closeModal = () => { setShowModal(false); setForm(emptyForm); setErrors({}); };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black dark:text-white">Inventory</h1>
        <button
          id="add-product-btn"
          onClick={() => setShowModal(true)}
          className="bg-black dark:bg-white text-white dark:text-black px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-light-border dark:border-dark-border overflow-hidden">
        <div className="p-4 border-b border-light-border dark:border-dark-border">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              id="inventory-search"
              type="text"
              placeholder="Search by name or SKU..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-gray-50 dark:bg-gray-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-light-border dark:border-dark-border text-xs font-medium text-gray-400 uppercase tracking-wide">
                <th className="px-6 py-3.5">Product</th>
                <th className="px-6 py-3.5">SKU</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Stock</th>
                <th className="px-6 py-3.5">Price</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border dark:divide-dark-border">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center shrink-0">
                        <Package size={14} className="text-gray-400" />
                      </div>
                      <span className="text-sm font-medium text-black dark:text-white">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400 font-mono">{item.sku}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-lg text-xs font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                      item.stock <= 5
                        ? 'bg-red-50 text-red-600 dark:bg-red-900/20'
                        : item.stock <= 15
                        ? 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20'
                        : 'bg-green-50 text-green-600 dark:bg-green-900/20'
                    }`}>
                      {item.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-black dark:text-white">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <button className="p-2 rounded-lg text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">No products found.</div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />
          {/* Modal */}
          <div className="relative bg-white dark:bg-dark-surface rounded-2xl border border-light-border dark:border-dark-border w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-light-border dark:border-dark-border">
              <h2 className="text-lg font-bold text-black dark:text-white">Add New Product</h2>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Product Name *</label>
                <input
                  id="product-name-input"
                  type="text"
                  placeholder="e.g. Espresso Maker"
                  className={inputClass}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">SKU *</label>
                  <input
                    id="product-sku-input"
                    type="text"
                    placeholder="e.g. EMP-001"
                    className={inputClass}
                    value={form.sku}
                    onChange={e => setForm(f => ({ ...f, sku: e.target.value }))}
                  />
                  {errors.sku && <p className="text-xs text-red-500 mt-1">{errors.sku}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Category</label>
                  <select
                    id="product-category-input"
                    className={inputClass}
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Stock Quantity *</label>
                  <input
                    id="product-stock-input"
                    type="number"
                    min="0"
                    placeholder="0"
                    className={inputClass}
                    value={form.stock}
                    onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                  />
                  {errors.stock && <p className="text-xs text-red-500 mt-1">{errors.stock}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Price ($) *</label>
                  <input
                    id="product-price-input"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className={inputClass}
                    value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                  />
                  {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 rounded-xl border border-light-border dark:border-dark-border text-sm font-medium text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  id="submit-product-btn"
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});

export default Inventory;
