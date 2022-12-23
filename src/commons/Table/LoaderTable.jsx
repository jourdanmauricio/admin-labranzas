import styles from './table.module.css';

const LoaderTable = () => {
	return (
		<div style={{padding: '24px'}}>
			<div className={styles.spinner}></div>
			{/* <div>Fancy Loader...</div> */}
		</div>
	);
};

export default LoaderTable;
