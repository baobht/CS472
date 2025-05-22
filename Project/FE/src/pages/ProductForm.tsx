import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_URL, useProductContext } from "@/context/ProductContext";
import { useEffect } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

type ProductFormInputs = {
  name: string;
  description?: string;
  category?: string;
  price: number;
  imgUrl?: string;
};

const categories = [
  { value: "Electronics", label: "Electronics" },
  { value: "Books", label: "Books" },
  { value: "Clothing", label: "Clothing" },
  { value: "Home", label: "Home" },
  { value: "Toys", label: "Toys" },
  { value: "Sports", label: "Sports" },
];

export function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { createProduct, updateProduct } = useProductContext();
  const navigate = useNavigate();

  const form = useForm<ProductFormInputs>();
  const { register, handleSubmit, reset, watch, control } = form;
  const imgUrl = watch("imgUrl");

  useEffect(() => {
    if (isEdit && id) {
      fetch(`${API_URL}/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.data) {
            reset({
              name: data.data.name,
              description: data.data.description,
              category: data.data.category,
              price: data.data.price,
              imgUrl: data.data.imageUrl,
            });
          }
        });
    }
  }, [isEdit, id, reset]);

  const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
    if (isEdit && id) {
      // Use updateProduct from context
      const updated = await updateProduct(id, {
        name: data.name,
        description: data.description,
        category: data.category,
        price: data.price,
        imageUrl: data.imgUrl,
      });
      if (updated) {
        navigate(`/product/${id}`);
      }
    } else {
      // Use createProduct from context
      const created = await createProduct({
        name: data.name,
        description: data.description,
        category: data.category,
        price: data.price,
        imageUrl: data.imgUrl,
      });
      if (created) {
        navigate(`/product/${created._id}`);
      }
    }
  };

  return (
    <div className="flex items-center min-h-dvh">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col border-2 rounded-sm p-4 gap-4 m-auto min-w-[50%]"
        >
          <h2>{isEdit ? "Edit Product" : "Create Product"}</h2>
          <FormField
            name="name"
            render={() => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                  />
                </FormControl>
                <FormMessage style={{ color: "red" }} />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            render={() => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...register("description")} type="text" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="imgUrl"
            render={() => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input {...register("imgUrl")} type="text" />
                </FormControl>
                {imgUrl && (
                  <div className="mt-2">
                    <img
                      src={imgUrl}
                      alt="Preview"
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        border: "1px solid #ccc",
                        borderRadius: 4,
                      }}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            name="category"
            render={() => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="price"
            render={() => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    {...register("price", {
                      required: "Price is required",
                      valueAsNumber: true,
                      min: { value: 0, message: "Price must be positive" },
                    })}
                    type="text"
                    inputMode="decimal"
                    onInput={(e) => {
                      const input = e.target as HTMLInputElement;
                      // Allow only numbers and decimal point
                      input.value = input.value.replace(/[^0-9.]/g, "");
                    }}
                  />
                </FormControl>
                <FormMessage style={{ color: "red" }} />
              </FormItem>
            )}
          />

          <Button
            variant="outline"
            className="bg-black text-white font-bold"
            type="submit"
          >
            {isEdit ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
