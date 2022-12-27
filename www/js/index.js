const ongoing = [...document.getElementById('taskList').children];
const archived = [];

function refreshArchived() {
    archived.map(task => archivedList.appendChild(task));
    $(archivedList).listview('refresh');
}
function refreshOngoing() {
    ongoing.map(task => taskList.appendChild(task))
    $(taskList).listview('refresh');
}
function addTask() {
    if (task.value.length > 0) {
        let newTask = document.createElement('li');
        newTask.innerText = task.value;
        task.value = "";
        ongoing.push(newTask);
        refreshOngoing()
    }
    task.focus();

}

function resetTask() {
    taskList.innerHTML = "";
    archivedList.innerHTML = "";
    task.focus();

}

function handleDelete(event) {
    ongoing.splice(ongoing.indexOf(event.target), 1);
    event.target.remove();
}
function handleCompleted(event) {
    if (event.target.classList.toString().includes('archived')) {
        event.target.classList.remove("archived");
        ongoing.push(archived.pop());
        refreshOngoing()
        refreshArchived()
    } else {

        event.target.classList.add("archived")
        const removed = ongoing.splice(ongoing.indexOf(event.target), 1);
        taskList.innerHTML = "";
        refreshOngoing()
        archived.push(removed[0]);
        refreshArchived()

    }
}

$(function () {
    $("ul").on("swipeleft", 'li', handleDelete);
    $("ul").on("swiperight", 'li', handleCompleted);

})
