import { Col, Container, Row, Image, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../config/api";
// import ModalDelete from "../../components/Modal/DeleteLink.";
import ModalDelete from "../../components/Modal/DeleteLink";

const MyLink = () => {
	const [links, setlink] = useState([]);
	const [search, setSearch] = useState("");
	const [textsearch, settextSearch] = useState("");
	const [urlServer, setUrl] = useState("");
	const [modalShow, setModalShow] = useState(false);
	const [idTodelete, setidTodelete] = useState("");

	const getLinks = () => {
		API.get("/link").then((response) => setlink(response.data?.data?.links));
	};
	const getCount = () => {
		API.get("/link").then((response) => setUrl(response?.data?.data));
	};
	const deleteLink = (id) => {
		API.delete(`/link/${id}`).then(function (response) {
			console.log(response);
			getLinks();
			getCount();
		});
	};
	const deleteById = async (id) => {
		deleteLink(id);
	};

	useEffect(() => {
		console.log("useEffect componentDidMount");
		getCount();
	}, []);

	useEffect(() => {
		if (textsearch === "") {
			getLinks();
		}
		// if (search === "") {
		// 	getLinks();
		// }
		const filteredData = links.filter((item) => {
			return item.title.toLowerCase().includes(textsearch.toLowerCase());
		});

		setlink(filteredData);
	}, [textsearch, search]);
	const handleShow = (props) => {
		setidTodelete(props);
		setModalShow(true);
	};
	// console.log("aaa", deleteLink);
	return (
		<>
			<Container>
				<Row className="my-5">
					<Col sm="12" md="3" lg="2" className="d-flex align-items-center">
						<h5>
							All Links{" "}
							<span className="badge badge-warning">
								{urlServer?.links?.length}
							</span>
						</h5>
					</Col>

					<Col sm="12" md="9" lg="10">
						<div className="form-group has-search row">
							<Col xs="10" sm="10">
								<span className="fa fa-search form-control-feedback"></span>
								<input
									type="text"
									className="form-control input-ct2 "
									placeholder="Search"
									name="serach"
									onChange={(e) => setSearch(e.target.value)}
								/>
							</Col>
							<Col>
								<Button
									variant="scondary"
									type="submit"
									className="btn btn-yellow  btn-block text-white"
									onClick={() => settextSearch(search)}
								>
									Search
								</Button>
							</Col>
						</div>
					</Col>
				</Row>

				{links?.map((link, index) => (
					<Row className="my-2">
						<Col md="2">
							<Image
								// thumbnail
								src={
									link.image
										? urlServer?.url + link.image
										: `https://ui-avatars.com/api/?background=FF9F00&color=fff&size=128&name=${link.title}`
								}
								alt=""
								style={{
									width: "100%",
									height: "100px",
									objectFit: "content",
								}}
							></Image>
						</Col>
						<Col md="4">
							<h3>{link.title}</h3>
							<p className="text-muted text-truncate">{link.description}</p>
						</Col>
						<Col md="2" className="text-center">
							<h3>{!link.viewCount ? "0" : link.viewCount}</h3>
							<p className="text-muted text-truncate">Visit</p>
						</Col>
						<Col
							md="4"
							className="d-flex align-items-center justify-content-end"
						>
							<Link
								target={"_blank"}
								to={`/${link.uniqueLink}`}
								className="btn btn-outline-secondary"
							>
								<i className="fa fa-eye "></i>
							</Link>
							<Link
								type="button"
								className="btn btn-outline-secondary mx-3"
								to={`/user/mylink/edit/${link.id}`}
							>
								<i className="fa fa-edit "></i>
							</Link>
							<button
								type="button"
								className="btn btn-outline-secondary"
								// onClick={() => deleteById(link.id)}
								onClick={() => handleShow(link.id)}
							>
								<i className="fa fa-trash-alt "></i>
							</button>
						</Col>
					</Row>
				))}
			</Container>

			<ModalDelete
				show={modalShow}
				onHide={() => setModalShow(false)}
				delete={deleteById}
				id={idTodelete}
			/>
		</>
	);
};

export default MyLink;
