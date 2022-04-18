import { getTasksFromLocalStorage, addTask, deleteTask, toggle } from './modules/toDoModule.js'

getTasksFromLocalStorage()

document.querySelector('#add').onclick = addTask

document.querySelector('#tasks').onclick = (event) => {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'))
    }

    if (event.target.classList.contains('button--delete')) {
        deleteTask(event.target.parentElement.getAttribute('data-key'))
    }
}