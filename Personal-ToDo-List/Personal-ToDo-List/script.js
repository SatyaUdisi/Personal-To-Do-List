
const KEY = "personal_todo_tasks";

let tasks = JSON.parse(localStorage.getItem(KEY)) || [
 {id:"1",name:"Review study notes",cat:"Study",priority:"High",status:"Pending",date:dayFromNow(0)},
 {id:"2",name:"Buy groceries",cat:"Personal",priority:"Medium",status:"Pending",date:dayFromNow(1)},
 {id:"3",name:"Plan weekly workout",cat:"Health",priority:"Low",status:"Completed",date:dayFromNow(3)},
 {id:"4",name:"Organize desk",cat:"Personal",priority:"Medium",status:"Pending",date:""}
];

tasks = tasks.map(t => ({
 ...t, priority:t.priority || "Medium", date:t.date || ""
}));

let currentView = "all";
const $ = id => document.getElementById(id);
const save = () => localStorage.setItem(KEY,JSON.stringify(tasks));
const today = () => localDate(new Date());

function localDate(d) {
 return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function dayFromNow(days) {
 const date=new Date();
 date.setDate(date.getDate()+days);
 return localDate(date);
}

function render() {
 const now = new Date();
 const tom = new Date(now);
 tom.setDate(tom.getDate()+1);
 const mon = new Date(now);
 mon.setDate(mon.getDate()-(mon.getDay()+6)%7);
 const sun = new Date(mon);
 sun.setDate(sun.getDate()+6);
 const weekStart = localDate(mon);
 const weekEnd = localDate(sun);
 const dayTasks = tasks.filter(t=>t.date===today());
 const tomorrowTasks = tasks.filter(t=>t.date===localDate(tom));
 const weekTasks = tasks.filter(t => t.date && t.date>=weekStart && t.date<=weekEnd);
 const backlogTasks = tasks.filter(t=>!t.date || (t.date<today() && t.status==="Pending"));
 updateCard("today",dayTasks);
 updateCard("tomorrow",tomorrowTasks);
 updateCard("week",weekTasks);
 $("backlog-count").textContent=backlogTasks.length;
 $("backlog-detail").textContent=`${tasks.filter(t=>!t.date).length} unscheduled · ${tasks.filter(t=>t.date && t.date<today() && t.status==="Pending").length} overdue`;
 $("backlog-bar").style.setProperty("--progress",`${tasks.length?backlogTasks.length/tasks.length*100:0}%`);
 document.querySelectorAll(".view-btn").forEach(button=>button.classList.toggle("active",button.dataset.view===currentView));
 const summary = $("view-summary");
 summary.hidden = currentView!=="week" && currentView!=="backlog";
 summary.textContent = currentView==="week"
  ? `This week: ${weekTasks.filter(t=>t.status==="Pending").length} pending, ${weekTasks.filter(t=>t.status==="Completed").length} completed. Tasks are ordered by due date.`
  : currentView==="backlog"
   ? "Backlog includes tasks without a due date and overdue pending tasks. Edit a task and set its due date to schedule it."
   : "";

 const q = $("search").value.toLowerCase();
 let list = tasks.filter(t => {
  const d = t.date;
  const view = currentView==="all" ||
   (currentView==="today" && d===today()) ||
   (currentView==="tomorrow" && d===localDate(tom)) ||
   (currentView==="week" && d>=weekStart && d<=weekEnd) ||
   (currentView==="backlog" && (!d || (d<today() && t.status==="Pending")));

  return t.name.toLowerCase().includes(q) && view &&
   ($("filter-cat").value==="all" || t.cat===$("filter-cat").value) &&
   ($("filter-priority").value==="all" || t.priority===$("filter-priority").value) &&
   ($("filter-status").value==="all" || t.status===$("filter-status").value);
 });
 if(currentView==="week")list.sort((a,b)=>a.date.localeCompare(b.date));

 $("task-tbody").innerHTML = list.map(t=>`
 <tr class="${currentView==="today" && t.status==="Pending" ? "pending-task" : ""}">
 <td>${escapeHTML(t.name)}</td><td>${escapeHTML(t.cat)}</td>
 <td>${escapeHTML(t.priority)}</td><td>${escapeHTML(t.status)}</td>
 <td>${t.date || "No date"}</td>
 <td><button onclick="editTask('${t.id}')">Edit</button>
 <button onclick="delTask('${t.id}')">Delete</button></td>
 </tr>`).join("");

 $("no-task").style.display=list.length?"none":"block";
}

function updateCard(name,list) {
 const completed=list.filter(t=>t.status==="Completed").length;
 const pending=list.filter(t=>t.status==="Pending").length;
 $(`${name}-count`).textContent=list.length;
 $(`${name}-detail`).textContent=`Completed ${completed} · Pending ${pending}`;
 $(`${name}-bar`).style.setProperty("--progress",`${list.length?completed/list.length*100:0}%`);
}

function escapeHTML(s) {
 return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

$("task-form").onsubmit=e=>{
 e.preventDefault();
 const id=$("task-id").value;
 const data={name:$("task-name").value.trim(),cat:$("task-cat").value,
 priority:$("task-priority").value,status:$("task-status").value,date:$("task-date").value};
 if(!data.name)return alert("Enter task name");
 if(id)Object.assign(tasks.find(t=>t.id===id),data);
 else tasks.unshift({id:Date.now().toString(),...data});
 save();resetForm();
 currentView="all";
 $("search").value="";
 $("filter-cat").value=$("filter-priority").value=$("filter-status").value="all";
 render();
};

window.editTask=id=>{
 const t=tasks.find(x=>x.id===id);
 if(!t)return;
 $("task-id").value=t.id;
 $("task-name").value=t.name;
 $("task-cat").value=t.cat;
 $("task-priority").value=t.priority;
 $("task-status").value=t.status;
 $("task-date").value=t.date;
 $("sub-btn").textContent="Update Task";
 $("cancel-btn").hidden=false;
};

window.delTask=id=>{
 if(confirm("Delete this task?")){
 tasks=tasks.filter(t=>t.id!==id);
 save();resetForm();render();
 }
};

function resetForm(){
 $("task-form").reset();
 $("task-id").value="";
 $("task-priority").value="Medium";
 $("task-status").value="Pending";
 $("sub-btn").textContent="Add Todo";
 $("cancel-btn").hidden=true;
}

$("cancel-btn").onclick=resetForm;
window.showTasks=view=>{currentView=view;render();};

[$("search"),$("filter-cat"),$("filter-priority"),$("filter-status")].forEach(el=>el.oninput=render);

$("reset-btn").onclick=()=>{
 $("search").value="";
 $("filter-cat").value="all";
 $("filter-priority").value="all";
 $("filter-status").value="all";
 currentView="all";
 render();
};

save();
render();
