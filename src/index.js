import './style.css'
import {format, compareAsc} from 'date-fns'



// todolist factory function
const todoList = function() {
    let array = [];

    function add(todo) {
        this.array.push(todo);
    }

    function remove(todo) {
        let index = this.array.findIndex((arrayObj => arrayObj === todo))
        this.array.splice(index, 1);
    }
    return{array, add, remove};
};



const todoFactory = function(title, dueDate, priority, complete=false, project=null) {
    return {title, dueDate, priority, complete, project};
};



// new file -- load all todos 
// modify to load todos of specified list
function loadTodos() {
    const todos = document.querySelector('.todos');
    todos.innerHTML = '';
    for (let todo of main.array) {
        displayTodo(todo);
    }
}

//modify to load specified project
function loadHome() {
    console.log('loadhome');
    const title = document.querySelector('.title');
    title.textContent = 'Home';
    loadTodos();
    todoBtnListener();
    formListener();
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
    title.textContent = todo.title;
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

// function to display form to add todo
function todoBtnListener() {
    console.log('addtodobtn');
    let div = document.querySelector('.add>div');
    div.addEventListener('click',function() {
        console.log('todoclicked');
        let form = document.querySelector('.formdiv');
        form.removeAttribute('hidden');
    })
}

// function to add todo when clicked
function formListener() {
    console.log('submitform');
    let btn = document.querySelector('#submit');
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('submitformevent');
        let title = document.querySelector('#title').value;
        let date = new Date(document.querySelector('#date').value);
        let priority = document.querySelector('#priority').value;
        if (title == "" || date == "" || priority == "") {
            alert("Must fill in title, date and priority");
        }
        else {
            main.add(todoFactory(title, date, priority, false));
            document.querySelector('#title').value = "";
            document.querySelector('#date').value = "";
            document.querySelector('#priority').selectedIndex = 0;
            let form = document.querySelector(".formdiv");
            form.setAttribute('hidden', '');
            loadTodos();
        }
    });
    
}







const main = todoList();
loadHome();