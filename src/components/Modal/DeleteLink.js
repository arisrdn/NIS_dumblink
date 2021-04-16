import { Modal, Button, Row, Image } from "react-bootstrap";

function Delete(props) {
	const handleDelete = () => {
		props.delete(props.id);
		props.onHide();
	};
	return (
		<Modal
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Body className="">
				<p className="text-success mt-3">
					you are sure you want to remove this link
				</p>
				<div className="d-flex justify-content-end ">
					<Button
						variant="danger"
						size="sm"
						className="mr-3"
						onClick={() => handleDelete()}
					>
						Delete
					</Button>
					<Button
						variant="secondary"
						size="sm"
						onClick={props.onHide}
						style={{ background: "#E5E5E5", border: "none" }}
					>
						Cancel
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default Delete;
