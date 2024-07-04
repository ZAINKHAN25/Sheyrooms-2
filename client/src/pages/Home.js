import React, { useEffect, useState } from "react";
import RoomsBlock from "../components/containers/rooms-block";
import moment from "moment";
import { DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Carousel from "../components/Carousel";

import "antd/dist/antd.css";
import { useUser } from "../context/user-state";

const { RangePicker } = DatePicker;

const url = "http://localhost:4000/api";

function Home() {
	const { data, isLoading, error } = useAxios(`${url}/rooms`);
	const { isAuthenticated } = useUser();
	const [isOpen, setIsOpen] = useState(false);
	const [room, setRoom] = useState(null);
	const [fromDate, setFromDate] = useState(null);
	const [toDate, setToDate] = useState(null);
	const [isDisabled, setIsDisabled] = useState(true);

	const navigate = useNavigate();

	const handleShowModalDetails = (roomData) => {
		setIsOpen(true);
		setRoom(roomData);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const goToSelectedRoom = (id) => {
		navigate(`/booking/${id}/${fromDate}/${toDate}`);
	};

	const filterByDate = (dates) => {
		setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
		setToDate(moment(dates[1]).format("DD-MM-YYYY"));
	};

	useEffect(() => {
		if (toDate && fromDate && isAuthenticated) {
			setIsDisabled(false);
		}
	}, [toDate, fromDate]);

	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-md-10 mt-5">
						<RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
					</div>
				</div>
				<div className="row justify-content-center mt-5">
					{isLoading && !data ? (
						<h1>Loading...</h1>
					) : error ? (
						<h1>Error Fetching Rooms...</h1>
					) : (
						data && (
							<RoomsBlock
								data={data}
								handleShowModalDetails={handleShowModalDetails}
								goToSelectedRoom={goToSelectedRoom}
								isDisabled={isDisabled}
							/>
						)
					)}
				</div>
			</div>
			{room && (
				<Modal centered size="lg" isOpen={isOpen}>
					<ModalHeader toggle={handleClose}>{room.name}</ModalHeader>
					<ModalBody>
						<Carousel room={room} />
						<p>{room.description}</p>
					</ModalBody>
					<ModalFooter>
						<Button
							color="primary"
							onClick={() => goToSelectedRoom(room._id)}
							disabled={isDisabled}>
							Book Now
						</Button>{" "}
						<Button onClick={handleClose}>Cancel</Button>
					</ModalFooter>
				</Modal>
			)}
		</>
	);
}

export default Home;
