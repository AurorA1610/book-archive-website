// Loading Books as Search Result
const loadBooks = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayBooks(data.docs))
    // Clearing Search Input Field
    document.getElementById('search-field').value = '';
}

// Displaying Books as Search Result
const displayBooks = books => {
    const booksContainer = document.getElementById('books-container');
    // Clearing Previous Search Result
    booksContainer.textContent = '';
    // Counting Total Found Books Result
    const resultCount = books.length;

    let resultShowing = 0;
    // Looping Through the Books Array
    books?.forEach(book => {
        if(Object.keys(book).indexOf('cover_i') === -1) {
            return;
        }
        // Creating div for Single Book
        const div = document.createElement('div');
        div.classList.add('col', 'g-5');
        div.innerHTML = `
            <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" height="500" alt="...">
                <div class="card-body">
                    <h3 class="card-title">${book.title ? book.title : 'Unknown'}</h3>
                    <h5 class="card-title">Author: ${book.author_name ? book.author_name[0] : 'Unknown'}</h5>
                    <p class="card-text">Publisher: ${book.publisher ? book.publisher[0] : 'Unknown'}</p>
                    <p class="card-text">First Publish Year: ${book.first_publish_year ? book.first_publish_year : 'Unknown'}</p>
                </div>
            </div>`;
        booksContainer.appendChild(div);
        resultShowing ++;
    });

    
    const resultCountDiv = document.getElementById('result-count');
    //Clearing Previous Result Count
    resultCountDiv.textContent = '';
    // Showing New Result Count
    const h4 = document.createElement('h4');
    h4.classList.add('text-center');

    if(resultCount === 0 ? 
        h4.innerText = 'No result Found' :  // Error Handling
        h4.innerHTML = `Results Found: ${resultCount}
                        <br>
                        Now Showing: ${resultShowing}`);

    resultCountDiv.appendChild(h4);
}