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
import Navbarlogin from "../components/header/Navbarlogin";
import Sidebar from "../components/header/Sidebar";

import Landing from "./Landing";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Profile from "./profile/index";
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
	return (
		<>
			{/* {!state.isLogin ? <Navbarlanding /> : <Navbarlogin />} */}
			{!state.isLogin ? (
				<Navbarlanding />
			) : (
				<Sidebar>
					<Route exact path="/template" component={Template} />
					<Route exact path="/template/crete/:id" component={TemplateCreate} />
				</Sidebar>
			)}
			<Route exact path="/:unique" component={RenderTemplate} />

			<Switch>
				{!state.isLogin ? (
					<Route exact path="/" component={Landing} />
				) : (
					<Redirect to="/user/" />
				)}
				{/* <NavigationBar /> */}
				{/* <Route component={NoMatch} /> */}
			</Switch>
			<Register />
			<Login />
		</>
	);
}
