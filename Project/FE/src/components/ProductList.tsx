import { Card } from "@/components/ui/card";
import { useProductContext } from "@/context/ProductContext";
import { debounce } from "@/hooks/useDebounce";
import { useCallback, useEffect } from "react";
import { ProductCard } from "./Product";
import { Button } from "./ui/button";

const categories = [
  "All",
  "Electronics",
  "Books",
  "Clothing",
  "Home",
  "Toys",
  "Sports",
];

export function ProductList() {
  const {
    products,
    fetchProducts,
    selectedCategory,
    setSelectedCategory,
    search,
  } = useProductContext();

  const debouncedSearch = useCallback(
    debounce((value: string, category: string) => {
      fetchProducts(1, 10, category === "All" ? undefined : category, value);
      console.log(1);
    }, 400),
    [fetchProducts]
  );

  useEffect(() => {
    debouncedSearch(search, selectedCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, search]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8 p-4 flex flex-row flex-wrap gap-2 bg-white border-none">
        {categories.map((cat, id) => (
          <Button
            key={id}
            className={`w-fit px-4 py-2 rounded transition-colors ${
              selectedCategory === cat
                ? "bg-black text-white font-bold"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
}
