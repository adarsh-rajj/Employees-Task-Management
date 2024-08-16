import { getUserData } from "./storage.js";

/***********************************          User              *************************************/
const username = document.getElementById("userName");
const nameError = document.getElementById("nameError");

// // name validation
// export function isName() {
//     const usernameVal = username.value.trim();
//     if (usernameVal === "" || usernameVal.length > 30) {
//         nameError.textContent = "Maximum 30 character and name must be uniqe and not empty.";
//         document.getElementById('userName').style.borderColor = 'red';
//         document.querySelector('.nameWrong').style.display = 'block';
//         document.querySelector('.nameRight').style.display = 'none';
//         return false;
//     } else {
//         nameError.textContent = '';
//         document.querySelector('.nameWrong').style.display = 'none';
//         document.querySelector('.nameRight').style.display = 'block';
//         document.getElementById('userName').style.borderColor = 'green';
//         return true;
//     }
// }

function uniqueNameCheck() {
    const nameCheck = username.value.trim();
    const userData = getUserData();
    let flag = true;
    userData.forEach((element) => {
        if (nameCheck === element.nameVal) {
            flag = false;
        }
    });
    return flag;
}

export function isUniqueName() {
    const usernameVal = username.value.trim();
    if ((!uniqueNameCheck()) || usernameVal === "" || usernameVal.length > 30) {
        nameError.textContent = "Maximum 30 character, name must be uniqe, not empty.";
        document.getElementById('userName').style.borderColor = 'red';
        document.querySelector('.nameWrong').style.display = 'block';
        document.querySelector('.nameRight').style.display = 'none';
        return false;
    } else {
        nameError.textContent = '';
        document.querySelector('.nameWrong').style.display = 'none';
        document.querySelector('.nameRight').style.display = 'block';
        document.getElementById('userName').style.borderColor = 'green';
        return true;
    }
}

export function uniqeValidateForm() {
    return isUniqueName();
}


/*************************************           Task            **********************************/

const title = document.getElementById('taskTitle');
const assigned = document.getElementById('taskAssigned');
const status = document.getElementById('taskStatus');
const description = document.getElementById('taskDescription');

const titleError = document.getElementById('titleError');
const assignedError = document.getElementById('assignedError');
const statusError = document.getElementById('statusError');
const descriptionError = document.getElementById('descriptionError');


// validate title
export function isTitleValid() {
    const titleVal = title.value.trim();
    if (titleVal === '' || titleVal > 30) {
        titleError.textContent = 'title should not be empty, maximum 30 character.'
        document.getElementById('taskTitle').style.borderColor = 'red';
        document.querySelector('.titleWrong').style.display = 'block';
        document.querySelector('.titleRight').style.display = 'none';
        return false;
    } else {
        titleError.textContent = '';
        document.getElementById('taskTitle').style.borderColor = 'green';
        document.querySelector('.titleWrong').style.display = 'none';
        document.querySelector('.titleRight').style.display = 'block';
        return true;
    }

}

// validate assigned
export function isAssignedValid() {
    const assignedVal = assigned.options[assigned.selectedIndex].value;
    if (assignedVal == 0 || assignedVal == 'Select user') {
        assignedError.textContent = 'Please select the assigned name.';
        document.getElementById('taskAssigned').style.borderColor = 'red';
        return false;
    } else {
        assignedError.textContent = '';
        document.getElementById('taskAssigned').style.borderColor = 'green';
        return true;
    }
}

// validate status
export function isStatusValid() {
    const statusVal = status.options[status.selectedIndex].value;
    if (statusVal == 0) {
        statusError.textContent = 'Please select the status.';
        document.getElementById('taskStatus').style.borderColor = 'red';
        return false;
    } else {
        statusError.textContent = '';
        document.getElementById('taskStatus').style.borderColor = 'green';
        return true;
    }
}

// validate description
export function isDescriptionValid() {
    const descriptionVal = description.value.trim();
    if (descriptionVal === '' || descriptionVal.length > 50) {
        descriptionError.textContent = 'description should not be empty, maximum 50 character.';
        document.getElementById('taskDescription').style.borderColor = 'red';
        document.querySelector('.descriptionWrong').style.display = 'block';
        document.querySelector('.descriptionRight').style.display = 'none';
        return false;
    } else {
        descriptionError.textContent = '';
        document.getElementById('taskDescription').style.borderColor = 'green';
        document.querySelector('.descriptionWrong').style.display = 'none';
        document.querySelector('.descriptionRight').style.display = 'block';
        return true;
    }
}


export function taskValidateForm() {
    let isTaskValid = true;
    if (!isTitleValid()) {
        isTaskValid = false;
    }
    if (!isDescriptionValid()) {
        isTaskValid = false;
    }
    if (!isStatusValid()) {
        isTaskValid = false;
    }
    if (!isAssignedValid()) {
        isTaskValid = false;
    }
    return isTaskValid;

    // return (isTitleValid() && isDescriptionValid() && isStatusValid() && isAssignedValid());
}