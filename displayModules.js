//------MODIFY THIS SECTION EACH SEMESTER -------------------------

const modules = 7
const heading = "FA/22 PBE Due Dates"

const startDate15 = new Date("Monday August 29, 2022 0:0:0");   //15 week start date
const endDate15 = new Date("Monday December 5, 2022 11:59:59"); //15 week peferred last due date
const startDate71 = new Date("Monday August 29, 2022 0:0:0");   //7.5 week start date (first half)
const endDate71 = new Date("Tuesday October 18, 2022 11:59:59");  //7.5 week preferred last due date
const startDate72 = new Date("Wednesday October 19, 2022 0:0:0");  //7.5 week start date (second half)
const endDate72 = new Date("Monday December 5, 2022 11:59:59");     //7.5 week preferred last due date
const startDateMeme = new Date("Monday September 3, 2022 0:0:0");   //MEME start date
const endDateMeme = new Date("Monday December 5, 2022 11:59:59");   //MEME preferred last due date

//--------END MODIFICATION AREA.------------

//--------CODE BELOW THIS LINE SHOULD NOT BE EDITED-----------
//today's date
const TODAY = new Date();
document.getElementById('main-heading').innerHTML = heading;
document.getElementsByTagName('title').innerHTML =heading;

//generate due dates for the 4 different schedule types
var arr15 = generateDueDates(startDate15, endDate15, modules);
var arr71 = generateDueDates(startDate71, endDate71, modules);
var arr72 = generateDueDates(startDate72, endDate72, modules);
var arrMeme = generateDueDates(startDateMeme, endDateMeme, modules);

//this function returns an array of evenly spaced out
//dates (not date strings) based on start date, end date, and number of modules
function generateDueDates(start, end, numModules){
    let genArr = [];            //an empty array
    let diff = end - start;     //get the difference (in milliseconds) between end date and start date
    let millsInterval = diff / numModules;   //time allotted per module (in milliseconds)
    for (let i = 1; i <= numModules; i++){   //for each module
        let due = new Date(start.valueOf() + i * millsInterval); //calculate due date for this module
        genArr.push(due);       //append due date to array
    }
    return genArr;              //return filled array
}

//when the page loads, the 15 week schedule will be loaded by default
document.addEventListener('DOMContentLoaded', function(){processDates(arr15);})

//listens for schedule selection change, calls processDates() and passes in the appropriate array
document.getElementById('schedule-select').addEventListener('change', function(){
    let choice = document.getElementById('schedule-select');
    let heading = document.querySelector('.display-5.fw-bold')
    switch (choice.value) {
        case "15":
            processDates(arr15);
            heading.innerHTML = '15 Week Schedule'
            break;
        case "71":
            processDates(arr71);
            heading.innerHTML = '7.5 Week Schedule (First Half)'
            break;
        case "72":
            processDates(arr72);
            heading.innerHTML = '7.5 Week Schedule (Second Half)'
            break;
        case "10":
            processDates(arrMeme);
            heading.innerHTML = 'MEME Schedule (Late Start)'
            break;
        default:
            console.log("Something has gone wrong.");
    }
})

//loops through the array of module dates,
//calls a function that generates Bootstrap HTML strings
//then adds the HTML to the page
const CARDHOLDER = document.getElementById('card-holder'); 
function processDates(moduleArray){
    CARDHOLDER.innerHTML = ""; //reset the inner HTML of our flexbox div
    l = moduleArray.length;
    for (let i = 0; i < l; i++){
        let msg = "";
        let divStr = ""
        let style = "";
        
        //the module due date has passed
        if (moduleArray[i] <= TODAY){
            msg = "The suggested due date has passed for Module " + (i+1) + ".";
            style = " bg-danger"
        }else { //the module date has not passed
            //is this the first module in the array? (can't check an index less than zero)
            if (i == 0){
                msg = "You should be working on Module " + (i + 1);
                style = " bg-warning"
            }else if (moduleArray[i-1] <= TODAY && moduleArray[i] > TODAY){
                //the previous date has passed, AND the next date has not
                msg = "You should be working on Module " + (i + 1) + " or on a later module.";
                style = " bg-warning"
            } else {
                //if this module isn't past due, and it isn't the current module, then it isn't due yet
                msg = "Module " + (i+1) + " is not due yet.";
                style = " bg-success"
            }
         
        }

        //moduleDivTemplate will return a string containing the HTML that needs to be added to the page
        divStr = moduleDivTemplate(i + 1, moduleArray[i].toDateString(), msg, style);
        CARDHOLDER.innerHTML += divStr; //add the HTML to the page
    }
}

//This function creates a string containing the HTML for a Bootstrap card
function moduleDivTemplate(modNum, modDate, modMsg, specialStyle){
    let moduleTemplate = '<div class="card w-100 mb-2">';
    moduleTemplate += '<div class="card-header">Module ' + modNum + '</div>';
    moduleTemplate += '<div class="card-body' + specialStyle + ' bg-opacity-25">';
    moduleTemplate += '<h5 class="card-title">Due: ' + modDate + '</h5>';
    moduleTemplate += '<p class="card-text">' + modMsg + '</p>';
    moduleTemplate += '</div></div>';

    return moduleTemplate;
}