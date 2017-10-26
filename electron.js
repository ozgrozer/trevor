const { app, BrowserWindow } = require('electron')
let win

function createWindow () {
  win = new BrowserWindow({ width: 900, height: 500, titleBarStyle: 'hidden', show: false })
  win.loadURL(`file://${__dirname}/production/index.html`)
  win.on('closed', () => {
    win = null
  })
  win.once('ready-to-show', () => {
    win.show()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
