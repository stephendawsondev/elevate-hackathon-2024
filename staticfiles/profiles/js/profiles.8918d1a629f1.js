/**
 * When an item add form is submitted, this adds the item to the list of already existing items
 * @param {Event} event the event that is called
 */
function addListItem(event) {
  event.preventDefault();
    let inputElement = this.getElementsByClassName('add-item-input')[0];
    let inputText = inputElement.value.trim();
    let inputMainId = this.getAttribute('data-main-input');
    let inputMainForm = document.getElementById(inputMainId);
    let itemId = parseInt(inputMainForm.getAttribute('data-item-id'));

    // Checking for duplicates
    let currentItems = inputMainForm.children;
    for (let item of currentItems) {
      let itemText = item.value;
      if (itemText === inputText) {
        inputElement.setCustomValidity("Cannot enter the same value twice");
        setTimeout(() => {this.getElementsByClassName('add-item-submit')[0].click()}, 1);
        return;
      }
    }
    
    // Creating a hidden input to store this item
    let hiddenInput = document.createElement('input');
    let mainListId = `${inputMainId}-${itemId}`;
    hiddenInput.type = 'hidden';
    hiddenInput.name = mainListId;
    hiddenInput.id = mainListId;
    hiddenInput.value = inputText;
    inputMainForm.appendChild(hiddenInput);
    inputMainForm.setAttribute('data-item-id', `${itemId + 1}`);

    // Rendering the item on the frontend
    let elementId = `item-${inputMainForm}-${itemId}`;
    let listItemHtml = `
    <li id="${elementId}" class="list-item list-disc" data-main-list="${mainListId}">
      <span class="flex flex justify-between">
        <span>${inputText}</span>
        <button type="button" class="delete-list-item" data-id="${elementId}"><span
            class="text-2xl">&times;</span></button>
      </span>
    `;
    // Interpret the above HTML as DOM objects
    let itemElement = new DOMParser().parseFromString(listItemHtml, 'text/html').getElementsByClassName('list-item')[0];
    this.getElementsByClassName('item-list')[0].appendChild(itemElement);

    inputElement.value = "";
    setTimeout(enableRemoveButton, 1, itemElement);
}


/**
 * Removes the specified item from the list and the main form's gidden inputs
 * @param {Element} element The element of the item to be deleted
 */
function enableRemoveButton(element) {
  element.getElementsByClassName('delete-list-item')[0].addEventListener('click', function(event) {
    let removeElement = document.getElementById(this.getAttribute('data-id'));
    let mainListElement = document.getElementById(removeElement.getAttribute('data-main-list'));
  
    mainListElement.remove();
    removeElement.remove();
  })
}


let addItemForms = document.getElementsByClassName('add-item-form');
for (let itemForm of addItemForms) {
  itemForm.addEventListener('submit', addListItem);
}

// Removes any custom validity every time the input changes
let addItemInputs = document.getElementsByClassName('add-item-input');
for (let itemInput of addItemInputs) {
  itemInput.addEventListener('input', function() {
    this.setCustomValidity("");
  });
}