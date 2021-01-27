function Statistics({ data, startDate, endDate }) {
    const durationInMilliseconds = endDate.getTime() - startDate.getTime();
    const numDays = durationInMilliseconds / 1000 / 60 / 60 / 24;

    // startDate is always a Sunday
    const endDay = endDate.getDay();
    const numFullWeeks = Math.floor(numDays / 7);
    let numWeekdays = numFullWeeks * 5;

    if (endDay < 6) {
        // If we have a partial week, add one more day for Sunday.
        numWeekdays++;
    }

    const averageEventsPerDay = Math.round(data.length / numDays * 100) / 100;
    const averageEventsPerWeekday = Math.round(data.length / numWeekdays * 100) / 100;
    return (
        <div className="statistics">
            <p>Average of {averageEventsPerDay} events per day</p>
            <p>Average of {averageEventsPerWeekday} events per day,
                excluding weekends
            </p>
        </div>
    );
}

export default Statistics;
