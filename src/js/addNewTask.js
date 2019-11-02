import {render} from './renderTaskList';
import {STATUS_OPEN, PRIORITY_NORMAL} from './filterTasks';

const save = document.getElementById('newTaskSave');
const newTaskTitle = document.getElementById('newTaskTitle');
const newTaskDescription = document.getElementById('newTaskDescription');
const newTaskPriority = document.getElementById('newTaskPriority');
/**
 Array of ToDo list template items that will accept new created items
 */

let currentId = 1;
const tasks = [
    {
        id: currentId++,
        title: 'First',
        description: 'First todo item',
        priority: PRIORITY_NORMAL,
        status: STATUS_OPEN
    },
    {
        id: currentId++,
        title: 'Second',
        description: 'Second todo item',
        priority: PRIORITY_NORMAL,
        status: STATUS_OPEN
    },
    {
        id: currentId++,
        title: 'Third',
        description: 'Third todo item',
        priority: PRIORITY_NORMAL,
        status: STATUS_OPEN
    },
];

document.addEventListener('DOMContentLoaded', () => {
    render(tasks);
});

save.addEventListener('click', e => {
    e.preventDefault();
    const x = newTaskPriority.selectedIndex;
    const y = newTaskPriority.options;
    let newTask = {
        id: currentId++,
        title: newTaskTitle.value,
        description: newTaskDescription.value,
        priority: parseInt(newTaskPriority.value),
        selectedPriority: y[x].text,
        status: STATUS_OPEN
    };

    if (newTask.title.trim().length == 0 || newTask.description.trim().length == 0) {
        newTask.title = 'No title';
        newTask.description = 'No description';
    }

    tasks.push(newTask);  //////////////Add new task to array
    render(tasks);
    console.log(tasks);

    newTaskTitle.value='';
    newTaskDescription.value='';
});

export {tasks, currentId};