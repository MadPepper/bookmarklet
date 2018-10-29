javascript: (
    function () {
        // 選択箇所（なければ何も無し）＋ページタイトル＋リンク
        // フォーマットはMarkdown形式
        var sel, title, href;
        if (window.getSelection() == "") {
            sel = "";
        } else {
            sel = "\"" + window.getSelection() + "\"";
        }
        title = "[" + document.title.replace(/\v|\f|\n|\r|\t/g, "") + "]";
        href = "(" + location.href + ")";
        // prompt("LINK", sel + title + href);

        // クリップボードへコピー
        // textareaとtextnodeを追加->選択->コピー実行
        // TODO: 一時的とはいえbodyを書き換えるのをなんとかしたい
        var textArea, bodyElm;
        textArea = document.createElement("textarea");
        textArea.textContent = sel + title + href;
        bodyElm = document.getElementsByTagName("body")[0];
        bodyElm.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        bodyElm.removeChild(textArea);
    }
)();
