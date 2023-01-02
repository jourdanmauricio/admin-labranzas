import {Container, Row, Col} from 'react-grid-system';
import Status from './Status';
import Quantity from './Quantity';
import Condition from './Condition';
import Listing from './Listing';
import MaxPurchase from './MaxPurchase';
import Manufacturing from './Manufacturing';
import Price from './Price';
import Video from './Video';
import Description from './Description';
import Warranty from './Warranty';

const Features = () => {
	return (
		<Container className='grid__container'>
			<Row className='form__row'>
				<Col md={6} className='form__control'>
					<Status />
				</Col>
				<Col md={6} className='form__control'>
					<Price />
				</Col>
			</Row>

			<Row className='form__row'>
				<Col md={6} className='form__control'>
					<Quantity />
				</Col>
				<Col md={6} className='form__control'>
					<MaxPurchase />
				</Col>
			</Row>
			<Row className='form__row'>
				<Col md={6} className='form__control'>
					<Condition />
				</Col>
				<Col md={6} className='form__control'>
					<Listing />
				</Col>
			</Row>
			<Row className='form__row'>
				<Col md={6} className='form__control'>
					<Manufacturing />
				</Col>
				<Col md={6} className='form__control'>
					<Video />
				</Col>
			</Row>
			<hr />
			<Row className='form__row'>
				<Col md={12} className='form__control'>
					<Warranty />
				</Col>
			</Row>
			<hr />

			<Row className='form__row'>
				<Col md={12} className='form__control'>
					<Description />
				</Col>
			</Row>
		</Container>
	);
};

export default Features;
