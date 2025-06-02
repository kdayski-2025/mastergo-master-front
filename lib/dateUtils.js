/**
 * Форматирует дату в формат "10 апр 2025"
 * @param {Date|string|number} date - Дата для форматирования (объект Date, строка или timestamp)
 * @param {boolean} [fullMonth=false] - Использовать полное название месяца (например, "апреля" вместо "апр")
 * @returns {string} Отформатированная дата
 */
export const formatDate = (date, fullMonth = false) => {
	// Преобразуем входную дату в объект Date
	const dateObj = date instanceof Date ? date : new Date(date);

	// Массивы с названиями месяцев
	const months = [
		'янв', 'фев', 'мар', 'апр', 'май', 'июн',
		'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
	];

	const fullMonths = [
		'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
		'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
	];

	// Получаем компоненты даты
	const day = dateObj.getDate();
	const monthIndex = dateObj.getMonth();
	const year = dateObj.getFullYear();

	// Определяем название месяца в зависимости от параметра fullMonth
	const month = fullMonth ? fullMonths[monthIndex] : months[monthIndex];

	// Форматируем дату в требуемый формат
	return `${day} ${month} ${year}`;
};

/**
 * Форматирует дату в относительный формат ("сегодня", "вчера", или в формате "10 апр 2025")
 * @param {Date|string|number} date - Дата для форматирования
 * @param {boolean} [fullMonth=false] - Использовать полное название месяца
 * @returns {string} Отформатированная дата
 */
export const formatRelativeDate = (date, fullMonth = false) => {
	const dateObj = date instanceof Date ? date : new Date(date);
	const today = new Date();

	// Сбрасываем время до 00:00:00
	const dateWithoutTime = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
	const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());

	// Разница в днях
	const diffDays = Math.floor((todayWithoutTime - dateWithoutTime) / (1000 * 60 * 60 * 24));

	if (diffDays === 0) {
		return 'сегодня';
	} else if (diffDays === 1) {
		return 'вчера';
	} else {
		return formatDate(date, fullMonth);
	}
}; 