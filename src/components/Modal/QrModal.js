import { Modal, Button } from "react-bootstrap";
import { exportComponentAsPNG } from "react-component-export-image";
import React, { useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import qrlogo from "../../assets/img/logo2.svg";

function QRmodal(props) {
	const ComponentToPrint = React.forwardRef((props, ref) => (
		<div ref={ref}>
			<div className="text-center">
				<QRCode
					value={window.location.origin + "/" + props.unique}
					logoImage={qrlogo}
					qrStyle="dots"
					bgColor="#e5e8be"
				/>
				<p>
					<smal>{window.location.origin + "/" + props.unique}</smal>
				</p>
			</div>
		</div>
	));
	const componentRef = useRef();
	const handleDelete = () => {
		exportComponentAsPNG(componentRef, " fileName");
		props.onHide();
	};
	return (
		<Modal
			{...props}
			size="sm"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Body className="">
				<ComponentToPrint ref={componentRef} {...props} />

				<div className="d-flex justify-content-center ">
					<Button
						block
						variant="yellow"
						size="sm"
						onClick={() => handleDelete()}
					>
						Download
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default QRmodal;
