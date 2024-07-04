export default function RoomCard(props) {
	const {
		name,
		phonenumber,
		maxcount,
		type,
		imageurls,
		handleShowModalDetails,
		goToSelectedRoom,
		isDisabled
	} = props;
	const room = props;
	return (
		<div className="row bg-light mb-5 bg-shadow">
			<div className="col-md-4">
				<img src={imageurls[0]} alt={name} className="small-img" />
			</div>
			<div className="col-md-8">
				<h1>{name}</h1>
				<p>
					Number of Guests: <b>{maxcount}</b>
				</p>
				<p>Contact Number:{phonenumber}</p>
				<p>{type}</p>
				<div style={{ float: "right" }}>
					<button
						disabled={isDisabled}
						className="btn btn-dark"
						onClick={() => goToSelectedRoom(room._id)}>
						Book Now
					</button>
					<button className="btn btn-dark" onClick={() => handleShowModalDetails(room)}>
						View Details
					</button>
				</div>
			</div>
		</div>
	);
}
