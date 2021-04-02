import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { Button, Form, Modal, Alert } from "react-bootstrap";

import { API, setAuthToken } from "../../config/api";
import { AuthContext } from "../../contexts/authContext";

function Register() {
	const router = useHistory();
	const [state, dispatch] = useContext(AuthContext);
	const [form, setForm] = useState({
		email: "",
		fullName: "",
		password: "",
	});

	const { email, password, fullName } = form;

	const addUser = useMutation(async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify({
			email,
			password,
			fullName,
		});

		const response = await API.post("/register", body, config);
		return response;
	});

	const handleClose = () => {
		dispatch({
			type: "MODAL_REGISTER_CLOSE",
		});
	};
	const handleOpenLogin = () => {
		handleClose();
		dispatch({
			type: "MODAL_LOGIN_OPEN",
		});
	};
	const handleOpenRegister = () => {
		handleClose();
		dispatch({
			type: "MODAL_REGISTER_OPEN",
		});
	};
	const onChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const registerUser = (e) => {
		e.preventDefault();
		addUser.mutate();

		if (addUser.error?.response?.data?.message) {
			handleClose();
			handleOpenRegister();
		}

		if (addUser.data?.data) {
			setForm({
				email: "",
				fullName: "",
				password: "",
			});
			dispatch({
				type: "LOGIN_SUCCESS",
				payload: addUser.data.data.data.user,
			});
			setAuthToken(addUser.data.data.data.user.token);
			router.push("/");
			handleClose();
		}
	};
	return (
		<Modal show={state.modalRegister} onHide={handleClose} size="sm" centered>
			<Modal.Body>
				<div className="form-title mb-3">
					<h4 className="text-yellow">Register</h4>
				</div>
				{addUser.error?.response?.data?.message && (
					<Alert variant="danger">
						{addUser.error?.response?.data?.message}
					</Alert>
				)}
				<div className="d-flex flex-column">
					<Form onSubmit={(e) => registerUser(e)}>
						<Form.Group controlId="formBasicEmail">
							<Form.Control
								type="email"
								className="form-control input-bg"
								placeholder="Email"
								value={email}
								name="email"
								onChange={(e) => onChange(e)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Control
								type="password"
								name="password"
								value={password}
								onChange={(e) => onChange(e)}
								className="form-control input-bg"
								placeholder="Password"
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Control
								type="text"
								className="form-control input-bg"
								placeholder="Full Name"
								name="fullName"
								value={fullName}
								onChange={(e) => onChange(e)}
								required
							/>
						</Form.Group>
						<Button
							type="submit"
							variant="yellow"
							className="btn btn-block btn-round"
						>
							Register
						</Button>
					</Form>
					<p className="text-danger">{state.errormail}</p>
					<div className="text-center text-muted delimiter mt-2 ">
						Already have an account ? klick {"\u00A0"}
						<Link
							to="#"
							onClick={handleOpenLogin}
							className="font-weight-bold text-muted"
						>
							here
						</Link>
						.
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default Register;
