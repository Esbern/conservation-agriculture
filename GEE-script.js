
// A Landsat 8 TOA image collection (3 months at a specific point, RGB bands).
var col = L7
  .filterBounds(table)
  .filterDate('2010-01-01', '2015-01-01')
  .select('B3','B4','QA_PIXEL');
print('Collection', col);

// Define a region to get pixel values for. This is a small rectangle region
// that intersects 2 image pixels at 30-meter scale.
var roi = table;

// Display the region of interest overlaid on an image representative. Note

Map.centerObject(roi);
Map.addLayer(roi, {color: 'white'}, 'ROI');

// Fetch pixel-level information from all images in the collection for the
// pixels intersecting the ROI.
var pixelInfoBbox = col.getRegion({
  geometry: roi,
  scale: 30
});

// The result is a table (a list of lists) where the first row is column
// labels and subsequent rows are image pixels. Columns contain values for
// the image ID ('system:index'), pixel longitude and latitude, image
// observation time ('system:time_start'), and bands. In this example, note
// that there are 5 images and the region intersects 2 pixels, so n rows
// equals 11 (5 * 2 + 1). All collection images must have the same number of
// bands with the same names.
// Copy the json object from the console 
print('Extracted pixel info', pixelInfoBbox);

// The function accepts all geometry types (e.g., points, lines, polygons).
// Here, a multi-point geometry with two points is used.
var points = ee.Geometry.MultiPoint([[-90.49, 34.85], [-90.48, 34.84]]);
var pixelInfoPoints = col.getRegion({
  geometry: points,
  scale: 30
});

Export.table.toDrive({
  collection: pixelInfoBbox,
  description: 'CA.csv',
  folder: 'earth_engine_demos',
  fileFormat: 'CSV'
});

