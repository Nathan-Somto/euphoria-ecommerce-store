import React from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function SearchBar({
  onChange,
  value,
  placeholder = "Search Something...",
  useDebounce = true,
  debounceTime = 300,
  containerClassName = '',
  inputClassName = '',
}: SearchBarProps) {
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (useDebounce) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        onChange(newValue);
      }, debounceTime);
    } else {
      onChange(newValue);
    }
  };

  return (
    <div className={cn(
      "flex px-3 py-1 rounded-xl border-2 border-input overflow-hidden max-w-md w-full",
      containerClassName
    )}>
      <SearchIcon className="text-[#4b5563] mr-1.5 self-center text-[15px]" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={cn(
          "w-full outline-none ring-offset-transparent bg-transparent border-[transparent] focus-visible:ring-none focus-visible:ring-transparent focus:ring-none focus:ring-[transparent] text-gray-600 text-sm",
          inputClassName
        )}
      />
    </div>
  );
}

export default SearchBar;
