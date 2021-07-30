/**
 * Name: Arjun Jagnani
 * Date: 28 July, 2021
 *
 * This is the index.js file, that acts as the script for the index.html file. This acts as the
 * script for the "Rock Bottom of Boredom" webpage, and manages all the requests for activities,
 * and displays them appropriately.
 */

 "use strict";
 (function() {
 
   window.addEventListener("load", init);
 
   /**
    * Called upon initial loading of the page. It enables all the different buttons on the page,
    * and makes sure that they are clickable.
    */
   function init() {
     id("random").addEventListener("click", randomGenerator);
     id("type").addEventListener("click", typeChosen);
     id("participants").addEventListener("click", participantsChosen);
     id("price").addEventListener("click", priceChosen);
   }
 
   /**
    * Displays a completely random activity on the web[age, along with it's other specifics.
    */
   function randomGenerator() {
     fetchFinalURL("/");
   }
 
   /**
    * This function returns the value of the selected option from the passed list of options.
    * @param {Array} workingArray - the array from which the value of the selected option is
    * to be found
    * @returns {string} the seleced value from the array passed on call
    */
   function determineValue(workingArray) {
     for (let i = 0; i < workingArray.length; i++) {
       if (workingArray[i].selected) {
         return workingArray[i].value;
       }
     }
   }
 
   /**
    * Displays an activity on the webpage, based on the user's choice for type of activity.
    */
   function typeChosen() {
     let typeArray = qsa("#activity-type > option");
     let value = determineValue(typeArray);
     let parameter = "?type=" + value;
     fetchFinalURL(parameter);
   }
 
   /**
    * Displays an activity on the webpage, based on the user's choice for number of particpants
    * involved for the activity.
    */
   function participantsChosen() {
     let participantsArray = qsa("#participant-number > option");
     let value = determineValue(participantsArray);
     let parameter = "?participants=" + value;
     fetchFinalURL(parameter);
   }
 
   /**
    * Displays an activity on the webpage, based on the user's choice for approximate cost of
    * the activity.
    */
   function priceChosen() {
     let priceArray = qsa("#amount > option");
     let value = determineValue(priceArray);
     let parameter = "?price=" + value;
     fetchFinalURL(parameter);
   }
 
   /**
    * Calls the API, with the passed parameters and then displays results and errors accordingly
    * @param {string} parameter - the parameter to be added to the api call, for particular result
    */
   function fetchFinalURL(parameter) {
     let url = "http://www.boredapi.com/api/activity" + parameter;
     fetch(url)
       .then(statusCheck)
       .then(response => response.json())
       .then(processResponse)
       .catch(handleError);
   }
 
   /**
    * Displays the response given by the API on the webpage in proper format.
    * @param {JSON} response - JSON object containing the response given by the API on call
    */
   function processResponse(response) {
     id("activity-here").innerHTML = "";
     addActivity("h2", response.activity);
     addActivity("p", "Participants required: " + response.participants);
     addActivity("p", "Type of activity: " + response.type);
     const MULTIPLE = 100;
     addActivity("p", "Price of activity: $" + (parseInt(response.price * MULTIPLE)));
   }
 
   /**
    * Creates a new tag in the main HTML file, and adds the passed text to it.
    * @param {string} tag - the HTML tag, of which an element is to be added
    * @param {string} text - the text to be put inside the tag
    */
   function addActivity(tag, text) {
     let element = document.createElement(tag);
     element.textContent = text;
     id("activity-here").appendChild(element);
   }
 
   /**
    * Handles the error in the case when the repsonse from the API is not ok.
    */
   function handleError() {
     id("activity-here").innerHTML = "";
     addActivity("p", "No activity found, please try refreshing or changing your selection");
   }
 
   /**
    * Makes sure that the response given by the API call is ok, and handles the error accordingly
    * if it is not as expected.
    * @param {JSON} response - JSON object containing the response given by the API on call
    * @returns {JSON} - JSON object containing the response given by the API on call
    */
   async function statusCheck(response) {
     if (!response.ok) {
       throw new Error(await response.text());
     }
     return response;
   }
 
   /**
    * Returns the DOM Object for an element with the given ID.
    * @param {string} idName - the ID for which the DOM object is to be returned.
    * @returns {Element} - the DOM object for an alement with the given ID.
    */
   function id(idName) {
     return document.getElementById(idName);
   }
 
   /**
    * Returns an array of all elements that can be matched by the given CSS selector string.
    * @param {string} selector - the CSS selector string to be looked for in the HTML.
    * @returns {Array} - array of elements matched to the given selector string.
    */
   function qsa(selector) {
     return document.querySelectorAll(selector);
   }
 })();