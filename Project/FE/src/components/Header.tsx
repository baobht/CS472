import { useProductContext } from "@/context/ProductContext";
import { debounce } from "@/hooks/useDebounce";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Input } from "./ui/input";

export const Header = () => {
  const navigate = useNavigate();
  const { fetchProducts, selectedCategory, search, setSearch } =
    useProductContext();

  const debouncedSearch = useCallback(
    debounce((value: string, category: string) => {
      fetchProducts(1, 10, category === "All" ? undefined : category, value);
    }, 400),
    [fetchProducts]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value, selectedCategory);
  };

  return (
    <div className="flex justify-between bg-white px-12 py-4">
      <div
        className="font-extrabold text-3xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        ReviewMe
      </div>
      <div>
        <Input
          placeholder="Search products"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};
