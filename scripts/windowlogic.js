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

function createWindow(title, contents) {
    var body = document.getElementById("wallpaper");
    var window = document.createElement("div");
    window.className = "window draggable resizable";
    window.setAttribute('maximized', 0);

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

    var frameoverlay = document.createElement("div")
    frameoverlay.className = "frameOverlay";

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
    windowcontentarea.appendChild(frameoverlay);
    window.appendChild(titlebar);
    window.appendChild(windowcontentarea);
    body.appendChild(window);
    $(".draggable").each(function () {
        $(this)
            .draggable(
                {
                    iframeFix: true,
                    containment: "parent",
                    stack: ".window"
                })
            .resizable(
                {
                    handles: "e, se, s, sw, w",
                    alsoResize: $(this).find($(windowcontentarea)),
                    minWidth: 250,
                    minHeight: 200,
                    start: (function () {
                        setTop(this);
                        $(".draggable").find(".frameOverlay").css("display", "block");
                    }),
                    stop: (function () {
                        $(".draggable").find(".frameOverlay").css("display", "none");
                    })
                });
    });
    $(".window").on("mousedown", function () { setTop(this); });

    $('.frameOverlay').on('mousedown', function (event) {
        var iframe = $(this).siblings("iframe")[0];
        var iframeDoc = iframe.contentWindow.document;

        // Get the coordinates of the click relative to the iframe
        var offsetX = event.pageX - $(this).offset().left;
        var offsetY = event.pageY - $(this).offset().top;

        // Create and dispatch a mouse event to the iframe document
        var event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            clientX: offsetX,
            clientY: offsetY
        });
        iframeDoc.dispatchEvent(event);
    });

    setTop(window);
}

function setTop(window) {
    var maxZIndex = 0;
    $(".window").each(function () {
        if (parseInt($(this).css('z-index')) > maxZIndex) { maxZIndex = parseInt($(this).css('z-index')) }
    });
    console.log(maxZIndex);
    if (parseInt($(window).css('z-index')) < maxZIndex) { $(window).css('z-index', maxZIndex + 1) };
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


// document.addEventListener('mousedown', e => {
//     // Select Window and put it to the top of all the other windows
//     if (e.target.closest('.titlebar')) {
//         setTop(e.target.closest('.titlebar'));
//     }
// });