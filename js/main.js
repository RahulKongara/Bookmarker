// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;
    
    if (!validateForm(siteName, siteURL)){
        return false;
    }

    var bookmark = {
        name: siteName, 
        url: siteURL
    }

    // console.log(bookmark);

    // // Local Storage Test
    // localStorage.setItem('test', 'HelloWorlds');
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test');
    // console.log(localStorage.getItem('test'));
    
    
    
    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        // set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from lS
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to Array
        bookmarks.push(bookmark);
        // Re-set back to lS
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    fetchBookmarks();
    // Prevent form from submiting
    e.preventDefault();
    clearFields();
}

function clearFields() {
    document.getElementById('siteName').value = '';
    document.getElementById('siteURL').value = '';
}


function deleteBookmark(url) {
    // console.log(url);
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // console.log(bookmarks);

    // Get output if
    var bookmarksRes = document.getElementById('bookmarksRes');

    bookmarksRes.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        console.log(url);

        bookmarksRes.innerHTML += 
            `<div class="card card-lg text-center bg-body-tertiary mb-4">
                <h3 class="m-4">${name}
                <a class="btn btn-success btn-sm" target="_blank" href=${url}>Visit</a>
                <a onclick="deleteBookmark(\'${url}'\)" class="btn btn-danger btn-sm" href="#">Delete</a>
                </h3>
            </div>`
            // '<div class="card card-lg text-center bg-body-tertiary mb-4">'+
            //     '<h3 class="m-4">'+name+
            //     '<a class="btn btn-success btn-sm" target="_blank" href="'url'">Visit</a>'+
            //     '<a onclick="deleteBookmark(\''url'\')" class="btn btn-danger btn-sm" href="#">Delete</a>'+
            //     '</h3>'+
            // '</div>';
    }
}

function validateForm(siteName, siteURL) {
    if (!siteName || !siteURL) {
        alert('Please fill in the form');
        return false;
    }

    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const regex = new RegExp(expression);

    if (!siteURL.match(regex)) {
        alert('Please use a valid URL'); 
        return false;
    }

    return true;
}