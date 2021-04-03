import { useContext, useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { useMutation } from "react-query";
import { Button, Form, Modal, Alert } from "react-bootstrap";

import { API, setAuthToken } from "../../config/api";
import { AuthContext } from "../../contexts/authContext";

function Login(props) {
	const [state, dispatch] = useContext(AuthContext);
	const router = useHistory();
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const { email, password } = form;

	const handleClose = () => {
		dispatch({
			type: "MODAL_LOGIN_CLOSE",
		});
		state.redirect ? <Redirect to="/" /> : <></>;
	};
	const handleOpenRegister = () => {
		handleClose();
		dispatch({
			type: "MODAL_REGISTER_OPEN",
		});
	};
	const handleOpenLogin = () => {
		handleClose();
		dispatch({
			type: "MODAL_LOGIN_OPEN",
		});
	};

	const onChange = (e) => {
		const updateForm = { ...form };
		updateForm[e.target.name] = e.target.value;
		setForm(updateForm);
	};
	const loginprocess = useMutation(async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify({
			email,
			password,
		});

		const response = await API.post("/login", body, config);
		return response;
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			loginprocess.mutate();
			if (loginprocess.error?.response?.data?.message) {
				handleClose();
				setForm({
					password: "",
				});
				handleOpenLogin();
			}

			if (loginprocess.data?.data) {
				setForm({
					password: "",
					email: "",
				});
				dispatch({
					type: "LOGIN_SUCCESS",
					payload: loginprocess.data.data.data.user,
				});
				setAuthToken(loginprocess.data.data.data.user.token);
				router.push("/");
				handleClose();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Modal
			// show={state.modalLogin}{modalshow}
			show={props.show ? props.show : state.modalLogin}
			// onHide={handleClose}
			onHide={props.onHide ? props.onHide : handleClose}
			size="sm"
			centered
			className={state.error ? "error avenir " : "avenir"}
		>
			<Modal.Body>
				<div className="form-title mb-3">
					<h4 className="text-yellow">Login</h4>
				</div>
				{loginprocess.error?.response?.data?.message && (
					<Alert variant="danger">
						{loginprocess.error?.response?.data?.message}
					</Alert>
				)}
				<div className="d-flex flex-column">
					<Form onSubmit={(e) => handleSubmit(e)}>
						<Form.Group controlId="formBasicEmail">
							<Form.Control
								value={form.email}
								onChange={(e) => onChange(e)}
								type="email"
								name="email"
								className="form-control input-bg"
								placeholder="Email"
							/>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Control
								value={form.password}
								onChange={(e) => onChange(e)}
								type="password"
								name="password"
								className="form-control input-bg"
								placeholder="Password"
							/>
						</Form.Group>
						<Button
							type="submit"
							variant="yellow"
							className="btn btn-block btn-round"
							// disabled={!form.email || !form.password ? true : false}
						>
							Login
						</Button>
					</Form>
					<p className="text-danger">{state.error}</p>
					{/* <pre>{JSON.stringify(form, 2, null)}</pre> */}
					<div className="text-center text-muted delimiter mt-2">
						Don't have an account ? klick
						<Link
							to="#"
							onClick={handleOpenRegister}
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
export default Login;
