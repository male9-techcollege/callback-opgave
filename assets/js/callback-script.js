// basic MVC with app-state setup

// #region init functions
/* I wasn't there in the morning when this was explained, so my reading notes are more detailed than usual. */
/* The variable appState is used by functions listView() and listItemView() */
/* This constant appState is not used anywhere in the code provided with the assignment, not even to console log something. 
I don't know why the quotation marks weren't left empty in the global scope. The value is repeated in function listView, and it is changed in function listItemView.
TO DO: What is the purpose supposed to be? 
Bo said that the term app state is not a technical term. It's just a descriptor. */
let appState="listView";
/* activeList represents an index */
let activeList=0;

/* Before the first use, currentData is null. See function initApp() */
let currentData=null;

/* This must be the data structure that Bo said we had to save in the browser's local storage to avoid an error if there wasn't anything saved yet. */
const dummyData = {
    /* dummyData is an object;
    false is a boolean value. 
    "Boolean values can be one of two values: true or false, representing the truth value of a logical proposition." https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean */
    darkMode: false,
    /* List 1 and List 2 are displayed by the code provided with the assignment, 
    but neither their ID or their child array is shown. */
    lists: [
        { id: 1, name: 'List 1', items: [
            { id: 1, name: 'Item 1', completed: false },
            { id: 2, name: 'Item 2', completed: true }
        ] },
        { id: 2, name: 'List 2', items: [
            { id: 3, name: 'Item 3', completed: false },
            { id: 4, name: 'Item 4', completed: true }
        ] }
    ],
};

/* mainContent was a section element in the DOM, but no heading was generated, so I replaced it by a main element. */
const mainContent = document.getElementById('content');

initApp();

function initApp() {
    console.log('initApp() called');
    /* Here, variable storeddata is defined as the result returned by the function readData(), which gets data out of local storage */
    let storeddata=readData();
    /* if (storeddata==null) does the same thing as:
    if (!storeddata) */
    if (storeddata==null) {
        /* This is what Bo said we needed to describe in the code description of our to-do app:
        at the first use, a data structure is saved in local storage; initApp() does that. 
        currentData was first defined as null in the global scope (above) */
        /* I didn't need the line
        currentData=dummyData; 
        in my to-do app (still work in progress) since I didn't have anything like 
        let currentData=null; 
        in global scope. 
        I just had a function equivalent to saveData(). */
        currentData=dummyData;
        /* saveData() is the function that saves data in local storage */
        saveData(currentData);
    } else {
        /* My app is quite different at this step because I have a validation, 
        and I didn't have sth like currentData in global scope. */
        currentData = storeddata;
    };
    /* The function setupStatics() is declared below. 
    In my app, I have a function at the end of both if and else, not outside of these scopes.
    That function is not declared yet as I am getting started on this assignment
    because I couldn't figure it out, and I think that doing this assignment first should help me. */
    setupStatics();
};

// Setup static event listeners and elements (model code)
/* The name setupStatics is a misnomer since it adds dynamic elements: 
an event listener 
and the dynamically created elements of function listView() */
function setupStatics() {
    console.log('setupStatics() called');
    /* The variable newListButton represents the button in the footer */
    const newListButton = document.getElementById('newListButton');
    /* The function newCallback is declared below, but it has no code, just a name.
    That is probably our assignment to fill the scope because the button doesn't work. */
    newListButton.addEventListener('click', newCallback);
    listView();
};

// #endregion

// #region callbacks
//---------------------------------------------------------------------------------------------------------------------
//- Callbacks with switch to handle different functions and appState
//---------------------------------------------------------------------------------------------------------------------

// Callback for creating a new list (model code) with switch and appState
/* This will be triggered by the button in the footer.
Based on the instructions on Moodle and Bo's instructions to the class, the point must be to make this function:
either create a new list or a new list item
depending on the so-called "app state", i.e. the position of the user in the app, determined by the element on which the user just clicked. */
function newCallback() {
    /* TO DO; see  
    newListCreationView()
    and
    newItemCreationView()
    below */
};

//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
// #endregion

// #region view functions
// view code to create a new list creation view
function newListCreationView() {

    // Get the content element 
    /* But there is already a constant for that in global scope, so I am sparing a line */
    // const content = document.getElementById('content');
    
    // Clear the content
    /* This makes the stuff displayed by setupStatics()+listView() disappear. */
    mainContent.innerHTML = '';
    
    // Create a section container
    const section = document.createElement('section');
    /* I added a header because a section needs one. */
    const h2ByMariePierreLessard = document.createElement('h2');
    h2ByMariePierreLessard.innerText = "Create a new list";
    
    // Create label
    const label = document.createElement('label');
    label.textContent = 'Name:';
    label.setAttribute('for', 'listName');
    
    // Create text input
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'listName';
    input.value = 'Enter a list name';
    
    // Create OK button
    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.addEventListener('click', () => {
        console.log('OK clicked, list name:', input.value);
        /* TO DO: listView() doesn't save anything in local storage.
        It's fine as a solution for the Cancel button below, but not here. */
        listView();
    });
    
    // Create Cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        console.log('Cancel clicked');
        listView();
    });
    
    // Append all elements to the section
    section.appendChild(h2ByMariePierreLessard);
    section.appendChild(label);
    section.appendChild(input);
    section.appendChild(okButton);
    section.appendChild(cancelButton);
    
    // Append section to content
    mainContent.appendChild(section);
};

