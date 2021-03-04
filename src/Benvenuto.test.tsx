import Benvenuto from "./Benvenuto"
import React from "react";
import { render } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect'

test('renders a Benvenuto', () => {
    const { container, getByText } = render(<Benvenuto />)
    expect(getByText('Benvenuto')).toBeInTheDocument();
});