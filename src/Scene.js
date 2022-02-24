import React from "react";
import * as BABYLON from 'babylonjs';
// import BABYLON from 'babylonjs';
// import 'babylonjs-loaders';
// import { Engine, Scene } from '@babylonjs/core';
// import "@babylonjs/loaders/glTF";

export default class Scene extends React.Component {
  onResizeWindow = () => {
    if (this.engine) {
      this.engine.resize();
    }
  };

  componentDidMount() {
    this.engine = new BABYLON.Engine(
      this.canvas,
      true,
      this.props.engineOptions || BABYLON.EngineOptions,
      this.props.adaptToDeviceRatio || null
    );

    let scene = new BABYLON.Scene(this.engine);
    this.scene = scene;

    if (typeof this.props.onSceneMount === "function") {
      this.props.onSceneMount({
        scene: this.scene,
        engine: this.engine,
        canvas: this.canvas
      });
    } else {
      console.error("onSceneMount function not available");
    }

    // Resize the babylon engine when the window is resized
    window.addEventListener("resize", this.onResizeWindow);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResizeWindow);
  }

  onCanvasLoaded = c => {
    if (c !== null) {
      this.canvas = c;
    }
  };

  render() {
    // 'rest' can contain additional properties that you can flow through to canvas:
    // (id, className, etc.)
    let { width, height, ...rest } = this.props;

    let opts = {};

    if (width !== undefined && height !== undefined) {
      opts.width = width;
      opts.height = height;
    }

    return <canvas id="renderCanvas" {...opts} ref={this.onCanvasLoaded} />;
  }
}
