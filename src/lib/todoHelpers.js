export const addTodo = (list, todo) => list.concat(todo);

export const generateID = () => Math.floor(Math.random()*10000);

export const findById = (list, id) => {
  const result = list.filter(item => item.id === id);
  return result.length ? result.pop() : {};
}

export const toggleTodo = (todo) => {
  const result = Object.assign({}, todo);
  result.isComplete = !result.isComplete
  return result;
}

export const updateTodo = (list, update) => {
  return list.map(item => item.id !== update.id ? item : update);
}

export const removeTodo = (list, id) => {
  return list.filter(item => item.id !== id)
}

export const filterTodos = (list, route) => {
  if (route === '/active') {
    return list.filter(item => !item.isComplete)
  } else if (route === '/complete'){
    return list.filter(item => item.isComplete)
  } else {
    return list
  }
}

