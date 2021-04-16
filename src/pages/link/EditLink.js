import { useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Render from "../template/Render2";
import ModalQr from "../../components/Modal/QrModal";
import ModalDelete from "../../components/Modal/DeleteLink";
import "../../assets/css/phone.css";
import {
	Col,
	Alert,
	Form,
	Container,
	Row,
	Image,
	Button,
	Nav,
	Navbar,
	Card,
	Modal,
	Tab,
} from "react-bootstrap";
import { initialTemplate } from "../../config/templateData";
import React from "react";

const EditLink = () => {
	const { id } = useParams();
	const [modalShow, setModalShow] = useState(false);
	const [idTodelete, setidTodelete] = useState("");
	const [idToUpdate, setidToupdate] = useState("");
	const [modalDelete, setModalDelete] = useState(false);
	const handleDelete = (props) => {
		setidTodelete(props);
		setModalDelete(true);
	};
	const [modalCreate, setModalCrete] = useState(false);
	const [idUpdate, setIdUpdate] = useState({
		id: "",
		index: "",
	});

	// get
	const { register, errors, handleSubmit, reset } = useForm({});
	const {
		register: itemRegister,
		handleSubmit: itemHandle,
		reset: itemReset,
	} = useForm({});

	//Hit
	const {
		data: dataLink,
		loading: loadingLink,
		error: errorLink,
		refetch: rfLink,
	} = useQuery("linkChace", async () => {
		const response = await API.get(`/link/${id}`);
		return response?.data?.data;
	});
	const {
		data: dataItem,
		loading: loadingItem,
		error: errorItem,
		refetch: rfItem,
	} = useQuery("itemChace", async () => {
		const response = await API.get(`/items/${id}`);
		return response?.data?.data;
	});

	// handle file
	const [file, setFile] = useState(undefined);
	const [imageFile, setImageFile] = useState([]);

	const handleChange = (event) => {
		setFile(URL.createObjectURL(event.target.files[0]));
	};
	const imageMultiple = (e) => {
		const tempForm = { ...imageFile };
		tempForm[e.target.id] = URL.createObjectURL(e.target.files[0]);
		setImageFile(tempForm);
	};

	// update Brand
	const [message, setMessage] = useState("");
	const [visibleAlert, setVisibleAlert] = useState(false);
	const handleVisible = () => {
		setVisibleAlert(true);
		setTimeout(() => {
			setVisibleAlert(false);
		}, 1900);
	};

	const onSubmit = useMutation(async (data, e) => {
		console.log("data", data);

		if (data.url) {
			const formdata = new FormData();
			formdata.append("imageFile", data.imageItem[0]);
			let config = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};
			let response = await API.post("/upload", formdata, config);
			config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const body = JSON.stringify({
				title: data.titleItem,
				url: data.url,
				image: response.data.data.imageName,
				linkId: dataLink?.link?.id,
			});
			response = await API.post(`/item`, body, config);
			setMessage("Success Add Link");
			rfItem();
			rfLink();
			setModalCrete(false);
			reset({ url: null });
			handleVisible();

			return response;
		}

		const formdata = new FormData();
		formdata.append("imageFile", data.imageFile[0]);
		let config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};
		let response = await API.post("/upload", formdata, config);
		config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify({
			title: data.title,
			description: data.description,
			image: response.data.data.imageName,
		});
		response = await API.patch(`link/${dataLink?.link?.id}`, body, config);
		setMessage("Update Successfully.");
		handleVisible();
		rfLink();
	});

	const onUpdate = useMutation(async (data) => {
		console.log("sasasa", data);

		const dataToUpload = data.item[idUpdate.index];
		const formdata = new FormData();
		formdata.append("imageFile", dataToUpload.imageFile[0]);
		let config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};
		let response = await API.post("/upload", formdata, config);
		config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify({
			title: dataToUpload.title,
			url: dataToUpload.url,
			image: response.data.data.imageName,
		});
		response = await API.patch(`item/${idUpdate.id}`, body, config);
		setMessage("Update Success");
		handleVisible();
		rfItem();
		rfLink();
	});

	const handleCreate = () => {
		setModalCrete(false);
	};

	const handleUpdate = (id, index) => {
		setIdUpdate({
			id: index,
		});
		itemHandle(onUpdate.mutate);
	};
	const deleteLink = (id) => {
		API.delete(`/item/${id}`).then(function (response) {
			console.log(response);
		});
	};
	const deleteById = async (id) => {
		deleteLink(id);
		rfItem();
		rfLink();
	};

	useEffect(() => {
		// setButton();
	}, [idToUpdate]);
	const setButton = async (props) => {
		try {
			const response = await API.put(
				`/button/${dataLink?.link?.template?.id}`,
				{
					button: props,
				}
			);
			rfItem();
			rfLink();
			console.log("👉 Returned data:", response);
		} catch (e) {
			console.log(`😱 Axios request failed: ${e}`);
		}
	};

	const setImg = () => {
		API.put(`/link/${dataLink?.link?.template?.id}`);
	};

	const setbg = () => {
		API.put(`/link/${dataLink?.link?.template?.id}`);
	};

	console.log("data", initialTemplate.button);
	console.log("datddda", dataLink);
	return (
		<>
			<Alert
				show={visibleAlert}
				variant="success"
				onClose={() => setVisibleAlert(false)}
				dismissible
				className="myAlert-top"
			>
				{message}
			</Alert>
			<Tab.Container id="left-tabs-example" defaultActiveKey="first">
				<Container fluid className=" mx-0 px-0">
					<div class="navbar navbar-expand-lg navbar-light bg-light">
						<Nav className="mr-auto">
							<Nav.Link eventKey="first" className="nav--link ">
								Link
							</Nav.Link>
							<Nav.Link eventKey="second" className="nav--link">
								Template
							</Nav.Link>
						</Nav>
						<Nav.Item className="d-flex align-items-center">
							{/* Link */}
							<small class="font-italic ml-1">
								{window.location.origin + "/" + dataLink?.link?.uniqueLink}
							</small>
							<Button
								size="sm"
								variant="secondary"
								onClick={() => setModalShow(true)}
								className="ml-3 mr-1"
							>
								Share
							</Button>
						</Nav.Item>
					</div>

					<Col xs={12} md={12} lg={12} className="my-4 px-0 row">
						<Col sm="12" md="8">
							<div
								className="overflow-auto pl-3"
								style={{
									height: "75vh",
								}}
							>
								<Tab.Content>
									<Tab.Pane eventKey="first">
										<Col xs={12} md={12} lg={12} className="">
											<div className="card px-3 pt-3">
												<Form
													id="hook-form"
													onSubmit={handleSubmit(onSubmit.mutate)}
												>
													<Form.Group className="row">
														<Col md="4">
															<img
																src={
																	dataLink?.link?.image
																		? file
																			? file
																			: dataLink?.url + dataLink?.link?.image
																		: file
																		? file
																		: `https://ui-avatars.com/api/?background=FF9F00&color=fff&size=128&name=${dataLink?.link?.title}`
																}
																alt=""
																style={{
																	width: "100px",
																	height: "90px",
																	objectFit: "content",
																}}
																className=" thumbnail"
															/>
														</Col>
														<Col md="8" className="d-flex align-items-center">
															<Form.Label
																className="title-input label-img-ct btn btn-yellow "
																htmlFor="upload"
															>
																{file ? "Change Image" : "Choose Image"}
															</Form.Label>

															<Form.Control
																type="file"
																id="upload"
																name={`imageFile`}
																ref={register}
																onChange={handleChange}
																hidden
															/>
														</Col>
													</Form.Group>

													<Form.Group>
														<Form.Label className="title-input">
															Title Brand
														</Form.Label>
														<Form.Control
															type="text"
															placeholder="ex. Your Title Brand"
															ref={register({ required: true })}
															name="title"
															className="input-ct px-0"
															defaultValue={dataLink?.link?.title}
														/>
														<Form.Text className="text-danger">
															{errors.title && "Title is required"}
														</Form.Text>
													</Form.Group>
													<Form.Group controlId="exampleForm.ControlTextarea1">
														<Form.Label className="title-input">
															Description
														</Form.Label>
														<Form.Control
															as="textarea"
															name="description"
															rows={1}
															ref={register({ required: true })}
															placeholder="ex. Description Here"
															className="input-ct px-0"
															defaultValue={dataLink?.link?.description}
														/>
														<Form.Text className="text-danger">
															{errors.description && "Description is required"}
														</Form.Text>
													</Form.Group>

													<button
														type="submit"
														className="mb-3 float-right btn btn-yellow text-white"
													>
														<i class="far fa-upload"></i> Update Brand
													</button>
												</Form>
											</div>

											<Button
												variant="yellow"
												block
												className="my-3 text-white"
												onClick={() => setModalCrete(true)}
											>
												Add New Link
											</Button>
											<Card>
												<Form
													id="hook-form"
													onSubmit={itemHandle(onUpdate.mutate)}
												>
													{dataItem?.linkitems?.map((item, index) => {
														const fieldName = `item[${index}]`;
														return (
															<Card className="my-2 mx-3">
																<Card.Body className="card-links ">
																	<Row>
																		<Col xs="12" md="5">
																			<Form.Group>
																				<Form.Control
																					type="file"
																					id={`image${index}`}
																					label="Example file input"
																					name={`${fieldName}.imageFile`}
																					ref={itemRegister}
																					onChange={imageMultiple}
																					hidden
																				/>
																				<img
																					src={
																						item?.image
																							? imageFile[`image${index}`]
																								? imageFile[`image${index}`]
																								: dataLink?.url + item?.image
																							: imageFile[`image${index}`]
																							? imageFile[`image${index}`]
																							: `https://ui-avatars.com/api/?background=FF9F0&color=fff&size=128&name=${item?.title}`
																					}
																					alt=""
																					style={{
																						width: "100%",
																						height: "90px",
																						objectFit: "content",
																					}}
																					className=" thumbnail"
																				/>
																				<Form.Label
																					className="title-input label-img-ct btn btn-block btn-sm"
																					htmlFor={`image${index}`}
																				>
																					{file
																						? "Change Image"
																						: "Choose Image"}
																				</Form.Label>
																			</Form.Group>
																		</Col>
																		<Col xs="12" md="7">
																			<Form.Group>
																				<Form.Label className="title-input">
																					Title link
																				</Form.Label>
																				<Form.Control
																					type="text"
																					placeholder="ex. Your Title"
																					name={`${fieldName}.title`}
																					ref={itemRegister}
																					// ref={register({ required: true })}
																					defaultValue={item?.title}
																					className="input-ct px-0"
																				/>
																				<Form.Text className="text-danger"></Form.Text>
																			</Form.Group>
																			<Form.Group>
																				<Form.Label className="title-input">
																					url
																				</Form.Label>
																				<Form.Control
																					type="text"
																					placeholder="ex. Your url"
																					required
																					ref={itemRegister}
																					name={`${fieldName}.url`}
																					defaultValue={item?.url}
																					className="input-ct px-0"
																				/>
																				<Form.Text className="text-danger"></Form.Text>
																			</Form.Group>
																		</Col>
																	</Row>
																	{dataItem?.linkitems.length <= 2 ? (
																		<button
																			disabled
																			className="btn btn-sm btn-danger float-right"
																		>
																			<i class="far fa-trash-alt"></i>
																		</button>
																	) : (
																		<button
																			type="button"
																			onClick={() => handleDelete(item?.id)}
																			className="btn btn-sm btn-danger float-right"
																		>
																			<i class="far fa-trash-alt"></i>
																		</button>
																	)}

																	<button
																		type="submit"
																		onClick={() => {
																			setIdUpdate({
																				id: item.id,
																				index,
																			});
																			itemHandle(onUpdate.mutate);
																		}}
																		className="btn btn-sm btn-yellow text-white float-right mr-3"
																	>
																		Update Data
																	</button>
																</Card.Body>
															</Card>
														);
													})}
												</Form>
											</Card>
										</Col>
									</Tab.Pane>
									<Tab.Pane eventKey="second">
										<Col xs={12} md={12} lg={12} className="">
											<Card
												className="card px-3 py-2"
												style={{ background: "#efefef" }}
											>
												<Col xs="12">Select Button</Col>
												<Col xs="12" className="row mx-0">
													<Col
														onClick={() => {
															setButton(1);
														}}
													>
														<a className={initialTemplate.button[1]}>Buuton</a>
													</Col>
													<Col
														onClick={() => {
															setButton(2);
														}}
													>
														<a className={initialTemplate.button[2]}>Buuton</a>
													</Col>
													<Col
														onClick={() => {
															setButton(3);
														}}
													>
														<a className={initialTemplate.button[3]}>Buuton</a>
													</Col>
												</Col>
												<Col xs="12" className="row mx-0">
													<Col
														onClick={() => {
															setButton(4);
														}}
													>
														<a className={initialTemplate.button[4]}>Buuton</a>
													</Col>
													<Col
														onClick={() => {
															setButton(5);
														}}
													>
														<a className={initialTemplate.button[5]}>Buuton</a>
													</Col>
													<Col
														onClick={() => {
															setButton(6);
														}}
													>
														<a className={initialTemplate.button[6]}>Buuton</a>
													</Col>
												</Col>
												<Col xs="12" className="row mx-0">
													<Col
														onClick={() => {
															setButton(7);
														}}
													>
														<a className={initialTemplate.button[7]}>Buuton</a>
													</Col>
													<Col
														onClick={() => {
															setButton(8);
														}}
													>
														<a className={initialTemplate.button[8]}>Buuton</a>
													</Col>
													<Col
														onClick={() => {
															setButton(9);
														}}
													>
														<a className={initialTemplate.button[9]}>Buuton</a>
													</Col>
												</Col>
												<Col xs="12" className="row mx-0">
													<Col
														onClick={() => {
															setButton(10);
														}}
													>
														<a className={initialTemplate.button[10]}>Buuton</a>
													</Col>
													<Col
														onClick={() => {
															setButton(11);
														}}
													>
														<a className={initialTemplate.button[11]}>Buuton</a>
													</Col>
													<Col
														onClick={() => {
															setButton(12);
														}}
													>
														<a className={initialTemplate.button[12]}>Buuton</a>
													</Col>
												</Col>
												<Col xs="12" className="row mx-0">
													<Col
														onClick={() => {
															setButton(13);
														}}
													>
														<a className={initialTemplate.button[13]}>Buuton</a>
													</Col>
													<Col
														onClick={() => {
															setButton(14);
														}}
													>
														<a className={initialTemplate.button[14]}>Buuton</a>
													</Col>
													<Col
														onClick={() => {
															setButton(15);
														}}
													>
														<a className={initialTemplate.button[15]}>Buuton</a>
													</Col>
												</Col>
												<Col xs="12" className="row mx-0">
													<Col
														onClick={() => {
															setButton(16);
														}}
													>
														<a className={initialTemplate.button[16]}>Buuton</a>
													</Col>
													<Col
														onClick={() => {
															setButton(17);
														}}
													>
														<a className={initialTemplate.button[17]}>Buuton</a>
													</Col>
													<Col
														onClick={() => {
															setButton(18);
														}}
													>
														<a className={initialTemplate.button[18]}>Buuton</a>
													</Col>
												</Col>
											</Card>

											<Card className="mt-4 pt-2">
												<Col xs={12}> Background</Col>
												<Col xs="12" className="row">
													<Col xs="6" className="py-3">
														<div
															className="bg1"
															style={{
																width: "100%",
																height: "90px",
																objectFit: "content",
															}}
														></div>
													</Col>
													<Col xs="6" className="py-3">
														<div
															className="bg2"
															style={{
																width: "100%",
																height: "90px",
																objectFit: "content",
															}}
														></div>
													</Col>
													<Col xs="6" className="py-3">
														<div
															className="bg3"
															style={{
																width: "100%",
																height: "90px",
																objectFit: "content",
															}}
														></div>
													</Col>
													<Col xs="6" className="py-3">
														<div
															className="bg4"
															style={{
																width: "100%",
																height: "90px",
																objectFit: "content",
															}}
														></div>
													</Col>
													<Col xs="6" className="py-3">
														<div
															className="bg5"
															style={{
																width: "100%",
																height: "90px",
																objectFit: "content",
															}}
														></div>
													</Col>
													<Col xs="6" className="py-3">
														<div
															className="bg6"
															style={{
																width: "100%",
																height: "90px",
																objectFit: "content",
															}}
														></div>
													</Col>
													<Col xs="6" className="py-3">
														<div
															className="bg7"
															style={{
																width: "100%",
																height: "90px",
																objectFit: "content",
															}}
														></div>
													</Col>
													<Col xs="6" className="py-3">
														<div
															className="bg8"
															style={{
																width: "100%",
																height: "90px",
																objectFit: "content",
															}}
														></div>
													</Col>
												</Col>
											</Card>
											<Card className="mt-4 pt-2">
												<Col xs={12}>Image Style</Col>
												<Col xs="12" className="row">
													<Col xs="6" className="py-3">
														<img
															alt=""
															src="https://dummyimage.com/300"
															className="img-rounded"
														></img>
													</Col>
													<Col xs="6" className="py-3">
														<img
															alt=""
															src="https://dummyimage.com/300"
															className="img-sequere "
														></img>
													</Col>
												</Col>
											</Card>
										</Col>
									</Tab.Pane>
								</Tab.Content>
							</div>
						</Col>
						<Col sm="12" md="4">
							<div className="">
								<div className="phonebody-external">
									<div className="phonebody-internal scrollbar" id="style-3">
										<div className="top">
											<div className="speaker"></div>
											<div className="circle"></div>
										</div>
										<Render dataLink={dataLink} />
									</div>
									<div className="bottom"></div>
								</div>
							</div>
						</Col>
					</Col>
				</Container>
			</Tab.Container>
			<ModalQr
				show={modalShow}
				onHide={() => setModalShow(false)}
				unique={dataLink?.link?.uniqueLink}
			/>

			<Modal
				show={modalCreate}
				onHide={() => setModalCrete(false)}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Form id="hook-form" onSubmit={handleSubmit(onSubmit.mutate)}>
					<Modal.Body className="">
						<Card className="my-2 mx-3">
							<Card.Body className="card-links ">
								<Row>
									<Col xs="12" md="5">
										<Form.Group>
											<Form.Control
												type="file"
												id={`imageCreate`}
												label="Example file input"
												name={`imageItem`}
												ref={register}
												onChange={imageMultiple}
												hidden
											/>
											<img
												src={
													imageFile.imageCreate
														? imageFile.imageCreate
														: `https://dummyimage.com/600x400/000/fff&text=example`
												}
												alt=""
												style={{
													width: "100%",
													height: "90px",
													objectFit: "content",
												}}
												className=" thumbnail"
											/>
											<Form.Label
												className="title-input label-img-ct btn btn-block btn-sm"
												htmlFor={`imageCreate`}
											>
												{file ? "Change Image" : "Choose Image"}
											</Form.Label>
										</Form.Group>
									</Col>
									<Col xs="12" md="7">
										<Form.Group>
											<Form.Label className="title-input">
												Title link
											</Form.Label>
											<Form.Control
												type="text"
												placeholder="ex. Your Title"
												name={`titleItem`}
												ref={register}
												className="input-ct px-0"
											/>
											<Form.Text className="text-danger"></Form.Text>
										</Form.Group>
										<Form.Group>
											<Form.Label className="title-input">url</Form.Label>
											<Form.Control
												type="text"
												placeholder="ex. Your url"
												required
												ref={register}
												name={`url`}
												className="input-ct px-0"
											/>
											<Form.Text className="text-danger"></Form.Text>
										</Form.Group>
									</Col>
								</Row>
							</Card.Body>
						</Card>

						<div className="d-flex justify-content-end ">
							<Button
								type="submit"
								variant="yellow"
								size="sm"
								className="mr-3 text-white"
								onClick={() => handleCreate()}
							>
								Add Link
							</Button>
							<Button
								variant="secondary"
								size="sm"
								onClick={() => setModalCrete(false)}
								style={{ background: "#E5E5E5", border: "none" }}
							>
								Cancel
							</Button>
						</div>
					</Modal.Body>
				</Form>
			</Modal>

			<ModalDelete
				show={modalDelete}
				onHide={() => setModalDelete(false)}
				delete={deleteById}
				id={idTodelete}
			/>
		</>
	);
};

export default EditLink;
