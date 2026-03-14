import { Check, Layout } from "lucide-react";
import React, { useState } from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A clean, traditional resume format with clear sections and professional typography",
    },
    {
      id: "modern",
      name: "Modern",
      preview:
        "Sleek design with strategic use of color and modern font choices",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview: "Minimal design with a single image and clean typography",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "Ultra-clean design that puts your content front and center",
    },
    {
      id: "jackRyan",
      name: "Jack Ryan",
      preview: "A bold, intelligence-inspired resume design with sharp sections and a clean, impactful layout."
    }
  ];
  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-blue-700 
        bg-linear-to-r from-blue-50 to-indigo-100 
        border border-blue-200 hover:border-blue-300
        px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
      >
        <Layout size={15} />
        <span className="max-sm:hidden">Template</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute left-0 top-full mt-3 w-80 z-20 
          bg-white border border-gray-200 rounded-xl shadow-xl 
          p-3 space-y-2 max-h-96 overflow-y-auto"
        >
          {templates.map((template) => {
            const isSelected = selectedTemplate === template.id;

            return (
              <div
                key={template.id}
                onClick={() => {
                  onChange(template.id);
                  setIsOpen(false);
                }}
                className={`group relative cursor-pointer rounded-lg border p-3 transition-all
                ${
                  isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                }`}
              >
                {/* Selected Check */}
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}

                {/* Template Info */}
                <div className="space-y-1 pr-6">
                  <h4 className="text-sm font-semibold text-gray-800">
                    {template.name}
                  </h4>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    {template.preview}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
