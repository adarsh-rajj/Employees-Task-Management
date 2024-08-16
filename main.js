import { deleteTask, deleteUser, getTaskData, getUserData, saveTaskData, saveUserData, updateTaskData, updateUserData } from "./storage.js";
import { isAssignedValid, isDescriptionValid, isStatusValid, isTitleValid, isUniqueName, taskValidateForm, uniqeValidateForm } from "./validation.js";


/********************************       User Table          ************************************/

const userForm = document.getElementById('userForm');
const username = document.getElementById("userName");

const userModalElement = document.getElementById('userModal');
const userModal = new bootstrap.Modal(userModalElement);
const openUserModalButton = document.getElementById('showModal');
const closeUserModalButton = document.getElementById('closeModal');
const submitButton = document.getElementById('submitBtn');

const deleteModalElement = document.getElementById('deleteConfirmationUserModal');
const deleteModal = new bootstrap.Modal(deleteModalElement);
const confirmDeleteButton = document.getElementById('confirmUserDeleteBtn');
const cancelDeleteButton = document.getElementById('cancleUserConfirmBtn');

const ignoreModalElement = document.getElementById('userIgnoreModal');
const ignoreModal = new bootstrap.Modal(ignoreModalElement);
const userIgnoreBtn = document.getElementById('userIgnoreBtn');

let currentEditIndex = -1;

function openModal(modal) {
    modal.show();
}
function closeModal(modal) {
    modal.hide();
}

// for removing border style of user
function removeUserValidationStyle(){
    nameError.textContent = '';
    document.getElementById('userName').style.borderColor = '';
    document.querySelector('.nameWrong').style.display = 'none';
    document.querySelector('.nameRight').style.display = 'none';
}

openUserModalButton.addEventListener('click', () => {
    removeUserValidationStyle();
    userModalElement.querySelector('.users').textContent = 'Add user';
    currentEditIndex = -1;
    userForm.reset();
    openModal(userModal);
});

closeUserModalButton.addEventListener('click', () => {
    closeModal(userModal);
});

// on submit form 
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const nameVal = username.value.trim();
    // const isValid = validateForm();
    const uniqeNameValid = uniqeValidateForm();
    if (uniqeNameValid) {
        const userData = { nameVal };
        if (currentEditIndex >= 0) {
            updateUserData(currentEditIndex, userData);
            currentEditIndex = -1;
        } else {
            saveUserData({ nameVal });
        }
        closeModal(userModal);
        fillAssignedUser();
        displayUsers();
        userForm.reset();
    }
});
displayUsers();

// validation for blur
username.addEventListener('blur', isUniqueName);

// validation on input
username.addEventListener('input', isUniqueName);

// display user data 
function displayUsers() {
    const user = getUserData();
    const userTableBody = document.getElementById('userShowData');
    userTableBody.innerHTML = '';

    user.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML =
            `
                <td scope='col' class="text-center">${user.nameVal}</td>
                <td scope='col' class='text-center'>
                    <button class="btn btn-sm" onclick="edituser(${index})"><i class="bi bi-pencil-fill"></i></button>
                    <button class="btn btn-sm" onclick="confirmDeleteuser(${index})"><i class="bi bi-trash"></i></button>
                </td>
            `;
        userTableBody.appendChild(row);
    });
}

// edit user table
window.edituser = (index) => {
    currentEditIndex = index;
    const users = getUserData();
    const user = users[index];

    removeUserValidationStyle();

    const userModalElement = document.getElementById('userModal');
    const userNameInput = document.getElementById('userName');
    userModalElement.querySelector('.users').textContent = 'Edit user';
    userNameInput.value = user.nameVal;
    openModal(userModal);
}

// delete user data
cancelDeleteButton.addEventListener('click', () => closeModal(deleteModal));
userIgnoreBtn.addEventListener('click', () => closeModal(ignoreModal));
window.confirmDeleteuser = (index) => {
    currentEditIndex = index;
    openModal(deleteModal);
    confirmDeleteButton.addEventListener('click', () => {
        if (currentEditIndex >= 0) {
            if (isAssignedTask(currentEditIndex)) {
                openModal(ignoreModal);
                closeModal(deleteModal);
            }
            else {
                deleteUser(currentEditIndex);
                currentEditIndex = -1;
                closeModal(deleteModal);
            }
        }
        fillAssignedUser();
        displayUsers();
    })
};

