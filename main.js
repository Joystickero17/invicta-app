const { app, BrowserWindow } = require("electron");
const path = require("path");



function createWindow (){
    const win = new BrowserWindow({
        width: 800,
        height:600,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, "preload.js")
        },
        autoHideMenuBar:true
    })

    win.loadFile("index.html")

    // lo que hace esto es evitar que los anchor tags abran páginas dentro de la app de electron, y que estas se abran en un navegador externo
    win.webContents.on('new-window', function(e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
      });
}


app.whenReady().then(()=>{
    createWindow()
})

app.on("window-all-closed", function(){
    if (process.platform !== "darwin"){ app.quit()}
})

