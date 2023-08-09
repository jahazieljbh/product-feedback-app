import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from 'react-helmet-async';
import Card from "../dashboard/Card";
import CommentSection from "./CommentSection";
import Button from "../helpers/Button";
import ActionModal from "../helpers/ActionModal";
import PageHeader from "../helpers/PageHeader";
import { createSelector } from 'reselect';

const FeedbackDetail = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));

  // Define your input selectors
const feedbacksSelector = (state) => state.feedbacks;
const idSelector = (state, id) => id;

// Create a memoized selector using createSelector
const filteredFeedbackSelector = createSelector(
  [feedbacksSelector, idSelector],
  (feedbacks, id) => feedbacks.filter((feedback) => feedback._id === id)
);

// In your component or wherever you're using the selector
const feedback = useSelector((state) =>
  filteredFeedbackSelector(state, id)
);

  if (feedback.length > 0) {
    return (
      <div className="my-16 mx-auto px-5 max-w-4xl lg:w-3/5">
        <Helmet>
          <title>{feedback[0].title}</title>
          <meta
            name="description"
            content="get feedback details"
          />
        </Helmet>
        <div className="flex justify-between">
          <PageHeader />
          {user?.result?._id === feedback[0]?.creator ? (
            <div>
              <Button
                btnText="Edit"
                iconType="fas fa-edit"
                bgColor="bg-tertiary-dark"
                handleClick={() => history(`/edit/${id}`)}
              />
              <Button
                btnText="Delete"
                iconType="fas fa-trash-alt"
                bgColor="bg-tertiary-dark"
                handleClick={() => setShowModal(!showModal)}
              />
            </div>
          ) : null}
        </div>
        <Card data={feedback[0]} disable />
        <CommentSection data={feedback[0]} />
        {showModal && (
          <ActionModal
            text="Are you sure you want to delete your interview experience?"
            feedbackId={feedback[0]._id}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default FeedbackDetail;