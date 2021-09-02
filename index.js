const loadBooks = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayBooks(data.docs))
    document.getElementById('search-field').value = '';
}

const displayBooks = books => {
    const booksContainer = document.getElementById('books-container');
    booksContainer.textContent = '';
    let resultCount = 0;
    books?.forEach(book => {
        const bookKeys = Object.keys(book);
        if(bookKeys.indexOf('cover_i') === -1 || bookKeys.indexOf('title') === -1 || bookKeys.indexOf('author_name') === -1 || bookKeys.indexOf('publisher') === -1 || bookKeys.indexOf('first_publish_year') === -1) {
            return;
        }
        resultCount = resultCount + 1;
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.classList.add('g-5');
        div.innerHTML = `
            <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" height="500" alt="...">
                <div class="card-body">
                    <h3 class="card-title">${book.title}</h3>
                    <h5 class="card-title">Author: ${book.author_name[0]}</h5>
                    <p class="card-text">Publisher: ${book.publisher[0]}</p>
                    <p class="card-text">First Publish Year: ${book.first_publish_year}</p>
                </div>
            </div>`;
        booksContainer.appendChild(div);
    });
    if(resultCount === 0)  {
        const resultCountDiv = document.getElementById('result-count');
        resultCountDiv.textContent = '';
        const h4 = document.createElement('h4');
        h4.classList.add('text-center');
        h4.innerText = 'No result Found';
        resultCountDiv.appendChild(h4);
    }
    else {
        const resultCountDiv = document.getElementById('result-count');
        resultCountDiv.textContent = '';
        const h4 = document.createElement('h4');
        h4.classList.add('text-center');
        h4.innerText = 'Showing results for ' + resultCount + ' books';
        resultCountDiv.appendChild(h4);
    }
}