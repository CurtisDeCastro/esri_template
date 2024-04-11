import React, { useEffect } from 'react';
import { 
  loadModules
 } from 'esri-loader';
import '@arcgis/core/assets/esri/themes/light/main.css';
import {
    client,
    useConfig,
    useElementColumns,
    useElementData,
  } from "@sigmacomputing/plugin";

import './index.css';
  
  client.config.configureEditorPanel([
    { name: "source", type: "element" },
    { name: "Center", type: "column", source: "source", allowMultiple: false},
    { name: "Layers", type: "column", source: "source", allowMultiple: false}
  ]);

const MapViewComponent = () => {

  const config = useConfig();
  const sigmaData = useElementData(config.source);

  useEffect(() => {
    let view;

    const loadMap = async () => {

      // Load ArcGIS modules
      const [Map, MapView, FeatureLayer] = await loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer']);

      const centerValue = sigmaData[config.Center] ? sigmaData[config.Center][0] : 0;
      const centerActual = centerValue.toString().split(",");
      console.log(centerActual);
    
      const centerLat = parseFloat(centerActual[0]);
      const centerLong = parseFloat(centerActual[1]);
    
      console.log(centerLat);
      console.log(centerLong);

      const layerValue = sigmaData[config.Layers] ? sigmaData[config.Layers][0] : 0;

     // const transportationLayer = new FeatureLayer({
      //     url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/ACS_Median_Income_by_Race_and_Age_Selp_Emp_Boundaries/FeatureServer" 
        // url: "https://server.arcgisonline.com/arcgis/rest/services/Reference/World_Transportation/MapServer",
        //id: "streets",
        //opacity: 0.7
    //  });
    
      const housingLayer = new FeatureLayer({
        url: !!layerValue ? layerValue: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/ACS_Median_Income_by_Race_and_Age_Selp_Emp_Boundaries/FeatureServer/1"
        //id: "ny-housing"
      });
    

      //Create a map
      const map = new Map({
        basemap: 'streets-night-vector'
      //  layers: [transportationLayer]
      });

      // Create a MapView
      view = new MapView({
        container: 'viewDiv', // Reference to the view div created in step 5
        map, // Reference to the map object created before the view
        zoom: 7, // Sets zoom level based on level of detail (LOD)
        center: [centerLong, centerLat] // Sets center point of view using longitude,latitude
      });

     // map.add(transportationLayer);

    // map.add(housingLayer);

      //housingLayer.when(() => {
      //   view.goTo(housingLayer.fullExtent);
      // });

      // const streetsLayerToggle = document.getElementById("streetsLayer");

      // // Listen to the change event for the checkbox
      // streetsLayerToggle.addEventListener("change", () => {
      //   // When the checkbox is checked (true), set the layer's visibility to true
      // transportationLayer.visible = streetsLayerToggle.checked;
      // });

      const housingLayerToggle = document.getElementById("housingLayer");

      // Listen to the change event for the checkbox
      housingLayerToggle.addEventListener("change", () => {
        // When the checkbox is checked (true), set the layer's visibility to true
      map.add(housingLayer);
      housingLayer.visible = housingLayerToggle.checked;
      });

    };


    loadMap();

    return function cleanup() {
             if (view) {
               view.destroy();
             }
           };
         }, [config, sigmaData]);

  return (
  
  <div id="viewDiv" style={{ height: '100vh', width: '100%' }} > 
  
    <div className='checkboxContainer'>
     {/* <span id="layerToggle" className="esri-widget"> 
      <input type="checkbox" id="streetsLayer" /> Transportation </span> */}
    <span id="layerToggle" className="esri-widget"> 
       <input type="checkbox" id="housingLayer" /> Show Layer
        </span>
  </div> 
 
  </div>
  );
};

export default MapViewComponent;
