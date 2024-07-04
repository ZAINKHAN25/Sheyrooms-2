import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useAxios } from "../hooks/useAxios";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import moment from "moment";
import axios from "axios";
import { useUser } from "../context/user-state";

export default function Booking() {
	const [isPaid, setIsPaid] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const { id, fromDate, toDate } = useParams();
	const navigate = useNavigate();
	// Limitation of this hook is it only uses http method GET
	const { data, isLoading, error } = useAxios(`http://localhost:4000/api/room/${id}`);

	const _fromDate = moment(fromDate, "DD-MM-YYYY");
	const _toDate = moment(toDate, "DD-MM-YYYY");
	const totalDays = moment.duration(_toDate.diff(_fromDate)).asDays() + 1;
	const { isAuthenticated, user } = useUser();

	const noop = () => { };

	const handlePayment = () => {
		if (!isAuthenticated) {
			setIsOpen(true);
			return noop();
		}
		setIsPaid(true);
	};

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/");
		}
	}, [isAuthenticated]);

	useEffect(() => {
		let current = true;
		if (current) {
			if (isPaid && isAuthenticated) {
				(async () => {
					try {
						await axios.post(`http://localhost:4000/api/reservations`, {
							room: data,
							fromDate,
							toDate,
							userId: user._id,
							totalDays,
							totalAmount: totalDays * data.rentperday
						});
					} catch (error) {
						console.log(error);
					}
				})();
			} else {
			}
		}
		return () => (current = false);
	}, [isPaid, data, id, totalDays, isAuthenticated, user]);

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			{isLoading ? (
				<h1>Loading...</h1>
			) : error ? (
				<h1>Error...</h1>
			) : (
				data && (
					<div className="container">
						<div className="row justify-content-center mt-5">
							<div className="col-md-6">
								<h1>{data.name}</h1>
								<img src={data.imageurls[0]} alt="" />
							</div>
							<div className="col-md-4">
								<div style={{ textAlign: "right" }}>
									<div>
										<h1>Booking Details</h1>
										<hr />
										<br />
									</div>
									<div>
										<p>
											Name: <b>{user.name}</b>
										</p>
										<p>
											From Date: <b>{fromDate}</b>
										</p>
										<p>
											To Date: <b>{toDate}</b>{" "}
										</p>
										<p>
											Maxcount: <b>{data.maxcount}</b>
										</p>
										<br />
										<hr />
									</div>
									<div>
										<p>
											Total Days: <b>{totalDays}</b>{" "}
										</p>
										<p>
											Rent Per Day: <b>{data.rentperday}</b>
										</p>
										<h1>
											Total Amount: <b>{totalDays * data.rentperday}</b>
										</h1>
										<Button onClick={handlePayment} className="btn btn-dark">
											Continue
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			)}
			<Modal isOpen={isOpen}>
				<ModalHeader toggle={handleClose}>Error</ModalHeader>
				<ModalBody>
					An error has occurred because you are not logged in.
					<br />
					Login first to continue.
				</ModalBody>
				<ModalFooter>
					<Button className="btn btn-dark" onClick={() => navigate("/login")}>
						Login
					</Button>
					<Button className="btn btn-dark" onClick={() => navigate("/")}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
