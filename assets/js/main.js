// ----- Read JSON Data ----- //
async function fetchJsonData(file) {
   const proxyUrl = 'https://serene-savannah-61000.herokuapp.com/';
   try {
      let response = await fetch(proxyUrl + file);
      let data = await response.json();
      return data;
   } catch (error) {
      console.log(error);
      throw new Error(error);
   }
}
// ----- Get Random Pastel Color ----- //
function getPastelColor() {
   return `hsl(${360 * Math.random()}, 
    ${25 + 50 * Math.random()}%, 
    ${85 + 0 * Math.random()}%)`;
}
// ----- Set Task State ----- //
function setTaskState(e, done) {
   const taskItem = e.parentNode.parentNode.style;
   if (done) {
      e.checked = true;
      taskItem.setProperty('--bg-base', '#77dd77');
      taskItem.setProperty('--text-decor', 'line-through');
   } else {
      taskItem.setProperty('--bg-base', getPastelColor());
      taskItem.setProperty('--text-decor', 'none');
   }
}
// ----- Change Task State ----- //
function changeTaskState(e) {
   setTaskState(e, e.checked);
}
// ----- Create Tasks ----- //
function createTasks(data) {
   const taskContainer = document.querySelector('.tasks');
   data.forEach(task => {
      taskContainer.insertAdjacentHTML('afterbegin', templateTask(task));

      const taskState = taskContainer.querySelector('.task__state');
      setTaskState(taskState, task.done);
   });
}
// ----- Template Task ----- //
function templateTask(task) {
   return `<section id=TI__${task.id} class="task">
                <h2 class="task__title">${task.title}</h2>
                <p class="task__description">
                    ${task.description}
                </p>
                <article class="task__buttons">
                <input
                    type="button"
                    class="task__delete button"
                    onclick="deleteTask(this);"
                    value="&#128465;"
                />
                <input
                    type="checkbox"
                    class="task__state"
                    onclick="changeTaskState(this);"
                    value="¿Done?"
                />
                </article>
            </section>`;
}
// ----- Delete Task ----- //
function deleteTask(e) {
   const taskItem = e.parentNode.parentNode;
   taskItem.parentNode.removeChild(taskItem);
}
// ----- Pop Up ----- //
function addTaskPopUP() {
   alert('Pop Up in Development...');
}
// ----- INIT ----- //
console.log(fetchJsonData('../assets/data/MOCK_DATA.json'));
fetchJsonData('../assets/data/MOCK_DATA.json').then(createTasks);
