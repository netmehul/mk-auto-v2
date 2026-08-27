import { useState, useRef, useEffect, ChangeEvent } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedCountry = findCountryByDialCode(countryCode || DEFAULT_COUNTRY.dialCode);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const filteredCountries = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.dialCode.includes(searchQuery) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCountry = (country: CountryCodeItem) => {
    onCountryCodeChange(country.dialCode);
    setIsOpen(false);
    setSearchQuery("");
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
            className={`absolute left-0 top-[calc(100%+4px)] z-50 w-72 max-w-[90vw] rounded-sm border shadow-2xl backdrop-blur-md transition-all ${
              isDark
                ? "border-off-white/15 bg-navy-900 text-off-white shadow-black/60"
                : "border-grey-200 bg-white text-navy-900 shadow-navy-900/10"
            }`}
          >
            {/* Search Box */}
            <div className={`flex items-center gap-2 border-b px-3 py-2.5 ${
              isDark ? "border-off-white/10" : "border-grey-200"
            }`}>
              <Search className={`h-4 w-4 shrink-0 ${isDark ? "text-off-white/40" : "text-grey-400"}`} />
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
            </div>

            {/* Country List */}
            <div className="max-h-60 overflow-y-auto py-1 scrollbar-thin">
              {filteredCountries.length === 0 ? (
                <div
                  className={`px-4 py-3 text-center text-xs ${
                    isDark ? "text-off-white/50" : "text-grey-500"
                  }`}
                >
                  No country found
                </div>
              ) : (
                filteredCountries.map((country) => {
                  const isSelected = country.dialCode === selectedCountry.dialCode && country.code === selectedCountry.code;
                  return (
                    <button
                      key={`${country.code}-${country.dialCode}`}
                      type="button"
                      onClick={() => handleSelectCountry(country)}
                      className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? isDark
                            ? "bg-white/10 text-gold font-medium"
                            : "bg-grey-200/60 text-navy-900 font-semibold"
                          : isDark
                          ? "hover:bg-white/5 text-off-white/90"
                          : "hover:bg-grey-200/40 text-navy-900"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="text-base leading-none">{country.flag}</span>
                        <span className="truncate">{country.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span
                          className={`font-mono text-[11px] ${
                            isDark ? "text-off-white/60" : "text-grey-500"
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
