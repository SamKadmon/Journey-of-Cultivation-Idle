// Mouse Event Listeners
document.addEventListener('click', e => {
    // Close greeting screen and show desktop
    if (e.target.closest('.greeting-button')) {
        e.target.closest('.greeting-overlay').remove();
    }
    if (e.target.closest('#start-button')) {
        // createWindow("Window Spawn Testing", "./webpages/spawntest.html");
        createWindow("UpgradeTest", "/webpages/spawntest.html");
    }
});


var mouseX, mouseY;
$(document).mousemove(function (event) {
    mouseX = event.pageX; // Mouse X position relative to the document
    mouseY = event.pageY; // Mouse Y position relative to the document
});

var windowID = 0;

function createWindow(title, contents, icon) {
    var body = document.getElementById("wallpaper");
    var window = document.createElement("div");
    var taskbar = document.getElementById("task-band");
    window.className = "window draggable resizable";
    $(window).attr("windowtype", title);
    $(window).attr('maximized', 0);
    // This is for linking the window to its corresponding taskbar element
    $(window).attr('winID', windowID);
    windowID++;
    // These attributes are for unmaximizing
    $(window).attr('oldWidth', '400px');
    $(window).attr('oldHeight', '300px');
    $(window).attr('oldLeft', $(window).width() / 2 - 200 + "px");
    $(window).attr('oldTop', $(window).height() / 2 - 135 + "px");

    var titlebar = document.createElement("div");
    titlebar.className = "title-bar";

    var titleicon = document.createElement("img")
    titleicon.className = "title-icon";
    titleicon.src = "/stylesheets/resources/ui_elements/fallbackicon.png";

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

    var taskbaritem = document.createElement("div");
    taskbaritem.className = "taskbar-item";
    taskbaritem.innerHTML = "<p>TEST</p>";

    // Load the contents of the page via AJAX
    $(windowcontentarea).ready(function () {
        // Fetch the content of source.html using AJAX
        $.ajax({
            url: contents,
            type: 'GET',
            dataType: 'html',
            success: function (response) {
                $(windowcontentarea).append(response);
            },
            error: function (xhr, status, error) {
                console.error('Error fetching content:', error);
            }
        });
    });

    // Create the taskbar button representing the window
    // var taskbarbutton = document.createElement("button");
    // taskbarbutton.className = "nav-item";
    // taskbarbutton.innerText = title;
    // taskbarbutton.setAttribute('onclick', 'toggleElementDisplay(document.getElementById("'+ display.id + '"),"block");');

    // Attach all the created pieces of the window to eachother and the body of the site
    windowcontrols.appendChild(minimize);
    windowcontrols.appendChild(maximize);
    windowcontrols.appendChild(close);
    titlebar.appendChild(titleicon);
    titlebar.appendChild(titletext);
    titlebar.appendChild(windowcontrols);
    window.appendChild(titlebar);
    window.appendChild(windowcontentarea);
    body.appendChild(window);
    taskbar.appendChild(taskbaritem);

    // Add Draggability and Resizability, as well as any related functionality that will help make it work
    $(".draggable").each(function () {
        $(this).draggable({
            iframeFix: true,
            containment: "parent",
            stack: ".window",
            distance: 10,
            cursorAt: { top: 10 },
            handle: $(this).find(".title-bar"),
            drag:
                function () {
                    $(this).attr("oldLeft", $(this).css("left"));
                    $(this).attr("oldTop", $(this).css("top"));
                },
        })
            .resizable(
                {
                    handles: "e, se, s, sw, w",
                    alsoResize: $(this).find($(windowcontentarea)),
                    minWidth: 250,
                    minHeight: 200,
                    containment: 'parent',
                    resize: function () {
                        $(this).attr("oldWidth", $(this).css("width"));
                        $(this).attr("oldHeight", $(this).css("height"));
                    }
                });
    });

    // Delete the window when hitting the close button
    $(close).on("click", function () { $(close).closest(".window").remove(); });

    // Maximize and Restore functionality
    $(maximize).on("click", function () {
        // The window the maximize button affects
        var windowToResize = $(maximize).closest(".window");
        if ($(maximize).attr('aria-label') == 'Maximize') { maximizeWindow(windowToResize) }
        else { restoreWindow(windowToResize) }
        // $(maximize).
    });
    setTop(window);
}

// Stack behavior when pressing anywhere within a window's bounds
$(document).on("mousedown", ".window", function () {
    setTop(this);
});
// Unmaximize on dragging titlebar (excluding the buttons)
$(document).on("mousedown", ".title-bar", function (event) {
    if ($(this).closest(".window").attr("maximized")) {
        restoreWindow($(this).closest(".window"));
    }
});
// Maximize / Unmaximize on doubleclicking the titlebar (excluding the buttons)
$(document).on("dblclick", ".title-bar", function (event) {
    // Check if the event target or any of its ancestors have the class .title-bar-controls
    if (parseInt($(this).closest(".window").attr("maximized"))) {
        restoreWindow($(this).closest(".window"));
    }
    else {
        maximizeWindow($(this).closest(".window"));
    }
});

function maximizeWindow(window) {
    window.find("[aria-label='Maximize']").attr('aria-label', 'Restore');
    // Maximize the containing window
    window.attr('maximized', 1);
    window.css('left', 0);
    window.css('top', 0);
    window.css('width', '100%');
    window.css('height', '100%');
    window.find(".window-body").css('width', 'calc(100% - 6px)');
    window.find(".window-body").css('height', 'calc(100% - 28px)');
}

function restoreWindow(window) {
    $(window).find("[aria-label='Restore']").attr('aria-label', 'Maximize');
    // Restore the containing window
    window.attr('maximized', 0);
    window.css('left', window.attr("oldLeft"));
    window.css('top', window.attr("oldTop"));
    window.css('width', window.attr("oldWidth"));
    window.css('height', window.attr("oldHeight"));
    window.find(".window-body").css('width', 'calc(100% - 6px)');
    window.find(".window-body").css('height', 'calc(100% - 28px)');
}

function setTop(window) {
    var maxZIndex = 0;
    $(".window").each(function () {
        if (parseInt($(this).css('z-index')) > maxZIndex) { maxZIndex = parseInt($(this).css('z-index')) }
    });
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

