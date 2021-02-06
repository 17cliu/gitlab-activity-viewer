import { render } from '@testing-library/react';
import TapestryCell from './TapestryCell';

test('when count is 0, does not show count', () => {
    const props = {
        count: 0,
        label: 'Hello world!',
        thresholds: [
            { value: 0 },
            { value: 10 },
            { value: 20 }
        ]
    };
    const { container } = render(<TapestryCell {...props} />);

    const el = container.querySelector('.tapestry-cell');
    expect(el).toHaveAttribute('title', 'Hello world!');
    expect(el).toHaveClass('tapestry-cell--0');
    expect(el).toHaveTextContent('');
});

test('when non-zero level reached, count is shown', () => {
    const props = {
        count: 12,
        label: 'I did things!',
        thresholds: [
            { value: 0 },
            { value: 10 },
            { value: 20 }
        ]
    };
    const { container } = render(<TapestryCell {...props} />);

    const el = container.querySelector('.tapestry-cell');
    expect(el).toHaveAttribute('title', 'I did things!');
    expect(el).toHaveClass('tapestry-cell--1');
    expect(el).toHaveTextContent('12');
});

test('when non-zero level reached but showCount=false, count is hidden', () => {
    const props = {
        count: 15,
        label: 'I made an impact!',
        thresholds: [
            { value: 0 },
            { value: 10 },
            { value: 20 }
        ],
        showCount: false
    };
    const { container } = render(<TapestryCell {...props} />);

    const el = container.querySelector('.tapestry-cell');
    expect(el).toHaveAttribute('title', 'I made an impact!');
    expect(el).toHaveClass('tapestry-cell--1');
    expect(el).toHaveTextContent('');
});

test('when highest threshold passed, assigns correct level', () => {
    const props = {
        count: 9001,
        label: '#winning',
        thresholds: [
            { value: 0 },
            { value: 1 },
            { value: 10 },
            { value: 100 },
            { value: 1000 }
        ]
    };
    const { container } = render(<TapestryCell {...props} />);

    const el = container.querySelector('.tapestry-cell');
    expect(el).toHaveAttribute('title', '#winning');
    expect(el).toHaveClass('tapestry-cell--4');
    expect(el).toHaveTextContent('9001');
});
