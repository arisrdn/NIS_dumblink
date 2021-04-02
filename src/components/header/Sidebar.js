import { useContext, useState } from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import logo from "../../assets/img/logo.svg";
import "../../assets/css/sidebar.css";

const Footer = ({ children }) => {
	const [show, setShow] = useState(false);
	// const [show, setShow] = useState(false);

	const handleClose = () => setShow("");
	const handleShow = () => setShow("active");
	const handle = () => {
		setShow((prev) => !prev);
	};
	const [state, dispatch] = useContext(AuthContext);

	const logoutUser = () => {
		// console.log("lll", state);
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

					<ul className="list-unstyled components">
						<li className="active">
							<a
								href="#homeSubmenu"
								data-toggle="collapse"
								aria-expanded="false"
								className="dropdown-toggle"
							>
								<i class="fas fa-cubes"></i>
								Home
							</a>
						</li>
						<li>
							<a href="#">
								<i class="far fa-user-circle"></i>
								About
							</a>
							<a
								href="#pageSubmenu"
								data-toggle="collapse"
								aria-expanded="false"
								className="dropdown-toggle"
							>
								<i class="fas fa-link"></i>
								Pages
							</a>
						</li>
						<li>
							<a href="#">
								<i className="fas fa-image"></i>
								Portfolio
							</a>
						</li>
						<li>
							<a href="#">
								<i className="fas fa-question"></i>
								FAQ
							</a>
						</li>
						<li>
							<a href="#">
								<i className="fas fa-paper-plane"></i>
								Contact
							</a>
						</li>
					</ul>

					<ul className="list-unstyled CTAs">
						<li>
							<Nav.Link onClick={logoutUser}>logout</Nav.Link>
						</li>
						<li></li>
					</ul>
				</nav>

				{/* <!-- Page Content  -->÷ */}
				<div id="content">
					<Navbar
						className="nav-login "
						style={{ fonSize: "24px", minHeight: "60px" }}
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
