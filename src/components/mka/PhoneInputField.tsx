import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { ChevronDown, Search, Check, X } from "lucide-react";
import {
  COUNTRY_CODES,
  CountryCodeItem,
  findCountryByDialCode,
  DEFAULT_COUNTRY,
} from "@/lib/phoneValidation";

interface PhoneInputFieldProps {
  id?: string;
  name?: string;
  countryCode?: string;
  phone?: string;
  onCountryCodeChange?: (countryCode: string) => void;
  onPhoneChange?: (phone: string) => void;
  onBlur?: () => void;
  error?: string | undefined;
  touched?: boolean | undefined;
  theme?: "light" | "dark";
  disabled?: boolean;
  required?: boolean;
  label?: string;
}

export function PhoneInputField({
  id = "phone",
  name = "phone",
  countryCode = DEFAULT_COUNTRY.dialCode,
  phone = "",
  onCountryCodeChange = () => {},
  onPhoneChange = () => {},
  onBlur,
  error,
  touched,
  theme = "light",
  disabled = false,
  required = true,
  label = "Phone",
}: PhoneInputFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLButtonElement>(null);

  const selectedCountry = findCountryByDialCode(countryCode || DEFAULT_COUNTRY.dialCode);

  const filteredCountries = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.dialCode.includes(searchQuery) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => {
        searchInputRef.current?.focus();
        selectedItemRef.current?.scrollIntoView({ block: "nearest" });
      }, 50);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Reset highlighted index on search change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchQuery]);

  const handleSelectCountry = (country: CountryCodeItem) => {
    onCountryCodeChange(country.dialCode);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleListKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredCountries.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCountries.length - 1
      );
    } else if (e.key === "Enter" && filteredCountries[highlightedIndex]) {
      e.preventDefault();
      handleSelectCountry(filteredCountries[highlightedIndex]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow digits, spaces, +, -, (, ), .
    if (!/^[\d\s\-\(\)\.\+]*$/.test(val)) return;

    // Check if user pasted a number starting with '+' and matching a known dial code
    if (val.trim().startsWith("+")) {
      const matchedCountry = COUNTRY_CODES.find((c) =>
        val.trim().startsWith(c.dialCode)
      );
      if (matchedCountry) {
        onCountryCodeChange(matchedCountry.dialCode);
        const remainder = val.trim().substring(matchedCountry.dialCode.length).trim();
        onPhoneChange(remainder);
        return;
      }
    }

    onPhoneChange(val);
  };

  const isDark = theme === "dark";

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={`block text-xs font-medium uppercase tracking-[0.08em] ${
            isDark ? "text-off-white/65" : "text-grey-500"
          }`}
        >
          {label} {required && <span className={isDark ? "text-red-400" : "text-red-500"}>*</span>}
        </label>
      )}

      <div
        ref={dropdownRef}
        onKeyDown={handleListKeyDown}
        className={`relative mt-3 flex items-center border-b transition-colors duration-300 ${
          error && touched
            ? isDark
              ? "border-red-400 focus-within:border-red-400"
              : "border-red-500 focus-within:border-red-500"
            : isDark
            ? "border-off-white/20 focus-within:border-gold"
            : "border-grey-200 focus-within:border-gold"
        }`}
      >
        {/* Country Code Dropdown Trigger */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex h-12 items-center gap-1.5 pr-3 text-sm font-medium transition-colors outline-none select-none cursor-pointer ${
            isDark
              ? "text-off-white hover:text-gold"
              : "text-navy-900 hover:text-gold"
          }`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="text-base leading-none" role="img" aria-label={selectedCountry.name}>
            {selectedCountry.flag}
          </span>
          <span className="text-xs tracking-wider">{selectedCountry.dialCode}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Divider */}
        <div
          className={`h-4 w-[1px] mr-3 ${
            isDark ? "bg-off-white/20" : "bg-grey-200"
          }`}
        />

        {/* Phone Input */}
        <input
          id={id}
          name={name}
          type="tel"
          inputMode="tel"
          disabled={disabled}
          value={phone}
          onChange={handleInputChange}
          onBlur={onBlur}
          placeholder={selectedCountry.placeholder}
          className={`h-12 w-full bg-transparent px-0 text-sm outline-none transition-colors duration-300 ${
            isDark
              ? "text-off-white placeholder:text-off-white/30"
              : "text-navy-900 placeholder:text-grey-400"
          }`}
        />

        {/* Country Picker Dropdown Panel */}
        {isOpen && (
          <div
            className={`absolute left-0 top-[calc(100%+6px)] z-50 w-80 max-w-[92vw] rounded border shadow-2xl backdrop-blur-md transition-all duration-150 animate-in fade-in zoom-in-95 ${
              isDark
                ? "border-off-white/15 bg-navy-900 text-off-white shadow-black/60"
                : "border-grey-200 bg-white text-navy-900 shadow-[0_12px_40px_rgba(5,15,55,0.12)]"
            }`}
          >
            {/* Search Box */}
            <div
              className={`flex items-center gap-2 border-b px-3 py-2.5 ${
                isDark ? "border-off-white/10" : "border-grey-200"
              }`}
            >
              <Search
                className={`h-3.5 w-3.5 shrink-0 ${
                  isDark ? "text-off-white/40" : "text-grey-400"
                }`}
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or code..."
                className={`w-full bg-transparent text-xs outline-none ${
                  isDark
                    ? "text-off-white placeholder:text-off-white/40"
                    : "text-navy-900 placeholder:text-grey-400"
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className={`p-0.5 rounded transition-colors ${
                    isDark
                      ? "text-off-white/40 hover:text-off-white"
                      : "text-grey-400 hover:text-navy-900"
                  }`}
                  title="Clear search"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Country List */}
            <div
              ref={listRef}
              className="max-h-64 overflow-y-auto py-1 scrollbar-thin divide-y divide-transparent"
              role="listbox"
            >
              {filteredCountries.length === 0 ? (
                <div
                  className={`px-4 py-4 text-center text-xs ${
                    isDark ? "text-off-white/50" : "text-grey-500"
                  }`}
                >
                  No country found
                </div>
              ) : (
                filteredCountries.map((country, idx) => {
                  const isSelected =
                    country.dialCode === selectedCountry.dialCode &&
                    country.code === selectedCountry.code;
                  const isHighlighted = idx === highlightedIndex;

                  return (
                    <button
                      key={`${country.code}-${country.dialCode}`}
                      ref={isSelected ? selectedItemRef : null}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelectCountry(country)}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? isDark
                            ? "bg-white/10 text-gold font-medium"
                            : "bg-grey-200/70 text-navy-900 font-semibold"
                          : isHighlighted
                          ? isDark
                            ? "bg-white/5 text-off-white"
                            : "bg-grey-200/40 text-navy-900"
                          : isDark
                          ? "text-off-white/90"
                          : "text-navy-900"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="text-base leading-none" role="img" aria-label={country.name}>
                          {country.flag}
                        </span>
                        <span className="truncate">{country.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span
                          className={`font-mono text-[11px] ${
                            isSelected
                              ? "text-gold font-medium"
                              : isDark
                              ? "text-off-white/60"
                              : "text-grey-500"
                          }`}
                        >
                          {country.dialCode}
                        </span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-gold" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && touched && (
        <p
          className={`mt-1.5 text-xs ${
            isDark ? "text-red-400" : "text-red-500"
          }`}
        >
          {error}
        </p>
      )}
    </div>
  );
}
