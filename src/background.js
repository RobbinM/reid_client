'use strict'

import {app, protocol, BrowserWindow} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer'

const isDevelopment = process.env.NODE_ENV !== 'production'

protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])

let mainWindow

async function createWindow() {
    // let size = screen.getPrimaryDisplay().workAreaSize
    // let width = parseInt(size.width * 0.2)
    // let height = parseInt(size.height * 0.2)
    mainWindow = new BrowserWindow({
        width: 350,
        height: 300,
        resizable: false,
        webPreferences: {
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            enableRemoteModule: true
        }
    })

    let cmd = process.argv[1];

    if (cmd === '--squirrel-firstrun') {

    }

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
    } else {
        createProtocol('app')
        mainWindow.loadURL('app://./index.html')
    }
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        try {
            await installExtension(VUEJS_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    createWindow()
})

if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}

// ipcMain.on('sychronous-message', (event, arg) => {
//   if (arg === 'logined') {
//     // mainWindow.resize(800, 600)
//     console.log('change window size')
//   }
// })
