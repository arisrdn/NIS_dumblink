import { Col, Container, Image, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import t1 from "./img/t1.svg";
import t2 from "./img/t2.svg";

const Template = () => {
	const router = useHistory();
	const handleClick = (id) => {
		router.push(`/user/template/crete/${id}`);
	};
	return (
		<div>
			<Container className="mt-4">
				<Row>
					<Col xs={12} md={4} lg={3} className="mb-4">
						<div
							className=""
							onClick={() => handleClick(1)}
							style={{ borderRadius: 5, cursor: "pointer", minHeight: "200px" }}
						>
							<Image src={t1} />
						</div>
					</Col>
					<Col xs={12} md={4} lg={3} className="mb-4">
						<div
							className=""
							onClick={() => handleClick(2)}
							style={{ borderRadius: 5, cursor: "pointer", minHeight: "200px" }}
						>
							<Image src={t2} />
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Template;
