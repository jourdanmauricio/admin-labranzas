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

const Features = ({editFields}) => {
	return (
		<Container className='grid__container'>
			<Row className='form__row'>
				<Col md={6} className='form__control'>
					<Status editFields={editFields} />
				</Col>
				<Col md={6} className='form__control'>
					<Price editFields={editFields} />
				</Col>
			</Row>

			<Row className='form__row'>
				<Col md={6} className='form__control'>
					<Quantity editFields={editFields} />
				</Col>
				<Col md={6} className='form__control'>
					<MaxPurchase editFields={editFields} />
				</Col>
			</Row>
			<Row className='form__row'>
				<Col md={6} className='form__control'>
					<Condition editFields={editFields} />
				</Col>
				<Col md={6} className='form__control'>
					<Listing editFields={editFields} />
				</Col>
			</Row>
			<Row className='form__row'>
				<Col md={6} className='form__control'>
					<Manufacturing editFields={editFields} />
				</Col>
				<Col md={6} className='form__control'>
					<Video editFields={editFields} />
				</Col>
			</Row>
			<hr />
			<Row className='form__row'>
				<Col md={12} className='form__control'>
					<Warranty editFields={editFields} />
				</Col>
			</Row>
			<hr />

			<Row className='form__row'>
				<Col md={12} className='form__control'>
					<Description editFields={editFields} />
				</Col>
			</Row>
		</Container>
	);
};

export default Features;
