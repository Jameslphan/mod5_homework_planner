//array of objects for each time slot
let schedule = 
[
    { 
        Time: "9 am", 
        tag: 9, 
        tasks: ""
    },

    {
        Time: "10 am",
        tag: 10,
        tasks: ""
    },

    {
        Time: "11 am",
        tag: 11,
        tasks: ""
    },

    {
        Time: "12 pm",
        tag: 12,
        tasks: ""
    },

    {
        Time: "1 pm",
        tag: 13,
        tasks: ""
    },

    {
        Time: "2 pm",
        tag: 14,
        tasks: ""
    },

    {
        Time: "3 pm",
        tag: 15,
        tasks: ""
    },

    {
        Time: "4 pm",
        tag: 16,
        tasks: ""
    },

    {
        Time: "5 pm",
        tag: 17,
        tasks: ""
    }
];

$(document).ready(function() {
    //Checks for tasks to load
    tasks();

    //Add date and time to <p> element with id = currentDay 
    $("#currentDay").text(moment().format('MMM Do YYYY, h:mm a'));

    //loads main container to var timeBlocks
    var timeBlocks = $("#timeBlocks");

    //set currentHour to military time 
    var currentHour = (moment().format('H'));  

    //itterate for every item in array
    $.each(schedule, function(i, time) {
        
        //make a new row with the id of time[i] and append it as a child of the container
        timeBlocks.append("<div id=\"time" + i + "\"" + "class=\"row\"></div>");
        
        //append a child div with the id of currentTime[i] and add the time property as text
        $("#time"+i).append("<div id=\"currentTime" + i + "\"" + "class=\"col-2 hour\">" + time.Time + "</div>"); 

        //set scheculeHour = the tag property of the array. this will help compare to the hour for the current time row and determine what color it should be
        let scheduleHour = time.tag; 

        //variable to hold either past present or future for the style    
        var tense = ""; 
        
        //Testing for past, present, or future for grey, red, or green respectively
        if (currentHour > scheduleHour) 
            {
                tense ="past";
            }
            else if (currentHour == scheduleHour) 
            {
                tense ="present";
            }
            else if (currentHour < scheduleHour)
            {
                tense ="future";
            } 

            //create "textArea" to the time row"
            $("#time"+i).append("<textarea id=\"textArea" + i + "\"" + "class=\"col-9 " + tense + "\"textarea\">" + schedule[i].tasks + "</textarea>");
            
             //create "saveBtn" to the time row"
             $("#time"+i).append("<div id=\"saveBtn" + i + "\"" + "data-index=\"" + i + "\"" + "class=\"col-1 saveBtn\">" + "Save" + "</div>");  
            });

    //Click event for save function
    $(".saveBtn").click(function(event) 
    {
        //set element to the div that was clicked
        var element = event.target; 

        //set index to the "data-index" attribute of the div to get the number
        var index = parseInt($(element).attr("data-index"),10); 

         //call saveTast function and pass in this index so we know what row needs to be saved
        saveTask(index); 
    });
});

//check for schedule object in local storage load task in task property of schedule object
function tasks() {

    //set data = to the local storage item "schedule"
    var data = localStorage.getItem("schedule"); 

    //if not undefined
    if (data) {
        //set schedule array equal to data
        var scheduleArray = JSON.parse(data); 

        //itterate through each item in schedule array 
        $.each(scheduleArray, function(i, item) {

           //set the task property of the schedule array to the current task item in scheduleAeray 
           schedule[i].tasks = item.tasks;
        });
    } else {
        //if data is undefined then store a new schedule object in local storage
        localStorage.setItem("schedule", JSON.stringify(schedule));  
    }
  }

  //grab text and through in local storage
  function saveTask(index) {

    //set user tasks equal to the id of the current textarea
    var textArea = $("#textArea" + index);  
    
    //make sure the textarea is not blank
    if (textArea.val() !== "") {

        //set the tasks property to the current index
        schedule[index].tasks = textArea.val();  

        //convert to a string and send to local storage
        localStorage.setItem("schedule", JSON.stringify(schedule));  
    } else {

        //alert the user no data to save
        alert("no tasks to save")  
    }
};