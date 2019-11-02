import {tasks} from "./addNewTask";
import {PRIORITY_NORMAL, STATUS_CLOSED, STATUS_OPEN} from "./filterTasks";

/**
/////////////Function to add task to DOM
*/
const existingList = document.getElementsByClassName('existingList')[0];
function render (array) {
    /**
     * Create boxes for every task and nesting them into div-container with class="existingList"
     */
    existingList.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const tasksItemBox = document.createElement('div');
        if (array[i].status === STATUS_CLOSED) {
            tasksItemBox.style.backgroundColor='lightgrey';
        }
        tasksItemBox.setAttribute("class", "tasksItemBox");
        existingList.appendChild(tasksItemBox);

        /**
         * Create div for every task's property as; title, status, priority and nesting them into box tasksItemBox
         */
        const tasksTitle = document.createElement('h3');
        const tasksDescription = document.createElement('p');
        const tasksPriority = document.createElement('div');
        tasksTitle.setAttribute('contenteditable', 'false');
        tasksDescription.setAttribute('contenteditable', 'false');

        const appendProperty = (parentNode, childNode) => {
            childNode.setAttribute('class', 'taskProperty');
            parentNode.appendChild(childNode);
        };

        for (let item of [tasksTitle, tasksDescription, tasksPriority]) {
            appendProperty(tasksItemBox, item, item);
        }

        /**
         * Create button that shows priority and optionButton; done, edit, delete
         */
        const optionsRow = document.createElement('div');
        optionsRow.classList.add("flex-container", "options-row");
        const displayPriority = document.createElement('div');
        displayPriority.classList.add('class', 'display_priority','badge', 'badge-primary');
        const optionButton = document.createElement('div');
        optionButton.classList.add("class", 'options-button', 'badge', 'badge-secondary');
        optionButton.innerText = "...";

        const doneTask = document.createElement('div');
        const editTask = document.createElement('div');
        const deleteTask = document.createElement('div');
        tasksItemBox.appendChild(optionsRow);
        optionsRow.appendChild(displayPriority);
        optionsRow.appendChild(optionButton);
        doneTask.innerHTML = "Done";
        editTask.innerHTML = "Edit";
        deleteTask.innerHTML = "Delete";

        for (let btn of [doneTask, editTask, deleteTask]) {
            btn.setAttribute('class', 'option');
            btn.setAttribute('data-task-id', array[i].id);
            btn.style.display='none';
            optionButton.appendChild(btn);
        }

        optionButton.addEventListener('click', (e) => {
            optionButton.firstChild.textContent = '';
             e.target.classList.add('options-active');
            for (let btn of [doneTask, editTask, deleteTask]) {
                btn.style.display = 'block';
            }
        });

        /**
         * To display task properties in the box
         */
        if (array[i].selectedPriority === undefined) {
            displayPriority.innerHTML = 'Normal';
        } else {
            displayPriority.innerHTML = array[i].selectedPriority;
        }

        const saveInto = (createdElement, taskProperty) => {
            createdElement.innerHTML = taskProperty;
        };
        saveInto(tasksTitle, array[i].title);
        saveInto(tasksDescription, array[i].description);

        /**
         * Edit title&description by clicking button edit
         */
        editTask.addEventListener('click', (e) => {
            const btn = e.target;
            const editField = [];
            editField.push(btn.parentNode.parentNode.parentNode.childNodes[0]);
            editField.push(btn.parentNode.parentNode.parentNode.childNodes[1]);
            for (let i = 0; i < editField.length; i++) {
                if (editField[i].hasAttributes('contenteditable')) {
                    editField[i].setAttribute('contenteditable', 'true');
                    editField[i].setAttribute('class', 'editable');
                }
            }

        });

        /**
         * Edit status by clicking button done
         */
        const doneBtn = optionButton.firstChild.nextSibling;

        doneBtn.addEventListener('click', (e) => {
            const btn = e.target;
            btn.style.display='none';
            btn.innerText = '';
            const doneBox = btn.parentNode.parentNode.parentNode;
            doneBox.style.backgroundColor='lightgrey';
            const taskId = parseInt(btn.getAttribute('data-task-id'));

            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].id === taskId) {
                    tasks[i].status = STATUS_CLOSED;
                    break;
                }
            }
        });

        deleteTask.addEventListener('click', (e) => {
            const taskId = parseInt(e.target.getAttribute('data-task-id'));
            console.log(tasks[i].id);
            console.log(taskId);
            if (tasks[i].id === taskId) {
                tasks.splice(tasks[i].id, 1);
                console.log(tasks);
            }
            existingList.removeChild(tasksItemBox);
        })
    }
}

export{render};