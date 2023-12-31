import React from "react";
import Card from "../dashboard/Card";
import { useSelector } from "react-redux";
import EmptyState from "./EmptyState";
import { Helmet } from 'react-helmet-async';

const FeedbackList = () => {
  const feedbacks = useSelector((state) => state.feedbacks);
  return (
    <div className="px-5 md: pb-5 md:px-0">
      <Helmet>
        <title>{`${feedbacks.length} Suggestions - Product Feedback Board`}</title>
        <meta
          name="description"
          content="get a feedback suggestion"
        />
      </Helmet>
      {feedbacks.length > 0 ? (
        feedbacks.map((cardData) => <Card data={cardData} key={cardData._id} />)
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default FeedbackList;