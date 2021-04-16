import React from "react";
import { Col, Container, Row, Image, Form, Card } from "react-bootstrap";
import { useParams, Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { useState } from "react";

// import images && data";
import imgDefault from "../../assets/img/imgDefault.svg";
import t1 from "./img/t1.svg";
import t2 from "./img/t2.svg";
import td from "./img/td.svg";
import { initialTemplate } from "../../config/templateData";

function App() {
	const router = useHistory();
	const [indexes, setIndexes] = useState([0, 1]);
	const [counter, setCounter] = useState(2);
	const { register, errors, handleSubmit } = useForm();

	console.log("datatmplte", initialTemplate.template[9]);
	const addFriend = () => {
		setIndexes((prevIndexes) => [...prevIndexes, counter]);
		setCounter((prevCounter) => prevCounter + 1);
	};

	const removeFriend = (index) => () => {
		setIndexes((prevIndexes) => [
			...prevIndexes.filter((item) => item !== index),
		]);
		setCounter((prevCounter) => prevCounter - 1);
	};

	const clearFriends = () => {
		setIndexes([]);
	};
	let { id } = useParams();
	let image = "";
	switch (id) {
		case "1":
			image = t1;
			break;
		case "2":
			image = t2;
			break;
		case "3":
			image = td;

			break;

		default:
			image = td;
			break;
	}

	const onSubmit = useMutation(async (data) => {
		console.log("data", data.links);

		const formdata = new FormData();
		formdata.append("imageFile", data.imageFile[0]);
		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};
		let response = await API.post("/upload", formdata, config);
		const linkItem = [];
		const imageItem = new FormData();
		for (let i = 0; i < data.links.length; i++) {
			if (data?.links[i]?.imageFile[0]) {
			}
			imageItem.append("imageFile", data.links[i].imageFile[0]);
			const res = await API.post("/upload", imageItem, config);
			const addimage = {
				...data.links[i],
				imageFile: res.data.data.imageName,
			};

			linkItem.push(addimage);
		}
		console.log("link", linkItem);
		const config2 = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const body = JSON.stringify({
			title: data.title,
			image: response.data.data.imageName,
			// templateId: id,
			description: data.description,
			links: linkItem,
			template: initialTemplate.template[id],
		});
		response = await API.post("/link", body, config2);
		console.log("res-akhir", response);
		router.push("/user/mylink");
		return response;
	});

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
	// console.log("fileImag	", !imageFile ? imageFile : imageFile["image0"]);

	return (
		<>
			{initialTemplate.template[id] ? (
				<Container>
					<Col xs={12} md={12} lg={12} className="my-4 px-0 row">
						<Col>
							<h4>Crete Link</h4>
						</Col>
						<Col>
							<button
								type="submit"
								form="hook-form"
								className="btn btn-yellow float-right text-white"
							>
								Publish
							</button>
						</Col>
					</Col>
					<Row className="flex-row-reverse">
						<Col xs={12} md={4} lg={4} className="">
							<Image src={image} alt="" fluid className="" />
						</Col>
						<Col xs={12} md={8} lg={8} className="">
							<div className="card px-3 pt-3">
								<Form id="hook-form" onSubmit={handleSubmit(onSubmit.mutate)}>
									<Form.Group className="row">
										<Col md="4">
											<img
												src={file ? file : imgDefault}
												alt=""
												style={{
													width: "100%",
													height: "119px",
													objectFit: "content",
												}}
												className=" thumbnail"
											/>
										</Col>
										<Col md="8" className="d-flex align-items-center">
											<Form.Label
												className="title-input label-img-ct "
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
										<Form.Label className="title-input">Title Brand</Form.Label>
										<Form.Control
											type="text"
											placeholder="ex. Your Title Brand"
											ref={register({ required: true })}
											name="title"
											className="input-ct px-0"
										/>
										<Form.Text className="text-danger">
											{errors.title && "Title is required"}
										</Form.Text>
									</Form.Group>
									<Form.Group controlId="exampleForm.ControlTextarea1">
										<Form.Label className="title-input">Description</Form.Label>
										<Form.Control
											as="textarea"
											name="description"
											rows={1}
											ref={register({ required: true })}
											placeholder="ex. Description Here"
											className="input-ct px-0"
										/>
										<Form.Text className="text-danger">
											{errors.description && "Description is required"}
										</Form.Text>
									</Form.Group>

									{indexes.map((index) => {
										const fieldName = `links[${index}]`;
										return (
											<Card name={fieldName} key={fieldName} className="mt-2">
												<Card.Body className="card-links ">
													<Row>
														<Col xs="12" md="5">
															<Form.Group>
																<Form.Control
																	type="file"
																	id={`image${index}`}
																	label="Example file input"
																	name={`${fieldName}.imageFile`}
																	ref={register}
																	onChange={imageMultiple}
																	hidden
																/>
																<img
																	src={
																		imageFile[`image${index}`]
																			? imageFile[`image${index}`]
																			: imgDefault
																	}
																	alt=""
																	style={{
																		width: "100%",
																		height: "119px",
																		objectFit: "content",
																	}}
																	className=" thumbnail"
																/>
																<Form.Label
																	className="title-input label-img-ct btn btn-block btn-sm"
																	htmlFor={`image${index}`}
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
																	name={`${fieldName}.title`}
																	ref={register({ required: true })}
																	className="input-ct px-0"
																/>
																<Form.Text className="text-danger">
																	{errors?.links &&
																		errors?.links[index]?.title &&
																		"Title required"}
																</Form.Text>
															</Form.Group>
															<Form.Group>
																<Form.Label className="title-input">
																	url
																</Form.Label>
																<Form.Control
																	type="text"
																	placeholder="ex. Your url"
																	ref={register({
																		required: true,
																		pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g,
																	})}
																	name={`${fieldName}.url`}
																	className="input-ct px-0"
																/>
																<Form.Text className="text-danger">
																	{errors?.links &&
																		errors?.links[index]?.url?.type ===
																			"required" &&
																		"Url required"}
																	{errors?.links &&
																		errors?.links[index]?.url?.type ===
																			"pattern" &&
																		"Input Valid URL"}
																</Form.Text>
															</Form.Group>
														</Col>
													</Row>
													{index == 0 || index == 1 ? (
														<button
															disabled
															className="btn btn-sm btn-danger float-right"
														>
															<i class="far fa-trash-alt"></i>
														</button>
													) : (
														<button
															type="button"
															onClick={removeFriend(index)}
															className="btn btn-sm btn-danger float-right"
														>
															<i class="far fa-trash-alt"></i>
														</button>
													)}
												</Card.Body>
											</Card>
										);
									})}

									<button
										type="button"
										onClick={addFriend}
										className="my-3 float-right btn btn-yellow text-white"
									>
										<i class="far fa-plus-square"></i> Add Link
									</button>
								</Form>
							</div>
						</Col>
					</Row>
				</Container>
			) : (
				<Container className="mt-5">
					<div className="col">
						<div className="container-fluid mt-100">
							<div className="row">
								<div className="col-md-12">
									<div className="card">
										<div className="card-body cart">
											<div
												className="col-sm-12 empty-cart-cls text-center"
												style={{ background: "whitesmoke" }}
											>
												{" "}
												<i
													class="fas fa-ban"
													style={{
														fontSize: "60px",
														color: "red",
														marginTop: "5px",
													}}
												></i>
												<h3>
													<strong>template does not exist</strong>
												</h3>
												<h4></h4>{" "}
												<Link
													to="/user/template"
													className="btn btn-yellow mb-4"
												>
													back to template
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Container>
			)}
		</>
	);
}
export default App;
