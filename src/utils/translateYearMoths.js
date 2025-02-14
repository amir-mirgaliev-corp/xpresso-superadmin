export default function translateYearMoths (months) {
    const customShortMonths = {
        "Январь": "Ян",
        "Февраль": "Фв",
        "Март": "Мт",
        "Апрель": "Ап",
        "Май": "Май",
        "Июнь": "Ин",
        "Июль": "Юл",
        "Август": "Ав",
        "Сентябрь": "Сн",
        "Октябрь": "Ок",
        "Ноябрь": "Нб",
        "Декабрь": "Дк"
    };

    return months.map(month => customShortMonths[month] || month);
}
