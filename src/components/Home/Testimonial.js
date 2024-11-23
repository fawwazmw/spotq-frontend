import Image from 'next/image';
import Slider from "react-slick";

const Testimonial = () => {
	const testimonialData = [
			{
				id: 1,
				img: '/assets/img/testimonial/testi-1.jpg',
				name: 'Emma Coffee',
				title: '@emmacoffee',
				desc: 'The best café I\'ve ever been to! The lattes are smooth and the ambiance is perfect for working. Highly recommend the caramel macchiato!'
			},
			{
				id: 2,
				img: '/assets/img/testimonial/testi-2.jpg',
				name: 'Oliver Brewster',
				title: '@olivbrew',
				desc: 'A cozy spot with fantastic pastries. I tried the lemon drizzle cake, and it was absolutely divine! The staff is super friendly too.'
			},
			{
				id: 3,
				img: '/assets/img/testimonial/testi-3.jpg',
				name: 'Sophia Mocha',
				title: '@sophiamocha',
				desc: 'This café has a great vibe and excellent coffee. I love how they source their beans locally. Their cold brew is a must-try!'
			},
			{
				id: 4,
				img: '/assets/img/testimonial/testi-4.jpg',
				name: 'James Latte',
				title: '@jameslatte',
				desc: 'I\'ve been coming here for months, and I\'m never disappointed. The cappuccinos are always perfect, and I adore the relaxing atmosphere.'
			},
			{
				id: 5,
				img: '/assets/img/testimonial/testi-2.jpg',
				name: 'Chloe Espresso',
				title: '@chloespresso',
				desc: 'Love this café! The flat whites are consistently delicious, and the outdoor seating area is perfect for sunny days.'
			},
			{
				id: 6,
				img: '/assets/img/testimonial/testi-3.jpg',
				name: 'Liam Brew',
				title: '@liambrew',
				desc: 'What a gem! Amazing coffee and an even better selection of vegan snacks. The almond croissants are a personal favorite.'
			},
			{
				id: 7,
				img: '/assets/img/testimonial/testi-2.jpg',
				name: 'Nina Cappuccino',
				title: '@ninacappuccino',
				desc: 'This place has a real charm. The staff knows their coffee, and the pastries are always fresh. Definitely my go-to spot in the city.'
			},
			{
				id: 8,
				img: '/assets/img/testimonial/testi-4.jpg',
				name: 'Max Barista',
				title: '@maxbarista',
				desc: 'Hands down my favorite café. The pour-over coffee is so rich and flavorful, and the décor is just beautiful. A must-visit for coffee lovers.'
			},
			{
				id: 9,
				img: '/assets/img/testimonial/testi-1.jpg',
				name: 'Grace Bean',
				title: '@gracebean',
				desc: 'I can\'t get enough of this place! The iced lattes are perfect, and the cozy vibe makes it a great place to meet up with friends or get some work done.'
			}
	]
	// slick setting
	const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
         {
           breakpoint: 991,
           settings: {
             slidesToShow: 2,
             slidesToScroll: 1,
           }
         },
         {
           breakpoint: 767,
           settings: {
             slidesToShow: 2,
             slidesToScroll: 1,
             initialSlide: 2
           }
         },
         {
           breakpoint: 576,
           settings: {
             slidesToShow: 1,
             slidesToScroll: 1
           }
         }
       ]
    };
	return (
		<>
			<div className="testimonial__area pt-50 pb-115 fix">
				<div className="container">
					<div className="testimonial__inner p-relative pb-110">
						<div className="testimonial__bg p-absolute">
							<Image src="/assets/img/bg/testimonial-bg.png" alt="" width={970} height={350}/>
						</div>
						<div className="row">
							<div className="col-xxl-12">
								<Slider {...settings} className="testimonial__slider wow fadeInUp" data-wow-delay=".5s">
									{
										testimonialData.map((testimonial,index) => {
											return <div key={index} className="testimonial__item white-bg">
											<div className="testimonial__person d-flex mb-20">
												<div className="testimonial__avater">
													<Image src={testimonial.img} alt="" width={400} height={400}/>
												</div>
												<div className="testimonial__info ml-15">
													<h5>{testimonial.name}</h5>
													<span>{testimonial.title}</span>
												</div>
											</div>
											<div className="testimonial__text">
												<p>{testimonial.desc}</p>
											</div>
										</div>
										})
									}
								</Slider>
						
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Testimonial;