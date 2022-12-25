export const trad = value => {
	switch (value) {
		case 'active':
			return 'Activo';
		case 'paused':
			return 'Pausado';
		case 'under_review':
			return 'Revisión';
		default:
			return value;
	}
};
