import {useState} from 'react';

export const useModal = (initialState = false) => {
	const [isOpen, setIsOpen] = useState(initialState);
	const openModal = () => {
		setIsOpen(true);
		console.log('OPEN MODAL!!!!!!, ');
	};
	const closeModal = () => setIsOpen(false);

	return [isOpen, openModal, closeModal];
};
