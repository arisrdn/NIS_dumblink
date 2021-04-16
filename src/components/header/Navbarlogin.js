import { Navbar, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../contexts/authContext";
import logo from "../../assets/img/logo.svg";

const Navbarlanding = () => {
	const [state, dispatch] = useContext(AuthContext);

	const logoutUser = () => {
		dispatch({
			type: "LOGOUT",
		});
	};
	return (
		<Navbar className="nav-login">
			<Link to="/">
				<Navbar.Brand to="/" className="title-ways text-brown ml-5">
					<Image src={logo} alt="WF" className="ml-2" />
				</Navbar.Brand>
			</Link>
			<Navbar.Collapse id="basic-navbar-nav" className=""></Navbar.Collapse>
			<div>
				<Nav className="justify-content-end" activeKey="/">
					<Nav.Item>
						<Nav.Link as={Link} to="/template">
							template
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="link-1">Link</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="link-2">Link</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link onClick={logoutUser}>logout</Nav.Link>
					</Nav.Item>
				</Nav>
			</div>
		</Navbar>
	);
};

export default Navbarlanding;
