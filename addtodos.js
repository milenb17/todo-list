//addtodosfile
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
function formListener(mode) {
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
            if (mode !== 'Home') {
                mainList.home.add(todoFactory(title, date, priority, false, mode));
                mainList.projects[mode].add(todoFactory(title, date, priority, false, mode));
            }
            else {
                mainList.home.add(todoFactory(title, date, priority, false));
            }
            document.querySelector('#title').value = "";
            document.querySelector('#date').value = "";
            document.querySelector('#priority').selectedIndex = 0;
            let form = document.querySelector(".formdiv");
            form.setAttribute('hidden', '');
            loadTodos(mode);
        }
    });
    
}

export {todoBtnListener, formListener};