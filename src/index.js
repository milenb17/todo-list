import './style.css'
import {format, compareAsc} from 'date-fns'
//import {todoBtnListener, formListener} from './addtodos.js';
//import {loadTodos, displayTodo} from './loadtodos.js';


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

// object holding lists of projects
const mainList = (function() {
    const home = todoList();
    const projects = {};
    let mode = "Home";
   return {home, projects, mode}; 
})();




// function to load projects sidebar
function loadProjectSideBar() {
    const projects = document.querySelector('.projects');
    projects.innerHTML = '';
    projects.textContent = "Projects";
    for (let key in mainList.projects) {
        let newdiv = document.createElement('div');
        newdiv.textContent = key;
        projects.appendChild(newdiv);
        newdiv.addEventListener('click', function(e) {
            console.log(e.target.textContent);
            mainList.mode = e.target.textContent;
            loadPage();
        });
    }
}

// listener for when home clicked
function homeListener() {
    const home = document.querySelector(".home");
    home.addEventListener('click', function(e) {
        mainList.mode = "Home";
        loadPage();
    });
}
//add project button
function addProjectListener() {
    const div = document.querySelector('.addproject');
    div.addEventListener('click', function() {
        let form = document.querySelector('.projectformdiv');
        form.removeAttribute('hidden');
    })
}
//add project form
function projectFormListener() {
    let btn = document.querySelector('#submitproject');
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        let project = document.querySelector('#project').value;
        if (project == "") {
            alert("Must fill in project name");
        }
        else {
            mainList.projects[project] = todoList();
            document.querySelector('#project').value = "";
            let form = document.querySelector(".projectformdiv");
            form.setAttribute('hidden', '');
            loadProjectSideBar();
        } 
    });
}

const todoFactory = function(title, dueDate, priority, complete=false, project=null) {
    return {title, dueDate, priority, complete, project};
};



function initPage() {
    const title = document.querySelector('.title');
    title.textContent = "Home";
    loadTodos('Home');
    todoBtnListener();
    formListener();
    loadProjectSideBar();
    homeListener();
    addProjectListener();
    projectFormListener();
}
function loadPage() {
    const title = document.querySelector('.title');
    title.textContent = mainList.mode;
    loadTodos();
}




// new file -- load all todos 
function loadTodos() {
    const todos = document.querySelector('.todos');
    todos.innerHTML = '';
    if (mainList.mode === 'Home') {
        for (let todo of mainList.home.array) {
            displayTodo(todo);
        }
    }
    else {
        for (let todo of mainList.projects[mainList.mode].array) {
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
    if (mainList.mode === 'Home' && todo.project !== null) {
        title.textContent = `${todo.title} (${todo.project})`;
    }
    else {
        title.textContent = `${todo.title}`;
    }
    title.setAttribute('style', 'flex: 1');
    let date = document.createElement('div');
    date.textContent = todo.dueDate.toUTCString().substring(0,16);
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', function(e) {
        if (todo.project !== null) {
            mainList.projects[todo.project].remove(todo)
        }
        mainList.home.remove(todo);
        loadTodos();
    });
    let priority = todo.priority;
    newdiv.classList.add(`${priority}`);
    newdiv.appendChild(check);
    newdiv.appendChild(title);
    newdiv.appendChild(date);
    newdiv.appendChild(deleteBtn);
    const todos = document.querySelector('.todos');
    todos.appendChild(newdiv);
}

//addtodosfile
// function to display form to add todo
function todoBtnListener() {
    console.log('addtodobtn');
    let div = document.querySelector('.add>div');
    div.addEventListener('click',function() {
        console.log('todoclicked');
        let form = document.querySelector('.todoformdiv');
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
            if (mainList.mode !== 'Home') {
                mainList.home.add(todoFactory(title, date, priority, false, mainList.mode));
                mainList.projects[mainList.mode].add(todoFactory(title, date, priority, false, mainList.mode));
            }
            else {
                mainList.home.add(todoFactory(title, date, priority, false));
            }
            document.querySelector('#title').value = "";
            document.querySelector('#date').value = "";
            document.querySelector('#priority').selectedIndex = 0;
            let form = document.querySelector(".todoformdiv");
            form.setAttribute('hidden', '');
            loadTodos();
        }
    });
    
}




initPage();