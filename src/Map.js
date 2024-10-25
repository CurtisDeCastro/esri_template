import React, { useEffect } from 'react';
import { loadModules } from 'esri-loader';
import '@arcgis/core/assets/esri/themes/light/main.css';
import {
  client,
  useConfig,
  useElementData,
} from "@sigmacomputing/plugin";

import './index.css';

// Configure the editor panel with source, center, and layers options
client.config.configureEditorPanel([
  { name: "source", type: "element" },
  { name: "Center", type: "column", source: "source", allowMultiple: false },
  { name: "Layers", type: "column", source: "source", allowMultiple: false }
]);

const MapViewComponent = () => {
  // Retrieve configuration and data from Sigma
  const config = useConfig();
  const sigmaData = useElementData(config.source);

  useEffect(() => {
    let view;

    const loadMap = async () => {
      // Load necessary ArcGIS modules
      const [Map, MapView, FeatureLayer] = await loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer']);

      // Extract and parse center coordinates from Sigma data
      const centerValue = sigmaData[config.Center] ? sigmaData[config.Center][0] : "0,0";
      const [centerLat, centerLong] = centerValue.split(",").map(coord => parseFloat(coord));

      // Extract layer URL from Sigma data
      const layerValue = sigmaData[config.Layers] ? sigmaData[config.Layers][0] : null;

      // Create a feature layer with the provided URL or a default one
      const featureLayer = new FeatureLayer({
        url: layerValue || "https://services.arcgis.com/{yourOrgId}/arcgis/rest/services/Your_Service_Name/FeatureServer/1"
      });

      // Create a map with a specified basemap
      const map = new Map({
        basemap: 'streets-night-vector'
      });

      // Initialize the MapView with the map and center coordinates
      view = new MapView({
        container: 'viewDiv',
        map,
        zoom: 7,
        center: [centerLong, centerLat]
      });

      // Add event listener to toggle feature layer visibility
      const featureLayerToggle = document.getElementById("featureLayer");
      featureLayerToggle.addEventListener("change", () => {
        map.add(featureLayer);
        featureLayer.visible = featureLayerToggle.checked;
      });
    };

    loadMap();

    // Cleanup function to destroy the view on component unmount
    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, [config, sigmaData]);

  return (
    <div id="viewDiv" style={{ height: '100vh', width: '100%' }}>
      <div className='checkboxContainer'>
        <span id="layerToggle" className="esri-widget">
          <input type="checkbox" id="featureLayer" /> Show Layer
        </span>
      </div>
    </div>
  );
};

export default MapViewComponent;
