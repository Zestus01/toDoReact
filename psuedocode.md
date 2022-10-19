# To do list project
#### Focus on local storage and CRUD
#### Create, Read, Update, and Delete

## Components
### To Do List
#### Entry input section
##### Will have form/text input and on enter/stop typing for 2 seconds inputs the to do
##### &emsp;
#### 3 tabs on the bottom
##### Will change the page state to display the correct items
##### onClick setPage(tab)
#### To Do Item
##### A button to determine if the item has been done (Changes the class to text-muted and crossed out)
##### Text of the item to do
##### An X that removes the item from localStorage/State
#### Number of items in the corner that counts the items that Need to be done. 

## Functionality
### toDoInput
#### Grabs the text from the input component
#### uses State to change the needed to Do's, setState([...list, newItem])

### Display To Do's
#### Runs through the State array and adds a new component to the list section with the information
#### Map function to return the thing

### Check button
#### Depending if the className contains text-muted either removes it or adds it
#### Changes the boolean expression for the linked item. Uses ID to find the index
#### .find ot

### App state
#### Active Page pageState [String for the page it is on]
#### To do list  toDoListState [An array of objects need to do]
#### Completed Items  doneListState [An array for the completed items] 

### To do Object
#### Boolean if it's done or not (false if not done, true if done) changes the checkmarked
#### Text of what the to do item is
#### Time for when the item needs to be done
#### ID to target the item itself 
#### 