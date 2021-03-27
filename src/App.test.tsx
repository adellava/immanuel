import App from "App"
import React from "react";
import { render } from '@testing-library/react'

test('renders the App', () => {
    const { container, getByText } = render(<App />)
    expect(getByText('Immanuel')).toBeInTheDocument();
});