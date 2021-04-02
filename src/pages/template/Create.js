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
		console.log(linkItem);
		const config2 = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const body = JSON.stringify({
			title: data.title,
			image: response.data.data.imageName,
			templateId: id,
			description: data.description,
			links: linkItem,
		});
		response = await API.post("/link", body, config2);
		console.log("res-akhir", response);
		return response;
	});

	return (
		<>
			<Container>
				<Col xs={12} md={12} lg={12} className="my-4 px-0">
					Crete Link
				</Col>
				<Row className="flex-row-reverse">
					<Col xs={12} md={4} lg={4} className="">
						<Image src={image} height="380px" width="250px" />
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
				</Row>
			</Container>
		</>
	);
}
export default App;