function newItemCreationView() {
    // Get the content element
    /* But there is already a constant for that in global scope, so I am sparing a line */
    // const content = document.getElementById('content');
    
    // Clear the content
    mainContent.innerHTML = '';
    
    // Create a section container
    const section = document.createElement('section');
    /* I added a header because a section needs one. */
    const h2ByMariePierreLessard = document.createElement('h2');
    h2ByMariePierreLessard.innerText = "Create a new item";
    
    // Create label
    const label = document.createElement('label');
    label.textContent = 'Name:';
    /* I replaced listName by itemName just in case */
    label.setAttribute('for', 'itemName');
    
    // Create text input
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'itemName';
    input.value = 'Enter a name';
    
    // Create OK button
    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.addEventListener('click', () => {
        console.log('OK clicked, list name:', input.value);
        /* TO DO: there has to be sth wrong with the fact that the same function is called by the OK button and the Cancel button.
        The same problem exists with the code provided for newListCreationView() */
        listItemView();
    });
    
    // Create Cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        console.log('Cancel clicked');
        listItemView();
    });
    
    // Append all elements to the section
    section.appendChild(h2ByMariePierreLessard);
    section.appendChild(label);
    section.appendChild(input);
    section.appendChild(okButton);
    section.appendChild(cancelButton);
    
    // Append section to content
    mainContent.appendChild(section);  
};





//---------------------------------------------------------------------------------------------------------------
// List-view part of the view code that generates list views to show user the saved lists
function listView() {
    /* The app state is either listView or itemView (see function listItemView()).
    The constant appState is also in the global scope. It doesn't help with initialisation. 
    The constant actually doesn't do anything in the code provided with the assignment. */
    appState = "listView";
    mainContent.innerHTML = '';
    /* lists is the 2nd key of the object currentData (see dummyData), and its value is of the type array/[]
    The array of lists contains objects, each of which also contains one array. */
    /* "Syntax
    array.forEach(function(currentValue, index, arr), thisValue)"
    Note: function() and currentValue are required
    https://www.w3schools.com/jsref/jsref_foreach.asp */
    currentData.lists.forEach((list,index) => {
        /* I replaced the div by a section because it is more semantic. */
        const listElement = document.createElement('section');
        /* TO DO: listClickCallback() is not declared yet (i.e. not even with empty curly brackets). 
        See instructions on Moodle to know how to use the function listClickCallback() for 3 different purposes depending on the element on which the user clicked:
        - acc. to parameter 'showList', clicking on the h2 shows a list; 
        - acc. to parameter 'editList', clicking on the Edit button allows user to edit a list
        - acc. to parameter 'deleteList', clicking on the Delete button allows user to delete a list
        https://moodle.techcollege.dk/course/view.php?id=21591
        */
       listElement.innerHTML = `<h2 onclick="listClickCallback('showList',${index})">${list.name}</h2>
            <button onclick="listClickCallback('editList',${index})">Edit</button>
            <button onclick="listClickCallback('deleteList',${index})">Delete</button>`;
        /* The following appends a div for each object inside of the "lists" array. 
        This is visible before starting on the assignment, 
        but each object also contains an array, and that one isn't visible from the start.
        The function listClickCallback() will do that. */ 
        mainContent.appendChild(listElement);
   });
};

function listItemView() {
    /* activeList was defined in the global scope; it's initial value is 0. */
    console.log('List item view for index:', activeList);
    /* The active list is one of the objects inside of the array called "lists", 
    which is the 2nd key in dummyData. 
    Each of these objects contains another array. */
    const list = currentData.lists[activeList];
    /* if (!list) means: if the array "lists" is empty */
    if (!list) {
        console.error('List not found:', activeList);
        return;
    };

    /* TO DO: should this go in the conditional expression (else)? It needs a list to exist. */
    appState="itemView";
    mainContent.innerHTML = '';
    /* Since I replaced section by main in the DOM, I am adding a section and appending the dynamically created elements to that section. */
    const section = document.createElement('section');
    mainContent.appendChild(section);

    const title = document.createElement('h2');
    /* This is one of the lists that were made visible by listView() */
    title.textContent = list.name;
    section.appendChild(title);

    const itemsContainer = document.createElement('div');
    /* items is the 3rd key, and its value is an array;
    forEach loops through every element of the array, as listView() did above */
    list.items.forEach((item, itemIndex) => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `<span>${item.name}</span>
            <button onclick="itemClickCallback('editItem',${itemIndex})">edit</button>
            <button onclick="itemClickCallback('deleteItem',${itemIndex})">delete</button>`;
        itemsContainer.appendChild(itemElement);
    });
    section.appendChild(itemsContainer);
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => {
        listView();
    });
    section.appendChild(backButton);
};

// #endregion


// #region model code  

/* The following does the same thing as: 
const storedData=JSON.parse(localStorage.getItem('ToDooListApp_v1'));
which is what I had before reading this in my to-do app.
However, there might be an advantage to putting that inside of a function...
*/
function readData() {
    // Simulate reading data from a database or API
    const storedData=localStorage.getItem('ToDooListApp_v1');

    return JSON.parse(storedData);
};

function saveData(data) {
    // Simulate saving data to a database or API
    localStorage.setItem('ToDooListApp_v1', JSON.stringify(data));
};


// #endregion
