import { StarRating } from "@/components/StarRating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
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
  API_URL,
  useProductContext,
  type Product,
  type Review,
} from "@/context/ProductContext";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

function formatAddedDate(dateString: string) {
  const date = new Date(dateString);
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return `Added on ${formatted}`;
}

// Helper to calculate average rating
function calculateAverageRating(reviews: Review[]) {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return sum / reviews.length;
}

type ReviewFormInputs = {
  author: string;
  rating: number;
  comment: string;
};

export const ProductDetail = () => {
  const {
    fetchProduct,
    fetchReviews,
    reviews,
    addReview,
    updateReview,
    deleteReview,
    updateProduct,
    generateComment,
  } = useProductContext();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const { id } = useParams();
  const [val, setVal] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchProduct(id).then((data) => {
        setProduct(data);
        setVal(data?.averageRating || 0);
      });
      fetchReviews(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const productReviews: Review[] = id && reviews[id] ? reviews[id] : [];

  // Helper to get initials for AvatarFallback
  function getInitials(name?: string) {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  // Review form logic
  const form = useForm<ReviewFormInputs>({
    defaultValues: {
      author: "",
      rating: 0,
      comment: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = form;

  // Keep StarRating in sync with form rating
  const formRating = watch("rating");

  // After add/update/delete review, call this:
  const updateProductAverageRating = async () => {
    if (!id) return;
    // Fetch the latest reviews directly
    const res = await fetch(`${API_URL}/api/products/${id}/reviews`);
    const json = await res.json();
    const currentReviews = json.data || [];
    const avg = calculateAverageRating(currentReviews);
    await updateProduct(id, { averageRating: avg });
    const updatedProduct = await fetchProduct(id);
    setProduct(updatedProduct);
    setVal(avg);
  };

  // Handle submit for create/update
  const onSubmit = async (data: ReviewFormInputs) => {
    if (!id) return;
    if (editingReviewId) {
      await updateReview(id, editingReviewId, data);
      setEditingReviewId(null);
    } else {
      await addReview(id, data);
    }
    reset();
    // Fetch reviews, then update average
    await updateProductAverageRating();
  };

  // Load review data into form for editing
  const handleEditReview = (review: Review) => {
    setEditingReviewId(review._id);
    setValue("author", review.author);
    setValue("rating", review.rating);
    setValue("comment", review.comment);
  };

  // Delete review handler
  const handleDeleteReview = async (review: Review) => {
    if (!id) return;
    await deleteReview(id, review._id);
    // If currently editing this review, reset form
    if (editingReviewId === review._id) {
      setEditingReviewId(null);
      reset();
    }
    // Fetch reviews, then update average
    await updateProductAverageRating();
  };

  // Function to generate comment based on product using context
  const handleGenerateComment = async () => {
    if (!product) return;
    setGenerating(true);
    try {
      const comment = await generateComment(product.name);
      setValue("comment", comment || `I really like the ${product.name}!`);
    } catch (e) {
      console.log(e);
      setValue("comment", `I really like the ${product.name}!`);
    }
    setGenerating(false);
  };

  return (
    <div className="container p-16 min-w-dvw w-full min-h-dvh h-full bg-gray-300 ">
      <Card
        className={`flex-row w-full bg-white px-8 justify-between border-none`}
      >
        <img
          src={product?.imageUrl}
          alt={product?.name || ""}
          className="w-[50%] h-[50%] object-cover rounded-xl"
        />
        <div className="w-1/2 flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            {product?.category && (
              <div className="bg-[#e5e7eb] text-neutral-700 px-2 py-1 rounded">
                {product?.category}
              </div>
            )}
            {product?.dateAdded && (
              <div className="text-[#6b7280] font-bold text-xl flex items-center gap-1">
                {formatAddedDate(product.dateAdded)}
                <button
                  type="button"
                  className="ml-1 text-gray-400 hover:text-black"
                  title="Edit product"
                  onClick={() => {
                    // Navigate to update product page, e.g. /product/update/:id
                    navigate(`/product/edit/${product?._id}`, {
                      state: {
                        product, // Pass the product data to prefill the form
                      },
                    });
                  }}
                >
                  <Pencil1Icon width={18} height={18} />
                </button>
              </div>
            )}
          </div>
          <CardTitle className="text-3xl">{product?.name}</CardTitle>

          <div className="flex gap-4">
            {product?.averageRating ? (
              <>
                <StarRating value={val} precision={0.5} />
                <div className="text-muted-foreground">
                  {product?.averageRating.toFixed(1)}
                </div>
              </>
            ) : (
              <>
                <StarRating value={0} precision={0.5} />
                <div className="text-muted-foreground">0</div>
              </>
            )}
          </div>
          <div className="font-bold text-3xl flex justify-between my-4">
            <div>${product?.price.toFixed(2)}</div>
          </div>
          <div className="text-gray-700">{product?.description}</div>
        </div>
      </Card>
      <Card
        className={`flex-row w-full bg-white px-8 justify-between mt-8 border-none`}
      >
        <div className="w-full">
          <div className="text-2xl font-bold mb-4">Customer Reviews</div>
          {productReviews.length === 0 ? (
            <div className="text-gray-500">No reviews yet.</div>
          ) : (
            <div className="flex flex-col gap-4">
              {productReviews.map((review, ind) => (
                <div
                  key={review._id}
                  className={`${
                    ind < productReviews.length - 1 ? "border-b" : ""
                  } pb-4 flex items-start gap-3`}
                >
                  <Avatar className="mt-1">
                    <AvatarImage
                      src={
                        "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg"
                      }
                    />
                    <AvatarFallback>
                      {getInitials(review.author)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-2">
                        <span className="font-semibold flex items-center gap-1">
                          {review.author}
                          <button
                            type="button"
                            className="ml-1 text-gray-400 hover:text-black"
                            onClick={() => handleEditReview(review)}
                            title="Edit review"
                          >
                            <Pencil1Icon width={16} height={16} />
                          </button>
                          <button
                            type="button"
                            className="ml-1 text-gray-400 hover:text-red-600"
                            onClick={() => handleDeleteReview(review)}
                            title="Delete review"
                          >
                            <TrashIcon width={16} height={16} />
                          </button>
                        </span>
                        <span className="text-xs text-gray-400">
                          {review.date && formatAddedDate(review.date)}
                        </span>
                      </div>
                      <StarRating
                        value={review.rating}
                        precision={0.5}
                        size={18}
                      />
                    </div>
                    <div className="mt-2 text-gray-700">{review.comment}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
      {/* Review Submission Card */}
      <Card className="w-full bg-white px-8 py-6 mt-8 border-none">
        <div className="text-xl font-bold mb-4">
          {editingReviewId ? "Edit Review" : "Write a Review"}
        </div>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 max-w-xl"
          >
            <FormField
              name="author"
              render={() => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input
                      {...register("author", { required: "Name is required" })}
                      placeholder="Enter your name"
                      disabled={!!editingReviewId} // Prevent changing author when editing
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.author && (
                      <span className="text-red-500">
                        {errors.author.message}
                      </span>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="rating"
              render={() => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <StarRating
                      value={formRating}
                      onChange={(val) => setValue("rating", val)}
                      precision={0.5}
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.rating && (
                      <span className="text-red-500">
                        {errors.rating.message}
                      </span>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="comment"
              render={() => (
                <FormItem>
                  <FormLabel>
                    Comment
                    <Button
                      type="button"
                      size="sm"
                      className="ml-2 bg-black text-white"
                      onClick={handleGenerateComment}
                      disabled={generating}
                    >
                      {generating ? "Generating..." : "Generate"}
                    </Button>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...register("comment", {
                        required: "Comment is required",
                      })}
                      placeholder="Write your review"
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.comment && (
                      <span className="text-red-500">
                        {errors.comment.message}
                      </span>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-fit bg-black text-white">
              {editingReviewId ? "Update Review" : "Submit Review"}
            </Button>
            {editingReviewId && (
              <Button
                type="button"
                className="w-fit bg-black text-white"
                onClick={() => {
                  setEditingReviewId(null);
                  reset();
                }}
              >
                Cancel
              </Button>
            )}
          </form>
        </Form>
      </Card>
    </div>
  );
};
