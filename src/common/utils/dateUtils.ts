export const DAY_MILLISECONDS = 1000 * 60 * 60 * 24;

export const getStartOfWeek = (date: Date): Date => {
    const currentDate = new Date(date);
    const firstDay = new Date(
        currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1),
    );
    firstDay.setHours(0);
    firstDay.setMinutes(0);
    firstDay.setSeconds(0);
    firstDay.setMilliseconds(0);
    return firstDay;
};

export const getStartOfNextWeek = (date: Date): Date => {
    const startOfWeek = getStartOfWeek(date);
    const startOfNextWeek = new Date(startOfWeek);
    startOfNextWeek.setDate(startOfWeek.getDate() + 7);
    return startOfNextWeek;
};
