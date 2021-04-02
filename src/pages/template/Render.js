import { Col, Container } from "react-bootstrap";
import "./css/template.css";

const Render = () => {
	return (
		<>
			<Container fluid className="bg bg2 d-flex justify-content-center">
				<Col className="mt-5" xs="12" sm="12" md="10">
					<img
						src="https://pbs.twimg.com/profile_images/1318934569861681152/KsApS4uw_400x400.jpg"
						className="img-rounded"
					/>
					<h2>@redlotusdesignz</h2>
					<p>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged.
					</p>

					<div class="links">
						<button
							// href="http://dev.to/redlotusdesignz"
							class="button-1"
							target="blank"
						>
							DEV.to
						</button>
						<br />

						<a
							href="http://github.com/redlotusdesignz"
							class="button-2"
							target="blank"
						>
							Github
						</a>
						<br />
						<a
							href="http://codepen.io/redlotusdesignz"
							class="btn btn--stripe"
							target="blank"
						>
							Codepen
						</a>
						<br />
						<button
							href="http://redlotusdesignz.itch.io"
							class="learn-more"
							target="blank"
						>
							Itch.io
						</button>
						<br />
						<a
							href="http://twitter.com/redlotusdesignz"
							class="button"
							target="blank"
						>
							Twitter
						</a>
						<br />
					</div>
				</Col>
			</Container>
		</>
	);
};

export default Render;
