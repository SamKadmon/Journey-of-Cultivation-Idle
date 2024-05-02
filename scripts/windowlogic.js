//const scripttext ="$(document).ready(function(){$( '.resizable' ).resizable({alsoResize: '.window-body', handles: 'w, sw, s, se, e'});$( '.draggable' ).draggable();});";  

function createWindow(title, contents) {
    var body = document.querySelector("body");
    var window = document.createElement("div");
    window.className = "window draggable resizable";
    window.setAttribute('isMaximized', 0);

    var titlebar = document.createElement("div");
    titlebar.className = "title-bar";

    var titletext = document.createElement("div");
    titletext.className = "title-bar-text";
    titletext.innerText = title;

    var windowcontrols = document.createElement("div");
    windowcontrols.className = "title-bar-controls";

    var minimize = document.createElement("button");
    minimize.setAttribute('aria-label', "Minimize");
    var maximize = document.createElement("button");
    maximize.setAttribute('aria-label', "Maximize");
    var close = document.createElement("button");
    close.setAttribute('aria-label', "Close");

    var windowcontentarea = document.createElement("div");
    windowcontentarea.className = "window-body";

    var windowcontents = document.createElement("iframe");
    windowcontents.setAttribute("src", contents);

    // Create the taskbar button representing the window
    // var taskbarbutton = document.createElement("button");
    // taskbarbutton.className = "nav-item";
    // taskbarbutton.innerText = title;
    // taskbarbutton.setAttribute('onclick', 'toggleElementDisplay(document.getElementById("'+ display.id + '"),"block");');

    // Attach all the created pieces of the window to eachother and the body of the site
    windowcontrols.appendChild(minimize);
    windowcontrols.appendChild(maximize);
    windowcontrols.appendChild(close);
    titlebar.appendChild(titletext);
    titlebar.appendChild(windowcontrols);
    windowcontentarea.appendChild(windowcontents);
    window.appendChild(titlebar);
    window.appendChild(windowcontentarea);
    body.appendChild(window);

    $(".draggable").each(function () {
        $(this)
            .draggable(
                {
                    iframeFix: true,
                    containment: "window",
                    stack: ".window",
                    helper: true

                })
            .resizable(
                {
                    handles: "e, se, s, sw, w",
                    alsoResize: $(this).find($(windowcontentarea)),
                    minWidth: 250,
                    minHeight: 200,
                });
    });
}

function setTop(window) {
    windowTable = document.getElementsByClassName("draggable");
    var maxZ = windowTable[0];
    for (let i = 0; i < windowTable.length; i++) {
        if (windowTable[i] > maxZ) { maxZ = windowTable[i] };
    }
    for (let i = 0; i < windowTable.length; i++) {
        if (window == windowTable[i]) {
            windowTable.zIndex = maxZ + 1;
        }
    }
}

function refreshTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours < 12 ? ampm = " AM" : " PM";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ampm;
    document.getElementsByClassName("system-clock")[0].innerText = strTime;
}

setInterval(refreshTime, 1000);
// Mouse Event Listeners

document.addEventListener('click', e => {
    // Close greeting screen and show desktop
    if (e.target.closest('.greeting-button')) {
        e.target.closest('.greeting-overlay').remove();
    }
    // Close the window
    if (e.target.closest('[aria-label="Close"]')) {
        e.target.closest('.window').remove();
    }
    if (e.target.closest('#start-button')) {
        // createWindow("Window Spawn Testing", "./webpages/spawntest.html");
        createWindow("Window Spawn Testing", "webpages/spawntest.html");
    }
});


document.addEventListener('mousedown', e => {
    // Select Window and put it to the top of all the other windows
    if (e.target.closest('.titlebar')) {
        setTop(e.target.closest('.titlebar'));
    }
});