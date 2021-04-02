// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import { useForm } from "react-hook-form";

// function createArrayWithNumbers(length) {
// 	return Array.from({ length }, (_, k) => k);
// }

// export default function App() {
// 	const { register, handleSubmit, errors } = useForm();
// 	const [size, setSize] = useState(1);
// 	const onSubmit = (data) => {
// 		alert(JSON.stringify(data));
// 	};

// 	console.log(errors);

// 	return (
// 		<div className="App">
// 			<form onSubmit={handleSubmit(onSubmit)}>
// 				{createArrayWithNumbers(size).map((number) => {
// 					return (
// 						<div key={number}>
// 							<div>
// 								<label htmlFor="firstName">First Name</label>
// 								<input
// 									name={`firstName[${number}]`}
// 									placeholder="first name"
// 									ref={register({ required: true })}
// 								/>
// 							</div>

// 							<div>
// 								<label htmlFor="lastName">Last Name</label>
// 								<input
// 									name={`lastName[${number}]`}
// 									placeholder="last name"
// 									ref={register({ required: true })}
// 								/>
// 							</div>

// 							<div>
// 								<label htmlFor="email">Email</label>
// 								<input
// 									name={`email[${number}]`}
// 									placeholder="email"
// 									ref={register({ required: true })}
// 								/>
// 							</div>

// 							<hr />
// 						</div>
// 					);
// 				})}

// 				<button type="button" onClick={() => setSize(size + 1)}>
// 					Add Person
// 				</button>
// 				<br />
// 				<div style={{ color: "red" }}>
// 					{Object.keys(errors).length > 0 &&
// 						"There are errors, check your console."}
// 				</div>
// 				<button type="submit">Submit</button>
// 			</form>
// 		</div>
// 	);
// }

import React from "react";
import { Col, Container, Row, Image, Form, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { API } from "../../config/api";

// import "./styles.css";
import t1 from "./img/t1.svg";
import t2 from "./img/t2.svg";
import td from "./img/td.svg";

function App() {
	const [indexes, setIndexes] = React.useState([0, 1]);
	const [counter, setCounter] = React.useState(2);
	const { register, errors, handleSubmit } = useForm();

	// const onSubmit = (data) => {
	// 	console.log(data);
	// };

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
	let image =
		"https://dummyimage.com/600x400/ff9d00/000000&text=please+select+Template";
	switch (id) {
		case "1":
			image = t1;
			break;
		case "2":
			image = t2;
			break;
		case 3:
			image = td;

			break;

		default:
			image = td;
			break;
	}

	// console.log("asas", register);
	// console.log("log", indexes, register);
	const onSubmit = useMutation(async (data) => {
		console.log("data", data);
		const body = new FormData();
		// const body = JSON.stringify({
		// 	title: data.title,
		// 	imageFile: data.imageFile,
		// 	templateId: id,
		// 	description: data.description,
		// 	links: data.links,
		// });
		body.append("title", data.title);
		body.append("imageFile", data.imageFile[0]);
		body.append("templateId", id);
		body.append("description", data.description);
		// body.append("collection", JSON.stringify(data.links));

		// const linkItem = [];
		// data.links.forEach(function (element) {
		// 	// body.append("link[][title]", element.title);
		// });
		// for (let i = 0; i < data.links.length; i++) {
		// 	const addimage = {
		// 		...data.links[i],
		// 		image: data.links[i].imageFile[0],
		// 		title: data.links[i],
		// 		// url: data.links.url[i],
		// 		// body.append('link[][item]', element.item);
		// 	};

		// 	body.append("links[]", addimage);
		// }
		// // body.append("links[]", linkItem);
		// body.append("json_data", "'" + JSON.stringify(data.links) + "'");

		// console.log("links", linkItem);

		// for (let key in data.links) {
		// 	if (typeof data.links[key] === "object") {
		// 		for (let subKey in data[key]) {
		// 			body.append(`${key}.${subKey}`, data[key][subKey]);
		// 		}
		// 	} else {
		// 		body.append(key, data[key]);
		// 	}
		// }

		// let body = new FormData();
		// for (let key in data.links) {
		// 	if (Array.isArray(data.links[key])) {
		// 		data.links[key].forEach((obj, index) => {
		// 			let keyList = Object.keys(obj);
		// 			keyList.forEach((keyItem) => {
		// 				let keyName = [key, "[", index, "]", ".", keyItem].join("");
		// 				body.append(keyName, obj[keyItem]);
		// 			});
		// 		});
		// 	} else if (typeof data.links[key] === "object") {
		// 		for (let innerKey in data.links[key]) {
		// 			body.append(`${key}.${innerKey}`, data.links[key][innerKey]);
		// 		}
		// 	} else {
		// 		body.append(key, data.links[key]);
		// 	}
		// }

		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};

		await API.post("/links", body, config);
	});

	return (
		<>
			<Container>
				<Row>
					<Col xs={12} md={12} lg={12} className="my-4">
						Crete Link
					</Col>
					<Col xs={12} md={8} lg={8} className="">
						<Form onSubmit={handleSubmit(onSubmit.mutate)}>
							<Form.Group>
								<Form.File
									id="exampleFormControlFile1"
									label="Example file input"
									name={`imageFile`}
									ref={register}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									placeholder="ex. Your Title"
									ref={register({ required: true })}
									name="title"
								/>
								<Form.Text className="text-muted">
									{errors.title && "Your input is required"}
								</Form.Text>
							</Form.Group>
							<Form.Group controlId="exampleForm.ControlTextarea1">
								<Form.Label>description</Form.Label>
								<Form.Control
									as="textarea"
									name="description"
									rows={2}
									ref={register({ required: true })}
									placeholder="ex. Description Here"
								/>
								<Form.Text className="text-muted">
									{errors.singleErrorInput && "Your input is required"}
								</Form.Text>
							</Form.Group>

							{indexes.map((index) => {
								const fieldName = `links[${index}]`;
								return (
									<Card name={fieldName} key={fieldName}>
										<Card.Body>
											<Form.Group>
												<Form.File
													id="exampleFormControlFile1"
													label="Example file input"
													name={`${fieldName}.imageFile`}
													// onChange={onChange}
													ref={register}
												/>
											</Form.Group>
											<Form.Group>
												<Form.Label>Title</Form.Label>
												<Form.Control
													type="text"
													placeholder="ex. Your Title"
													name={`${fieldName}.title`}
													ref={register}
												/>
											</Form.Group>
											<Form.Group>
												<Form.Label>url</Form.Label>
												<Form.Control
													type="text"
													placeholder="ex. Your url"
													ref={register({ required: true })}
													name={`${fieldName}.url`}
													ref={register}
												/>
												<Form.Text className="text-muted"></Form.Text>
											</Form.Group>

											<button type="button" onClick={removeFriend(index)}>
												Remove
											</button>
										</Card.Body>
									</Card>
								);
							})}

							<button type="button" onClick={addFriend}>
								Add Form
							</button>
							<button type="button" onClick={clearFriends}>
								Clear form
							</button>
							<input type="submit" />
						</Form>
					</Col>
					<Col xs={12} md={4} lg={4} className="">
						<Image src={image} height="380px" width="250px" />
					</Col>
				</Row>
			</Container>
		</>
	);
}
export default App;
