export default function translateWeeksDay(daysList) {
	const translations = {
		понедельник: "Пн",
		вторник: "Вт",
		среда: "Ср",
		четверг: "Чт",
		пятница: "Пт",
		суббота: "Сб",
		воскресенье: "Вс",
	};

	return daysList.map(day => {
		const lowerCaseDay = day.toLowerCase();

		if (!translations[lowerCaseDay]) {
			throw new Error(`Day "${day}" is not recognized for language "${lang}"`);
		}

		return translations[lowerCaseDay];
	});
}
