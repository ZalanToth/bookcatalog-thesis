export interface CreateReviewRequest {
  googleId: string;
  rating: number;
  reviewText: string;
}

export interface ReviewDto {
  id: number;
  googleId: string;
  rating: number;
  reviewText: string;
  userName: string;
}

const BASE_URL = "http://localhost:8081/api/reviews";

export async function submitReview(
  data: CreateReviewRequest
): Promise<ReviewDto> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
 
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit review");
  }

  return response.json();
}

export async function getReviewsForBook(
  googleId: string
): Promise<ReviewDto[]> {
  const response = await fetch(`${BASE_URL}/${googleId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return response.json();
}
export const deleteReview = async (
  googleId: string
) => {
  await fetch(`http://localhost:8081/api/reviews/delete/${googleId}`, {
    method: "DELETE",
    credentials: "include",
  });
};