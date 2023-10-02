const inputTask = document.getElementById("input-task")
const addTaskBtn = document.getElementById("add-task")
const taskList = document.getElementById("lists")


let allTasks = [
    { id: 1136975216789, title: "Add Your Task", isComplete: false }
]


function taskDone(e) {
    const clickedTaskId = e.target.attributes.taskId.value;

    const updatedTaskList = allTasks.map((task) => {
        if (task.id === parseInt(clickedTaskId)) {
            return { ...task, isComplete: true }
        }
        return task;
    })

    allTasks = updatedTaskList;
    renderTasks()
}


function deleteTask(e) {
    const clickedTaskId = e.target.attributes.taskId.value;

    const updatedTaskList = allTasks.filter((task => {
        return (task.id !== parseInt(clickedTaskId))
    }))

    allTasks = updatedTaskList;
    renderTasks()

}


addTaskBtn.addEventListener("click", () => {
    let inputValue = inputTask.value

    if (inputValue) {
        const newTask = {
            id: Date.now(),
            title: inputValue,
            isComplete: false
        }
        allTasks.push(newTask)

        renderTasks()
    }

    inputTask.value = ''
})


function renderTasks() {
    taskList.innerHTML = ''
    allTasks.forEach(task => {
        const li = document.createElement("li")
        li.innerHTML = `<h4 class="${task.isComplete && "completed"}" >${task.title}</h4>
                        <button ${task.isComplete && "disabled"} taskId="${task.id}" class="btn ${task.isComplete && "disabled "} done-btn">✔
                        </button>
                        <button taskId="${task.id}" class="btn delete-btn">✗</button>`

        taskList.appendChild(li)
    })

    document.querySelectorAll(".done-btn").forEach((btn) => {
        btn.addEventListener("click", taskDone)
    })

    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", deleteTask)
    })

}


renderTasks()