export function expensiveFiltering(feedbacks) {
  const filteredFeedback = feedbacks.filter((feedback) => feedback._id === id);
  return filteredFeedback;
}

export function expensiveSorting(feedbacks) {
  const sortedFeedback = feedbacks.sort((a, b) => b.date - a.date);
  return sortedFeedback;
}

export function expensiveTransformation(feedbacks) {
  const transformedFeedback = feedbacks.map(feedback => ({
    ...feedback,
    summary: `Summary for feedback with ID ${feedback.id}`,
  }));
  return transformedFeedback;
}