import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Todo from './Todo'

test('renders content', () => {

    const todo = {
        text: "This is a test",
        done: false
    }

    const onClickDelete = jest.fn()
    const onClickComplete = jest.fn()

    const ToDo = render(
        <Todo todo={todo} onClickDelete={onClickDelete} onClickComplete={onClickComplete}/>
    )

    expect(ToDo.container).toHaveTextContent(
        'This is a test'
    )

    const completeButton = ToDo.getByText('Set as done')
    fireEvent.click(completeButton)
    expect(onClickComplete.mock.calls).toHaveLength(1)

    const deleteButton = ToDo.getByText('Delete')
    fireEvent.click(deleteButton)
    expect(onClickDelete.mock.calls).toHaveLength(2)
})