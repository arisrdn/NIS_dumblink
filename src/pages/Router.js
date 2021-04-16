import React, { useState, useEffect, useContext } from "react";
import {
	Switch,
	Route,
	useLocation,
	useHistory,
	useParams,
	Redirect,
} from "react-router-dom";

import { API, setAuthToken } from "../config/api";
import { AuthContext } from "../contexts/authContext";

import Navbarlanding from "../components/header/Navbarlanding";
import EditLink from "./link/EditLink";
import Sidebar from "../components/header/Sidebar";

import Landing from "./Landing";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Profile from "./profile/index";
import MyLink from "./profile/MyLink";
import Template from "./template/Template";
import RenderTemplate from "./template/Render";
import TemplateCreate from "./template/Create";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

export default function MasterRoute() {
	let query = useQuery();
	const [state, dispatch] = useContext(AuthContext);
	const checkUser = async () => {
		try {
			const response = await API.get("/check-auth");

			if (response.status === 401) {
				return dispatch({
					type: "AUTH_ERROR",
				});
			}

			let payload = response.data.data.user;
			payload.token = localStorage.token;

			dispatch({
				type: "LOGIN_SUCCESS",
				payload,
			});
		} catch (error) {
			console.log(error);
			dispatch({
				type: "AUTH_ERROR",
			});
		}
	};

	useEffect(() => {
		checkUser();
	}, []);

	let { unique } = useParams();
	// console.log("uniq=", unique);

	return (
		<>
			<Switch>
				<Route path="/:unique" children={<RouterChild />} />
				<Route exact path="/" component={() => <Redirect to="/index" />} />
			</Switch>
			{/* {!state.isLogin ? (
				<Navbarlanding />
			) : (
				<Sidebar>
					<Route exact path="/user/template" component={Template} />
					<Route
						exact
						path="/user/template/crete/:id"
						component={TemplateCreate}
					/>
					<Route exact path="/user/mylink" component={MyLink} />
				</Sidebar>
			)}
			{!state.isLogin ? (
				<Route exact path="/" component={Landing} />
			) : (
				<Route exact path="/" render={() => <Redirect to="/user/template" />} />
			)} */}

			<Register />
			<Login />
		</>
	);
}

export const RouterChild = () => {
	let { unique } = useParams();
	const [state, dispatch] = useContext(AuthContext);
	console.log("unique", unique);

	return (
		<>
			{!state.isLogin ? (
				<>
					<Route exact path="/index" component={Landing} />
					<Route exact path="/user" render={() => <Redirect to="/index" />} />
				</>
			) : (
				<>
					<Route
						exact
						path="/index"
						render={() => <Redirect to="/user/profile" />}
					/>
					<Route
						exact
						path="/user"
						render={() => <Redirect to="/user/profile" />}
					/>
				</>
			)}
			{unique !== "index" && unique !== "user" ? (
				<Route exact path="/:unique" component={RenderTemplate} />
			) : (
				<>
					{!state.isLogin ? (
						<Navbarlanding />
					) : (
						<Sidebar>
							<Route exact path="/user/template" component={Template} />
							<div className="container">
								<Route
									exact
									path="/user/template/crete/:id"
									component={TemplateCreate}
								/>
								<Route exact path="/user/mylink" component={MyLink} />
								<Route exact path="/user/profile" component={Profile} />
							</div>
							<Route exact path="/user/mylink/edit/:id" component={EditLink} />
						</Sidebar>
					)}
				</>
			)}
		</>
	);
};
