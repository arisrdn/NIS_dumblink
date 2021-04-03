import { useContext, useState } from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import logo from "../../assets/img/logo.svg";
import "../../assets/css/sidebar.css";
import CustomLink from "../custom/LinkActive";

const Footer = ({ children }) => {
	const [show, setShow] = useState(false);

	const handle = () => {
		setShow((prev) => !prev);
	};
	const [state, dispatch] = useContext(AuthContext);

	const logoutUser = () => {
		dispatch({
			type: "LOGOUT",
		});
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
						<CustomLink to="/" label="Home" icon="fas fa-cubes" />

						<li className="active">
							<Link to="/user/template">
								<i class="fas fa-cubes"></i>
								Template
							</Link>
						</li>
						<li>
							<Link to="/user">
								<i class="far fa-user-circle"></i>
								Profile
							</Link>
						</li>
						<li>
							<Link to="/user/mylink">
								<i class="fas fa-link"></i>
								My Link
							</Link>
						</li>
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
							<Nav.Link onClick={logoutUser}>
								<i class="fas fa-sign-out-alt"></i>
								logout
							</Nav.Link>
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
							{" "}
							Template
						</div>
					</Navbar>

					<div className="container">{children}</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
