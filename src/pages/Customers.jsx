import React, { useState, memo } from 'react';
import { Search, Plus, Mail, Phone, MoreVertical, X } from 'lucide-react';

const initialCustomers = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', phone: '+1 555-0101', orders: 12, totalSpent: 450.00, lastVisit: '2024-10-24', status: 'Active' },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 555-0102', orders: 5, totalSpent: 120.50, lastVisit: '2024-10-20', status: 'Active' },
  { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', phone: '+1 555-0103', orders: 28, totalSpent: 1240.75, lastVisit: '2024-10-25', status: 'VIP' },
  { id: 4, name: 'Diana Lee', email: 'diana@example.com', phone: '+1 555-0104', orders: 3, totalSpent: 89.99, lastVisit: '2024-09-15', status: 'Inactive' },
  { id: 5, name: 'Ethan Brown', email: 'ethan@example.com', phone: '+1 555-0105', orders: 19, totalSpent: 670.20, lastVisit: '2024-10-22', status: 'Active' },
];

const statusColors = {
  Active: 'bg-green-50 dark:bg-green-900/20 text-green-600',
  VIP: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600',
  Inactive: 'bg-gray-100 dark:bg-gray-800 text-gray-500',
};

const emptyForm = { name: '', email: '', phone: '', status: 'Active' };

const inputClass =
  'w-full px-3 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-gray-50 dark:bg-gray-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white placeholder-gray-400';

const Customers = memo(function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const today = new Date().toISOString().split('T')[0];
    const newCustomer = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      orders: 0,
      totalSpent: 0,
      lastVisit: today,
      status: form.status,
    };
    setCustomers(prev => [newCustomer, ...prev]);
    setShowModal(false);
    setForm(emptyForm);
    setErrors({});
  };

  const closeModal = () => { setShowModal(false); setForm(emptyForm); setErrors({}); };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black dark:text-white">Customers</h1>
        <button
          id="add-customer-btn"
          onClick={() => setShowModal(true)}
          className="bg-black dark:bg-white text-white dark:text-black px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          <Plus size={18} /> Add Customer
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Customers', value: customers.length },
          { label: 'Active', value: customers.filter(c => c.status === 'Active').length },
          { label: 'VIP Members', value: customers.filter(c => c.status === 'VIP').length },
        ].map(card => (
          <div key={card.label} className="bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-4">
            <p className="text-2xl font-bold text-black dark:text-white">{card.value}</p>
            <p className="text-sm text-gray-400 mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-light-border dark:border-dark-border overflow-hidden">
        <div className="p-4 border-b border-light-border dark:border-dark-border">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              id="customer-search"
              type="text"
              placeholder="Search customers..."
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
                <th className="px-6 py-3.5">Customer</th>
                <th className="px-6 py-3.5">Contact</th>
                <th className="px-6 py-3.5">Orders</th>
                <th className="px-6 py-3.5">Total Spent</th>
                <th className="px-6 py-3.5">Last Visit</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border dark:divide-dark-border">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-black dark:text-white">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Mail size={12} />{customer.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Phone size={12} />{customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-black dark:text-white font-medium">{customer.orders}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-black dark:text-white">${customer.totalSpent.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{customer.lastVisit}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${statusColors[customer.status]}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">No customers found.</div>
          )}
        </div>
      </div>

      {/* Add Customer Modal */}
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
              <h2 className="text-lg font-bold text-black dark:text-white">Add New Customer</h2>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Full Name *</label>
                <input
                  id="customer-name-input"
                  type="text"
                  placeholder="e.g. Alice Smith"
                  className={inputClass}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Email Address *</label>
                <input
                  id="customer-email-input"
                  type="email"
                  placeholder="e.g. alice@example.com"
                  className={inputClass}
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Phone Number *</label>
                <input
                  id="customer-phone-input"
                  type="tel"
                  placeholder="e.g. +1 555-0101"
                  className={inputClass}
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Status</label>
                <select
                  id="customer-status-input"
                  className={inputClass}
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                >
                  <option value="Active">Active</option>
                  <option value="VIP">VIP</option>
                  <option value="Inactive">Inactive</option>
                </select>
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
                  id="submit-customer-btn"
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});

export default Customers;
