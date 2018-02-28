javascript: (
    function () {
        var select, title, href;
        if (window.getSelection() == "") {
            sel = "";
        } else {
            sel = "\"" + window.getSelection() + "\"";
        }
        title = "[" + document.title.replace(/\v|\f|\n|\r|\t/g, "") + "]";
        href = "(" + location.href + ")";
        prompt("LINK", sel + title + href);
    }
)();
