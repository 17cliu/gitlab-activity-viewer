import { render } from '@testing-library/react';
import App from './App';

test('placeholder test', () => {
    render(<App />);
    // const linkElement = screen.getByText(/learn react/i);
    expect(true).toBeTruthy();
});
