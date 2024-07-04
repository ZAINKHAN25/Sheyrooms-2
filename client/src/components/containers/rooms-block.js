import RoomCard from "../rooms/room-card";

export default function RoomsBlock({ data, handleShowModalDetails, goToSelectedRoom, isDisabled }) {
	return (
		<>
			{data.rooms.map((room) => (
				<div key={room._id} className="col-md-9">
					<RoomCard
						{...room}
						handleShowModalDetails={handleShowModalDetails}
						goToSelectedRoom={goToSelectedRoom}
						isDisabled={isDisabled}
					/>
				</div>
			))}
		</>
	);
}
