import React from "react";
import { Col, Container, Row, Form, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import { useState } from "react";
import ModalDelete from "../../components/Modal/DeleteUser";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

function Profile() {
	const router = useHistory();
	const { data, loading, error, refetch } = useQuery("userCache", async () => {
		const response = await API.get("/user");
		return response;
	});
	const [state, dispatch] = useContext(AuthContext);

	const logoutUser = () => {
		dispatch({
			type: "LOGOUT",
		});
	};
	const { register, errors, handleSubmit, reset } = useForm({});
	const [button, setButton] = useState(true);
	const [visibleAlert, setVisibleAlert] = useState(false);
	const [modalShow, setModalShow] = useState(false);

	const handleVisible = () => {
		setVisibleAlert(true);
		setTimeout(() => {
			setVisibleAlert(false);
		}, 2000);
	};
	const onSubmit = useMutation(async (data) => {
		console.log("data", data);

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const body = JSON.stringify({
			fullName: data.fullName,
		});
		const response = await API.patch("/user/edit", body, config);
		handleVisible();
		setButton(true);
	});
	const deleteUser = () => {
		API.delete(`/user`).then(function (response) {
			console.log(response);
		});
	};
	const deleteById = async (id) => {
		deleteUser();
		logoutUser();
		router.push("/");
	};

	return (
		<>
			<Container>
				<Row>
					<Col xs={12} className="">
						<Col xs={12} md={12} lg={12} className="my-4 row">
							<h4>My Information</h4>
						</Col>
						<Alert
							show={visibleAlert}
							variant="success"
							onClose={() => setVisibleAlert(false)}
							dismissible
						>
							Update Successfully.
						</Alert>
						<Form onSubmit={handleSubmit(onSubmit.mutate)}>
							<div className="card px-3 pt-3 mb-4">
								<Form.Group>
									<Form.Label className="title-input">Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Your Name"
										ref={register({ required: true })}
										name="fullName"
										defaultValue={data?.data?.data?.user.fullName}
										className="input-ct px-0"
										onChange={() => setButton(false)}
									/>
									<Form.Text className="text-danger">
										{errors.fullName && "Name is required"}
									</Form.Text>
								</Form.Group>
								<Form.Group controlId="exampleForm.ControlTextarea1">
									<Form.Label className="title-input">email</Form.Label>
									<Form.Control
										type="email"
										name="email"
										ref={register({ required: true })}
										placeholder="Email Here"
										value={data?.data?.data?.user.email}
										className="input-ct px-0"
										disabled
									/>
									<Form.Text className="text-danger mb-4">
										{errors.email && "Email is required"}
									</Form.Text>
								</Form.Group>
							</div>
							<button
								type="button"
								onClick={() => setModalShow(true)}
								className="my-3 float-right btn btn-danger btn-sm mt-3 mx-3 btn-danger-outline"
							>
								Delete Account
							</button>
							<button
								type="submit"
								disabled={button}
								className="my-3 float-right btn btn-yellow btn-sm mt-3 mx-3 text-white"
							>
								Save Account
							</button>
						</Form>
					</Col>
				</Row>
			</Container>
			<ModalDelete
				show={modalShow}
				onHide={() => setModalShow(false)}
				delete={deleteById}
			/>
		</>
	);
}
export default Profile;
