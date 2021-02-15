function Statistics({ data, startDate, endDate }) {
    const durationInMilliseconds = endDate.getTime() - startDate.getTime();

    // If date range is less than one day, round up to one day.
    const numDays = Math.ceil(durationInMilliseconds / 1000 / 60 / 60 / 24);

    // Calculations here rely on guarantee that startDate is always a Sunday.
    const numFullWeeks = Math.floor(numDays / 7);
    const numDaysInPartialWeek = numDays % 7;
    let numWeekdays = numFullWeeks * 5;

    if (numDaysInPartialWeek > 1) {
        // Our partial week extends into the weekdays, so add those number
        // of days, minus 1 for Sunday, to our weekday count.
        numWeekdays += numDaysInPartialWeek - 1;
    }

    // TODO: Break these up into separate components
    const averageEventsPerDay = numDays
        ? Math.round(data.length / numDays * 100) / 100
        : 0;
    const averageEventsPerWeekday = numWeekdays
        ? Math.round(data.length / numWeekdays * 100) / 100
        : 0;

    return (
        <div className="row">
            <p className="stats-block" data-testid="avgPerDay">
                Average of <span className="highlight">{averageEventsPerDay}</span> events per day
            </p>
            {numWeekdays &&
                <p className="stats-block" data-testid="avgPerWeekday">
                    Average of <span className="highlight">{averageEventsPerWeekday}</span> events
                    per day, excluding weekends
                </p>
            }
        </div>
    );
}

export default Statistics;
