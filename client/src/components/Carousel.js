import Slider from "react-slick";

export default function Carousel({ room }) {
	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};
	return (
		<Slider {...settings}>
			{room &&
				room.imageurls.map((image, idx) => {
					return (
						<div key={idx} className="slick-item-wrapper">
							<img className="slick-item-image d-block w-100" key={idx} src={image} alt="" />
						</div>
					);
				})}
		</Slider>
	);
}
