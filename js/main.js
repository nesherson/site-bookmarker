document.getElementById("js-bookmark-form").addEventListener("submit", saveBookmark);

function saveBookmark() {

    var siteName = document.getElementById("site-name").value;
    var siteUrl = document.getElementById("site-url").value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    if (localStorage.getItem("bookmarks") === null) {

        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } else {

        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }

    document.getElementById("js-bookmark-form").reset();

    fetchBookmarks();
}

function fetchBookmarks() {

    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    var bookmarksResults = document.getElementById("js-bookmarks-results");

    bookmarksResults.innerHTML = "";

    for (var i = 0; i < bookmarks.length; i++) {

        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += "<div class='bookmark'>" + 
        "<h3>" + 
        name + 
        "</h3>" +
        "<a class='visit-btn' target='_blank' href='" + url + "'>Visit</a>" +
        "<a onclick='deleteBookmark(\"" + url + "\")' class='delete-btn' >Delete</a>" + 
        "</div>";
    }
}

function deleteBookmark(url) {

    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    for (var i = 0; i < bookmarks.length; i++) {

        if (url === bookmarks[i].url) {
            bookmarks.splice(i, 1);
        }
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    fetchBookmarks(); 
}

function validateForm(siteName, siteUrl) {

    if (!siteName || !siteUrl) {
        alert("Please fill in the form");
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert("Please use valid URL");
        return false;
    }
    return true;
}