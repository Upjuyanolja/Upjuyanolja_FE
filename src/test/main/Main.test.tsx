import React from 'react';

import { Main } from '@pages/main';
import { render, screen } from '@testing-library/react';

jest.mock('@ant-design/plots', () => ({
  Column: () => null,
  ColumnConfig: () => null,
}));

describe('component tests', () => {
  it('Renders correctly initial document', async () => {
    render(<Main />);
    const text = screen.getByRole('button');
    expect(text).toBeInTheDocument();
  });
});
