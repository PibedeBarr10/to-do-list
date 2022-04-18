let tasks = []
let tasksHTML = document.querySelector('#tasks')

const getTasksFromLocalStorage = () => {
    const storageTasks = localStorage.getItem('tasks')

    if (storageTasks) {
        tasks = JSON.parse(storageTasks);
        renderAllTasks()
    }
}

function createTaskElement (task) {
    const checked = task.completed ? 'checked': ''

    const li = document.createElement('li')
    li.setAttribute('class', 'task tasks__task')
    li.setAttribute('data-key', task.id)

    li.innerHTML = `
        <input type="checkbox" class="checkbox" ${ checked }>
        <span class="text task__text">${ task.text }</span>
        <button class="button--delete task__button--delete">Delete</button>
    `

    return li
}

function renderAllTasks () {
    tasksHTML.innerHTML = ''

    tasks.forEach((task) => {
        const li = createTaskElement(task)
        tasksHTML.append(li)
    })
}

function renderTask (task) {
    const li = createTaskElement(task)
    tasksHTML.append(li)
}

const addTask = () => {
    const inputText = document.querySelector('#newtask input').value
    if(inputText.length === 0){
        alert("Please Enter a Task")
        return
    }

    const newTask = {
        id: Date.now(),
        text: inputText,
        completed: false
    }

    tasks.push(newTask)

    saveToLocalStorage()
    renderTask(newTask)
    resetInputValue()
}

const deleteTask = (id) => {
    tasks = tasks.filter((task) => {
        return task.id !== parseInt(id)
    })

    saveToLocalStorage()
    document.querySelector(`[data-key='${id}']`).remove()
}

const toggle = (id) => {
    tasks.forEach((task) => {
        if (task.id === parseInt(id)) {
            task.completed = !task.completed
        }
    })

    saveToLocalStorage()
}

const saveToLocalStorage = () => localStorage.setItem('tasks', JSON.stringify(tasks))

const resetInputValue = () => document.querySelector('#newtask input').value = ''

export { getTasksFromLocalStorage, addTask, deleteTask, toggle }