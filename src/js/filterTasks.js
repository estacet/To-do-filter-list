import {tasks} from './addNewTask';
import {render} from "./renderTaskList";

/**
 * //////////////////////Filter by different criterias*/

const PRIORITY_LOW = 2;
const PRIORITY_NORMAL = 3;
const PRIORITY_HIGH = 4;
const PRIORITY_UNSET = 1;

const STATUS_OPEN = 2;
const STATUS_CLOSED = 3;
const STATUS_UNSET = 1;

let priorityFilter = null;
let statusFilter = null;
let titleFilter = null;

function filter()
{
    let result = tasks;

    if (priorityFilter !== null) {
        result = result.filter(item => item.priority === priorityFilter);
    }

    if (statusFilter !== null) {
        result = result.filter(item => item.status === statusFilter);
    }

    if (titleFilter !== null) {
        let regex = new RegExp(titleFilter, 'gi');
        result = result.filter(item => item.title.match(regex));
    }

    render(result);
}

const filterTitleElement = document.getElementById('js-filter-title');
filterTitleElement.focus();
filterTitleElement.addEventListener('keyup', e => {
    titleFilter = e.target.value;

    filter();
});

const filterPriorityElement = document.getElementById('js-filter-priority').addEventListener('change', e => {
    priorityFilter = parseInt(e.target.value);

    if (priorityFilter === PRIORITY_UNSET){
        priorityFilter = null;
    }

    filter();
});

const filterStatusElement = document.getElementById('js-filter-status').addEventListener('change', e => {
    statusFilter = parseInt(e.target.value);

    if (statusFilter === STATUS_UNSET){
        statusFilter = null;
    }

    filter();
});
export {STATUS_OPEN, STATUS_CLOSED, STATUS_UNSET, PRIORITY_NORMAL, PRIORITY_LOW, PRIORITY_HIGH, PRIORITY_UNSET};