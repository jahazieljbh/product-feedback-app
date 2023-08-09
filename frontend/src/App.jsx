import React, { Fragment } from "react";
import "./index.css";
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Helmet } from 'react-helmet-async';
import { getFeedbacks } from "./actions/feedbacks";
const Dashboard = React.lazy(() => import("./components/dashboard/Dashboard"));
const FeedbackDetail = React.lazy(() =>
	import("./components/feedback/FeedbackDetails"),
);
const AuthForm = React.lazy(() => import("./components/authForm/AuthForm"));
const CreateFeedback = React.lazy(() =>
	import("./components/feedback/CreateFeedback"),
);
const UpdateFeedback = React.lazy(() =>
	import("./components/feedback/UpdateFeedback"),
);
const Roadmap = React.lazy(() => import("./components/roadmap/Roadmap"));

const App = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.authData);

	useEffect(() => {
		dispatch(getFeedbacks());
	}, [dispatch]);

	return (
		<>
			<Toaster
				position="top-center"
				gutter={8}
				containerClassName=""
				containerStyle={{}}
				toastOptions={{
					className: "",
					duration: 5000,
					style: {
						background: "#ffffff",
						color: "#3A4374",
					},
					success: {
						duration: 3000,
						iconTheme: {
							primary: "#4661E6",
							secondary: "#ffffff",
						},
					},
					error: {
						iconTheme: {
							primary: "#D73737",
							secondary: "#ffffff",
						},
					},
				}}
			/>
			<BrowserRouter basename="/">
				<Helmet>
        <title>Product Feedback App</title>
        <meta
          name="description"
          content="product feedback application"
        />
      </Helmet>
				<div className="font-display bg-secondary-light max-w-screen-2xl 2xl:mx-auto p-0 m-0 box-border">
					<Routes>
						
							<Route exact path="/" element={
								<Suspense fallback={<div>Loading..</div>}>
									<Navigate to="/feedbacks" />
								</Suspense>
							}>
							</Route>
							<Route exact path="/feedbacks" element={
								<Suspense fallback={<div>Loading..</div>}>
									<Dashboard />
								</Suspense>
							}>
								
							</Route>
							<Route exact path="/feedbacks/search" element={
								<Suspense fallback={<div>Loading..</div>}>
									<Dashboard />
								</Suspense>
							}>
								
							</Route>
							<Route path="/feedbacks/:id" element={
								<Suspense fallback={<div>Loading..</div>}>
									<FeedbackDetail />
								</Suspense>
							}>
								
							</Route>
							<Route exact path="/auth" element={
								<Suspense fallback={<div>Loading..</div>}>
									{
										user?.message || !user ? (
											<AuthForm />
										) : (
											<Navigate to="/feedbacks" />
										)
									}
								</Suspense>
							}>
								
							</Route>
							<Route path="/create" element={
								<Suspense fallback={<div>Loading..</div>}>
									{
										!user ? <Navigate to="/feedbacks" /> : <CreateFeedback />
									}
								</Suspense>
								}>

							</Route>
							<Route path="/edit/:id" element={
								<Suspense fallback={<div>Loading..</div>}>
									{
										!user ? <Navigate to="/feedbacks" /> : <UpdateFeedback />
									}
								</Suspense>
								}
								>
								
							</Route>
							<Route path="/roadmap" element={
								<Suspense fallback={<div>Loading..</div>}>
									<Roadmap />
								</Suspense>
							}>
								
							</Route>
						
					</Routes>
				</div>
			</BrowserRouter>
		</>
	);
};

export default App;