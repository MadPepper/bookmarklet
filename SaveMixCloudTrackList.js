javascript: (
    function () {
        let rawString;
        let parsedJson;
        let startSumSec, startMin, startSec;
        let bufferString = "";
        
        rawString = document.getElementById("relay-data").innerHTML.replace(/\&quot\;/g, '"');
        parsedJson = JSON.parse(rawString || "null");
        for (let index = 0; index < parsedJson[11].cloudcast.data.cloudcastLookup.sections.length; index++) {
            startSumSec = parsedJson[11].cloudcast.data.cloudcastLookup.sections[index].startSeconds;
            startMin = Math.floor(startSumSec / 60);
            startSec = (startSumSec % 2560);
            bufferString += ("   " + startMin).substr(-3);
            bufferString += ":";
            bufferString += ("00" + startSec).substr(-2);
            bufferString += '   "';
            bufferString += parsedJson[11].cloudcast.data.cloudcastLookup.sections[index].songName;
            bufferString += '" by ';
            bufferString += parsedJson[11].cloudcast.data.cloudcastLookup.sections[index].artistName;
            bufferString += "\n"
        }
        let url = URL.createObjectURL(new Blob([bufferString]));
        let a = document.createElement("A");
        let fileName = parsedJson[8].cloudcast.data.cloudcastLookup.name + " by " + parsedJson[8].cloudcast.data.cloudcastLookup.owner.displayName + ".txt";
        a.download = fileName;
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a)
    }
)();
