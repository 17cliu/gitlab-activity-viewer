import { render, screen } from '@testing-library/react';
import Statistics from './Statistics';

test('when given zero time range, with no data points', () => {
    const props = {
        startDate: new Date('2021-02-07T00:00:00.000Z'),
        endDate: new Date('2021-02-07T00:00:00.000Z'),
        data: []
    };
    render(<Statistics {...props} />);

    // Let's not talk about infinite time/contributions.
    // Practically speaking, we are indeed contributing nothing in no time.
    const avgPerDayEl = screen.getByTestId('avgPerDay');
    expect(avgPerDayEl).toHaveTextContent('Average of 0 events per day');

    // No weekday report because no weekdays in range.
    expect(screen.queryByTestId('avgPerWeekday')).toBeNull();
});

test('when given less than 1 day range, with multiple data points', () => {
    const props = {
        startDate: new Date('2021-02-07T00:00:00.000Z'),
        endDate: new Date('2021-02-07T07:00:00.000Z'),
        data: Array(9).map(() => ({}))
    };
    render(<Statistics {...props} />);

    // 9 events / 1 day = 9 events per day
    const avgPerDayEl = screen.getByTestId('avgPerDay');
    expect(avgPerDayEl).toHaveTextContent('Average of 9 events per day');

    // No weekday report because no weekdays in range.
    expect(screen.queryByTestId('avgPerWeekday')).toBeNull();
});

test('when given 5 day range, with multiple data points', () => {
    const props = {
        startDate: new Date('2021-02-07T00:00:00.000Z'),
        endDate: new Date('2021-02-12T00:00:00.000Z'),
        data: Array(117).map(() => ({}))
    };
    render(<Statistics {...props} />);

    // 117 events / 5 days = 23.4 events per day
    const avgPerDayEl = screen.getByTestId('avgPerDay');
    expect(avgPerDayEl).toHaveTextContent('Average of 23.4 events per day');

    // 117 events / 4 days = 29.25 events per day
    const avgPerWeekdayEl = screen.getByTestId('avgPerWeekday');
    expect(avgPerWeekdayEl).toHaveTextContent('Average of 29.25 events per day');
});

test('when given 1 week range, with one data point', () => {
    const props = {
        startDate: new Date('2021-02-07T00:00:00.000Z'),
        endDate: new Date('2021-02-14T00:00:00.000Z'),
        data: [{}]
    };
    render(<Statistics {...props} />);

    // 1 event / 7 days = 0.14285 events per day
    const avgPerDayEl = screen.getByTestId('avgPerDay');
    expect(avgPerDayEl).toHaveTextContent('Average of 0.14 events per day');

    // 1 event / 5 days = 0.2 events per day
    const avgPerWeekdayEl = screen.getByTestId('avgPerWeekday');
    expect(avgPerWeekdayEl).toHaveTextContent('Average of 0.2 events per day');
});

test('when given 1 week + 1 day range, with one data point', () => {
    const props = {
        startDate: new Date('2021-02-07T00:00:00.000Z'),
        endDate: new Date('2021-02-15T00:00:00.000Z'),
        data: [{}]
    };
    render(<Statistics {...props} />);

    // 1 event / 8 days = 0.125 events per day
    const avgPerDayEl = screen.getByTestId('avgPerDay');
    expect(avgPerDayEl).toHaveTextContent('Average of 0.13 events per day');

    // 1 event / 5 days = 0.166... events per day
    // (We have two Sundays and one Saturday)
    const avgPerWeekdayEl = screen.getByTestId('avgPerWeekday');
    expect(avgPerWeekdayEl).toHaveTextContent('Average of 0.2 events per day');
});

test('when given 6 weeks + 6 day range, with many data points', () => {
    const props = {
        startDate: new Date('2021-02-07T00:00:00.000Z'),
        endDate: new Date('2021-03-27T00:00:00.000Z'),
        data: Array(451).map(() => ({}))
    };
    render(<Statistics {...props} />);

    // 451 events / 48 days = 9.39583... events per day
    const avgPerDayEl = screen.getByTestId('avgPerDay');
    expect(avgPerDayEl).toHaveTextContent('Average of 9.4 events per day');

    // 451 events / 35 days = 15.033... events per day
    const avgPerWeekdayEl = screen.getByTestId('avgPerWeekday');
    expect(avgPerWeekdayEl).toHaveTextContent('Average of 12.89 events per day');
});

test('when given 6 weeks + 6 day range, with no data points', () => {
    const props = {
        startDate: new Date('2021-02-07T00:00:00.000Z'),
        endDate: new Date('2021-03-27T00:00:00.000Z'),
        data: []
    };
    render(<Statistics {...props} />);

    const avgPerDayEl = screen.getByTestId('avgPerDay');
    expect(avgPerDayEl).toHaveTextContent('Average of 0 events per day');

    const avgPerWeekdayEl = screen.getByTestId('avgPerWeekday');
    expect(avgPerWeekdayEl).toHaveTextContent('Average of 0 events per day');
});
