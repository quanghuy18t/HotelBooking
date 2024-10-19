export const getStart = (listReviews) => {
  const ratings = listReviews.map(data => data.rating);
  const sum = ratings.reduce((total, rating) => total + rating, 0);

  const average = ratings.length > 0 ? sum / ratings.length : 0;

  return parseFloat(average.toFixed(1));
}

