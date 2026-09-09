import { useState } from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../../api/reviews";

const ReviewForm = ({ productId, username, onReviewCreated }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!comment.trim()) {
      setError("Escribe un comentario.");
      return;
    }

    try {
      setLoading(true);

      const response = await createReview(productId, {
        username,
        rating,
        comment,
      });

      onReviewCreated(response.data);

      setComment("");
      setRating(5);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error al crear la reseña."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Escribe una reseña</h3>

      <label htmlFor="rating">
        Puntuación
      </label>

      <select
        id="rating"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        <option value={1}>⭐ 1</option>
        <option value={2}>⭐ 2</option>
        <option value={3}>⭐ 3</option>
        <option value={4}>⭐ 4</option>
        <option value={5}>⭐ 5</option>
      </select>

      <label htmlFor="comment">
        Comentario
      </label>

      <textarea
        id="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Escribe tu opinión..."
      />

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Publicar reseña"}
      </button>
    </form>
  );
};

export default ReviewForm;