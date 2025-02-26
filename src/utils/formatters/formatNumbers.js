const formatNumberWithSpaces = number => {
	if (!number) return "";

	let num = typeof number === "string" ? parseFloat(number.replace(/\s/g, "")) : number;

	if (isNaN(num)) return "";

	return Number.isInteger(num) ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : num.toString();
};

export default formatNumberWithSpaces;
