import React, { memo } from 'react';
import { Store, Bell, Receipt, Shield } from 'lucide-react';

const Toggle = ({ id, defaultChecked = false }) => (
  <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
    <input id={id} type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
    <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:bg-black dark:peer-checked:bg-white"></div>
  </label>
);

const Settings = memo(function Settings() {
  return (
    <div className="space-y-5 max-w-3xl">
      <h1 className="text-2xl font-bold text-black dark:text-white">Settings</h1>

      {/* Store Info */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-light-border dark:border-dark-border overflow-hidden">
        <div className="px-6 py-4 border-b border-light-border dark:border-dark-border flex items-center gap-3">
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Store size={18} className="text-black dark:text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-black dark:text-white text-sm">Store Information</h2>
            <p className="text-xs text-gray-400">Basic details about your store</p>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { label: 'Store Name', id: 'store-name', value: 'POS PRO', type: 'text' },
            { label: 'Contact Email', id: 'store-email', value: 'admin@pos.com', type: 'email' },
            { label: 'Phone Number', id: 'store-phone', value: '+1 555-0100', type: 'tel' },
            { label: 'Address', id: 'store-address', value: '123 Main Street, City', type: 'text' },
          ].map(field => (
            <div key={field.id}>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">{field.label}</label>
              <input
                id={field.id}
                type={field.type}
                defaultValue={field.value}
                className="w-full px-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-gray-50 dark:bg-gray-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Tax Rate (%)</label>
            <input
              id="tax-rate"
              type="number"
              defaultValue="8"
              min="0"
              max="100"
              step="0.5"
              className="w-full px-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-gray-50 dark:bg-gray-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Currency</label>
            <select
              id="currency-select"
              className="w-full px-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-gray-50 dark:bg-gray-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            >
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-light-border dark:border-dark-border overflow-hidden">
        <div className="px-6 py-4 border-b border-light-border dark:border-dark-border flex items-center gap-3">
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Bell size={18} className="text-black dark:text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-black dark:text-white text-sm">Notifications</h2>
            <p className="text-xs text-gray-400">Manage your alerts and notifications</p>
          </div>
        </div>
        <div className="p-6 divide-y divide-light-border dark:divide-dark-border">
          {[
            { id: 'notif-email', label: 'Daily Sales Report', desc: 'Receive a summary email every day.', defaultChecked: true },
            { id: 'notif-lowstock', label: 'Low Stock Alerts', desc: 'Get notified when products are running low.', defaultChecked: true },
            { id: 'notif-neworder', label: 'New Order Alerts', desc: 'Be notified of every new order placed.', defaultChecked: false },
          ].map(item => (
            <div key={item.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-medium text-black dark:text-white">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <Toggle id={item.id} defaultChecked={item.defaultChecked} />
            </div>
          ))}
        </div>
      </div>

      {/* Receipt Preferences */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-light-border dark:border-dark-border overflow-hidden">
        <div className="px-6 py-4 border-b border-light-border dark:border-dark-border flex items-center gap-3">
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Receipt size={18} className="text-black dark:text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-black dark:text-white text-sm">Receipt Settings</h2>
            <p className="text-xs text-gray-400">Configure how receipts are generated</p>
          </div>
        </div>
        <div className="p-6 divide-y divide-light-border dark:divide-dark-border">
          {[
            { id: 'receipt-autoprint', label: 'Auto-Print Receipt', desc: 'Automatically print receipt after checkout.', defaultChecked: false },
            { id: 'receipt-showlogo', label: 'Show Store Logo', desc: 'Include your store logo on receipts.', defaultChecked: true },
          ].map(item => (
            <div key={item.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-medium text-black dark:text-white">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <Toggle id={item.id} defaultChecked={item.defaultChecked} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          id="save-settings-btn"
          className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-100"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
});

export default Settings;
