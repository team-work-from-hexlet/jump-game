const scenes = Symbol();
const currentScene = Symbol();
const interval = Symbol();

let lastUpdate;

class World {
  constructor(options) {
    this[scenes] = [];

    const {
      gravity: gravity = 0.1,
      refreshRate: refreshRate = 30,
    } = options || {};

    this.gravity = gravity;
    this[interval] = setInterval(this.update.bind(this), 1000 / refreshRate);
  }

  update() {
    const currentTime = Date.now();
    this.currentScene.update(currentTime - lastUpdate);
    lastUpdate = currentTime;
  }

  addScene(scene, current = false) {
    this[scenes].push(scene);

    if (current) {
      this[currentScene] = scene;
    }

    return scene;
  }

  get currentScene() {
    return this[currentScene];
  }
}

export default new World();
