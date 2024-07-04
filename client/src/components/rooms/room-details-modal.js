import { Button, Carousel } from "antd";
import Modal from "antd/lib/modal/Modal";
import { ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function RoomDetailsModal({
	isOpen,
	handleClose,
	room,
	goToSelectedRoom,
	isDisabled
}) {
	return (
		<Modal centered size="lg" isOpen={isOpen}>
			<ModalHeader toggle={handleClose}>{room.name}</ModalHeader>
		</Modal>
	);
}
