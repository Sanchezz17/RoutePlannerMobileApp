export const getStartOfWeek = (date: Date): Date => {
    const currentDate = new Date(date);
    const firstday = new Date(
        currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1),
    );
    firstday.setHours(0);
    firstday.setMinutes(0);
    firstday.setSeconds(0);
    firstday.setMilliseconds(0);
    return firstday;
};

export const getStartOfNextWeek = (date: Date): Date => {
    const startOfWeek = getStartOfWeek(date);
    const startOfNextWeek = new Date(startOfWeek);
    startOfNextWeek.setDate(startOfWeek.getDate() + 7);
    return startOfNextWeek;
};
