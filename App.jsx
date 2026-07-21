import "./App.css";
import { useState, useEffect } from "react";

function App() {


const [habit,setHabit]=useState("");

const [search,setSearch]=useState("");

const [category,setCategory]=useState("Study");

const [filterCategory,setFilterCategory]=useState("All");


const [darkMode,setDarkMode]=useState(false);



/* Step 19 */

const [streak,setStreak]=useState(0);



/* Step 20 */

const [completedDates,setCompletedDates]=useState([]);



/* Step 21 */

const [showReminder,setShowReminder]=useState(false);





/* Step 22 Profile */


const [username,setUsername]=useState("Kavin");


const [dailyGoal,setDailyGoal]=useState(5);


const [showProfile,setShowProfile]=useState(false);






const [habits,setHabits]=useState(()=>{


const savedHabits=
localStorage.getItem("habits");


return savedHabits
?
JSON.parse(savedHabits)
:
[];


});







// Save Habit


useEffect(()=>{


localStorage.setItem(

"habits",

JSON.stringify(habits)

);


},[habits]);








// Reminder


useEffect(()=>{


const timer=setTimeout(()=>{


setShowReminder(true);


},2000);



return()=>clearTimeout(timer);



},[]);







// Save Profile


useEffect(()=>{


localStorage.setItem(

"username",

username

);



localStorage.setItem(

"dailyGoal",

dailyGoal

);



},[username,dailyGoal]);





const closeReminder=()=>{


setShowReminder(false);


};
// Add Habit

const addHabit = () => {

  if(habit.trim()==="")
    return;


  const newHabit = {

    id:Date.now(),

    name:habit,

    category:category,

    date:new Date()
    .toLocaleDateString(),

    completed:false

  };


  setHabits([

    ...habits,

    newHabit

  ]);


  setHabit("");

};






// Delete Habit

const deleteHabit=(id)=>{


 setHabits(

  habits.filter(
    item=>item.id!==id
  )

 );


};







// Edit Habit

const editHabit=(id)=>{


const selectedHabit =
habits.find(
item=>item.id===id
);



const updatedName =
prompt(
"Edit Habit",
selectedHabit.name
);



if(
updatedName===null ||
updatedName.trim()===""
)
return;



setHabits(

habits.map(item=>

item.id===id

?

{
...item,
name:updatedName
}

:

item

)

);



};









// Complete Habit + Streak


const toggleComplete=(id)=>{


const updatedHabits =

habits.map(item=>{


if(item.id===id)

{


return{

...item,

completed:
!item.completed

};


}


return item;


});




setHabits(updatedHabits);



const count =

updatedHabits.filter(

item=>item.completed

).length;



setStreak(count);




const today =

new Date()
.toLocaleDateString();



if(
!completedDates.includes(today)
)

{

setCompletedDates([

...completedDates,

today

]);

}


};









// Filter


const filteredHabits =

habits.filter(item=>{


const searchMatch =

item.name
.toLowerCase()
.includes(
search.toLowerCase()
);



const categoryMatch =

filterCategory==="All"

||

item.category===filterCategory;



return searchMatch && categoryMatch;


});






const totalHabits =
habits.length;


const completedHabits =

habits.filter(
item=>item.completed
).length;



const pendingHabits =

totalHabits-completedHabits;



const progress =

totalHabits===0
?
0
:
Math.round(
(completedHabits/totalHabits)*100
);








return (

<div className={
darkMode
?
"container dark"
:
"container"
}>




{/* Reminder */}

{

showReminder && (

<div className="reminder">


<h3>
🔔 Reminder
</h3>


<p>
Don't forget your habits today!
</p>


<button
onClick={closeReminder}
>
OK
</button>


</div>

)

}








<h1>
🏆 Habit Tracker
</h1>



<p className="subtitle">
Build Better Habits Everyday
</p>








<button

className="theme-btn"

onClick={()=>
setDarkMode(!darkMode)
}

>

{

darkMode
?
"☀️ Light Mode"
:
"🌙 Dark Mode"

}


</button>







{/* Step 22 Profile Button */}


<button

className="profile-btn"

onClick={()=>
setShowProfile(!showProfile)
}

>

👤 Profile

</button>







{/* Profile Card */}


{

showProfile && (

<div className="profile-card">


<h2>
👤 {username}
</h2>


<p>
Role:
Full Stack Developer
</p>


<p>
🎯 Daily Goal:
{dailyGoal} Habits
</p>



<input

type="number"

value={dailyGoal}

onChange={(e)=>
setDailyGoal(e.target.value)
}

/>


</div>

)

}









{/* Dashboard */}


<div className="dashboard">


<div className="card">

<h2>
{totalHabits}
</h2>

<p>
Total
</p>

</div>



<div className="card">

<h2>
{completedHabits}
</h2>

<p>
Completed
</p>

</div>




<div className="card">

<h2>
{pendingHabits}
</h2>

<p>
Pending
</p>

</div>




<div className="card">

<h2>
🔥 {streak}
</h2>

<p>
Streak
</p>

</div>



</div>









{/* Progress */}


<div className="progress-section">


<div className="progress-header">


<h3>
Progress
</h3>


<span>
{progress}%
</span>


</div>



<div className="progress-bar">


<div

className="progress-fill"

style={{
width:`${progress}%`
}}

>


</div>


</div>


</div>









{/* Add Habit */}


<div className="input-section">


<input

placeholder="Enter Habit"

value={habit}

onChange={(e)=>
setHabit(e.target.value)
}

/>



<select

value={category}

onChange={(e)=>
setCategory(e.target.value)
}

>


<option value="Study">
📚 Study
</option>


<option value="Health">
💪 Health
</option>


<option value="Coding">
💻 Coding
</option>


</select>




<button
onClick={addHabit}
>

Add

</button>



</div>








{/* Search */}


<input

className="search"

placeholder="Search Habit..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>








{/* Category Filter */}


<div className="filter-section">


<button
onClick={()=>
setFilterCategory("All")
}
>
All
</button>


<button
onClick={()=>
setFilterCategory("Study")
}
>
📚 Study
</button>



<button
onClick={()=>
setFilterCategory("Health")
}
>
💪 Health
</button>



<button
onClick={()=>
setFilterCategory("Coding")
}
>
💻 Coding
</button>


</div>









{/* Habit List */}


<ul>


{

filteredHabits.map(item=>(


<li key={item.id}>


<div className="habit-info">


<input

type="checkbox"

checked={item.completed}

onChange={()=>
toggleComplete(item.id)
}

/>



<div>

<h3>
{item.name}
</h3>


<small>
Category : {item.category}
</small>


<br/>


<small>
Added : {item.date}
</small>


</div>



</div>







<div>


<button

className="edit-btn"

onClick={()=>
editHabit(item.id)
}

>

Edit

</button>





<button

className="delete-btn"

onClick={()=>
deleteHabit(item.id)
}

>

Delete

</button>


</div>




</li>


))


}


</ul>





</div>

);


}


export default App;