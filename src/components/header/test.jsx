import { Modal, Button, Row, Image } from "react-bootstrap";
import { QRCode } from "react-qrcode-logo";
import logo from "../../assets/img/logo2.svg";
import logo1 from "../../assets/img/logo.svg";
import {
	exportComponentAsJPEG,
	exportComponentAsPDF,
	exportComponentAsPNG,
} from "react-component-export-image";
import React, { useRef } from "react";

function QRmodal(props) {
	const ComponentToPrint = React.forwardRef((props, ref) => (
		<div ref={ref}>
			<div className="text-center">
				<Image src={logo1} />
				<br />
				<QRCode
					value={window.location.origin + "/" + props.unique}
					bgColor="#e5e8be"
					// fgColor="#f4ad42"
					logoImage={logo}
					qrStyle="dots"
				/>
				<p>
					<smal>{window.location.origin + "/" + props.unique}</smal>
				</p>

				<br />
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

				<div className="d-flex justify-content-end ">
					<Button
						// onClick={() => exportComponentAsPNG(componentRef, " fileName")}
						block
						variant="yellow"
						size="sm"
						className="mr-3"
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
