import {useEffect, useMemo, useState} from 'react';
import {useModal} from '@/hooks/useModal';
import {useNotification} from '@/commons/Notifications/NotificationProvider';
import {
	deleteCategory,
	getAllCategories,
	putCategory,
} from '../../services/api/categories';
import FilterComponent from '@/commons/Table/FilterTable';
import {FaPlus, FaRegTrashAlt, FaEdit} from 'react-icons/fa';

const useCategories = () => {
	const [action, setAction] = useState(null);
	const [filterText, setFilterText] = useState('');
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const [error, setError] = useState(null);
	const [isOpenModal, openModal, closeModal] = useModal(false);
	const [isOpenModalEdit, openModalEdit, closeModalEdit] = useModal(false);
	const [dataToEdit, setDataToEdit] = useState(null);
	const [dataToDelete, setDataToDelete] = useState(null);
	const dispatchNotif = useNotification();
	const filteredItems = data.filter(
		item =>
			item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
	);

	useEffect(() => {
		setLoading(true);
		const fetchCategories = async () => {
			try {
				const categories = await getAllCategories();
				setData(categories);
				console.log('Categories', categories);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchCategories();
	}, []);

	const CATEGORIES_COLUMNS = [
		{
			name: 'Categoría',
			cell: row => (
				<span>
					{row.id} - {row.full_name}
				</span>
			),
			sortable: true,
		},
		{
			name: 'Web',
			width: '160px',
			selector: row => row.description_web,
			sortable: true,
		},
		{
			name: 'Acciones',
			width: '120px',
			cell: row => (
				<div>
					<button
						onClick={() => deleteData(row)}
						className='table__icon table__icon--delete'>
						<FaRegTrashAlt />
					</button>
					<button
						onClick={() => editData(row)}
						className='table__icon table__icon--edit'>
						<FaEdit />
					</button>
				</div>
			),
		},
	];

	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<>
				<FilterComponent
					onFilter={e => setFilterText(e.target.value)}
					onClear={handleClear}
					filterText={filterText}
				/>
				<button className='icon__button' onClick={() => setAction('SEARCH')}>
					<FaPlus />
				</button>
			</>
		);
	}, [filterText, resetPaginationToggle]);

	const editData = data => {
		setDataToEdit(data);
		openModalEdit();
		setAction('EDIT');
	};

	const deleteData = data => {
		setDataToDelete(data);
		openModal();
		setAction('DELETE');
	};

	const handleAddCategory = newCategory => {
		setData([newCategory, ...data]);
		dispatchNotif({
			type: 'SUCCESS',
			message: 'Categoría creada!',
		});
	};

	const handleEdit = async editData => {
		try {
			closeModalEdit();
			setLoading(true);
			const obj = {
				description_web: editData.description_web,
			};
			const res = await putCategory(editData.id, obj);
			dispatchNotif({
				type: 'SUCCESS',
				message: 'Categoría modificada!',
			});

			let newData = data.map(el => (el.id === res.id ? res : el));
			setData(newData);
		} catch (err) {
			dispatchNotif({
				type: 'ERROR',
				message: 'Error modificando la categoría',
			});
			setError(err);
		} finally {
			setLoading(false);
			setAction(null);
		}
	};

	const handleDelete = async id => {
		try {
			setLoading(true);
			await deleteCategory(id);
			dispatchNotif({
				type: 'SUCCESS',
				message: 'Categoría eliminado!',
			});
			let newData = data.filter(el => el.id !== id);
			setData(newData);
			setDataToDelete(null);
		} catch (err) {
			dispatchNotif({
				type: 'ERROR',
				message: 'Error eliminando la categoría',
			});
			setError(err);
		} finally {
			setLoading(false);
			setAction(null);
			closeModal();
		}
	};

	const handleCancel = () => {
		setDataToDelete(null);
		closeModal();
		setDataToEdit(null);
		closeModalEdit();
		setAction(null);
	};

	const closeMessage = () => {
		setError(false);
	};

	return {
		action,
		loading,
		error,
		subHeaderComponentMemo,
		isOpenModal,
		isOpenModalEdit,
		dataToEdit,
		dataToDelete,
		filteredItems,
		resetPaginationToggle,
		closeModal,
		closeModalEdit,
		CATEGORIES_COLUMNS,
		handleAddCategory,
		handleEdit,
		handleDelete,
		handleCancel,
		closeMessage,
	};
};

export default useCategories;
