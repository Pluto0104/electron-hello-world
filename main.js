const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { preload: path.join(__dirname, "preload.js") },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
  ipcMain.handle("ping", () => "pong");
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    // On macOS it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q
    app.quit();
  }
});
