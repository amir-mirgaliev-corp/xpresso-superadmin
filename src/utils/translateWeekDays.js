export default function translateWeeksDay(lang, daysList) {
    const translations = {
        ru: {
            понедельник: 'Пн',
            вторник: 'Вт',
            среда: 'Ср',
            четверг: 'Чт',
            пятница: 'Пт',
            суббота: 'Сб',
            воскресенье: 'Вс',
        },
        en: {
            monday: 'Mon',
            tuesday: 'Tue',
            wednesday: 'Wed',
            thursday: 'Thu',
            friday: 'Fri',
            saturday: 'Sat',
            sunday: 'Sun',
        },
    };

    return daysList.map(day => {
        const lowerCaseDay = day.toLowerCase(); 

        if (!translations[lang][lowerCaseDay]) {
            throw new Error(`Day "${day}" is not recognized for language "${lang}"`);
        }

        return translations[lang][lowerCaseDay];
    });
}
