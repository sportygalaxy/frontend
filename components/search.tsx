"use client";
import CameraIcon from "@/assets/icons/pack/Camera";
import SearchIcon from "@/assets/icons/pack/Search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import useBreakpoint from "@/hooks/useBreakpoint";
import GalleryIcon from "@/assets/icons/pack/Gallery";

interface SearchProps {
  placeholder?: string;
  onSearchClick?: () => void;
  onClearClick?: () => void;
  onClose?: () => void;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search: React.FC<SearchProps> = ({
  placeholder,
  onSearchClick,
  onClearClick,
  value,
  onChange,
}) => {
  const { isMd } = useBreakpoint();
  const iconSize = {
    width: isMd ? "24" : "20",
    height: isMd ? "24" : "19",
  };
  return (
    <div className="flex items-center border border-none rounded-2xl px-4 md:px-7 py-2 md:py-3 bg-secondary-foreground">
      <div className="md:block md:flex-2 mr-5">
        <Select>
          <SelectTrigger className="text-mobile-xl md:text-xl font-bold flex flex-1 px-4 rounded-3xl">
            <SelectValue placeholder="Products" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-dark">
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="light">Out-door</SelectItem>
            <SelectItem value="dark">In-door</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <input
        type="text"
        className="flex flex-2 w-full py-2 md:px-8 text-left bg-transparent placeholder-gray-500 border border-none rounded-md focus:outline-none focus:ring-0 focus:ring-transparent text-primary font-bold text-mobile-xl md:text-xl"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div className="flex items-center gap-6">
        <div onClick={onSearchClick} className="cursor-pointer text-gray-500">
          <SearchIcon {...iconSize} />
        </div>
        <div onClick={onClearClick} className="cursor-pointer text-gray-500">
          <CameraIcon {...iconSize} />
        </div>
      </div>
    </div>
  );
};
