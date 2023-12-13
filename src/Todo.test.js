import { render, screen } from '@testing-library/react';
import Todo from './Todo';

it('renders without crashing', function () {
    render(<Todo task="A Task" id="test-id" deleteTodo={() => {}} />);
});

it('matches snapshot', function () {
    const { asFragment } = render(
        <Todo task="A Task" id="test-id" deleteTodo={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
});
