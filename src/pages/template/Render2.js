import { Col, Container, Row } from "react-bootstrap";
import "./css/template.css";
import { API } from "../../config/api";
import { useLocation, useParams } from "react-router-dom";

import { useMutation, useQuery } from "react-query";
import { initialTemplate } from "../../config/templateData";

const Render = (props) => {
	let { dataLink } = props;

	// console.log("data", initialTemplate);

	return (
		<>
			<Container
				fluid
				className={` d-flex justify-content-center ${
					initialTemplate.background[dataLink?.link?.template?.button]
				}`}
			>
				<Col className="mt-5" xs="12" sm="12" md="12">
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
										src={item.url}
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
								</>
							))}
						</div>
						<div className="text-center mt-5 col-12"></div>
					</Row>
				</Col>
			</Container>
		</>
	);
};

export default Render;
