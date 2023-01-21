import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Blog from '../components/Blog';

describe('component functionality', () => {
  test('Blog component shows blog title and author at start', async () => {
    const blog = {
      name: 'blog name',
      url: 'blogurl',
      likes: 1,
      author: 'blog author'
    };

    render(
      <Blog className='testBlog' blog={blog} />
    );

    const element = screen.getByText('blog name');
    expect(element).toBeDefined();
  });
});