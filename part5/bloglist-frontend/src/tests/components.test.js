import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';

describe('blog component functionality', () => {
  let container;
  let user = userEvent.setup();
  let handleLike = jest.fn();
  let handleDelete = jest.fn();

  beforeEach(() => {
    const blog = {
      name: 'blog name',
      url: 'blogurl',
      likes: 1,
      author: 'blog author',
      user: {
        username: 'tester',
        name: 'Tester Tester',
      }
    };
    const testUser = {
      username: 'tester',
      name: 'Tester Tester',
    };

    container = render(
      <Blog blog={blog}
        user={testUser}
        showAll={false}
        handleLikeSubmit={handleLike}
        handleDelete={handleDelete}
      />
    ).container;
  });

  test('at start the blog details are not visible', async () => {
    const hiddenDiv = container.querySelector('.hiddenDiv');

    expect(hiddenDiv).toHaveStyle('display: none');
  });

  test('blog details are present', async () => {
    const div = container.querySelector('.blog');

    expect(div).toBeDefined();
    expect(div).toHaveTextContent('blog name');
    expect(div).toHaveTextContent('blog author');
    expect(div).toHaveTextContent('blogurl');
  });

  test('view button toggles to show blog details', async () => {
    // test will verify the blog component contains correct data
    // then it clicks the View button to expand, verifies style toggles as intended
    // make sure display: none at first, then to block
    const element = screen.getByText('blog name');
    const div = container.querySelector('.blog');
    const hiddenDiv = container.querySelector('.hiddenDiv');
    const toggleVisButt = screen.getByText('view');

    expect(hiddenDiv).toHaveStyle({ display: 'none' });

    await user.click(toggleVisButt);
    expect(hiddenDiv).not.toHaveStyle({ display: 'none' });
    expect(hiddenDiv).toHaveStyle({ display: 'block' });
    screen.debug(div);
  });
});