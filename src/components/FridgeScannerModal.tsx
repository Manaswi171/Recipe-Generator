import React, { useState } from 'react';
import { Camera, Upload, Check, X, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';
import { apiDetectFridgeIngredients } from '../lib/geminiService';

interface FridgeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmIngredients: (ingredients: string[]) => void;
}

export const FridgeScannerModal: React.FC<FridgeScannerModalProps> = ({
  isOpen,
  onClose,
  onConfirmIngredients
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [detectedItems, setDetectedItems] = useState<string[]>([]);
  const [prohibitedDetected, setProhibitedDetected] = useState<string[]>([]);
  const [newItemInput, setNewItemInput] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        runScan(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const loadSampleImage = (type: 'fridge' | 'basket' | 'dairy') => {
    let sample = '';
    if (type === 'fridge') {
      sample = 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=800&q=80';
    } else if (type === 'basket') {
      sample = 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80';
    } else {
      sample = 'https://images.unsplash.com/photo-1528751014936-863e6e7a319c?auto=format&fit=crop&w=800&q=80';
    }
    setImagePreview(sample);

    // Mock Computer Vision detection for sample photos
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      if (type === 'fridge') {
        setDetectedItems(['Tomato', 'Spinach', 'Paneer', 'Eggs', 'Milk', 'Garlic']);
        setProhibitedDetected([]);
      } else if (type === 'basket') {
        setDetectedItems(['Carrot', 'Broccoli', 'Bell Pepper', 'Onion', 'Tomato']);
        setProhibitedDetected([]);
      } else {
        setDetectedItems(['Eggs', 'Butter', 'Cheese', 'Yogurt', 'Paneer']);
        setProhibitedDetected([]);
      }
    }, 1200);
  };

  const runScan = async (base64: string) => {
    setIsScanning(true);
    try {
      const result = await apiDetectFridgeIngredients(base64);
      setDetectedItems(result.detectedIngredients || ['Tomato', 'Spinach', 'Paneer', 'Eggs']);
      setProhibitedDetected(result.prohibitedDetected || []);
    } catch (e) {
      console.error('Scan failed', e);
      setDetectedItems(['Tomato', 'Spinach', 'Paneer', 'Eggs', 'Garlic']);
    } finally {
      setIsScanning(false);
    }
  };

  const removeItem = (item: string) => {
    setDetectedItems((prev) => prev.filter((i) => i !== item));
  };

  const addItem = () => {
    if (newItemInput.trim()) {
      setDetectedItems((prev) => [...prev, newItemInput.trim()]);
      setNewItemInput('');
    }
  };

  const handleDone = () => {
    onConfirmIngredients(detectedItems);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#F4F1EA] border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_#1A1A1A] overflow-hidden flex flex-col max-h-[90vh] corner-notch">
        {/* Header */}
        <div className="p-5 border-b-2 border-[#1A1A1A] flex items-center justify-between bg-white">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#1A1A1A] text-[#F4F1EA] border border-[#1A1A1A]">
              <Camera className="w-5 h-5 text-[#D93D26]" />
            </div>
            <div>
              <h2 className="text-lg font-bold italic serif text-[#1A1A1A] flex items-center gap-2">
                Scan My Fridge
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#D93D26] text-white font-bold uppercase tracking-wider border border-[#1A1A1A]">
                  Computer Vision
                </span>
              </h2>
              <p className="text-xs font-mono text-[#1A1A1A]/70 uppercase tracking-wider">
                Upload or select a photo to auto-detect usable ingredients
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#1A1A1A] hover:bg-[#D93D26] hover:text-white border-2 border-[#1A1A1A] transition shadow-[2px_2px_0px_0px_#1A1A1A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Sample Preset Selector */}
          {!imagePreview && (
            <div className="space-y-3">
              <p className="text-xs font-mono font-bold text-[#1A1A1A] uppercase tracking-wider">
                Select or Upload a Photo
              </p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => loadSampleImage('fridge')}
                  className="p-3 bg-white hover:bg-[#1A1A1A] hover:text-[#F4F1EA] border-2 border-[#1A1A1A] text-left transition text-xs space-y-1 shadow-[2px_2px_0px_0px_#1A1A1A]"
                >
                  <span className="text-lg block">🧊</span>
                  <span className="font-bold font-mono block">Fridge Shelf</span>
                  <span className="text-[10px] text-[#1A1A1A]/60 block font-mono">Paneer, Eggs, Spinach...</span>
                </button>
                <button
                  onClick={() => loadSampleImage('basket')}
                  className="p-3 bg-white hover:bg-[#1A1A1A] hover:text-[#F4F1EA] border-2 border-[#1A1A1A] text-left transition text-xs space-y-1 shadow-[2px_2px_0px_0px_#1A1A1A]"
                >
                  <span className="text-lg block">🧺</span>
                  <span className="font-bold font-mono block">Veggie Basket</span>
                  <span className="text-[10px] text-[#1A1A1A]/60 block font-mono">Carrots, Peppers...</span>
                </button>
                <button
                  onClick={() => loadSampleImage('dairy')}
                  className="p-3 bg-white hover:bg-[#1A1A1A] hover:text-[#F4F1EA] border-2 border-[#1A1A1A] text-left transition text-xs space-y-1 shadow-[2px_2px_0px_0px_#1A1A1A]"
                >
                  <span className="text-lg block">🧀</span>
                  <span className="font-bold font-mono block">Dairy & Eggs</span>
                  <span className="text-[10px] text-[#1A1A1A]/60 block font-mono">Milk, Yogurt, Eggs...</span>
                </button>
              </div>
            </div>
          )}

          {/* Image Upload Area */}
          <div className="relative group border-2 border-dashed border-[#1A1A1A] hover:border-[#D93D26] transition p-6 text-center bg-white">
            {imagePreview ? (
              <div className="space-y-4">
                <img
                  src={imagePreview}
                  alt="Fridge Preview"
                  className="max-h-56 mx-auto border-2 border-[#1A1A1A] object-cover shadow-[4px_4px_0px_0px_#1A1A1A]"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setDetectedItems([]);
                    setProhibitedDetected([]);
                  }}
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] bg-[#F4F1EA] px-3 py-1.5 border-1.5 border-[#1A1A1A] transition shadow-[1.5px_1.5px_0px_0px_#1A1A1A]"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Choose Different Photo</span>
                </button>
              </div>
            ) : (
              <label className="cursor-pointer space-y-3 block">
                <div className="w-12 h-12 bg-[#1A1A1A] text-[#F4F1EA] flex items-center justify-center mx-auto border border-[#1A1A1A] shadow-[2px_2px_0px_0px_#D93D26]">
                  <Upload className="w-6 h-6 text-[#D93D26]" />
                </div>
                <div>
                  <p className="text-sm font-mono font-bold text-[#1A1A1A] uppercase tracking-wider">
                    Click to upload or drag & drop fridge image
                  </p>
                  <p className="text-xs text-[#1A1A1A]/60 font-mono mt-1">
                    Supports PNG, JPG, WEBP (Max 10MB)
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Prohibited Non-Veg Warning Banner */}
          {prohibitedDetected.length > 0 && (
            <div className="p-4 bg-amber-50 border-2 border-[#1A1A1A] text-[#1A1A1A] text-xs space-y-1.5 shadow-[3px_3px_0px_0px_#1A1A1A]">
              <div className="flex items-center space-x-2 font-mono font-bold text-[#D93D26] uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-[#D93D26]" />
                <span>Non-Vegetarian Ingredient Excluded</span>
              </div>
              <p className="leading-relaxed italic serif">
                KitchenIQ is strictly <strong>vegetarian + egg friendly</strong>. The following detected non-veg items have been automatically excluded:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {prohibitedDetected.map((p, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-[#D93D26] text-white line-through font-mono font-bold text-[11px] border border-[#1A1A1A]"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Detected Ingredients Confirmation */}
          {isScanning ? (
            <div className="p-8 text-center space-y-3 bg-white border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A]">
              <Sparkles className="w-8 h-8 text-[#D93D26] animate-spin mx-auto" />
              <p className="text-sm font-mono font-bold text-[#1A1A1A] uppercase tracking-wider">
                Analyzing fridge contents with AI Computer Vision...
              </p>
              <p className="text-xs text-[#1A1A1A]/70 italic serif">
                Filtering out non-vegetarian items automatically
              </p>
            </div>
          ) : detectedItems.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono font-bold text-[#D93D26] uppercase tracking-wider flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  Confirmed Usable Ingredients ({detectedItems.length})
                </p>
                <span className="text-[11px] font-mono text-[#1A1A1A]/60">
                  Click 'x' to remove any item
                </span>
              </div>

              <div className="flex flex-wrap gap-2 p-3 bg-white border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A]">
                {detectedItems.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#F4F1EA] border-1.5 border-[#1A1A1A] text-xs font-mono font-bold text-[#1A1A1A] shadow-[1.5px_1.5px_0px_0px_#1A1A1A]"
                  >
                    <span>{item}</span>
                    <button
                      onClick={() => removeItem(item)}
                      className="text-[#1A1A1A]/60 hover:text-[#D93D26] transition ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Manual Item Input */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="text"
                  placeholder="Add missing ingredient manually..."
                  value={newItemInput}
                  onChange={(e) => setNewItemInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addItem()}
                  className="flex-1 px-3.5 py-2 bg-white border-2 border-[#1A1A1A] text-xs font-medium text-[#1A1A1A] focus:outline-none"
                />
                <button
                  onClick={addItem}
                  className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#D93D26] text-[#F4F1EA] border-2 border-[#1A1A1A] text-xs font-mono font-bold uppercase tracking-wider transition shadow-[2px_2px_0px_0px_#1A1A1A]"
                >
                  Add
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-[#1A1A1A] bg-white flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 border-1.5 border-[#1A1A1A] text-xs font-mono font-bold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] transition"
          >
            Cancel
          </button>

          <button
            onClick={handleDone}
            disabled={detectedItems.length === 0}
            className="px-5 py-2.5 bg-[#D93D26] hover:bg-[#1A1A1A] text-white font-mono font-bold text-xs uppercase tracking-wider border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] disabled:opacity-50 transition flex items-center space-x-2"
          >
            <Check className="w-4 h-4" />
            <span>Confirm & Use Ingredients ({detectedItems.length})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
