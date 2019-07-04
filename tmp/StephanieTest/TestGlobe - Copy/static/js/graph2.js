var containerOriginal = document.getElementById( "originalArea" );
var containerChanged = document.getElementById( "changedArea" );

var controllerOriginal = new GIO.Controller( containerOriginal );
var controllerChanged = new GIO.Controller( containerChanged );

controllerOriginal.addData( data );
controllerOriginal.setInitCountry("GB");
controllerOriginal.addHalo("#DA5526");
//controllerOriginal.setHaloColor("0x0000ff");
controllerOriginal.init();
controllerChanged.addData( data );

// use the setInitCountry() API to change the init country, which is the country the globe will rotate to when controller.init() is called.
// Try to change the init Country parameter
controllerChanged.setInitCountry( "NZ");
controllerChanged.addHalo("#DA5526");
//controllerChanged.setHaloColor("0x0000ff");
controllerChanged.init();

// use the setExportColor() API to change the export line's color
controllerOriginal.setExportColor("#FEBC38");
controllerChanged.setExportColor("#FEBC38");
// use the setImportColor() API to change the export line's color
controllerOriginal.setImportColor("#697F90");
controllerChanged.setImportColor("#697F90");
// use setSelectedColor API to change the selected country color, try to change the color parameter!
controllerOriginal.setSelectedColor("#697F90");
// use setSurfaceColor API to change the surface color, try to change the color parameter!
controllerOriginal.setSurfaceColor("#DBC684");
controllerChanged.setSurfaceColor("#DBC684");

