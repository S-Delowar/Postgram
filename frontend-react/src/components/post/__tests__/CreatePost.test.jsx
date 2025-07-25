import { render, screen, fireEvent } from '../../../helper/test-utils';
import userEvent from '@testing-library/user-event';
import CreatePost from '../CreatePost';
import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

describe('<CreatePost />', () => {
  it('renders and works', async () => {
    const user = userEvent.setup();

    render(<CreatePost />);

    const showModalForm = screen.getByTestId('show-modal-form');
    expect(showModalForm).toBeInTheDocument();

    // Open modal
    fireEvent.click(showModalForm);

    const createFormElement = screen.getByTestId('create-post-form');
    expect(createFormElement).toBeInTheDocument();

    const postBodyField = screen.getByTestId('post-body-field');
    expect(postBodyField).toBeInTheDocument();

    const submitButton = screen.getByTestId('create-post-submit');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.disabled).toBeTruthy();

    const postBody = faker.lorem.sentence(10);
    await user.type(postBodyField, postBody);

    expect(postBodyField).toHaveValue(postBody);
    expect(submitButton.disabled).toBeFalsy();
  });
});
