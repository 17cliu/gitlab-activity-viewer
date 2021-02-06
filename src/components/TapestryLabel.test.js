import { render } from '@testing-library/react';
import TapestryLabel from './TapestryLabel';

test('when january, shows year too', () => {
    const props = {
        year: '2021',
        month: 0,
        numWeeksInMonth: 4
    };
    const { container } = render(<TapestryLabel {...props} />);

    const el = container.querySelector('.tapestry-label');
    expect(el).toHaveClass('tapestry-label--4');
    expect(container.querySelector('.tapestry-label-year')).toHaveTextContent('2021');
    expect(container.querySelector('.tapestry-label-month')).toHaveTextContent('Jan');
});

test('when not january, does not show year', () => {
    const props = {
        year: '2021',
        month: 6,
        numWeeksInMonth: 5
    };
    const { container } = render(<TapestryLabel {...props} />);

    const el = container.querySelector('.tapestry-label');
    expect(el).toHaveClass('tapestry-label--5');
    expect(container.querySelector('.tapestry-label-year')).toBe(null);
    expect(container.querySelector('.tapestry-label-month')).toHaveTextContent('Jul');
});
