
var my_library = [];
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const submit_btn = book_form.querySelector("#submit_btn");
const my_library_table = document.getElementById("my_library_table");
var book_form_collection = document.forms.book_form;
const add_book_dialog = document.getElementById("add_book_dialog");
const add_book_btn = document.getElementById("add_book_btn");

add_book_btn.addEventListener("click", () => {
  add_book_dialog.showModal();
});

function add_book(book) {
  my_library.push(book);
}

function display_books(refresh) {

  // loop through the library
  for (var i = refresh ? 0 : my_library.length - 1; i < my_library.length; i++) {
    // create a row
    var row = my_library_table.insertRow(-1);

    var cell_num = 0;

    // check if book is read
    var read = false;
    // loop through book object keys and values
    for (const value of Object.values(my_library[i])) {

      // insert cell and its textContent, edgecase when value for key 'read' which is a boolean
      if (typeof value !== 'boolean') {
        row.insertCell(cell_num).textContent = value;
      }
      else {
        let text_value = 'no'
        if (value) {
          text_value = 'yes';
          read = true;
        }
        row.insertCell(cell_num).textContent = text_value;
      }
      //increase cell_num by 1
      cell_num += 1;
    }
    
    // Create buttons and give id corresponding to the array index
    
    var delete_btn = document.createElement('button');
    delete_btn.textContent = 'Delete';
    delete_btn.setAttribute("id", 'delete_btn_' + (i + 1));
    delete_btn.setAttribute("class", 'delete_btn');

    var read_btn = document.createElement('button');
    read_btn.textContent = 'Read'
    read_btn.setAttribute("id", 'read_btn_' + (i + 1));
    read_btn.setAttribute("class", 'read_btn');

    var last_cell = row.insertCell(-1);
    // Add delete and read button to cells
    last_cell.appendChild(delete_btn);
    if (read) {
      read_btn.textContent = 'Unread'
    }
    last_cell.appendChild(read_btn);

  }
}

// How to target a dynamically created element
// When initially exisitng parent element is clicked
my_library_table.addEventListener('click', (event) => {
  // use .contains() to 'catch' the descendant element with given class
  if (event.target.classList.contains('delete_btn')) {
    var idx = parseInt(event.target.id.slice(-1));
    clear_table();
    remove_book(idx - 1);
    display_books(true);
  }
});
my_library_table.addEventListener('click', (event) => {
  if (event.target.classList.contains('read_btn')) {
    var idx = parseInt(event.target.id.slice(-1));
    console.log(idx);
    console.log(my_library[idx - 1].read)
    var text;
    if (my_library[idx - 1].read) {
      my_library[idx - 1].read = false;
      event.target.textContent = 'Read';
      text = 'no';
    }
    else {
      my_library[idx - 1].read = true;
      event.target.textContent = 'Unread';
      text = 'yes';
    }
    my_library_table.rows[idx].cells[3].textContent = text;
    console.log(my_library[idx - 1].read);
  }
});

function clear_table() {
  for (i = 0; i < my_library.length; i++) {
    my_library_table.deleteRow(-1);
  }
}

function remove_book(idx) {
  var first_half = my_library.slice(0, idx);
  var second_half = my_library.slice(idx +1, my_library.length);
  my_library = first_half.concat(second_half);
}

submit_btn.addEventListener("click", (event) => {
  // stop default submit method
  event.preventDefault();

  // get values of each name in form
  var title = book_form_collection['title'].value;
  var author = book_form_collection['author'].value;
  var pages = book_form_collection['pages'].value;
  var read = book_form_collection['read'].value === 'true'; // parse a string to boolean then assign

  // condition to check if all input fields are filled
  if (title != "" && author != "" && pages != "") {

    // Create a new Book object
    const new_book = new Book(title, author, pages, read);

    // add the new_book to the library array
    add_book(new_book);

    display_books(false);
  }
  else {
    alert("Please add more information");
  }
});

// store initial books
const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
my_library.push(hobbit);

display_books(true);