function isAssignedTask(index) {
    const userData = getUserData();
    const taskData = getTaskData();
    let isAssigedTask = false;
    currentEditIndex = index;
    if (currentEditIndex >= 0 && currentEditIndex < userData.length) {
        const userIndex = userData[currentEditIndex];
        for (let i = 0; i < taskData.length; i++) {
            if (taskData[i].assignedVal === userIndex.nameVal) {
                isAssigedTask = true;
                break;
            }
        }
    }
    return isAssigedTask;
}


/************************************         Task          **********************************************/


const taskForm = document.getElementById('taskForm');
const title = document.getElementById("taskTitle");
const assigned = document.getElementById("taskAssigned");
const status = document.getElementById("taskStatus");
const description = document.getElementById("taskDescription");
const taskModalElement = document.getElementById('taskModal');

const taskModal = new bootstrap.Modal(taskModalElement);
const taskOpenModalButton = document.getElementById('taskShowModal');
const taskCloseModalButton = document.getElementById('taskCloseModal');
const taskSubmitButton = document.getElementById('taskSubmitBtn');
const searchTask = document.getElementById('searchTask');

const titleError = document.getElementById('titleError');
const assignedError = document.getElementById('assignedError');
const statusError = document.getElementById('statusError');
const descriptionError = document.getElementById('descriptionError');

const deleteTaskModalElement = document.getElementById('deleteConfirmationTaskModal');
const deleteTaskModal = new bootstrap.Modal(deleteTaskModalElement);
const confirmDeleteTaskButton = document.getElementById('confirmTaskDeleteBtn');
const cancelDeleteTaskButton = document.getElementById('cancleTaskConfirmBtn');

const ignoreTaskModalElement = document.getElementById('taskIgnoreModal');
const ignoreTaskModal = new bootstrap.Modal(ignoreTaskModalElement);
const taskIgnoreBtn = document.getElementById('taskIgnoreBtn');

let currTaskEditIndex = -1;

function taskOpenModal(newModal) {
    newModal.show();
}
function taskCloseModal(newModal) {
    newModal.hide();
}

// for removeing style border of task
function removeTaskValidationStyle() {
    titleError.textContent = '';
    assignedError.textContent = '';
    statusError.textContent = '';
    descriptionError.textContent = '';
    document.getElementById('taskTitle').style.borderColor = '';
    document.getElementById('taskAssigned').style.borderColor = '';
    document.getElementById('taskStatus').style.borderColor = '';
    document.getElementById('taskDescription').style.borderColor = '';
    document.querySelector('.titleWrong').style.display = 'none';
    document.querySelector('.titleRight').style.display = 'none';
    document.querySelector('.descriptionWrong').style.display = 'none';
    document.querySelector('.descriptionRight').style.display = 'none';
}

taskOpenModalButton.addEventListener('click', () => {
    taskForm.reset();
    currTaskEditIndex = -1;

    removeTaskValidationStyle();

    taskModalElement.querySelector('.tasks').textContent = 'Add Task';
    taskOpenModal(taskModal);
});

taskCloseModalButton.addEventListener('click', () => {
    taskCloseModal(taskModal);
});

// on submit task form
taskSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();

    const titleVal = title.value.trim();
    const assignedVal = assigned.value;
    const statusVal = status.value;
    const descriptionVal = description.value.trim();

    let taskValid = taskValidateForm();
    if (taskValid) {
        const taskData = { titleVal, descriptionVal, assignedVal, statusVal };
        if (currTaskEditIndex >= 0) {
            updateTaskData(currTaskEditIndex, taskData);
            currTaskEditIndex = -1;
        } else {
            saveTaskData(taskData);
        }
        taskCloseModal(taskModal);
        displayTask();
        clearSearchInput();
        taskForm.reset();
    }
});
displayTask();

// validation for blur
title.addEventListener('blur', isTitleValid);
description.addEventListener('blur', isDescriptionValid);
status.addEventListener('blur', isStatusValid);
assigned.addEventListener('blur', isAssignedValid);

