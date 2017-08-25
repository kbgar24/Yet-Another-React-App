import {addTodo} from './todoHelpers'

test('addTodo should add the passed todo to the list', () => {
  //arrange
  const startTodos = [
    {id: 1, name: 'one', isComplete: false},
    {id: 2, name: 'two', isComplete: false}
  ]
  const newTodo = {id: 3, name: 'three', isComplete: false}
  const expected = [
    {id: 1, name: 'one', isComplete: false},
    {id: 2, name: 'two', isComplete: false},
    {id: 3, name: 'three', isComplete: false}
  ]
  //act
  const result = addTodo(startTodos, newTodo);

  //assert
  expect(result).toEqual(expected)

  })

test('addTodo should not mutate the existing todo array', () => {
  //arrange
  const startTodos = [
    {id: 1, name: 'one', isComplete: false},
    {id: 2, name: 'two', isComplete: false}
  ]
  const newTodo = {id: 3, name: 'three', isComplete: false}
  const expected = [
    {id: 1, name: 'one', isComplete: false},
    {id: 2, name: 'two', isComplete: false},
    {id: 3, name: 'three', isComplete: false}
  ]
  //act
  const result = addTodo(startTodos, newTodo);

  //assert
  expect(result).not.toBe(startTodos);

  })
