import React from "react";
import logo from './logo.svg';
import './App.css';
import { GLTFFileLoader } from 'babylonjs-loaders';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import "@babylonjs/loaders/glTF";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, scene } from "@babylonjs/core";
// import SceneComponent from "./SceneComponent"; // uses above component in same directory
import ReactDOM from "react-dom";
import Scene from "./Scene";


class Model extends React.Component {
  setup = e => {
    const { canvas, scene } = e;
    var camera = new BABYLON.UniversalCamera(
      "UniversalCamera",
      new BABYLON.Vector3(0, 0, -10),
      scene
    );
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 0.7;
  };

  run = e => {
    const { scene, engine } = e;
    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  };

  onSceneMount = e => {
    const { scene } = e;

    this.setup(e);

    BABYLON.SceneLoader.Append("scene62/", "scene.gltf", scene, function(scene) {
      scene.createDefaultCameraOrLight(true, true, true);
    });

    this.run(e);
  };

  render() {
    return (
      <div>
        <Scene onSceneMount={this.onSceneMount} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Model />, rootElement);


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p> GLTF 파일 로드 테스트 </p>
        
          
//       </header>
//     </div>
//   );
// }

export default Model;
