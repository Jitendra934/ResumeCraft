import { Check, Palette } from "lucide-react";
import React, { useState } from "react";

const ColorPicker = ({ onChange, selectedColor }) => {
  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Green", value: "#10B981" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F97316" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Gray", value: "#4B5563" },
    { name: "Black", value: "#1F2937" },

    { name: "Cyan", value: "#06B6D4" },
    { name: "Emerald", value: "#059669" },
    { name: "Amber", value: "#F59E0B" },
    { name: "Fuchsia", value: "#D946EF" },
    { name: "Violet", value: "#7C3AED" },
    { name: "Slate", value: "#475569" },
    { name: "Lavender", value: "#A78BFA" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-purple-700
        bg-linear-to-r from-purple-50 to-indigo-100 border border-purple-200
        hover:border-purple-300 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition"
      >
        <Palette size={15} />

        {/* Selected Color Preview */}
        <span
          className="w-3 h-3 rounded-full border border-white shadow"
          style={{ backgroundColor: selectedColor }}
        />

        <span className="max-sm:hidden">Accent</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full mt-3
          w-65 max-w-[90vw] z-20
          bg-white border border-gray-200 rounded-xl shadow-xl p-4"
        >
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Choose Accent Color
          </h3>

          <div className="grid grid-cols-5 gap-3">
            {colors.map((color) => {
              const isSelected = selectedColor === color.value;

              return (
                <div
                  key={color.value}
                  onClick={() => {
                    onChange(color.value);
                    setIsOpen(false);
                  }}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  {/* Color Circle */}
                  <div
                    className={`relative w-10 h-10 rounded-full border transition-all
                    ${
                      isSelected
                        ? "border-gray-800 scale-110"
                        : "border-gray-200 group-hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color.value }}
                  >
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="size-4 text-white drop-shadow" />
                      </div>
                    )}
                  </div>

                  {/* Color Name */}
                  <span className="text-[11px] text-gray-600 mt-1">
                    {color.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
