function padTo2Digits(num) {
	return num.toString().padStart(2, '0');
}
export function formatDateTable(date) {
	const newDate = [
		padTo2Digits(new Date(date).getUTCDate()),
		padTo2Digits(new Date(date).getUTCMonth() + 1),
		new Date(date).getFullYear(),
	].join('/');

	return newDate === '31/12/1969' ? '' : newDate;
}

export function getBirthday(date) {
	const newDate = [
		padTo2Digits(new Date(date).getUTCDate()),
		padTo2Digits(new Date(date).getUTCMonth() + 1),
		new Date().getFullYear(),
	].join('/');

	return newDate === '31/12/1969' ? '' : newDate;
}

export function formatDate(date) {
	const newDate = [
		new Date(date).getFullYear(),
		padTo2Digits(new Date(date).getUTCMonth() + 1),
		padTo2Digits(new Date(date).getUTCDate()),
	].join('-');

	return newDate === '1969/01/01' ? '' : newDate;
}

export function getAge(date) {
	let today = new Date();
	let birthday = new Date(date);
	let age = today.getFullYear() - birthday.getFullYear();
	let m = today.getMonth() - birthday.getMonth();

	if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
		age--;
	}

	return age;
}

export function descriptionVariation(variation) {
	let titleDesc = '';
	let varDesc = '';

	variation.attribute_combinations.forEach(comb => {
		varDesc = varDesc ? varDesc + ' / ' + comb.value_name : comb.value_name;
		titleDesc = titleDesc ? titleDesc + ' / ' + comb.name : comb.name;
	});
	return [titleDesc, varDesc];
}

export function isChangeTitle(prod) {
	return prod.sold_quantity > 0 ||
		prod.prodMl?.sold_quantity > 0 ||
		prod.prodWeb?.sold_quantity > 0
		? false
		: true;
}
