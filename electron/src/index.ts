import { a } from 'my-shared';
console.log(
  `a is ${a}`,
  'run as a regular nodejs project, should replace to a electron project when we need it https://www.electronjs.org/docs/latest/tutorial/quick-start',
);

// below in main.ts

// import {
//   app,
//   BrowserWindow,
//   protocol,
//   globalShortcut,
//   Menu,
//   ipcMain,
// } from 'electron';
// import path from 'node:path';
// import url from 'node:url';
// import log from 'electron-log';

// type MainWindow = Electron.CrossProcessExports.BrowserWindow;

// const APP_TITLE_NAME = 'XXXXX';
// const IS_PRODUCTION = app.isPackaged;
// const IS_LOAD_LOCAL_FRONTEND_FILES =
//   process.env.IS_LOAD_LOCAL_FRONTEND_FILES === 'true';
// const DEV_LOADING_URL = IS_PRODUCTION ? '' : 'http://localhost:3000';
// //env var end

// const LOCAL_FRONTEND_BUILD_FOLDER = `frontend-build`;
// const FILE_PROTOCOL_NAME: 'file' = 'file'; // has be to "file" because loadUrl api

// const userDataDirPath = app.getPath('userData');
// const localFrontendFileUrl = url.format({
//   pathname: 'index.html',
//   protocol: FILE_PROTOCOL_NAME,
//   slashes: true,
// });
// const devUrl = IS_LOAD_LOCAL_FRONTEND_FILES
//   ? localFrontendFileUrl
//   : DEV_LOADING_URL;

// const appUrl = IS_PRODUCTION ? localFrontendFileUrl : devUrl;

// let mainWindow: MainWindow | null = null;
// let devtools: BrowserWindow | null;

// const logger = {
//   info: log.info,
//   error: log.error,
// };

// main();

// async function beforeWindowCreated() {
//   await fsUtils.createDirIfNotExists(userDataDirPath);
//   interceptLocalFrontendBuildFiles();
// }

// function afterWindowCreated(_mainWindow: MainWindow) {
//   disableReloadShortCut();
//   hideMenu();
//   dbHandler();
// }

// function main() {
//   /**
//    * single instance only on windows
//    * copied from official doc example
//    * https://www.electronjs.org/docs/latest/api/app#apprequestsingleinstancelockadditionaldata
//    */
//   const gotTheLock = app.requestSingleInstanceLock();

//   if (!gotTheLock) {
//     app.quit();
//   } else {
//     app.on(
//       'second-instance',
//       (_event, _commandLine, _workingDirectory, _additionalData) => {
//         logger.info(`$ second-instance`);
//         if (mainWindow) {
//           if (mainWindow.isMinimized()) mainWindow.restore();
//           mainWindow.focus();
//         }
//       },
//     );
//     app.on('before-quit', () => {
//       cleanUp();
//     });

//     app.whenReady().then(async () => {
//       await createWindow();
//       if (!IS_PRODUCTION) {
//         devtools = new BrowserWindow();
//         mainWindow?.webContents.setDevToolsWebContents(devtools.webContents);
//         mainWindow?.webContents.openDevTools({ mode: 'detach' });
//       }
//     });
//   }
// }

// function cleanUp() {
//   log.info(`$ cleanUp`);
// }

// async function createWindow() {
//   beforeWindowCreated();
//   mainWindow = new BrowserWindow({
//     width: 2048,
//     height: 1000,
//     // maxWidth: 1024,
//     // minWidth: 1024,
//     minHeight: 768,
//     frame: true,
//     resizable: true,
//     maximizable: true,
//     fullscreen: false,
//     backgroundColor: '#212121',
//     show: false, // show after zoom set
//     webPreferences: {
//       webSecurity: true,
//       nodeIntegration: false,
//       devTools: !IS_PRODUCTION,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js'),
//     },
//     title: APP_TITLE_NAME,
//   });
//   mainWindow.once('ready-to-show', () => {
//     // mainWindow!.webContents.setZoomFactor(1.5);
//     mainWindow!.webContents.setZoomLevel(-1);
//     mainWindow!.show();
//   });
//   afterWindowCreated(mainWindow);

//   mainWindow.on('closed', function () {
//     mainWindow = null;
//   });

//   /* Set did-fail-load listener once */
//   mainWindow.webContents.on('did-fail-load', async function () {
//     log.error('did-fail-load');

//     setTimeout(async () => {
//       if (mainWindow) {
//         await mainWindow.loadURL(appUrl);
//       }
//     }, 500);
//   });
//   await mainWindow.loadURL(appUrl);
// }

// async function interceptLocalFrontendBuildFiles() {
//   protocol.interceptFileProtocol(FILE_PROTOCOL_NAME, (request, callback) => {
//     const url = request.url.substr(7); /* all urls start with 'file://' */
//     callback({
//       path: path.normalize(
//         path.join(__dirname, LOCAL_FRONTEND_BUILD_FOLDER, url),
//       ),
//     });
//   });
// }

// /**
//  * hideMenu
//  * https://www.electronjs.org/docs/latest/api/menu
//  */
// function hideMenu() {
//   if (IS_PRODUCTION === false) {
//     return;
//   }
//   const template = [
//     {
//       label: APP_TITLE_NAME,
//       submenu: [
//         {
//           label: '關閉',
//           accelerator: 'Command+Q',
//           click: function () {
//             app.quit();
//           },
//         },
//       ],
//     },
//   ];
//   Menu.setApplicationMenu(Menu.buildFromTemplate(template));
// }

// /**
//  * disableReloadShortCut
//  * https://stackoverflow.com/a/63241601/6414615
//  */
// function disableReloadShortCut() {
//   if (IS_PRODUCTION === false) {
//     return;
//   }
//   globalShortcut.register('CommandOrControl+R', () => {});
//   globalShortcut.register('F5', () => {});
// }
