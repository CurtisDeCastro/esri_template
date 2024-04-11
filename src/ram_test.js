// import React, { useEffect } from 'react';
// import { loadModules } from 'esri-loader';
// import '@arcgis/core/assets/esri/themes/light/main.css';
// import {
//   client,
//   useConfig,
//   useElementData,
// } from "@sigmacomputing/plugin";

// client.config.configureEditorPanel([
//   { name: "source", type: "element" },
//   { name: "CenterLongitude", type: "column", source: "source", allowMultiple: false },
//   { name: "CenterLatitude", type: "column", source: "source", allowMultiple: false },
//   { name: "Layers", type: "column", source: "source", allowMultiple: false }
// ]);

// const MapViewComponent_Ram = () => {
//   const config = useConfig();
//   const sigmaData = useElementData(config.source);

//   useEffect(() => {
//     let view;

//     const loadMap = async () => {
//       const [Map, MapView, TileLayer] = await loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/TileLayer']);

//       const centerLongitude = sigmaData[config.CenterLongitude] ? sigmaData[config.CenterLongitude][0] : 0;
//       const centerLatitude = sigmaData[config.CenterLatitude] ? sigmaData[config.CenterLatitude][0] : 0;

//       const map = new Map({
//         basemap: 'topo-vector',
//         layers: []
//       });

//       view = new MapView({
//         container: 'viewDiv',
//         map: map,
//         zoom: 4,
//         center: [centerLongitude, centerLatitude]
//       });

//       if (config.Layers && Array.isArray(sigmaData[config.Layers])) {
//         sigmaData[config.Layers].forEach(layerUrl => {
//           if (layerUrl) {
//             console.log("Attempting to load layer with URL:", layerUrl);
//             const layer = new TileLayer({
//               url: layerUrl
//             });
//             map.layers.add(layer);
//           } else {
//             console.error("Invalid layer URL:", layerUrl);
//           }
//         });
//       } else {
//         console.error("The Layers data is not an array or is undefined:", sigmaData[config.Layers]);
//       }
//     };

//     loadMap();

//     return function cleanup() {
//       if (view) {
//         view.destroy();
//       }
//     };
//   }, [config, sigmaData]);

//   return (
//     <div id="viewDiv" style={{ height: '100vh', width: '100%' }}></div>
//   );
// };

// export default MapViewComponent_Ram;