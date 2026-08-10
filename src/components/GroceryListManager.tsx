import React, { useState } from 'react';
import { GroceryItem, GroceryCategory } from '../types';
import { ShoppingBag, CheckSquare, Square, Download, Plus, Trash2, Recycle, Sparkles, AlertCircle } from 'lucide-react';

interface GroceryListManagerProps {
  items: GroceryItem[];
  onToggleCheck: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onAddItem: (item: Partial<GroceryItem>) => void;
}

export const GroceryListManager: React.FC<GroceryListManagerProps> = ({
  items,
  onToggleCheck,
  onDeleteItem,
  onAddItem
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('1 pack');
  const [newItemCategory, setNewItemCategory] = useState<GroceryCategory>('Produce');

  // Zero Waste Mode State
  const [expiringInput, setExpiringInput] = useState('Spinach (1 day), Tomatoes (2 days)');
  const [wasteAvoided, setWasteAvoided] = useState(2);

  const categories: GroceryCategory[] = ['Produce', 'Dairy', 'Eggs', 'Grains', 'Pulses', 'Pantry', 'Spices', 'Other'];

  const handleAdd = () => {
    if (newItemName.trim()) {
      onAddItem({
        name: newItemName.trim(),
        amount: newItemAmount,
        category: newItemCategory,
        checked: false,
        estimatedCost: 35
      });
      setNewItemName('');
    }
  };

  const handleDownloadTxt = () => {
    const text = items
      .map((i) => `[${i.checked ? 'X' : ' '}] ${i.name} - ${i.amount} (${i.category})`)
      .join('\n');
    const blob = new Blob([`KitchenIQ Smart Grocery List\nGenerated: ${new Date().toLocaleDateString()}\n\n${text}`], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KitchenIQ_Grocery_List_${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Zero Waste Rescuer Mode Card */}
      <div className="p-5 bg-[#131B2A] border border-slate-800 rounded-3xl space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2 text-slate-200 font-bold text-xs uppercase tracking-wider">
            <Recycle className="w-4 h-4 text-emerald-400" />
            <span>Zero-Waste Ingredient Rescuer</span>
          </div>
          <span className="text-[10px] font-bold text-slate-950 px-2.5 py-0.5 bg-emerald-400 rounded-full uppercase tracking-wider">
            {wasteAvoided} Rescued (~₹240 Saved)
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Enter ingredients expiring soon in your kitchen to prioritize them in AI recipe generation and prevent food waste:
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={expiringInput}
            onChange={(e) => setExpiringInput(e.target.value)}
            className="flex-1 px-3.5 py-2 bg-[#162032] border border-slate-700/80 rounded-xl text-xs text-slate-100 font-medium focus:outline-none focus:border-emerald-500"
            placeholder="e.g. Spinach (1 day), Tomatoes (2 days)"
          />
          <button
            onClick={() => setWasteAvoided((prev) => prev + 1)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider border border-emerald-400 rounded-xl transition flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>Rescue</span>
          </button>
        </div>
      </div>

      {/* Add Item & Export Control Bar */}
      <div className="p-5 bg-[#131B2A] border border-slate-800 rounded-3xl space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            Smart Consolidated Grocery List ({items.length})
          </h3>

          <button
            onClick={handleDownloadTxt}
            className="px-3 py-1.5 bg-[#162032] hover:bg-slate-800 text-slate-200 text-xs font-bold uppercase tracking-wider border border-slate-700 rounded-xl transition flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export (.txt)</span>
          </button>
        </div>

        {/* Add New Item Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
          <input
            type="text"
            placeholder="Item name e.g. Organic Tomatoes"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="px-3 py-2 bg-[#162032] border border-slate-700/80 rounded-xl text-xs text-slate-100 font-medium focus:outline-none"
          />
          <input
            type="text"
            placeholder="Quantity e.g. 500g"
            value={newItemAmount}
            onChange={(e) => setNewItemAmount(e.target.value)}
            className="px-3 py-2 bg-[#162032] border border-slate-700/80 rounded-xl text-xs text-slate-100 font-medium focus:outline-none"
          />
          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value as GroceryCategory)}
            className="px-3 py-2 bg-[#162032] border border-slate-700/80 rounded-xl text-xs text-slate-100 font-medium focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-[#131B2A] text-slate-100">
                {c}
              </option>
            ))}
          </select>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-1 rounded-xl"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Categorized Grocery List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const catItems = items.filter((i) => i.category === cat);
          if (catItems.length === 0) return null;

          return (
            <div key={cat} className="p-4 bg-[#131B2A] border border-slate-800 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block border-b border-slate-800 pb-1.5">
                {cat} ({catItems.length})
              </span>

              <ul className="space-y-1.5 pt-1">
                {catItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between p-2.5 bg-[#162032] border border-slate-700/60 rounded-xl text-xs transition"
                  >
                    <button
                      onClick={() => onToggleCheck(item.id)}
                      className="flex items-center space-x-2 text-left flex-1"
                    >
                      {item.checked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                      <span className={`font-medium ${item.checked ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {item.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">({item.amount})</span>
                    </button>

                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="text-slate-500 hover:text-rose-400 transition p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
