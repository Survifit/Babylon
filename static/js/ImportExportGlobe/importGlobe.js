var containerOriginal = document.getElementById( "importMap" );


var controllerOriginal = new GIO.Controller( containerOriginal );


controllerOriginal.addData( loanerWordData );
controllerOriginal.setInitCountry("GB");
controllerOriginal.addHalo("#697F90");
controllerOriginal.init();


// use the setExportColor() API to change the export line's color
controllerOriginal.setExportColor("#FEBC38");

// use the setImportColor() API to change the export line's color
controllerOriginal.setImportColor("#FEBC38");

// use setSelectedColor API to change the selected country color, try to change the color parameter!
controllerOriginal.setSelectedColor("#DA5526");
// use setSurfaceColor API to change the surface color, try to change the color parameter!
controllerOriginal.setSurfaceColor("#697F90");

//#DA5526 red
//#F6893D redorange
//#FEBC38 gold
//#DBC684 tan
//#697F90 blue


////second view in case we want it for something
//var containerChanged = document.getElementById( "changedArea" );
//var controllerChanged = new GIO.Controller( containerChanged );
//controllerChanged.addData( loanerWordData );
//// use the setInitCountry() API to change the init country, which is the country the globe will rotate to when controller.init() is called.
//// Try to change the init Country parameter
//controllerChanged.setInitCountry( "CA");
//controllerChanged.addHalo("#DA5526");
//controllerChanged.init();
//controllerChanged.setExportColor("#FEBC38");
//controllerChanged.setImportColor("#697F90");
//controllerChanged.setSurfaceColor("#DBC684");