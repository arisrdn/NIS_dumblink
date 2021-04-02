import { Navbar, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../contexts/authContext";
import logo from "../../assets/img/logo.svg";

const Navbarlanding = () => {
	const [state, dispatch] = useContext(AuthContext);

	const handleOpenLogin = () => {
		dispatch({
			type: "MODAL_LOGIN_OPEN",
		});
	};
	const handleOpenRegister = () => {
		dispatch({
			type: "MODAL_REGISTER_OPEN",
		});
	};
	return (
		<Navbar fixed="top" className="nav-bg">
			<Link to="/">
				<Navbar.Brand to="/" className="title-ways text-brown ml-5">
					<Image src={logo} alt="WF" className="ml-2" />
				</Navbar.Brand>
			</Link>
			<Navbar.Collapse id="basic-navbar-nav" className=""></Navbar.Collapse>
			<div>
				<Nav className="mr-5 pr-4">
					<li className="nav-link">
						<button
							className="btn btn-w btn-nav btn-sm"
							onClick={handleOpenLogin}
						>
							Login
						</button>
					</li>
					<li className="nav-link">
						<button
							className="btn btn-yellow  btn-nav text-white btn-sm"
							onClick={handleOpenRegister}
						>
							Register
						</button>
					</li>
				</Nav>
			</div>
		</Navbar>
	);
};

export default Navbarlanding;
