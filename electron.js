const { app, BrowserWindow } = require('electron')
const path = require('path')
const Store = require('electron-store-data')

let win

function createWindow () {
  const storeWindow = new Store({
    filename: 'window',
    defaults: {
      bounds: { x: '', y: '', width: 900, height: 500 }
    }
  })
  const { x, y, width, height } = storeWindow.get('bounds')

  win = new BrowserWindow({ x: x, y: y, width: width, height: height, titleBarStyle: 'hidden', show: false })

  win.loadURL('file://' + path.join(__dirname, 'production', 'index.html'))

  win.once('ready-to-show', () => {
    win.show()
  })

  win.on('close', () => {
    storeWindow.set('bounds', win.getBounds())
  })

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  app.quit()
})
