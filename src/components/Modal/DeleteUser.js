// import React from "react";
// import { Nav, Navbar, Form, FormControl } from "react-bootstrap";
// import styled from "styled-components";

// const Styles = styled.div`
// 	.navbar {
// 		background-color: #222;
// 	}
// 	a,
// 	.navbar-nav,
// 	.navbar-light .nav-link {
// 		color: #9fffcb;
// 		&:hover {
// 			color: white;
// 		}
// 	}
// 	.navbar-brand {
// 		font-size: 1.4em;
// 		color: #9fffcb;
// 		&:hover {
// 			color: white;
// 		}
// 	}
// 	.form-center {
// 		position: absolute !important;
// 		left: 25%;
// 		right: 25%;
// 	}
// `;

// export const NavigationBar = () => (
// 	<Styles>
// 		<Navbar expand="lg">
// 			<Navbar.Brand href="/">Tutorial</Navbar.Brand>
// 			<Navbar.Toggle aria-controls="basic-navbar-nav" />
// 			<Form className="form-center">
// 				<FormControl type="text" placeholder="Search" className="" />
// 			</Form>
// 			<Navbar.Collapse id="basic-navbar-nav">
// 				<Nav className="ml-auto">
// 					<Nav.Item>
// 						<Nav.Link href="/">Home</Nav.Link>
// 					</Nav.Item>
// 					<Nav.Item>
// 						<Nav.Link href="/about">About</Nav.Link>
// 					</Nav.Item>
// 				</Nav>
// 			</Navbar.Collapse>
// 		</Navbar>
// 	</Styles>
// );

import { Modal, Button, Row, Image } from "react-bootstrap";

function Delete(props) {
	const handleDelete = () => {
		props.delete();
		props.onHide();
	};
	return (
		<Modal
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Body className="">
				<p className="text-success mt-3">
					you are sure you want to delete this Acoount
				</p>
				<div className="d-flex justify-content-end ">
					<Button
						variant="danger"
						size="sm"
						className="mr-3"
						onClick={() => handleDelete()}
					>
						Delete
					</Button>
					<Button
						variant="secondary"
						size="sm"
						onClick={props.onHide}
						style={{ background: "#E5E5E5", border: "none" }}
					>
						cancel
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default Delete;
