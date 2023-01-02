export const trad = value => {
	switch (value) {
		// Status
		case 'active':
			return 'Activo';
		case 'paused':
			return 'Pausado';
		case 'under_review':
			return 'Revisión';
		// Condicion del Item
		case 'new':
			return 'Nuevo';
		case 'used':
			return 'Usado';
		// Tipo de publicación
		case 'Local':
			return 'Local';
		case 'Web':
			return 'Web';
		case 'great':
			return 'Destacado';
		case 'best_seller':
			return 'Más vendido';
		case 'gold_special':
			return 'Clásica';
		case 'gold_pro':
			return 'Premium';
		default:
			return value;
	}
};
