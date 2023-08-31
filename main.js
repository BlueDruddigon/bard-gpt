const { app, BrowserWindow, shell, Menu } = require('electron')
const path = require('path')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 948,
    height: 768,
    icon: path.join(__dirname, 'icon.png'),
    backgroundColor: '#fff',
    webPreferences: {
      devTools: false,
      contextIsolation: true,
      nodeIntegration: true,
      webSecurity: true
    }
  })

  // Hide menu bar
  Menu.setApplicationMenu(null)

  // load Bard with URL
  mainWindow.loadURL(`https://bard.google.com`).then(() => {})

  // Open links in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(createWindow)

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