// validation on input
title.addEventListener('input', isTitleValid);
description.addEventListener('input', isDescriptionValid);
status.addEventListener('input', isStatusValid);
assigned.addEventListener('input', isAssignedValid);

// user name assigned dropdown
function fillAssignedUser() {
    const dropdown = document.getElementById('taskAssigned');
    let assignedUser = getUserData();
    dropdown.innerHTML = '';
    dropdown.innerHTML = `<option selected disabled>Select user</option>`;
    assignedUser.forEach(user => {
        const option = document.createElement('option');
        option.value = user.nameVal;
        option.textContent = user.nameVal;
        dropdown.appendChild(option);
    });
}
fillAssignedUser();

// display task data
function displayTask() {
    const tasks = getTaskData()
    let taskTableBody = document.getElementById('taskShowData');
    taskTableBody.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML =
            `
                <td scope='col' class="text-center">${task.titleVal}</td>
                <td scope='col' class="text-center">${task.descriptionVal}</td>
                <td scope='col' class="text-center">${task.assignedVal}</td>
                <td scope='col' class="text-center">${task.statusVal}</td>
                <td scope='col' class='text-center'>
                    <button class="btn btn-sm" onclick="editTask(${index})"><i class="bi bi-pencil-fill"></i></button>
                    <button class="btn btn-sm" onclick="confirmDeleteTask(${index})"><i class="bi bi-trash"></i></button>
                </td>
            `;
        taskTableBody.appendChild(row);
    });
}   

// edit task data
window.editTask = (index) => {
    currTaskEditIndex = index;
    const tasks = getTaskData();
    const task = tasks[index];

    removeTaskValidationStyle();

    const taskModalElement = document.getElementById('taskModal');
    const taskTitleInput = document.getElementById('taskTitle');
    const taskAssignedInput = document.getElementById('taskAssigned');
    const taskStatusInput = document.getElementById('taskStatus');
    const taskDescriptionInput = document.getElementById('taskDescription');

    taskModalElement.querySelector('.tasks').textContent = 'Edit Task';
    taskTitleInput.value = task.titleVal;
    taskAssignedInput.value = task.assignedVal;
    taskStatusInput.value = task.statusVal;
    taskDescriptionInput.value = task.descriptionVal;

    taskOpenModal(taskModal);
}


// delete task data
cancelDeleteTaskButton.addEventListener('click', () => closeModal(deleteTaskModal));
taskIgnoreBtn.addEventListener('click', () => closeModal(ignoreTaskModal));
window.confirmDeleteTask = (index) => {
    currTaskEditIndex = index;
    openModal(deleteTaskModal);
    confirmDeleteTaskButton.addEventListener('click', () => {
        let status = getTaskData();
        if (currTaskEditIndex >= 0 && currTaskEditIndex < status.length) {
            const statusCompleted = status[currTaskEditIndex];
            if (statusCompleted.statusVal === 'Completed') {
                closeModal(deleteTaskModal);
                openModal(ignoreTaskModal);
            }
            else {
                deleteTask(currTaskEditIndex);
                currTaskEditIndex = -1;
                closeModal(deleteTaskModal);
            }
        }
        displayTask();
        clearSearchInput();
    });
};


// search task
searchTask.addEventListener('input', () => {
    let tdTitle, tdAssigned, tdStatus;

    const input = document.getElementById("searchTask");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("taskShowData");
    const tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        tdTitle = tr[i].getElementsByTagName("td")[0];
        tdAssigned = tr[i].getElementsByTagName("td")[2];
        tdStatus = tr[i].getElementsByTagName("td")[3];

        const txtValueTitle = (tdTitle.textContent || tdTitle.innerText);
        const txtValueAssigned = (tdAssigned.textContent || tdAssigned.innerText);
        const txtValueStatus = (tdStatus.textContent || tdStatus.innerText);

        const filterTitle = txtValueTitle.toUpperCase().indexOf(filter);
        const filterAssigned = txtValueAssigned.toUpperCase().indexOf(filter);
        const filterStatus = txtValueStatus.toUpperCase().indexOf(filter);

        if (tdTitle || tdAssigned || tdStatus) {
            if (filterTitle > -1 || filterAssigned > -1 || filterStatus > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
})

// for clear search after edit or delete
function clearSearchInput() {
    document.getElementById('searchTask').value = '';
}