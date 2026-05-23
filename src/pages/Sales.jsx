import React, { useState, useRef, useCallback, memo } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Printer, Download, Search } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const products = [
  { id: 1, name: 'Espresso Maker', price: 299.99, category: 'Equipment' },
  { id: 2, name: 'Coffee Beans', price: 24.99, category: 'Consumables' },
  { id: 3, name: 'Ceramic Mug Set', price: 34.50, category: 'Accessories' },
  { id: 4, name: 'Barista Apron', price: 19.99, category: 'Apparel' },
  { id: 5, name: 'Milk Frother', price: 49.00, category: 'Equipment' },
  { id: 6, name: 'French Press', price: 39.99, category: 'Equipment' },
];

const Sales = memo(function Sales() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const receiptRef = useRef(null);
  const orderNumber = useRef(`ORD-${Date.now().toString().slice(-6)}`);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((id, delta) => {
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    orderNumber.current = `ORD-${Date.now().toString().slice(-6)}`;
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleDownloadPDF = useCallback(() => {
    if (!receiptRef.current) return;
    const element = receiptRef.current;
    element.classList.add('pdf-mode');
    html2pdf().set({
      margin: 0.4,
      filename: `receipt-${orderNumber.current}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: [3.5, 11], orientation: 'portrait' }
    }).from(element).save().finally(() => {
      element.classList.remove('pdf-mode');
    });
  }, []);

  const handleCheckout = useCallback(() => {
    alert(`Payment Processed! Order ${orderNumber.current} total: $${total.toFixed(2)}`);
    clearCart();
  }, [total, clearCart]);

  return (
    <div className="flex gap-5 h-[calc(100vh-5rem)] -m-6 p-6">
      {/* Products Panel */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-black dark:text-white">Point of Sale</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white w-52"
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1 pr-1">
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
            {filtered.map(product => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="bg-white dark:bg-dark-surface p-5 rounded-2xl border border-light-border dark:border-dark-border text-left hover:border-black dark:hover:border-white hover:shadow-md group"
              >
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mb-3 group-hover:bg-black dark:group-hover:bg-white">
                  <ShoppingCart size={18} className="text-gray-400 group-hover:text-white dark:group-hover:text-black" />
                </div>
                <p className="font-semibold text-black dark:text-white text-sm leading-tight">{product.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
                <p className="text-base font-bold text-black dark:text-white mt-2">${product.price.toFixed(2)}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Panel */}
      <div
        id="printable-area"
        className="w-80 xl:w-96 bg-white dark:bg-dark-surface rounded-2xl border border-light-border dark:border-dark-border flex flex-col overflow-hidden shrink-0"
      >
        <div className="px-5 py-4 border-b border-light-border dark:border-dark-border flex justify-between items-center print:hidden">
          <h2 className="font-bold text-black dark:text-white flex items-center gap-2">
            <ShoppingCart size={18} /> Order
          </h2>
          {cart.length > 0 && (
            <button onClick={clearCart} className="text-xs text-gray-400 hover:text-red-500">
              Clear all
            </button>
          )}
        </div>

        {/* Receipt content (visible in PDF / print) */}
        <div className="flex-1 overflow-y-auto" ref={receiptRef}>
          {/* Receipt header — hidden in screen, shown in PDF/print */}
          <div className="hidden pdf-show print:block text-center px-5 pt-5 pb-3 border-b border-dashed border-gray-300 dark:border-gray-600">
            <h2 className="text-xl font-bold mb-1">POS PRO</h2>
            <p className="text-xs text-gray-500">123 Main Street, City</p>
            <p className="text-xs text-gray-500">Order: {orderNumber.current}</p>
            <p className="text-xs text-gray-500">{new Date().toLocaleString()}</p>
          </div>

          <div className="p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-gray-300 dark:text-gray-700">
                <ShoppingCart size={40} className="mb-2" />
                <p className="text-sm">Cart is empty</p>
                <p className="text-xs mt-1">Click a product to add</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black dark:text-white leading-tight">{item.name}</p>
                    <p className="text-xs text-gray-400">${item.price.toFixed(2)} each</p>
                  </div>
                  {/* Screen controls */}
                  <div className="flex items-center gap-1.5 print:hidden pdf-hidden shrink-0">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-5 text-center text-sm font-medium text-black dark:text-white">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-6 h-6 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center ml-1"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  {/* PDF/Print price */}
                  <div className="hidden pdf-show print:block shrink-0 text-sm font-medium text-black">
                    {item.qty} × ${item.price.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Totals — visible in PDF/print */}
          {cart.length > 0 && (
            <div className="hidden pdf-show print:block px-5 pb-5 border-t border-dashed border-gray-300 dark:border-gray-600 pt-3 space-y-1.5">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Tax (8%)</span><span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-black border-t border-black pt-2 mt-2">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
              <p className="text-center text-xs text-gray-400 pt-4">Thank you for your purchase!</p>
            </div>
          )}
        </div>

        {/* Footer — screen only */}
        {cart.length > 0 && (
          <div className="px-5 py-4 border-t border-light-border dark:border-dark-border space-y-3 print:hidden">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Tax (8%)</span><span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-black dark:text-white pt-1 border-t border-light-border dark:border-dark-border">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                id="print-receipt-btn"
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-black dark:text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Printer size={16} /> Print
              </button>
              <button
                id="download-pdf-btn"
                onClick={handleDownloadPDF}
                className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-black dark:text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Download size={16} /> PDF
              </button>
            </div>

            <button
              id="checkout-btn"
              onClick={handleCheckout}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-xl font-bold text-sm hover:bg-gray-800 dark:hover:bg-gray-100"
            >
              Charge ${total.toFixed(2)}
            </button>
          </div>
        )}
      </div>

      <style>{`
        .pdf-show { display: none; }
        .pdf-mode .pdf-show { display: block !important; }
        .pdf-mode .pdf-hidden { display: none !important; }
        @media print {
          body * { visibility: hidden; }
          #printable-area, #printable-area * { visibility: visible; }
          #printable-area { position: fixed; inset: 0; width: 100vw; border: none; box-shadow: none; border-radius: 0; }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
        }
      `}</style>
    </div>
  );
});

export default Sales;
