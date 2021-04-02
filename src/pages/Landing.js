import { Button, Col, Container, Image, Row } from "react-bootstrap";
// import Header from "../compnents/hero/Header";
import bgLanding from "../assets/img/bg-landing.svg";
import pc from "../assets/img/PC.svg";
import "../assets/css/landing.css";
function Home() {
	return (
		<>
			<Container
				fluid
				className="landing-container fullscreen "
				style={{
					background: `url(${bgLanding})`,
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					height: "100%",
					backgroundSize: "cover",
					overflow: "hidden",
				}}
			>
				<div className=" py-5 col-12">
					<div className="row py-3 mt-3 mt-custom justify-content-center"></div>
				</div>
				<div className="px-5 mx-2">
					<Row className="mx-0 pt-5 text-white">
						<Col xs="12" md="6" lg="5" className="pr-0 mb-4">
							<h1
								style={{
									fontStyle: "normal",
									fontWeight: "bold",
									fontSize: "70px",
									// lineHeight: "98px",
									// letterSpacing: "px",
								}}
							>
								The Only Link You’ll Ever Need
							</h1>
							<Col xs="12" md="10">
								<p className="text-white">
									Add a link for your Social Bio and optimize your social media
								</p>

								<p className="text-white  my-md-5">
									traffic. safe, fast and easy to use
								</p>
							</Col>
							<Col xs="12" className="d-flex align-items-end mt-lg-5 pt-lg-4">
								<Button variant="b" size="lg">
									Get Started For Free
								</Button>
							</Col>
						</Col>
						<Col xs="12" md="6" lg="7" className="d-flex  justify-content-end ">
							<Image src={pc} alt="PC" className="img-fluid" />
						</Col>
					</Row>
				</div>
			</Container>
		</>
	);
}

export default Home;
// const Landing = () => {
// 	return <div></div>;
// };

// export default Landing;
