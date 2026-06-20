"use client";

import { useEffect, useState, useRef } from "react";
import { Search, ChevronDown } from "lucide-react";

interface DropdownItem {
  /** The unique identifier for the filter option. */
  id: string;
  /** The human-readable label for the filter option. */
  label: string;
  /** The number of matching records associated with this option. */
  count: number;
}

interface DropdownFilterProps {
  /** The text displayed on the trigger button. */
  label: string;
  /** A header title displayed above the items list in the dropdown panel. */
  title: string;
  /** The list of items to display as options in the checklist. */
  items: DropdownItem[];
  /** The list of currently selected item IDs. */
  selectedItems: string[];
  /** Callback function triggered when an item is checked or unchecked. */
  onToggle: (id: string) => void;
  /** Callback function triggered when clearing all selected items. */
  onClear: () => void;
  /** Optional placeholder text. If provided, an search input will render at the top of the panel. */
  searchPlaceholder?: string;
  /** Optional tailwind width class override for the dropdown panel (e.g. "sm:w-[280px]"). */
  dropdownWidth?: string;
}

/**
 * A reusable, multi-select dropdown filter component.
 * 
 * Supports inline list filtering, checked item count badges, and click-outside dismissal.
 *
 * @param props - Component configuration properties.
 */
export default function DropdownFilter({
  label,
  title,
  items,
  selectedItems,
  onToggle,
  onClear,
  searchPlaceholder,
  dropdownWidth = "sm:w-[240px]",
}: DropdownFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Automatically close the dropdown when users interact elsewhere on the page.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Apply client-side filtering so users can quickly find options in
  // long lists without reopening or reloading the dropdown.
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 w-full sm:w-auto px-5 py-3.5 rounded-lg border border-white/10 bg-[#121214] text-white text-sm hover:border-[var(--color-accent-teal)] transition-all duration-300 cursor-pointer"
      >
        <span className="text-white/80 font-medium">{label}</span>
        {selectedItems.length > 0 && (
          <span className="bg-[var(--color-accent-teal)] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {selectedItems.length}
          </span>
        )}
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-[var(--color-accent-teal)]" : "text-white/60"}`}
        />
      </button>

      {/* Expanded Dropdown Panel */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-full ${dropdownWidth} bg-[#1e1e1e] border border-[#333333] rounded-lg p-4 shadow-2xl z-30 animate-in fade-in slide-in-from-top-2 duration-200`}
        >
          {/* Optional Search Bar */}
          {searchPlaceholder && (
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#121214] border border-[#2d2d30] rounded-md py-2.5 pl-9 pr-3 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[var(--color-accent-teal)] transition-all duration-300"
              />
            </div>
          )}

          {/* Group Title */}
          <div className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-3">
            {title}
          </div>

          {/* Checklist */}
          <div className="max-h-[220px] overflow-y-auto pr-1 flex flex-col gap-2.5 custom-scrollbar">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const isChecked = selectedItems.includes(item.id);
                return (
                  <label
                    key={item.id}
                    className="flex items-center justify-between py-0.5 cursor-pointer group"
                  >
                    <span className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggle(item.id)}
                        className="accent-[var(--color-accent-teal)] h-4 w-4 rounded border-white/20 bg-transparent cursor-pointer"
                      />
                      <span className="text-xs text-white/70 group-hover:text-white transition-colors">
                        {item.label}
                      </span>
                    </span>
                    <span className="text-xs text-white/40 font-mono">{item.count}</span>
                  </label>
                );
              })
            ) : (
              <span className="text-xs text-white/30 italic py-2">No options found</span>
            )}
          </div>

          {/* Panel Footer */}
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-white/40 flex justify-between items-center">
            <span>{items.length} options</span>
            {selectedItems.length > 0 && (
              <button
                onClick={onClear}
                className="text-[var(--color-accent-teal)] hover:underline cursor-pointer font-semibold"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
