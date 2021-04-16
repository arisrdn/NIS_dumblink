import { Col, Container, Row } from "react-bootstrap";
import "./css/template.css";
import { API } from "../../config/api";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useMutation, useQuery } from "react-query";
import { initialTemplate } from "../../config/templateData";

const Render = () => {
	let { unique } = useParams();

	const {
		data: dataLink,
		loading: loadingLink,
		error: errorLink,
		refetch: rfLink,
	} = useQuery("linkChace", async () => {
		const response = await API.get(`/uniquelink/${unique}`);
		return response?.data?.data;
	});
	useEffect(() => {
		setCount();
	}, []);
	const setCount = () => {
		API.put(`/link/${unique}`);
	};

	console.log("data", initialTemplate);

	return (
		<>
			{!dataLink?.link?.template ? (
				<div class="page">
					<div class="svg-container">
						<svg class="number" x="0px" y="0px" viewBox="0 0 596 253.4">
							<path
								class="st0"
								d="M186.3,155.6h-6.8V44.1c0-8.8-2.8-15.7-8.3-20.7c-5.5-5-12.2-7.4-20.1-7.4c-4.7,0-9.3,1.1-13.7,3.2
					  c-4.5,2.2-8.1,5.3-11,9.4l-88.3,126c-4.5,6.4-6.8,13.2-6.8,20.4c0,6.8,2.2,12.4,6.5,17c4.3,4.5,10.2,6.8,17.6,6.8h68.9v10.5
					  c0,9.3,2.5,16.2,7.5,21c5,4.7,11.7,7.1,19.9,7.1c8.3,0,15-2.4,20.1-7.1c5.2-4.7,7.7-11.7,7.7-21v-10.5h6.8
					  c17.9,0,26.9-7.3,26.9-21.9C213.1,162.7,204.2,155.6,186.3,155.6z M124.2,155.6h-37l37.1-53.4L124.2,155.6L124.2,155.6z M303.4,15.1
					  c-27,0-47.6,9.6-61.7,28.8c-14.2,19.1-21.3,46.7-21.3,82.7c0,36.2,7.1,63.9,21.3,83.1c14.2,19.2,34.8,28.8,61.7,28.8
					  c27,0,47.6-9.6,61.7-28.8s21.3-46.9,21.3-83.1c0-36-7.2-63.6-21.5-82.7C350.7,24.6,330.1,15.1,303.4,15.1z M324.7,179.3
					  c-4.3,10.7-11.4,16-21.3,16s-17-5.3-21.3-16c-4.3-10.7-6.5-28.3-6.5-52.8s2.2-42.1,6.5-52.6c4.3-10.6,11.4-15.9,21.3-15.9
					  s17,5.4,21.3,16c4.3,10.7,6.5,28.2,6.5,52.5C331.2,151.1,329,168.7,324.7,179.3z M548.6,155.6h-6.8V44.1c0-8.8-2.8-15.7-8.3-20.7
					  c-5.5-5-12.2-7.4-20.1-7.4c-4.7,0-9.3,1.1-13.7,3.2c-4.5,2.2-8.1,5.3-11,9.4l-88.3,126c-4.5,6.4-6.8,13.2-6.8,20.4
					  c0,6.8,2.2,12.4,6.5,17c4.3,4.5,10.2,6.8,17.6,6.8h68.9v10.5c0,9.3,2.5,16.2,7.5,21c5,4.7,11.7,7.1,19.9,7.1c8.3,0,15-2.4,20.1-7.1
					  c5.2-4.7,7.7-11.7,7.7-21v-10.5h6.8c17.9,0,26.9-7.3,26.9-21.9C575.5,162.7,566.5,155.6,548.6,155.6z M486.6,155.6h-37.1l37.1-53.4
					  V155.6z"
							/>
							<g>
								<path
									class="st1"
									d="M168.7,120.2v35.4h6.8c17.9,0,26.9,7.1,26.9,21.3c0,14.6-9,21.9-26.9,21.9h-6.8v10.5c0,9.3-2.6,16.2-7.7,21
						c-5.2,4.7-11.9,7.1-20.1,7.1c-8.3,0-14.9-2.4-19.9-7.1c-5-4.7-7.5-11.7-7.5-21v-10.5H44.5c-7.4,0-13.3-2.2-17.6-6.8
						c-4.3-4.5-6.5-10.2-6.5-17c0-7.2,2.2-14,6.8-20.4L41.7,134 M50.5,121.5l65.1-92.9c2.9-4.1,6.5-7.3,11-9.4s9-3.2,13.7-3.2
						c7.8,0,14.5,2.4,20.1,7.4s8.3,11.9,8.3,20.7v21.1v5.7V81v6.3v23.6 M76.4,155.6h37.1v-53.4L76.4,155.6z"
								/>
								<path
									class="st1"
									d="M217.9,68.7c3.3-9.5,7.6-17.8,12.9-24.9C245.1,24.6,265.6,15,292.6,15c26.7,0,47.3,9.6,61.6,28.8
						c14.3,19.1,21.5,46.7,21.5,82.7c0,3.5-0.1,7-0.2,10.4 M373.9,155.6c-2.9,22.4-9.4,40.4-19.6,54.1c-14.2,19.1-34.8,28.8-61.7,28.8
						c-27,0-47.6-9.6-61.7-28.8c-14.2-19.2-21.3-46.9-21.3-83.1c0-18.4,1.9-34.6,5.5-48.6 M313.9,179.3c4.3-10.7,6.5-28.3,6.5-52.8
						c0-24.3-2.2-41.8-6.5-52.5c-4.3-10.7-11.4-16-21.3-16c-9.8,0-17,5.3-21.3,15.9c-4.3,10.6-6.5,28.2-6.5,52.6
						c0,24.5,2.2,42.1,6.5,52.8c4.3,10.7,11.4,16,21.3,16C302.4,195.4,309.6,190,313.9,179.3z"
								/>
								<path
									class="st1"
									d="M531.1,144.4v11.2h6.8c17.9,0,26.9,7.1,26.9,21.3c0,14.6-9,21.9-26.9,21.9h-6.8v10.5c0,9.3-2.6,16.2-7.7,21
						c-5.2,4.7-11.9,7.1-20.1,7.1c-8.3,0-14.9-2.4-19.9-7.1c-5-4.7-7.5-11.7-7.5-21v-10.5H407c-7.4,0-13.3-2.2-17.6-6.8
						c-4.3-4.5-6.5-10.2-6.5-17c0-7.2,2.2-14,6.8-20.4l65.8-93.9 M463.9,48.7l14-20.1c2.9-4.1,6.5-7.3,11-9.4c4.5-2.2,9-3.2,13.7-3.2
						c7.8,0,14.5,2.4,20.1,7.4s8.3,11.9,8.3,20.7V134 M438.7,155.6h37.1v-53.4L438.7,155.6z"
								/>
							</g>
						</svg>
					</div>
					<h3 class="nunito title">
						oops! the page you are looking for isn't found :(
					</h3>
				</div>
			) : (
				<Container
					fluid
					className={` d-flex justify-content-center ${
						initialTemplate.background[dataLink?.link?.template?.button]
					}`}
				>
					<Col className="mt-5" xs="11" sm="11" md="8">
						<Col>
							<img
								src={
									dataLink?.link?.image
										? dataLink?.url + dataLink?.link?.image
										: `https://ui-avatars.com/api/?background=FF9F00&color=fff&size=128&name=${dataLink?.link?.title}`
								}
								className={`${
									initialTemplate.imgstyle[dataLink?.link?.template?.imgstyle]
								}`}
							/>
							<h2 className="my-2">{dataLink?.link?.title}</h2>
							<p>{dataLink?.link?.description}</p>
						</Col>
						<Row>
							<div className="links col-12">
								{dataLink?.link?.links?.map((item, index) => (
									<>
										<a
											href={item.url}
											className={` ${
												initialTemplate.button[dataLink?.link?.template?.button]
											}`}
											target="blank"
										>
											{item?.image ? (
												<img
													className="image-btn"
													src={dataLink?.url + item.image}
												></img>
											) : (
												""
											)}

											{item.title}
										</a>
										<br />
									</>
								))}
							</div>
							<div
								className="text-center mt-5 col-12"
								// style={{
								// 	position: "fixed",
								// 	left: "50%",
								// 	bottom: "20px",
								// 	transform: "translate(-50%, -50%)",
								// 	margin: "0 auto",
								// }}
							></div>
						</Row>
					</Col>
				</Container>
			)}
		</>
	);
};

export default Render;
