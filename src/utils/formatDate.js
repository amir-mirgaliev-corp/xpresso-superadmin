export function formatDate(isoDate, includeTime = false) {
	const date = new Date(isoDate);

	if (!(date instanceof Date) || isNaN(date)) {
		console.error("Invalid date");
		return;
	}

	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();

	let formattedDate = `${day}-${month}-${year}`;

	if (includeTime) {
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		formattedDate += ` ${hours}:${minutes}`;
	}

	return formattedDate;
}
