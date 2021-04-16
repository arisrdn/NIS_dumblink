import { useContext, useState } from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import logo from "../../assets/img/logo.svg";
import "../../assets/css/sidebar.css";
import CustomLink from "../custom/LinkActive";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import React from "react";

const routeConfig = [
	[
		{ path: "/user/create", breadcrumb: "create-breadcrumb" },
		{ path: "/user", breadcrumb: null },
		{ path: "/", breadcrumb: null },
		{ path: "/user/template/crete/:id", breadcrumb: null },
		{ path: "/user/mylink/edit/:id", breadcrumb: null },
	],
];
const Breadcrumbs = withBreadcrumbs(routeConfig)(({ breadcrumbs }) => (
	<>
		{breadcrumbs.map(({ breadcrumb, match }, index) => (
			<span className="bc" key={match.url}>
				{index !== 1 ? (
					<Link>{breadcrumb}</Link>
				) : (
					<Link style={{ fontSize: "18px" }}>{breadcrumb}</Link>
				)}
				{index < breadcrumbs.length - 1 && "\xa0 >\xa0 "}
			</span>
		))}
	</>
));

const SideBar = ({ children }) => {
	const router = useHistory();
	const [show, setShow] = useState(false);

	const handle = () => {
		setShow((prev) => !prev);
	};
	const [state, dispatch] = useContext(AuthContext);

	const logoutUser = () => {
		dispatch({
			type: "LOGOUT",
		});
		router.push("/");
	};

	return (
		<>
			<div className="wrapper">
				{/* <!-- Sidebar  --> */}
				<nav id="sidebar" className={show ? "active" : ""}>
					<div className="sidebar-header">
						<h3>
							<Image src={logo} alt="WF" className="ml-2" />
						</h3>
						<strong className="orange">WL </strong>
					</div>

					<ul
						className={
							show
								? "list-unstyled components  "
								: "list-unstyled components pl-4 "
						}
					>
						<CustomLink
							to="/user/template"
							label="Template"
							icon="fas fa-cubes"
						/>
						<CustomLink
							to="/user/profile"
							label="Profile"
							icon="far fa-user-circle"
						/>
						<CustomLink to="/user/mylink" label="My Link" icon="fas fa-link" />
					</ul>

					<ul
						className={
							show
								? "list-unstyled components  "
								: "list-unstyled components pl-4 "
						}
						style={{
							position: "absolute",
							bottom: "2px",
						}}
					>
						<li>
							<Link onClick={logoutUser}>
								<i className="fas fa-sign-out-alt"></i>
								logout
							</Link>
						</li>
						<li></li>
					</ul>
				</nav>

				{/* <!-- Page Content  -->÷ */}
				<div id="content">
					<Navbar
						className="nav-login "
						style={{ fonSize: "24px", minHeight: "80px" }}
					>
						<div className="wrap" onClick={handle}>
							<span className={show ? "arrow--l-r  right" : "arrow--l-r  left"}>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
							</span>
						</div>

						<div
							className="ml-4 text-capitalize font-weight-bold"
							style={{ fontSize: "24px" }}
						>
							{/* <SimpleBreadcrumbs /> */}

							<Breadcrumbs />
						</div>
					</Navbar>

					<div>{children}</div>
				</div>
			</div>
		</>
	);
};

export default SideBar;
