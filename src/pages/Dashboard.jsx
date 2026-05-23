import React, { memo } from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight } from 'lucide-react';

const stats = [
  { title: 'Total Revenue', value: '$24,500', icon: DollarSign, trend: '+12%', sub: 'vs last month' },
  { title: 'Total Orders', value: '342', icon: ShoppingBag, trend: '+5%', sub: 'vs last month' },
  { title: 'Active Customers', value: '1,204', icon: Users, trend: '+18%', sub: 'vs last month' },
  { title: 'Revenue Growth', value: '15.4%', icon: TrendingUp, trend: '+2%', sub: 'vs last month' },
];

const recentTransactions = [
  { id: 1001, time: '10:00 AM', amount: 84.50, status: 'Completed' },
  { id: 1002, time: '10:22 AM', amount: 32.00, status: 'Completed' },
  { id: 1003, time: '11:05 AM', amount: 219.99, status: 'Completed' },
  { id: 1004, time: '11:47 AM', amount: 15.75, status: 'Pending' },
  { id: 1005, time: '12:10 PM', amount: 60.00, status: 'Completed' },
];

const topProducts = [
  { name: 'Espresso Maker', sold: 42, revenue: '$12,599' },
  { name: 'Coffee Beans', sold: 130, revenue: '$3,248' },
  { name: 'Ceramic Mug Set', sold: 75, revenue: '$2,587' },
  { name: 'Barista Apron', sold: 28, revenue: '$559' },
];

const Dashboard = memo(function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black dark:text-white">Dashboard</h1>
        <span className="text-sm text-gray-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white dark:bg-dark-surface p-5 rounded-2xl border border-light-border dark:border-dark-border">
              <div className="flex justify-between items-start mb-3">
                <div className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
                  <Icon size={20} className="text-black dark:text-white" />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                  <ArrowUpRight size={12} />
                  {stat.trend}
                </div>
              </div>
              <p className="text-2xl font-bold text-black dark:text-white mt-2">{stat.value}</p>
              <p className="text-sm text-gray-400 mt-0.5">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Recent Transactions */}
        <div className="lg:col-span-3 bg-white dark:bg-dark-surface rounded-2xl border border-light-border dark:border-dark-border overflow-hidden">
          <div className="px-6 py-4 border-b border-light-border dark:border-dark-border flex justify-between items-center">
            <h2 className="font-semibold text-black dark:text-white">Recent Transactions</h2>
            <button className="text-xs text-gray-400 hover:text-black dark:hover:text-white font-medium">View all</button>
          </div>
          <div className="divide-y divide-light-border dark:divide-dark-border">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="px-6 py-3.5 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-black dark:text-white">Order #{tx.id}</p>
                  <p className="text-xs text-gray-400">Today, {tx.time}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    tx.status === 'Completed'
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-600'
                      : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600'
                  }`}>{tx.status}</span>
                  <p className="text-sm font-semibold text-black dark:text-white">${tx.amount.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-surface rounded-2xl border border-light-border dark:border-dark-border overflow-hidden">
          <div className="px-6 py-4 border-b border-light-border dark:border-dark-border">
            <h2 className="font-semibold text-black dark:text-white">Top Products</h2>
          </div>
          <div className="divide-y divide-light-border dark:divide-dark-border">
            {topProducts.map((p, i) => (
              <div key={p.name} className="px-6 py-3.5 flex items-center gap-3">
                <span className="text-xs font-bold text-gray-300 dark:text-gray-600 w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black dark:text-white truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.sold} sold</p>
                </div>
                <p className="text-sm font-semibold text-black dark:text-white">{p.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Dashboard;
