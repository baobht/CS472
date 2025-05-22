import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { StarRating } from "./StarRating";
import { Button } from "./ui/button";

type ProductCardProps = {
  _id: string;
  name: string;
  description?: string;
  category?: string;
  price: number;
  imageUrl?: string;
  averageRating?: number;
};

export function ProductCard({
  _id,
  name,
  description,
  category,
  price,
  imageUrl,
  averageRating,
}: ProductCardProps) {
  const navigate = useNavigate();
  return (
    <Card
      className={`border-none w-full bg-white ${
        imageUrl ? "pt-0" : ""
      } justify-between`}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-50 object-cover rounded-t-xl"
        />
      )}
      <CardHeader>
        <div className="flex justify-between">
          {category && (
            <div className="bg-neutral-200 text-neutral-700 text-xs px-2 py-1 rounded">
              {category}
            </div>
          )}
          {!!averageRating && (
            <div className="text-sm flex ml-auto items-center gap-1 text-muted-foreground">
              <StarRating value={1} max={1} /> {averageRating.toFixed(1)}
            </div>
          )}
        </div>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 text-gray-700 truncate">{description}</div>
        <div className="font-bold text-lg flex justify-between">
          <div>${price.toFixed(2)}</div>
          <Button
            className="bg-gray-200 cursor-pointer"
            onClick={() => navigate(`/product/${_id}`)}
          >
            View detail
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
