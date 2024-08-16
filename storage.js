// User
export function getUserData() {
    return JSON.parse(localStorage.getItem('userProfile')) || [];
}

export function saveUserData(user) {
    const users = getUserData();
    users.push(user);
    localStorage.setItem('userProfile', JSON.stringify(users));
}

export function updateUserData(index, user) {
    const users = getUserData();
    users[index] = user;
    localStorage.setItem('userProfile', JSON.stringify(users));
}

export function deleteUser(index) {
    const users = getUserData();
    users.splice(index, 1);
    localStorage.setItem('userProfile', JSON.stringify(users));
}

/*************************************             Task           ***************************************/

export function getTaskData(){
    return JSON.parse(localStorage.getItem('taskProfile')) || [];
}

export function saveTaskData(task){
    const tasks = getTaskData();
    tasks.push(task);
    localStorage.setItem('taskProfile', JSON.stringify(tasks));
}

export function updateTaskData(index, task){
    const tasks = getTaskData();
    tasks[index] = task;
    localStorage.setItem('taskProfile', JSON.stringify(tasks));
}

export function deleteTask(index){
    const tasks = getTaskData();
    tasks.splice(index, 1);
    localStorage.setItem('taskProfile', JSON.stringify(tasks));
}
