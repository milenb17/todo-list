
// new file -- load all todos 
function loadTodos(mode) {
    const todos = document.querySelector('.todos');
    todos.innerHTML = '';
    if (mode === 'Home') {
        for (let todo of mainList.home.array) {
            displayTodo(todo);
        }
    }
    else {
        for (let todo of mainList.projects[mode].array) {
            displayTodo(todo);
        }
    }
}

// function to display a singular todo item;
function displayTodo(todo) {
    let newdiv = document.createElement('div');
    newdiv.classList.add('todo');
    let check = document.createElement('input');
    check.type = "checkbox";
    // add id/class to checkbox to know if it gets clicked later
    if (todo.complete) {
        check.setAttribute('checked', '');
    }
    let title = document.createElement('div');
    title.textContent = `${todo.title} (${todo.project})`;
    title.setAttribute('style', 'flex: 1');
    let date = document.createElement('div');
    date.textContent = todo.dueDate.toUTCString().substring(0,16);
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.textContent = 'X';
    let priority = todo.priority;
    newdiv.classList.add(`${priority}`);
    newdiv.appendChild(check);
    newdiv.appendChild(title);
    newdiv.appendChild(date);
    newdiv.appendChild(deleteBtn);
    const todos = document.querySelector('.todos');
    todos.appendChild(newdiv);
}

export {loadTodos, displayTodo};