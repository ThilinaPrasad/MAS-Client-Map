const electron = require('electron'); //require electron here
const url = require('url');  //electron permenet code segment
const path = require('path');
const childProcess = require("child_process");
const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainMenu;

//set production env
process.env.NODE_ENV = 'production';

//load old markers
const storage = require('electron-json-storage');
storage.setDataPath(__dirname + "/storage/markerData");
let oldMarkers;

storage.get('markerData', function (error, data) {
    if (error) {
        mainWindow.webContents.send('error',"Error Happned while saving data. Please try again."); 
    }
    oldMarkers = data;
});
//load old markers

app.on('ready', function () {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'pages/mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));

    //Quit app when closed main window
    mainWindow.on('closed', function () {
        app.quit();
    });

    //Bulild menu templete in window
    mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu items
    Menu.setApplicationMenu(mainMenu);

});

// Menu Template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: "Maximize",
                accelerator: process.platform == 'darwin' ? 'Command+M' : 'Ctrl+M',
                click() {
                    mainWindow.maximize();
                }
            },
            {
                label: 'Minimize',
                accelerator: process.platform == 'darwin' ? 'Command+W' : 'Ctrl+W',
                click() {
                    mainWindow.minimize();
                }
            },
            {
                label: 'Present On',
                accelerator: process.platform == 'darwin' ? 'Command+P' : 'Ctrl+P',
                click() {
                    mainWindow.setFullScreen(true);
                    mainWindow.setMenu(null);
                    mainWindow.webContents.send('present:on');
                }
            },
            {
                label: 'Present OFF',
                accelerator: process.platform == 'darwin' ? 'Command+O' : 'Ctrl+O',
                click() {
                    mainWindow.setFullScreen(false);
                    mainWindow.setMenu(mainMenu);
                    mainWindow.webContents.send('present:off');
                }
            }
        ]
    }

];

//


//In Mac add empty object to file menu
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

//Presentation Mode on
ipcMain.on('present:on', function (e) {
    mainWindow.setFullScreen(true);
    mainWindow.setMenu(null);
});

//Present mode off 
ipcMain.on('present:off', function () {
    mainWindow.setFullScreen(false);
    mainWindow.setMenu(mainMenu);
});

//Open PPT
ipcMain.on('open:ppt',function(e,file){
    let file_path = path.join("resources/app/storage/ppts",file);
    childProcess.spawn(file_path, {shell: true});
});

//Dev tools for app
//Add developer tools item for developer mode
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push(
        {
            label: 'Developer tools',
            submenu: [
                {
                    label: 'Toggle Dev Tools',
                    accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    role: 'reload'
                }
            ]
        }
    );
}



//save new marker data to json file
ipcMain.on('save:marker', function (e, newmarker) {
        storage.set('markerData', oldMarkers.concat(newmarker), function (error) {
            if (error) { 
                mainWindow.webContents.send('error',"Error Happned while saving data. Please try again."); 
            } else {
                oldMarkers = oldMarkers.concat(newmarker);
                mainWindow.webContents.send('success',"Successfully added new marker !."); 
             }
        });

    
});

