javascript: (
    function f() {
        var rawString;
        var parsedJson;
        var startSumSec, startMin, startSec;
        var bufferString = "";
        var tracklist;
        var mixTitle;
        var djName;
        var relayData;
      	var index;

        relayData = document.getElementById("relay-data");
        if (!relayData) {
            alert("failed to find relay-data");
            return;
        }

        rawString = relayData.innerHTML.replace(/\&quot\;/g, '"');
        parsedJson = JSON.parse(rawString || "null"); // ChromeでrawStringがnullだった場合の対処
        // console.log(parsedJson);

        // tracklistを抽出
        for (index = 0; index < parsedJson.length; index++) {
            if (parsedJson[index].cloudcast) {
                if (parsedJson[index].cloudcast.data) {
                    if (parsedJson[index].cloudcast.data.cloudcastLookup) {
                        if (parsedJson[index].cloudcast.data.cloudcastLookup.sections) {
                            tracklist = parsedJson[index].cloudcast.data.cloudcastLookup.sections;
                            break;
                        }
                    }
                }
            }
        }
        // console.log(tracklist);

        // MIXのタイトルを取得
        mixTitle = "UNKNOWN";
        for (index = 0; index < parsedJson.length; index++) {
            if (parsedJson[index].cloudcast) {
                if (parsedJson[index].cloudcast.data) {
                    if (parsedJson[index].cloudcast.data.cloudcastLookup) {
                        if (parsedJson[index].cloudcast.data.cloudcastLookup.name) {
                            mixTitle = parsedJson[index].cloudcast.data.cloudcastLookup.name;
                            break;
                        }
                    }
                }
            }
        }
        // console.log(mixTitle);

        // DJの名前を取得
        djName = "UNKNOWN";
        for (index = 0; index < parsedJson.length; index++) {
            if (parsedJson[index].cloudcast) {
                if (parsedJson[index].cloudcast.data) {
                    if (parsedJson[index].cloudcast.data.cloudcastLookup) {
                        if (parsedJson[index].cloudcast.data.cloudcastLookup.owner) {
                            if (parsedJson[index].cloudcast.data.cloudcastLookup.owner.displayName) {
                                djName = parsedJson[index].cloudcast.data.cloudcastLookup.owner.displayName;
                                break;
                            }
                        }
                    }
                }
            }
        }
        // console.log(djName);

        if (tracklist) {
            // tracklistを整形
            for (index = 0; index < tracklist.length; index++) {
                startSumSec = tracklist[index].startSeconds;
                startMin = Math.floor(startSumSec / 60);
                startSec = (startSumSec % 2560);
                bufferString += ("   " + startMin).substr(-3);
                bufferString += ":";
                bufferString += ("00" + startSec).substr(-2);
                if (tracklist[index].songName) {
                    bufferString += '   "';
                    bufferString += tracklist[index].songName;
                    bufferString += '" by ';
                    if (tracklist[index].artistName) {
                        bufferString += tracklist[index].artistName;
                    } else {
                        bufferString += 'UNKNOWN';
                    }
                } else {
                    bufferString += '   UNKNOWN';
                }
                bufferString += "\n";
            }
            // console.log(bufferString);

            // Mixの名前、DJをファイル名につけて保存
            var url = URL.createObjectURL(new Blob([bufferString]));
            var a = document.createElement("A");
            var fileName = mixTitle + " by " + djName + ".txt";
            a.download = fileName;
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            // tracklistの取得に失敗したらアラートを出す
            alert("failed to find tracklist.");
        }
    }
)();
