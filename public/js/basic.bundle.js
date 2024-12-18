/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./core/Attractor.js":
/*!***************************!*\
  !*** ./core/Attractor.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Attractor)
          /* harmony export */
        });
/* harmony import */ var _Defaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Defaults */ "./core/Defaults.js");


        class Attractor {
          constructor(position, ctx, settings = {}) {
            this.position = position;     // vec2 of this attractor's position
            this.ctx = ctx;               // global canvas context
            this.settings = Object.assign({}, _Defaults__WEBPACK_IMPORTED_MODULE_0__["default"], settings);

            this.influencingNodes = [];   // references to nodes this attractor is influencing each frame
            this.fresh = true;            // flag used to prevent attractors from being removed during first frame of Closed venation mode
          }

          draw() {
            // Draw the attraction zone
            if (this.settings.ShowAttractionZones) {
              this.ctx.beginPath();
              this.ctx.ellipse(this.position.x, this.position.y, this.settings.AttractionDistance, this.settings.AttractionDistance, 0, 0, Math.PI * 2);
              this.ctx.fillStyle = this.settings.Colors.AttractionZoneColor;
              this.ctx.fill();
            }

            // Draw the kill zone
            if (this.settings.ShowKillZones) {
              this.ctx.beginPath();
              this.ctx.ellipse(this.position.x, this.position.y, this.settings.KillDistance, this.settings.KillDistance, 0, 0, Math.PI * 2);
              this.ctx.fillStyle = this.settings.Colors.KillZoneColor;
              this.ctx.fill();
            }

            // Draw the attractor
            if (this.settings.ShoAttractors) {
              this.ctx.beginPath();
              this.ctx.ellipse(this.position.x, this.position.y, 1, 1, 0, 0, Math.PI * 2);
              this.ctx.fillStyle = this.settings.Colors.AttractorColor;
              this.ctx.fill();
            }
          }
        }

        /***/
      }),

/***/ "./core/AttractorPatterns.js":
/*!***********************************!*\
  !*** ./core/AttractorPatterns.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyNoise: () => (/* binding */ applyNoise),
/* harmony export */   getGridOfAttractors: () => (/* binding */ getGridOfAttractors),
/* harmony export */   getPhyllotaxisAttractors: () => (/* binding */ getPhyllotaxisAttractors),
/* harmony export */   getRandomAttractors: () => (/* binding */ getRandomAttractors),
/* harmony export */   getWaveOfAttractors: () => (/* binding */ getWaveOfAttractors)
          /* harmony export */
        });
/* harmony import */ var _Attractor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Attractor */ "./core/Attractor.js");
/* harmony import */ var vec2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vec2 */ "./node_modules/vec2/vec2.js");
/* harmony import */ var vec2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vec2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utilities */ "./core/Utilities.js");



        var SimplexNoise = __webpack_require__(/*! simplex-noise */ "./node_modules/simplex-noise/simplex-noise.js");

        function getRandomAttractors(numAttractors, ctx, bounds = undefined, obstacles = undefined) {
          let attractors = [];
          let x, y;
          let isInsideAnyBounds, isInsideAnyObstacle, isOnScreen;

          for (let i = 0; i < numAttractors; i++) {
            x = (0, _Utilities__WEBPACK_IMPORTED_MODULE_2__.random)(window.innerWidth);
            y = (0, _Utilities__WEBPACK_IMPORTED_MODULE_2__.random)(window.innerHeight);
            isInsideAnyBounds = false;
            isInsideAnyObstacle = false;
            isOnScreen = false;

            // Only allow attractors that are in the viewport
            if (
              x > 0 &&
              x < window.innerWidth &&
              y > 0 &&
              y < window.innerHeight
            ) {
              isOnScreen = true;
            }

            // Only allow root nodes inside of defined bounds
            if (bounds != undefined && bounds.length > 0) {
              for (let bound of bounds) {
                if (bound.contains(x, y)) {
                  isInsideAnyBounds = true;
                }
              }
            }

            // Don't allow any root nodes that are inside of an obstacle
            if (obstacles != undefined && obstacles.length > 0) {
              for (let obstacle of obstacles) {
                if (obstacle.contains(x, y)) {
                  isInsideAnyObstacle = true;
                }
              }
            }

            if (
              (isInsideAnyBounds || bounds === undefined) &&
              (!isInsideAnyObstacle || obstacles === undefined)
            ) {
              attractors.push(
                new _Attractor__WEBPACK_IMPORTED_MODULE_0__["default"](
                  new (vec2__WEBPACK_IMPORTED_MODULE_1___default())(x, y),
                  ctx
                )
              );
            }
          }

          return attractors;
        }

        function getGridOfAttractors(numRows, numColumns, ctx, jitterRange = 0, bounds = undefined, obstacles = undefined) {
          let attractors = [];
          let x, y;
          let isInsideAnyBounds, isInsideAnyObstacle, isOnScreen;

          for (let i = 0; i <= numRows; i++) {
            for (let j = 0; j <= numColumns; j++) {
              x = (window.innerWidth / numColumns) * j + (0, _Utilities__WEBPACK_IMPORTED_MODULE_2__.random)(-jitterRange, jitterRange);
              y = (window.innerHeight / numRows) * i + (0, _Utilities__WEBPACK_IMPORTED_MODULE_2__.random)(-jitterRange, jitterRange);
              isInsideAnyBounds = false;
              isInsideAnyObstacle = false;
              isOnScreen = false;

              // Only allow attractors that are in the viewport
              if (
                x > 0 &&
                x < window.innerWidth &&
                y > 0 &&
                y < window.innerHeight
              ) {
                isOnScreen = true;
              }

              // Only allow attractors inside of any of the defined bounds (if used)
              if (bounds != undefined && bounds.length > 0) {
                for (let bound of bounds) {
                  if (bound.contains(x, y)) {
                    isInsideAnyBounds = true;
                  }
                }
              }

              // Don't allow any root nodes that are inside of an obstacle (if used)
              if (obstacles != undefined && obstacles.length > 0) {
                for (let obstacle of obstacles) {
                  if (obstacle.contains(x, y)) {
                    isInsideAnyObstacle = true;
                  }
                }
              }

              if (
                isOnScreen &&
                (isInsideAnyBounds || bounds === undefined) &&
                (!isInsideAnyObstacle || obstacles === undefined)
              ) {
                attractors.push(
                  new _Attractor__WEBPACK_IMPORTED_MODULE_0__["default"](
                    new (vec2__WEBPACK_IMPORTED_MODULE_1___default())(x, y),
                    ctx
                  )
                );
              }
            }
          }

          return attractors;
        }

        function getPhyllotaxisAttractors(ctx) {
          let attractors = [];
          let numCircles = 5000,
            golden_ratio = (Math.sqrt(5) + 1) / 2 - 1,
            golden_angle = golden_ratio * (2 * Math.PI),
            circle_rad = window.innerWidth / 2;


          for (let i = 0; i < numCircles; i++) {
            let ratio = i / numCircles,
              angle = i * golden_angle,
              spiral_rad = ratio * circle_rad;

            attractors.push(
              new _Attractor__WEBPACK_IMPORTED_MODULE_0__["default"](
                new (vec2__WEBPACK_IMPORTED_MODULE_1___default())(
                  window.innerWidth / 2 + Math.cos(angle) * spiral_rad,
                  window.innerHeight / 2 + Math.sin(angle) * spiral_rad
                ),
                ctx
              )
            );
          }

          return attractors;
        }

        function getWaveOfAttractors(ctx) {
          let attractors = [];
          let numRows = 70;
          let numColumns = 100;
          let rowSpacing = window.innerHeight / numRows;
          let colSpacing = window.innerWidth / numColumns;

          for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numColumns; col++) {
              attractors.push(
                new _Attractor__WEBPACK_IMPORTED_MODULE_0__["default"](
                  new (vec2__WEBPACK_IMPORTED_MODULE_1___default())(
                    (col * colSpacing) + (Math.sin((0, _Utilities__WEBPACK_IMPORTED_MODULE_2__.map)(col, 0, numColumns, 0, Math.PI * 2)) * 200),
                    (row * rowSpacing) + (Math.sin((0, _Utilities__WEBPACK_IMPORTED_MODULE_2__.map)(row, 0, numRows, 0, Math.PI * 2)) * 50)
                  ),
                  ctx
                )
              )
            }
          }

          return attractors;
        }

        function applyNoise(attractors) {
          let noise = new SimplexNoise();

          for (let attractor of attractors) {
            attractor.position.x += noise.noise2D(attractor.position.x, attractor.position.y) * 10;
            attractor.position.y += noise.noise2D(souattractorrce.position.x, attractor.position.y) * 10;
          }

          return attractors;
        }

        /***/
      }),

/***/ "./core/ColorPresets.js":
/*!******************************!*\
  !*** ./core/ColorPresets.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Custom: () => (/* binding */ Custom),
/* harmony export */   Dark: () => (/* binding */ Dark),
/* harmony export */   Light: () => (/* binding */ Light),
/* harmony export */   Realistic: () => (/* binding */ Realistic)
          /* harmony export */
        });
        const Light = {
          BackgroundColor: 'rgba(255,255,255,1)',
          AttractorColor: 'rgba(0,0,0,.5)',
          BranchColor: 'rgba(0,0,0,1)',
          TipColor: 'rgba(255,0,0,1)',
          AttractionZoneColor: 'rgba(0,255,0,.002)',
          KillZoneColor: 'rgba(255,0,0,.4)',
          InfluenceLinesColor: 'rgba(0,0,255,1)',
          BoundsFillColor: 'rgba(0,0,0,.1)',
          BoundsBorderColor: 'rgba(0,0,0,.1)',
          ObstacleFillColor: 'rgba(0,0,0,.7)'
        }

        const Dark = {
          BackgroundColor: 'rgba(0,0,0,.9)',
          AttractorColor: 'rgba(255,255,255,.5)',
          BranchColor: 'rgba(255,255,255,1)',
          TipColor: 'rgba(0,255,255,1)',
          AttractionZoneColor: 'rgba(255,255,255,.002)',
          KillZoneColor: 'rgba(255,0,0,.4)',
          InfluenceLinesColor: 'rgba(255,255,255,.2)',
          BoundsFillColor: 'rgba(255,255,255,0)',
          BoundsBorderColor: 'rgba(255,255,255,.05)',
          ObstacleFillColor: 'rgba(255,255,255,.2)'
        }

        const Realistic = {
          BackgroundColor: 'rgba(255,255,255,1)',
          AttractorColor: 'rgba(255,255,255,1)',
          BranchColor: 'rgba(255,255,255,.6)',
          // BranchColor: 'rgba(0,0,0,.2)',
          TipColor: 'rgba(255,0,0,1)',
          AttractionZoneColor: 'rgba(0,255,0,.002)',
          KillZoneColor: 'rgba(255,0,0,.4)',
          InfluenceLinesColor: 'rgba(0,0,255,1)',
          BoundsFillColor: 'rgba(61,166,12,1)',
          BoundsBorderColor: 'rgba(255,255,255,1)',
          ObstacleFillColor: 'rgba(255,255,255,1)'
        }

        const Custom = {
          BackgroundColor: 'rgb(242,242,242)',
          AttractorColor: 'rgba(255,255,255,.6)',
          BranchColor: 'rgba(255,255,255,1)',
          InfluenceLinesColor: 'rgba(255,255,255,.3)',
          // BoundsFillColor: 'rgb(61,85,136)',
          // BoundsBorderColor: 'rgb(61,85,136)'
          BoundsFillColor: 'rgb(210, 81, 94)',
          BoundsBorderColor: 'rgb(210, 81, 94)'
        }

        /***/
      }),

/***/ "./core/Defaults.js":
/*!**************************!*\
  !*** ./core/Defaults.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
          /* harmony export */
        });
/* harmony import */ var _ColorPresets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ColorPresets */ "./core/ColorPresets.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
          /**
            Simulation configurations
          */

          VenationType: 'Open',         // venation can be "Open" or "Closed"
          SegmentLength: 5,             // length of each branch segment. Smaller numbers mean smoother lines, but more computation cost
          AttractionDistance: 30,       // radius of influence (d_i) around each attractor that attracts nodes
          KillDistance: 5,              // distance (d_k) between attractors and nodes when branches are ended
          IsPaused: false,              // initial pause/unpause state
          EnableCanalization: true,     // turns on/off auxin flux canalization (line segment thickening)
          EnableOpacityBlending: true,  // turns on/off opacity


          /**
            Rendering configurations
          */

          // Visibility toggles
          ShowAttractors: false,       // toggled with 'a'
          ShowNodes: true,             // toggled with 'n'
          ShowTips: false,             // toggled with 't'
          ShowAttractionZones: false,  // toggled with 'z'
          ShowKillZones: false,        // toggled with 'k'
          ShowInfluenceLines: false,   // toggled with 'i'
          ShowBounds: false,           // toggled with 'b'
          ShowObstacles: false,        // toggled with 'o'

          // Modes
          RenderMode: 'Lines',  // draw branch segments as "Lines" or "Dots"

          // Colors
          Colors: _ColorPresets__WEBPACK_IMPORTED_MODULE_0__.Dark,

          // Line thicknesses
          BranchThickness: 1.5,
          TipThickness: 2,
          BoundsBorderThickness: 1
        });

        /***/
      }),

/***/ "./core/Network.js":
/*!*************************!*\
  !*** ./core/Network.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Network)
          /* harmony export */
        });
/* harmony import */ var _Defaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Defaults */ "./core/Defaults.js");
/* harmony import */ var kdbush__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! kdbush */ "./node_modules/kdbush/src/index.js");
/* harmony import */ var vec2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vec2 */ "./node_modules/vec2/vec2.js");
/* harmony import */ var vec2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vec2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utilities */ "./core/Utilities.js");





        class Network {
          constructor(ctx, settings) {
            this.ctx = ctx;
            this.settings = Object.assign({}, _Defaults__WEBPACK_IMPORTED_MODULE_0__["default"], settings);

            this.attractors = [];  // attractors influence node growth
            this.nodes = [];       // nodes are connected to form branches

            this.nodesIndex;       // kd-bush spatial index for all nodes

            this.bounds = [];      // array of Path objects that branches cannot grow outside of
            this.obstacles = [];   // array of Path objects that branches must avoid

            this.buildSpatialIndices();
          }

          update() {
            // Skip iteration if paused
            if (this.settings.IsPaused) {
              return;
            }

            // Associate attractors with nearby nodes to figure out where growth should occur
            for (let [attractorID, attractor] of this.attractors.entries()) {
              switch (this.settings.VenationType) {
                // For open venation, only associate this attractor with its closest node
                case 'Open':
                  let closestNode = this.getClosestNode(attractor, this.getNodesInAttractionZone(attractor));

                  if (closestNode != null) {
                    closestNode.influencedBy.push(attractorID);
                    attractor.influencingNodes = [closestNode];
                  }

                  break;

                // For closed venation, associate this attractor with all nodes in its relative neighborhood
                case 'Closed':
                  let neighborhoodNodes = this.getRelativeNeighborNodes(attractor);
                  let nodesInKillZone = this.getNodesInKillZone(attractor);

                  // Exclude nodes that are in the attractor's kill zone (these should stop growing)
                  let nodesToGrow = neighborhoodNodes.filter((neighborNode) => {
                    return !nodesInKillZone.includes(neighborNode);
                  });

                  attractor.influencingNodes = neighborhoodNodes;

                  if (nodesToGrow.length > 0) {
                    attractor.fresh = false;

                    for (let node of nodesToGrow) {
                      node.influencedBy.push(attractorID);
                    }
                  }


                  break;
              }
            }

            // Grow the network by adding new nodes onto any nodes being influenced by attractors
            for (let node of this.nodes) {
              if (node.influencedBy.length > 0) {
                let averageDirection = this.getAverageDirection(node, node.influencedBy.map(id => this.attractors[id]));
                let nextNode = node.getNextNode(averageDirection);
                let isInsideAnyBounds = false;
                let isInsideAnyObstacle = false;

                // Only allow root nodes inside of defined bounds
                if (this.bounds != undefined && this.bounds.length > 0) {
                  for (let bound of this.bounds) {
                    if (bound.contains(nextNode.position.x, nextNode.position.y)) {
                      isInsideAnyBounds = true;
                    }
                  }
                }

                // Don't allow any root nodes that are inside of an obstacle
                if (this.obstacles != undefined && this.obstacles.length > 0) {
                  for (let obstacle of this.obstacles) {
                    if (obstacle.contains(nextNode.position.x, nextNode.position.y)) {
                      isInsideAnyObstacle = true;
                    }
                  }
                }

                // NOTE: disabling this check lets nodes grow across gaps in bounds - cool effect!
                if (
                  (isInsideAnyBounds || this.bounds.length === 0) &&
                  (!isInsideAnyObstacle || this.obstacles.length === 0)
                ) {
                  this.nodes.push(nextNode);
                }
              }

              node.influencedBy = [];

              // Perform auxin flux canalization (line segment thickening)
              if (node.isTip && this.settings.EnableCanalization) {
                let currentNode = node;

                while (currentNode.parent != null) {
                  // When there are multiple child nodes, use the thickest of them all
                  if (currentNode.parent.thickness < currentNode.thickness + .07) {
                    currentNode.parent.thickness = currentNode.thickness + .03;
                  }

                  currentNode = currentNode.parent;
                }
              }
            }

            // Remove any attractors that have been reached by their associated nodes
            for (let [attractorID, attractor] of this.attractors.entries()) {
              switch (this.settings.VenationType) {
                // For open venation, remove the attractor as soon as any node reaches it
                case 'Open':
                  if (attractor.reached) {
                    this.attractors.splice(attractorID, 1);
                  }

                  break;

                // For closed venation, remove the attractor only when all associated nodes have reached it
                case 'Closed':
                  if (attractor.influencingNodes.length > 0 && !attractor.fresh) {
                    let allNodesReached = true;

                    for (let node of attractor.influencingNodes) {
                      if (node.position.distance(attractor.position) > this.settings.KillDistance) {
                        allNodesReached = false;
                      }
                    }

                    if (allNodesReached) {
                      this.attractors.splice(attractorID, 1);
                    }
                  }

                  break;
              }
            }

            // Rebuild spatial indices
            this.buildSpatialIndices();
          }

          draw() {
            this.drawBackground();
            this.drawBounds();
            this.drawObstacles();
            this.drawattractors();
            this.drawNodes();
          }

          drawBackground() {
            this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            this.ctx.beginPath();
            this.ctx.fillStyle = this.settings.Colors.BackgroundColor;
            this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
          }

          drawBounds() {
            if (this.settings.ShowBounds && this.bounds != undefined) {
              for (let bound of this.bounds) {
                bound.draw();
              }
            }
          }

          drawObstacles() {
            if (this.settings.ShowObstacles && this.obstacles != undefined) {
              for (let obstacle of this.obstacles) {
                obstacle.draw();
              }
            }
          }

          drawNodes() {
            if (this.settings.ShowNodes) {
              for (let node of this.nodes) {
                node.draw();
              }
            }
          }

          drawattractors() {
            for (let attractor of this.attractors) {
              attractor.draw();

              // Draw lines between each attractor and the nodes they are influencing
              if (this.settings.ShowInfluenceLines && attractor.influencingNodes.length > 0) {
                for (let node of attractor.influencingNodes) {
                  this.ctx.beginPath();
                  this.ctx.moveTo(attractor.position.x, attractor.position.y);
                  this.ctx.lineTo(node.position.x, node.position.y);
                  this.ctx.strokeStyle = this.settings.Colors.InfluenceLinesColor;
                  this.ctx.stroke();
                }
              }
            }
          }

          getRelativeNeighborNodes(attractor) {
            let fail;

            let nearbyNodes = this.getNodesInAttractionZone(attractor);
            let relativeNeighbors = [];
            let attractorToP0, attractorToP1, p0ToP1;

            // p0 is a relative neighbor of auxinPos iff
            // for any point p1 that is closer to auxinPos than is p0,
            // p0 is closer to auxinPos than to p1
            for (let p0 of nearbyNodes) {
              fail = false;
              attractorToP0 = p0.position.subtract(attractor.position, true);

              for (let p1 of nearbyNodes) {
                if (p0 === p1) {
                  continue;
                }

                attractorToP1 = p1.position.subtract(attractor.position, true);

                if (attractorToP1.length() > attractorToP0.length()) {
                  continue;
                }

                p0ToP1 = p1.position.subtract(p0.position, true);

                if (attractorToP0.length() > p0ToP1.length()) {
                  fail = true;
                  break;
                }
              }

              if (!fail) {
                relativeNeighbors.push(p0);
              }
            }

            return relativeNeighbors;
          }

          getNodesInAttractionZone(attractor) {
            return this.nodesIndex.within(
              attractor.position.x,
              attractor.position.y,
              this.settings.AttractionDistance
            ).map(
              id => this.nodes[id]
            );
          }

          getNodesInKillZone(attractor) {
            return this.nodesIndex.within(
              attractor.position.x,
              attractor.position.y,
              this.settings.KillDistance
            ).map(
              id => this.nodes[id]
            );
          }

          getClosestNode(attractor, nearbyNodes) {
            let closestNode = null,
              record = this.settings.AttractionDistance;

            for (let node of nearbyNodes) {
              let distance = node.position.distance(attractor.position);

              if (distance < this.settings.KillDistance) {
                attractor.reached = true;
                closestNode = null;
              } else if (distance < record) {
                closestNode = node;
                record = distance;
              }
            }

            return closestNode;
          }

          getAverageDirection(node, nearbyattractors) {
            // Add up normalized vectors pointing to each attractor
            let averageDirection = new vec2__WEBPACK_IMPORTED_MODULE_2__(0, 0);

            for (let attractor of nearbyattractors) {
              averageDirection.add(
                attractor.position.subtract(node.position, true).normalize()
              );
            }

            // Add small amount of random "jitter" to avoid getting stuck between two attractors and endlessly generating nodes in the same place
            // (Credit to Davide Prati (edap) for the idea, seen in ofxSpaceColonization)
            averageDirection.add(new vec2__WEBPACK_IMPORTED_MODULE_2__((0, _Utilities__WEBPACK_IMPORTED_MODULE_3__.random)(-.1, .1), (0, _Utilities__WEBPACK_IMPORTED_MODULE_3__.random)(-.1, .1))).normalize();

            averageDirection.divide(node.influencedBy.length).normalize();

            return averageDirection;
          }

          addNode(node) {
            let isInsideAnyBounds = false;
            let isInsideAnyObstacle = false;

            // Only allow root nodes inside of defined bounds
            if (this.bounds != undefined && this.bounds.length > 0) {
              for (let bound of this.bounds) {
                if (bound.contains(node.position.x, node.position.y)) {
                  isInsideAnyBounds = true;
                }
              }
            }

            // Don't allow any root nodes that are inside of an obstacle
            if (this.obstacles != undefined && this.obstacles.length > 0) {
              for (let obstacle of this.obstacles) {
                if (obstacle.contains(node.position.x, node.position.y)) {
                  isInsideAnyObstacle = true;
                }
              }
            }

            if (
              (isInsideAnyBounds || this.bounds.length === 0) &&
              (!isInsideAnyObstacle || this.obstacles.length === 0)
            ) {
              this.nodes.push(node);
              this.buildSpatialIndices();
            }
          }

          reset() {
            this.nodes = [];
            this.attractors = [];

            this.buildSpatialIndices();
          }

          buildSpatialIndices() {
            this.nodesIndex = new kdbush__WEBPACK_IMPORTED_MODULE_1__["default"](this.nodes, p => p.position.x, p => p.position.y);
          }

          toggleNodes() {
            this.settings.ShowNodes = !this.settings.ShowNodes;
          }

          toggleTips() {
            this.settings.ShowTips = !this.settings.ShowTips;

            for (let node of this.nodes) {
              node.settings.ShowTips = !node.settings.ShowTips;
            }
          }

          toggleattractors() {
            this.settings.Showattractors = !this.settings.Showattractors;

            for (let attractor of this.attractors) {
              attractor.settings.Showattractors = !attractor.settings.Showattractors;
            }
          }

          toggleAttractionZones() {
            this.settings.ShowAttractionZones = !this.settings.ShowAttractionZones;

            for (let attractor of this.attractors) {
              attractor.settings.ShowAttractionZones = !attractor.settings.ShowAttractionZones;
            }
          }

          toggleKillZones() {
            this.settings.ShowKillZones = !this.settings.ShowKillZones;

            for (let attractor of this.attractors) {
              attractor.settings.ShowKillZones = !attractor.settings.ShowKillZones;
            }
          }

          toggleInfluenceLines() {
            this.settings.ShowInfluenceLines = !this.settings.ShowInfluenceLines;
          }

          toggleBounds() {
            this.settings.ShowBounds = !this.settings.ShowBounds;
          }

          toggleObstacles() {
            this.settings.ShowObstacles = !this.settings.ShowObstacles;
          }

          toggleCanalization() {
            this.settings.EnableCanalization = !this.settings.EnableCanalization;

            if (!this.settings.EnableCanalization) {
              for (let node of this.nodes) {
                node.thickness = 0;
              }
            }
          }

          toggleOpacityBlending() {
            this.settings.EnableOpacityBlending = !this.settings.EnableOpacityBlending;

            for (let node of this.nodes) {
              node.settings.EnableOpacityBlending = this.settings.EnableOpacityBlending;
            }
          }

          togglePause() {
            this.settings.IsPaused = !this.settings.IsPaused;
          }
        }

        /***/
      }),

/***/ "./core/Node.js":
/*!**********************!*\
  !*** ./core/Node.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Node)
          /* harmony export */
        });
/* harmony import */ var _Defaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Defaults */ "./core/Defaults.js");


        class Node {
          constructor(parent, position, isTip, ctx, settings, color = undefined) {
            this.parent = parent;       // reference to parent node, necessary for vein thickening later
            this.position = position;   // {vec2} of this node's position
            this.isTip = isTip;         // {boolean}
            this.ctx = ctx;             // global canvas context for drawing
            this.settings = Object.assign({}, _Defaults__WEBPACK_IMPORTED_MODULE_0__["default"], settings);
            this.color = color;         // color, usually passed down from parent

            this.influencedBy = [];     // references to all Attractors influencing this node each frame
            this.thickness = 0;         // thickness - this is increased during vein thickening process
          }

          draw() {
            if (this.parent != null) {
              // Smoothly ramp up opacity based on vein thickness
              if (this.settings.EnableOpacityBlending) {
                this.ctx.globalAlpha = this.thickness / 3 + .2;
              }

              // "Lines" render mode
              if (this.settings.RenderMode == 'Lines') {
                this.ctx.beginPath();
                this.ctx.moveTo(this.position.x, this.position.y);
                this.ctx.lineTo(this.parent.position.x, this.parent.position.y);

                if (this.isTip && this.settings.ShowTips) {
                  this.ctx.strokeStyle = this.settings.Colors.TipColor;
                  this.ctx.lineWidth = this.settings.TipThickness;
                } else {
                  if (this.color != undefined) {
                    this.ctx.strokeStyle = this.color;
                  } else {
                    this.ctx.strokeStyle = this.settings.Colors.BranchColor;
                  }

                  this.ctx.lineWidth = this.settings.BranchThickness + this.thickness;
                }

                this.ctx.stroke();
                this.ctx.lineWidth = 1;

                // "Dots" render mode
              } else if (this.settings.RenderMode == 'Dots') {
                this.ctx.beginPath();
                this.ctx.ellipse(
                  this.position.x,
                  this.position.y,
                  1 + this.thickness / 2,
                  1 + this.thickness / 2,
                  0,
                  0,
                  Math.PI * 2
                );

                // Change color or "tip" nodes
                if (this.isTip && this.settings.ShowTips) {
                  this.ctx.fillStyle = this.settings.Colors.TipColor;
                } else {
                  this.ctx.fillStyle = this.settings.Colors.BranchColor;
                }

                this.ctx.fill();
              }

              // Reset global opacity if it was changed due to opacity gradient flag
              if (this.settings.EnableOpacityBlending) {
                this.ctx.globalAlpha = 1;
              }
            }
          }

          // Create a new node in the provided direction and a pre-defined distance (SegmentLength)
          getNextNode(averageAttractorDirection) {
            this.isTip = false;
            this.nextPosition = this.position.add(averageAttractorDirection.multiply(this.settings.SegmentLength), true);

            return new Node(
              this,
              this.nextPosition,
              true,
              this.ctx,
              this.settings,
              this.color
            );
          }
        }

        /***/
      }),

/***/ "./core/Utilities.js":
/*!***************************!*\
  !*** ./core/Utilities.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   exportSVG: () => (/* binding */ exportSVG),
/* harmony export */   getCircleOfPoints: () => (/* binding */ getCircleOfPoints),
/* harmony export */   map: () => (/* binding */ map),
/* harmony export */   random: () => (/* binding */ random)
          /* harmony export */
        });
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_points__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-points */ "./node_modules/svg-points/modules/index.js");



        // random(), similar to Processing's
        // If two parameters are passed, they are interpreted as the minimum and maximum of the desired range
        // If only one parameter is passed, it is interpreted as the maximum, while zero is used as the minimum
        function random(min, max) {
          if (max === undefined) {
            max = min;
            min = 0;
          }

          if (typeof min !== 'number' || typeof max !== 'number') {
            throw new TypeError('Expected all arguments to be numbers');
          }

          return Math.random() * (max - min) + min;
        }

        // Converts a number from one range to another
        function map(value, originalLower, originalUpper, newLower, newUpper) {
          return newLower + (newUpper - newLower) * ((value - originalLower) / (originalUpper - originalLower));
        }

        // Returns an array of point coordinates (also arrays, with two entries) for points arranged in a circle
        function getCircleOfPoints(cx, cy, radius, resolution) {
          let angle, x, y;
          let points = [];

          for (let i = 0; i < resolution; i++) {
            angle = 2 * Math.PI * i / resolution;
            x = cx + Math.floor(radius * Math.cos(angle));
            y = cy + Math.floor(radius * Math.sin(angle));

            points.push([x, y]);
          }

          return points;
        }

        // Creates an SVG document containing all of the visible geometry, then pushes it to the client
        // - Triggered by pressing `e` in any sketch. See KeyboardInteractions.js for definition
        function exportSVG(network) {
          // Set up <svg> element
          let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', 'http://www.w3.org/2000/svg');
          svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
          svg.setAttribute('width', window.innerWidth);
          svg.setAttribute('height', window.innerHeight);
          svg.setAttribute('viewBox', '0 0 ' + window.innerWidth + ' ' + window.innerHeight);

          // Create <line>s for each branch segment
          if (network.settings.ShowBranches) {
            let nodeLinesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

            for (let node of network.nodes) {
              if (node.parent != null) {
                let lineNode = `
          <line
            x1="${node.parent.position.x}"
            y1="${node.parent.position.y}"
            x2="${node.position.x}"
            y2="${node.position.y}"
            stroke="black"
          />
        `;

                nodeLinesGroup.innerHTML += lineNode;
              }
            }

            svg.appendChild(nodeLinesGroup);
          }

          // Create <path>s for bounds
          if (network.settings.ShowBounds) {
            if (network.bounds.length > 0) {
              let boundsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

              for (let bound of network.bounds) {
                boundsGroup.appendChild(
                  getPathElFromPoints(bound.polygon)
                );
              }

              svg.appendChild(boundsGroup);
            }
          }

          // Create <path>s for obstacles
          if (network.settings.ShowObstacles) {
            if (network.obstacles.length > 0) {
              let obstaclesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

              for (let obstacle of network.obstacles) {
                obstaclesGroup.appendChild(
                  getPathElFromPoints(obstacle.polygon)
                );
              }

              svg.appendChild(obstaclesGroup);
            }
          }

          // Generate the document as a Blob and force a download as a timestamped .svg file
          const svgDoctype = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';
          const serializedSvg = (new XMLSerializer()).serializeToString(svg);
          const blob = new Blob([svgDoctype, serializedSvg], { type: 'image/svg+xml;' })
            ; (0, file_saver__WEBPACK_IMPORTED_MODULE_0__.saveAs)(blob, 'venation-' + Date.now() + '.svg');
        }

        // Create a <path> element with a properly-formatted `d` attribute containing all the coordinates of the passed points
        function getPathElFromPoints(points) {
          let pointsString = '';

          for (let [index, point] of points.entries()) {
            pointsString += point[0] + ',' + point[1];

            if (index < points.length - 1) {
              pointsString += ' ';
            }
          }

          // Add closepath command to automatically draw line back to initial point
          pointsString += ' ' + points[0][0] + ',' + points[0][1];

          let d = (0, svg_points__WEBPACK_IMPORTED_MODULE_1__.toPath)({
            type: 'polyline',
            points: pointsString
          });

          let pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          pathEl.setAttribute('d', d);
          pathEl.setAttribute('style', 'fill: none; stroke: black; stroke-width: 1');

          return pathEl;
        }

        /***/
      }),

/***/ "./experiments/basic/js/Settings.js":
/*!******************************************!*\
  !*** ./experiments/basic/js/Settings.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
          /* harmony export */
        });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
          /**
            Simulation configurations
          */
          VenationType: 'Open',
          SegmentLength: 5,
          AttractionDistance: 30,
          KillDistance: 5,
          IsPaused: false,
          EnableCanalization: true,
          EnableOpacityBlending: false,

          /**
            Rendering configurations
          */
          ShowAttractors: false,
          ShowNodes: true,
          ShowTips: false,
          ShowAttractionZones: false,
          ShowKillZones: false,
          ShowInfluenceLines: false,
          ShowBounds: true,
          ShowObstacles: false,
          RenderMode: 'Lines',

          // Colors
          ColorsDay: {
            BackgroundColor: 'rgba(255, 255, 255, 1)', // Bianco
            BranchColor: 'rgba(0, 0, 0, 1)',           // Nero
          },
          ColorsNight: {
            BackgroundColor: 'rgba(0, 0, 0, 1)',       // Nero
            BranchColor: 'rgba(255, 255, 255, 1)',     // Bianco
          },

          // Line thicknesses
          BranchThickness: 1,
          TipThickness: 2,
          BoundsBorderThickness: 1,
        });


        /***/
      }),

/***/ "./node_modules/file-saver/dist/FileSaver.min.js":
/*!*******************************************************!*\
  !*** ./node_modules/file-saver/dist/FileSaver.min.js ***!
  \*******************************************************/
/***/ (function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__; (function (a, b) {
          if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
              (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
            __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); else { }
        })(this, function () { "use strict"; function b(a, b) { return "undefined" == typeof b ? b = { autoBom: !1 } : "object" != typeof b && (console.warn("Deprecated: Expected third argument to be a object"), b = { autoBom: !b }), b.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob(["\uFEFF", a], { type: a.type }) : a } function c(a, b, c) { var d = new XMLHttpRequest; d.open("GET", a), d.responseType = "blob", d.onload = function () { g(d.response, b, c) }, d.onerror = function () { console.error("could not download file") }, d.send() } function d(a) { var b = new XMLHttpRequest; b.open("HEAD", a, !1); try { b.send() } catch (a) { } return 200 <= b.status && 299 >= b.status } function e(a) { try { a.dispatchEvent(new MouseEvent("click")) } catch (c) { var b = document.createEvent("MouseEvents"); b.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), a.dispatchEvent(b) } } var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof __webpack_require__.g && __webpack_require__.g.global === __webpack_require__.g ? __webpack_require__.g : void 0, a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f.saveAs || ("object" != typeof window || window !== f ? function () { } : "download" in HTMLAnchorElement.prototype && !a ? function (b, g, h) { var i = f.URL || f.webkitURL, j = document.createElement("a"); g = g || b.name || "download", j.download = g, j.rel = "noopener", "string" == typeof b ? (j.href = b, j.origin === location.origin ? e(j) : d(j.href) ? c(b, g, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b), setTimeout(function () { i.revokeObjectURL(j.href) }, 4E4), setTimeout(function () { e(j) }, 0)) } : "msSaveOrOpenBlob" in navigator ? function (f, g, h) { if (g = g || f.name || "download", "string" != typeof f) navigator.msSaveOrOpenBlob(b(f, h), g); else if (d(f)) c(f, g, h); else { var i = document.createElement("a"); i.href = f, i.target = "_blank", setTimeout(function () { e(i) }) } } : function (b, d, e, g) { if (g = g || open("", "_blank"), g && (g.document.title = g.document.body.innerText = "downloading..."), "string" == typeof b) return c(b, d, e); var h = "application/octet-stream" === b.type, i = /constructor/i.test(f.HTMLElement) || f.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent); if ((j || h && i || a) && "undefined" != typeof FileReader) { var k = new FileReader; k.onloadend = function () { var a = k.result; a = j ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;"), g ? g.location.href = a : location = a, g = null }, k.readAsDataURL(b) } else { var l = f.URL || f.webkitURL, m = l.createObjectURL(b); g ? g.location = m : location.href = m, g = null, setTimeout(function () { l.revokeObjectURL(m) }, 4E4) } }); f.saveAs = g.saveAs = g, true && (module.exports = g) });

        //# sourceMappingURL=FileSaver.min.js.map

        /***/
      }),

/***/ "./node_modules/kdbush/src/index.js":
/*!******************************************!*\
  !*** ./node_modules/kdbush/src/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ KDBush)
          /* harmony export */
        });
/* harmony import */ var _sort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sort */ "./node_modules/kdbush/src/sort.js");
/* harmony import */ var _range__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./range */ "./node_modules/kdbush/src/range.js");
/* harmony import */ var _within__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./within */ "./node_modules/kdbush/src/within.js");





        const defaultGetX = p => p[0];
        const defaultGetY = p => p[1];

        class KDBush {
          constructor(points, getX = defaultGetX, getY = defaultGetY, nodeSize = 64, ArrayType = Float64Array) {
            this.nodeSize = nodeSize;
            this.points = points;

            const IndexArrayType = points.length < 65536 ? Uint16Array : Uint32Array;

            const ids = this.ids = new IndexArrayType(points.length);
            const coords = this.coords = new ArrayType(points.length * 2);

            for (let i = 0; i < points.length; i++) {
              ids[i] = i;
              coords[2 * i] = getX(points[i]);
              coords[2 * i + 1] = getY(points[i]);
            }

            (0, _sort__WEBPACK_IMPORTED_MODULE_0__["default"])(ids, coords, nodeSize, 0, ids.length - 1, 0);
          }

          range(minX, minY, maxX, maxY) {
            return (0, _range__WEBPACK_IMPORTED_MODULE_1__["default"])(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
          }

          within(x, y, r) {
            return (0, _within__WEBPACK_IMPORTED_MODULE_2__["default"])(this.ids, this.coords, x, y, r, this.nodeSize);
          }
        }


        /***/
      }),

/***/ "./node_modules/kdbush/src/range.js":
/*!******************************************!*\
  !*** ./node_modules/kdbush/src/range.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ range)
          /* harmony export */
        });

        function range(ids, coords, minX, minY, maxX, maxY, nodeSize) {
          const stack = [0, ids.length - 1, 0];
          const result = [];
          let x, y;

          while (stack.length) {
            const axis = stack.pop();
            const right = stack.pop();
            const left = stack.pop();

            if (right - left <= nodeSize) {
              for (let i = left; i <= right; i++) {
                x = coords[2 * i];
                y = coords[2 * i + 1];
                if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[i]);
              }
              continue;
            }

            const m = Math.floor((left + right) / 2);

            x = coords[2 * m];
            y = coords[2 * m + 1];

            if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[m]);

            const nextAxis = (axis + 1) % 2;

            if (axis === 0 ? minX <= x : minY <= y) {
              stack.push(left);
              stack.push(m - 1);
              stack.push(nextAxis);
            }
            if (axis === 0 ? maxX >= x : maxY >= y) {
              stack.push(m + 1);
              stack.push(right);
              stack.push(nextAxis);
            }
          }

          return result;
        }


        /***/
      }),

/***/ "./node_modules/kdbush/src/sort.js":
/*!*****************************************!*\
  !*** ./node_modules/kdbush/src/sort.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sortKD)
          /* harmony export */
        });

        function sortKD(ids, coords, nodeSize, left, right, depth) {
          if (right - left <= nodeSize) return;

          const m = (left + right) >> 1;

          select(ids, coords, m, left, right, depth % 2);

          sortKD(ids, coords, nodeSize, left, m - 1, depth + 1);
          sortKD(ids, coords, nodeSize, m + 1, right, depth + 1);
        }

        function select(ids, coords, k, left, right, inc) {

          while (right > left) {
            if (right - left > 600) {
              const n = right - left + 1;
              const m = k - left + 1;
              const z = Math.log(n);
              const s = 0.5 * Math.exp(2 * z / 3);
              const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
              const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
              const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
              select(ids, coords, k, newLeft, newRight, inc);
            }

            const t = coords[2 * k + inc];
            let i = left;
            let j = right;

            swapItem(ids, coords, left, k);
            if (coords[2 * right + inc] > t) swapItem(ids, coords, left, right);

            while (i < j) {
              swapItem(ids, coords, i, j);
              i++;
              j--;
              while (coords[2 * i + inc] < t) i++;
              while (coords[2 * j + inc] > t) j--;
            }

            if (coords[2 * left + inc] === t) swapItem(ids, coords, left, j);
            else {
              j++;
              swapItem(ids, coords, j, right);
            }

            if (j <= k) left = j + 1;
            if (k <= j) right = j - 1;
          }
        }

        function swapItem(ids, coords, i, j) {
          swap(ids, i, j);
          swap(coords, 2 * i, 2 * j);
          swap(coords, 2 * i + 1, 2 * j + 1);
        }

        function swap(arr, i, j) {
          const tmp = arr[i];
          arr[i] = arr[j];
          arr[j] = tmp;
        }


        /***/
      }),

/***/ "./node_modules/kdbush/src/within.js":
/*!*******************************************!*\
  !*** ./node_modules/kdbush/src/within.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ within)
          /* harmony export */
        });

        function within(ids, coords, qx, qy, r, nodeSize) {
          const stack = [0, ids.length - 1, 0];
          const result = [];
          const r2 = r * r;

          while (stack.length) {
            const axis = stack.pop();
            const right = stack.pop();
            const left = stack.pop();

            if (right - left <= nodeSize) {
              for (let i = left; i <= right; i++) {
                if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
              }
              continue;
            }

            const m = Math.floor((left + right) / 2);

            const x = coords[2 * m];
            const y = coords[2 * m + 1];

            if (sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);

            const nextAxis = (axis + 1) % 2;

            if (axis === 0 ? qx - r <= x : qy - r <= y) {
              stack.push(left);
              stack.push(m - 1);
              stack.push(nextAxis);
            }
            if (axis === 0 ? qx + r >= x : qy + r >= y) {
              stack.push(m + 1);
              stack.push(right);
              stack.push(nextAxis);
            }
          }

          return result;
        }

        function sqDist(ax, ay, bx, by) {
          const dx = ax - bx;
          const dy = ay - by;
          return dx * dx + dy * dy;
        }


        /***/
      }),

/***/ "./node_modules/simplex-noise/simplex-noise.js":
/*!*****************************************************!*\
  !*** ./node_modules/simplex-noise/simplex-noise.js ***!
  \*****************************************************/
/***/ ((module, exports, __webpack_require__) => {

        var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * A fast javascript implementation of simplex noise by Jonas Wagner

Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
Better rank ordering method by Stefan Gustavson in 2012.


 Copyright (c) 2018 Jonas Wagner

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
        (function () {
          'use strict';

          var F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
          var G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
          var F3 = 1.0 / 3.0;
          var G3 = 1.0 / 6.0;
          var F4 = (Math.sqrt(5.0) - 1.0) / 4.0;
          var G4 = (5.0 - Math.sqrt(5.0)) / 20.0;

          function SimplexNoise(randomOrSeed) {
            var random;
            if (typeof randomOrSeed == 'function') {
              random = randomOrSeed;
            }
            else if (randomOrSeed) {
              random = alea(randomOrSeed);
            } else {
              random = Math.random;
            }
            this.p = buildPermutationTable(random);
            this.perm = new Uint8Array(512);
            this.permMod12 = new Uint8Array(512);
            for (var i = 0; i < 512; i++) {
              this.perm[i] = this.p[i & 255];
              this.permMod12[i] = this.perm[i] % 12;
            }

          }
          SimplexNoise.prototype = {
            grad3: new Float32Array([1, 1, 0,
              -1, 1, 0,
              1, -1, 0,

              -1, -1, 0,
              1, 0, 1,
              -1, 0, 1,

              1, 0, -1,
              -1, 0, -1,
              0, 1, 1,

              0, -1, 1,
              0, 1, -1,
              0, -1, -1]),
            grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1,
              0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1,
              1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1,
              -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1,
              1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1,
              -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1,
              1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0,
              -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]),
            noise2D: function (xin, yin) {
              var permMod12 = this.permMod12;
              var perm = this.perm;
              var grad3 = this.grad3;
              var n0 = 0; // Noise contributions from the three corners
              var n1 = 0;
              var n2 = 0;
              // Skew the input space to determine which simplex cell we're in
              var s = (xin + yin) * F2; // Hairy factor for 2D
              var i = Math.floor(xin + s);
              var j = Math.floor(yin + s);
              var t = (i + j) * G2;
              var X0 = i - t; // Unskew the cell origin back to (x,y) space
              var Y0 = j - t;
              var x0 = xin - X0; // The x,y distances from the cell origin
              var y0 = yin - Y0;
              // For the 2D case, the simplex shape is an equilateral triangle.
              // Determine which simplex we are in.
              var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
              if (x0 > y0) {
                i1 = 1;
                j1 = 0;
              } // lower triangle, XY order: (0,0)->(1,0)->(1,1)
              else {
                i1 = 0;
                j1 = 1;
              } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
              // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
              // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
              // c = (3-sqrt(3))/6
              var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
              var y1 = y0 - j1 + G2;
              var x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
              var y2 = y0 - 1.0 + 2.0 * G2;
              // Work out the hashed gradient indices of the three simplex corners
              var ii = i & 255;
              var jj = j & 255;
              // Calculate the contribution from the three corners
              var t0 = 0.5 - x0 * x0 - y0 * y0;
              if (t0 >= 0) {
                var gi0 = permMod12[ii + perm[jj]] * 3;
                t0 *= t0;
                n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient
              }
              var t1 = 0.5 - x1 * x1 - y1 * y1;
              if (t1 >= 0) {
                var gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;
                t1 *= t1;
                n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);
              }
              var t2 = 0.5 - x2 * x2 - y2 * y2;
              if (t2 >= 0) {
                var gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;
                t2 *= t2;
                n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);
              }
              // Add contributions from each corner to get the final noise value.
              // The result is scaled to return values in the interval [-1,1].
              return 70.0 * (n0 + n1 + n2);
            },
            // 3D simplex noise
            noise3D: function (xin, yin, zin) {
              var permMod12 = this.permMod12;
              var perm = this.perm;
              var grad3 = this.grad3;
              var n0, n1, n2, n3; // Noise contributions from the four corners
              // Skew the input space to determine which simplex cell we're in
              var s = (xin + yin + zin) * F3; // Very nice and simple skew factor for 3D
              var i = Math.floor(xin + s);
              var j = Math.floor(yin + s);
              var k = Math.floor(zin + s);
              var t = (i + j + k) * G3;
              var X0 = i - t; // Unskew the cell origin back to (x,y,z) space
              var Y0 = j - t;
              var Z0 = k - t;
              var x0 = xin - X0; // The x,y,z distances from the cell origin
              var y0 = yin - Y0;
              var z0 = zin - Z0;
              // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
              // Determine which simplex we are in.
              var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
              var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
              if (x0 >= y0) {
                if (y0 >= z0) {
                  i1 = 1;
                  j1 = 0;
                  k1 = 0;
                  i2 = 1;
                  j2 = 1;
                  k2 = 0;
                } // X Y Z order
                else if (x0 >= z0) {
                  i1 = 1;
                  j1 = 0;
                  k1 = 0;
                  i2 = 1;
                  j2 = 0;
                  k2 = 1;
                } // X Z Y order
                else {
                  i1 = 0;
                  j1 = 0;
                  k1 = 1;
                  i2 = 1;
                  j2 = 0;
                  k2 = 1;
                } // Z X Y order
              }
              else { // x0<y0
                if (y0 < z0) {
                  i1 = 0;
                  j1 = 0;
                  k1 = 1;
                  i2 = 0;
                  j2 = 1;
                  k2 = 1;
                } // Z Y X order
                else if (x0 < z0) {
                  i1 = 0;
                  j1 = 1;
                  k1 = 0;
                  i2 = 0;
                  j2 = 1;
                  k2 = 1;
                } // Y Z X order
                else {
                  i1 = 0;
                  j1 = 1;
                  k1 = 0;
                  i2 = 1;
                  j2 = 1;
                  k2 = 0;
                } // Y X Z order
              }
              // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
              // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
              // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
              // c = 1/6.
              var x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords
              var y1 = y0 - j1 + G3;
              var z1 = z0 - k1 + G3;
              var x2 = x0 - i2 + 2.0 * G3; // Offsets for third corner in (x,y,z) coords
              var y2 = y0 - j2 + 2.0 * G3;
              var z2 = z0 - k2 + 2.0 * G3;
              var x3 = x0 - 1.0 + 3.0 * G3; // Offsets for last corner in (x,y,z) coords
              var y3 = y0 - 1.0 + 3.0 * G3;
              var z3 = z0 - 1.0 + 3.0 * G3;
              // Work out the hashed gradient indices of the four simplex corners
              var ii = i & 255;
              var jj = j & 255;
              var kk = k & 255;
              // Calculate the contribution from the four corners
              var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
              if (t0 < 0) n0 = 0.0;
              else {
                var gi0 = permMod12[ii + perm[jj + perm[kk]]] * 3;
                t0 *= t0;
                n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0);
              }
              var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
              if (t1 < 0) n1 = 0.0;
              else {
                var gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;
                t1 *= t1;
                n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1);
              }
              var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
              if (t2 < 0) n2 = 0.0;
              else {
                var gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;
                t2 *= t2;
                n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2);
              }
              var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
              if (t3 < 0) n3 = 0.0;
              else {
                var gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;
                t3 *= t3;
                n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3);
              }
              // Add contributions from each corner to get the final noise value.
              // The result is scaled to stay just inside [-1,1]
              return 32.0 * (n0 + n1 + n2 + n3);
            },
            // 4D simplex noise, better simplex rank ordering method 2012-03-09
            noise4D: function (x, y, z, w) {
              var perm = this.perm;
              var grad4 = this.grad4;

              var n0, n1, n2, n3, n4; // Noise contributions from the five corners
              // Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in
              var s = (x + y + z + w) * F4; // Factor for 4D skewing
              var i = Math.floor(x + s);
              var j = Math.floor(y + s);
              var k = Math.floor(z + s);
              var l = Math.floor(w + s);
              var t = (i + j + k + l) * G4; // Factor for 4D unskewing
              var X0 = i - t; // Unskew the cell origin back to (x,y,z,w) space
              var Y0 = j - t;
              var Z0 = k - t;
              var W0 = l - t;
              var x0 = x - X0; // The x,y,z,w distances from the cell origin
              var y0 = y - Y0;
              var z0 = z - Z0;
              var w0 = w - W0;
              // For the 4D case, the simplex is a 4D shape I won't even try to describe.
              // To find out which of the 24 possible simplices we're in, we need to
              // determine the magnitude ordering of x0, y0, z0 and w0.
              // Six pair-wise comparisons are performed between each possible pair
              // of the four coordinates, and the results are used to rank the numbers.
              var rankx = 0;
              var ranky = 0;
              var rankz = 0;
              var rankw = 0;
              if (x0 > y0) rankx++;
              else ranky++;
              if (x0 > z0) rankx++;
              else rankz++;
              if (x0 > w0) rankx++;
              else rankw++;
              if (y0 > z0) ranky++;
              else rankz++;
              if (y0 > w0) ranky++;
              else rankw++;
              if (z0 > w0) rankz++;
              else rankw++;
              var i1, j1, k1, l1; // The integer offsets for the second simplex corner
              var i2, j2, k2, l2; // The integer offsets for the third simplex corner
              var i3, j3, k3, l3; // The integer offsets for the fourth simplex corner
              // simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.
              // Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w
              // impossible. Only the 24 indices which have non-zero entries make any sense.
              // We use a thresholding to set the coordinates in turn from the largest magnitude.
              // Rank 3 denotes the largest coordinate.
              i1 = rankx >= 3 ? 1 : 0;
              j1 = ranky >= 3 ? 1 : 0;
              k1 = rankz >= 3 ? 1 : 0;
              l1 = rankw >= 3 ? 1 : 0;
              // Rank 2 denotes the second largest coordinate.
              i2 = rankx >= 2 ? 1 : 0;
              j2 = ranky >= 2 ? 1 : 0;
              k2 = rankz >= 2 ? 1 : 0;
              l2 = rankw >= 2 ? 1 : 0;
              // Rank 1 denotes the second smallest coordinate.
              i3 = rankx >= 1 ? 1 : 0;
              j3 = ranky >= 1 ? 1 : 0;
              k3 = rankz >= 1 ? 1 : 0;
              l3 = rankw >= 1 ? 1 : 0;
              // The fifth corner has all coordinate offsets = 1, so no need to compute that.
              var x1 = x0 - i1 + G4; // Offsets for second corner in (x,y,z,w) coords
              var y1 = y0 - j1 + G4;
              var z1 = z0 - k1 + G4;
              var w1 = w0 - l1 + G4;
              var x2 = x0 - i2 + 2.0 * G4; // Offsets for third corner in (x,y,z,w) coords
              var y2 = y0 - j2 + 2.0 * G4;
              var z2 = z0 - k2 + 2.0 * G4;
              var w2 = w0 - l2 + 2.0 * G4;
              var x3 = x0 - i3 + 3.0 * G4; // Offsets for fourth corner in (x,y,z,w) coords
              var y3 = y0 - j3 + 3.0 * G4;
              var z3 = z0 - k3 + 3.0 * G4;
              var w3 = w0 - l3 + 3.0 * G4;
              var x4 = x0 - 1.0 + 4.0 * G4; // Offsets for last corner in (x,y,z,w) coords
              var y4 = y0 - 1.0 + 4.0 * G4;
              var z4 = z0 - 1.0 + 4.0 * G4;
              var w4 = w0 - 1.0 + 4.0 * G4;
              // Work out the hashed gradient indices of the five simplex corners
              var ii = i & 255;
              var jj = j & 255;
              var kk = k & 255;
              var ll = l & 255;
              // Calculate the contribution from the five corners
              var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
              if (t0 < 0) n0 = 0.0;
              else {
                var gi0 = (perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32) * 4;
                t0 *= t0;
                n0 = t0 * t0 * (grad4[gi0] * x0 + grad4[gi0 + 1] * y0 + grad4[gi0 + 2] * z0 + grad4[gi0 + 3] * w0);
              }
              var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
              if (t1 < 0) n1 = 0.0;
              else {
                var gi1 = (perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32) * 4;
                t1 *= t1;
                n1 = t1 * t1 * (grad4[gi1] * x1 + grad4[gi1 + 1] * y1 + grad4[gi1 + 2] * z1 + grad4[gi1 + 3] * w1);
              }
              var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
              if (t2 < 0) n2 = 0.0;
              else {
                var gi2 = (perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32) * 4;
                t2 *= t2;
                n2 = t2 * t2 * (grad4[gi2] * x2 + grad4[gi2 + 1] * y2 + grad4[gi2 + 2] * z2 + grad4[gi2 + 3] * w2);
              }
              var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
              if (t3 < 0) n3 = 0.0;
              else {
                var gi3 = (perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32) * 4;
                t3 *= t3;
                n3 = t3 * t3 * (grad4[gi3] * x3 + grad4[gi3 + 1] * y3 + grad4[gi3 + 2] * z3 + grad4[gi3 + 3] * w3);
              }
              var t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
              if (t4 < 0) n4 = 0.0;
              else {
                var gi4 = (perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32) * 4;
                t4 *= t4;
                n4 = t4 * t4 * (grad4[gi4] * x4 + grad4[gi4 + 1] * y4 + grad4[gi4 + 2] * z4 + grad4[gi4 + 3] * w4);
              }
              // Sum up and scale the result to cover the range [-1,1]
              return 27.0 * (n0 + n1 + n2 + n3 + n4);
            }
          };

          function buildPermutationTable(random) {
            var i;
            var p = new Uint8Array(256);
            for (i = 0; i < 256; i++) {
              p[i] = i;
            }
            for (i = 0; i < 255; i++) {
              var r = i + ~~(random() * (256 - i));
              var aux = p[i];
              p[i] = p[r];
              p[r] = aux;
            }
            return p;
          }
          SimplexNoise._buildPermutationTable = buildPermutationTable;

          function alea() {
            // Johannes Baagøe <baagoe@baagoe.com>, 2010
            var s0 = 0;
            var s1 = 0;
            var s2 = 0;
            var c = 1;

            var mash = masher();
            s0 = mash(' ');
            s1 = mash(' ');
            s2 = mash(' ');

            for (var i = 0; i < arguments.length; i++) {
              s0 -= mash(arguments[i]);
              if (s0 < 0) {
                s0 += 1;
              }
              s1 -= mash(arguments[i]);
              if (s1 < 0) {
                s1 += 1;
              }
              s2 -= mash(arguments[i]);
              if (s2 < 0) {
                s2 += 1;
              }
            }
            mash = null;
            return function () {
              var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
              s0 = s1;
              s1 = s2;
              return s2 = t - (c = t | 0);
            };
          }
          function masher() {
            var n = 0xefc8249d;
            return function (data) {
              data = data.toString();
              for (var i = 0; i < data.length; i++) {
                n += data.charCodeAt(i);
                var h = 0.02519603282416938 * n;
                n = h >>> 0;
                h -= n;
                h *= n;
                n = h >>> 0;
                h -= n;
                n += h * 0x100000000; // 2^32
              }
              return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
            };
          }

          // amd
          if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return SimplexNoise; }).call(exports, __webpack_require__, exports, module),
            __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          // common js
          if (true) exports.SimplexNoise = SimplexNoise;
          // browser
          else { }
          // nodejs
          if (true) {
            module.exports = SimplexNoise;
          }

        })();


        /***/
      }),

/***/ "./node_modules/svg-points/modules/index.js":
/*!**************************************************!*\
  !*** ./node_modules/svg-points/modules/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toPath: () => (/* reexport safe */ _toPath__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   toPoints: () => (/* reexport safe */ _toPoints__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   valid: () => (/* reexport safe */ _valid__WEBPACK_IMPORTED_MODULE_2__["default"])
          /* harmony export */
        });
/* harmony import */ var _toPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPath */ "./node_modules/svg-points/modules/toPath.js");
/* harmony import */ var _toPoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPoints */ "./node_modules/svg-points/modules/toPoints.js");
/* harmony import */ var _valid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./valid */ "./node_modules/svg-points/modules/valid.js");






        /***/
      }),

/***/ "./node_modules/svg-points/modules/toPath.js":
/*!***************************************************!*\
  !*** ./node_modules/svg-points/modules/toPath.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
          /* harmony export */
        });
/* harmony import */ var _toPoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPoints */ "./node_modules/svg-points/modules/toPoints.js");


        var pointsToD = function pointsToD(p) {
          var d = '';
          var i = 0;
          var firstPoint = void 0;

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = p[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var point = _step.value;
              var _point$curve = point.curve,
                curve = _point$curve === undefined ? false : _point$curve,
                moveTo = point.moveTo,
                x = point.x,
                y = point.y;

              var isFirstPoint = i === 0 || moveTo;
              var isLastPoint = i === p.length - 1 || p[i + 1].moveTo;
              var prevPoint = i === 0 ? null : p[i - 1];

              if (isFirstPoint) {
                firstPoint = point;

                if (!isLastPoint) {
                  d += 'M' + x + ',' + y;
                }
              } else if (curve) {
                switch (curve.type) {
                  case 'arc':
                    var _point$curve2 = point.curve,
                      _point$curve2$largeAr = _point$curve2.largeArcFlag,
                      largeArcFlag = _point$curve2$largeAr === undefined ? 0 : _point$curve2$largeAr,
                      rx = _point$curve2.rx,
                      ry = _point$curve2.ry,
                      _point$curve2$sweepFl = _point$curve2.sweepFlag,
                      sweepFlag = _point$curve2$sweepFl === undefined ? 0 : _point$curve2$sweepFl,
                      _point$curve2$xAxisRo = _point$curve2.xAxisRotation,
                      xAxisRotation = _point$curve2$xAxisRo === undefined ? 0 : _point$curve2$xAxisRo;

                    d += 'A' + rx + ',' + ry + ',' + xAxisRotation + ',' + largeArcFlag + ',' + sweepFlag + ',' + x + ',' + y;
                    break;
                  case 'cubic':
                    var _point$curve3 = point.curve,
                      cx1 = _point$curve3.x1,
                      cy1 = _point$curve3.y1,
                      cx2 = _point$curve3.x2,
                      cy2 = _point$curve3.y2;

                    d += 'C' + cx1 + ',' + cy1 + ',' + cx2 + ',' + cy2 + ',' + x + ',' + y;
                    break;
                  case 'quadratic':
                    var _point$curve4 = point.curve,
                      qx1 = _point$curve4.x1,
                      qy1 = _point$curve4.y1;

                    d += 'Q' + qx1 + ',' + qy1 + ',' + x + ',' + y;
                    break;
                }

                if (isLastPoint && x === firstPoint.x && y === firstPoint.y) {
                  d += 'Z';
                }
              } else if (isLastPoint && x === firstPoint.x && y === firstPoint.y) {
                d += 'Z';
              } else if (x !== prevPoint.x && y !== prevPoint.y) {
                d += 'L' + x + ',' + y;
              } else if (x !== prevPoint.x) {
                d += 'H' + x;
              } else if (y !== prevPoint.y) {
                d += 'V' + y;
              }

              i++;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return d;
        };

        var toPath = function toPath(s) {
          var isPoints = Array.isArray(s);
          var isGroup = isPoints ? Array.isArray(s[0]) : s.type === 'g';
          var points = isPoints ? s : isGroup ? s.shapes.map(function (shp) {
            return (0, _toPoints__WEBPACK_IMPORTED_MODULE_0__["default"])(shp);
          }) : (0, _toPoints__WEBPACK_IMPORTED_MODULE_0__["default"])(s);

          if (isGroup) {
            return points.map(function (p) {
              return pointsToD(p);
            });
          }

          return pointsToD(points);
        };

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toPath);

        /***/
      }),

/***/ "./node_modules/svg-points/modules/toPoints.js":
/*!*****************************************************!*\
  !*** ./node_modules/svg-points/modules/toPoints.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
          /* harmony export */
        });
        var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

        function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

        var toPoints = function toPoints(_ref) {
          var type = _ref.type,
            props = _objectWithoutProperties(_ref, ['type']);

          switch (type) {
            case 'circle':
              return getPointsFromCircle(props);
            case 'ellipse':
              return getPointsFromEllipse(props);
            case 'line':
              return getPointsFromLine(props);
            case 'path':
              return getPointsFromPath(props);
            case 'polygon':
              return getPointsFromPolygon(props);
            case 'polyline':
              return getPointsFromPolyline(props);
            case 'rect':
              return getPointsFromRect(props);
            case 'g':
              return getPointsFromG(props);
            default:
              throw new Error('Not a valid shape type');
          }
        };

        var getPointsFromCircle = function getPointsFromCircle(_ref2) {
          var cx = _ref2.cx,
            cy = _ref2.cy,
            r = _ref2.r;

          return [{ x: cx, y: cy - r, moveTo: true }, { x: cx, y: cy + r, curve: { type: 'arc', rx: r, ry: r, sweepFlag: 1 } }, { x: cx, y: cy - r, curve: { type: 'arc', rx: r, ry: r, sweepFlag: 1 } }];
        };

        var getPointsFromEllipse = function getPointsFromEllipse(_ref3) {
          var cx = _ref3.cx,
            cy = _ref3.cy,
            rx = _ref3.rx,
            ry = _ref3.ry;

          return [{ x: cx, y: cy - ry, moveTo: true }, { x: cx, y: cy + ry, curve: { type: 'arc', rx: rx, ry: ry, sweepFlag: 1 } }, { x: cx, y: cy - ry, curve: { type: 'arc', rx: rx, ry: ry, sweepFlag: 1 } }];
        };

        var getPointsFromLine = function getPointsFromLine(_ref4) {
          var x1 = _ref4.x1,
            x2 = _ref4.x2,
            y1 = _ref4.y1,
            y2 = _ref4.y2;

          return [{ x: x1, y: y1, moveTo: true }, { x: x2, y: y2 }];
        };

        var validCommands = /[MmLlHhVvCcSsQqTtAaZz]/g;

        var commandLengths = {
          A: 7,
          C: 6,
          H: 1,
          L: 2,
          M: 2,
          Q: 4,
          S: 4,
          T: 2,
          V: 1,
          Z: 0
        };

        var relativeCommands = ['a', 'c', 'h', 'l', 'm', 'q', 's', 't', 'v'];

        var isRelative = function isRelative(command) {
          return relativeCommands.indexOf(command) !== -1;
        };

        var optionalArcKeys = ['xAxisRotation', 'largeArcFlag', 'sweepFlag'];

        var getCommands = function getCommands(d) {
          return d.match(validCommands);
        };

        var getParams = function getParams(d) {
          return d.split(validCommands).map(function (v) {
            return v.replace(/[0-9]+-/g, function (m) {
              return m.slice(0, -1) + ' -';
            });
          }).map(function (v) {
            return v.replace(/\.[0-9]+/g, function (m) {
              return m + ' ';
            });
          }).map(function (v) {
            return v.trim();
          }).filter(function (v) {
            return v.length > 0;
          }).map(function (v) {
            return v.split(/[ ,]+/).map(parseFloat).filter(function (n) {
              return !isNaN(n);
            });
          });
        };

        var getPointsFromPath = function getPointsFromPath(_ref5) {
          var d = _ref5.d;

          var commands = getCommands(d);
          var params = getParams(d);

          var points = [];

          var moveTo = void 0;

          for (var i = 0, l = commands.length; i < l; i++) {
            var command = commands[i];
            var upperCaseCommand = command.toUpperCase();
            var commandLength = commandLengths[upperCaseCommand];
            var relative = isRelative(command);

            if (commandLength > 0) {
              var commandParams = params.shift();
              var iterations = commandParams.length / commandLength;

              for (var j = 0; j < iterations; j++) {
                var prevPoint = points[points.length - 1] || { x: 0, y: 0 };

                switch (upperCaseCommand) {
                  case 'M':
                    var x = (relative ? prevPoint.x : 0) + commandParams.shift();
                    var y = (relative ? prevPoint.y : 0) + commandParams.shift();

                    if (j === 0) {
                      moveTo = { x: x, y: y };
                      points.push({ x: x, y: y, moveTo: true });
                    } else {
                      points.push({ x: x, y: y });
                    }

                    break;

                  case 'L':
                    points.push({
                      x: (relative ? prevPoint.x : 0) + commandParams.shift(),
                      y: (relative ? prevPoint.y : 0) + commandParams.shift()
                    });

                    break;

                  case 'H':
                    points.push({
                      x: (relative ? prevPoint.x : 0) + commandParams.shift(),
                      y: prevPoint.y
                    });

                    break;

                  case 'V':
                    points.push({
                      x: prevPoint.x,
                      y: (relative ? prevPoint.y : 0) + commandParams.shift()
                    });

                    break;

                  case 'A':
                    points.push({
                      curve: {
                        type: 'arc',
                        rx: commandParams.shift(),
                        ry: commandParams.shift(),
                        xAxisRotation: commandParams.shift(),
                        largeArcFlag: commandParams.shift(),
                        sweepFlag: commandParams.shift()
                      },
                      x: (relative ? prevPoint.x : 0) + commandParams.shift(),
                      y: (relative ? prevPoint.y : 0) + commandParams.shift()
                    });

                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                      for (var _iterator = optionalArcKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var k = _step.value;

                        if (points[points.length - 1]['curve'][k] === 0) {
                          delete points[points.length - 1]['curve'][k];
                        }
                      }
                    } catch (err) {
                      _didIteratorError = true;
                      _iteratorError = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                          _iterator.return();
                        }
                      } finally {
                        if (_didIteratorError) {
                          throw _iteratorError;
                        }
                      }
                    }

                    break;

                  case 'C':
                    points.push({
                      curve: {
                        type: 'cubic',
                        x1: (relative ? prevPoint.x : 0) + commandParams.shift(),
                        y1: (relative ? prevPoint.y : 0) + commandParams.shift(),
                        x2: (relative ? prevPoint.x : 0) + commandParams.shift(),
                        y2: (relative ? prevPoint.y : 0) + commandParams.shift()
                      },
                      x: (relative ? prevPoint.x : 0) + commandParams.shift(),
                      y: (relative ? prevPoint.y : 0) + commandParams.shift()
                    });

                    break;

                  case 'S':
                    var sx2 = (relative ? prevPoint.x : 0) + commandParams.shift();
                    var sy2 = (relative ? prevPoint.y : 0) + commandParams.shift();
                    var sx = (relative ? prevPoint.x : 0) + commandParams.shift();
                    var sy = (relative ? prevPoint.y : 0) + commandParams.shift();

                    var diff = {};

                    var sx1 = void 0;
                    var sy1 = void 0;

                    if (prevPoint.curve && prevPoint.curve.type === 'cubic') {
                      diff.x = Math.abs(prevPoint.x - prevPoint.curve.x2);
                      diff.y = Math.abs(prevPoint.y - prevPoint.curve.y2);
                      sx1 = prevPoint.x < prevPoint.curve.x2 ? prevPoint.x - diff.x : prevPoint.x + diff.x;
                      sy1 = prevPoint.y < prevPoint.curve.y2 ? prevPoint.y - diff.y : prevPoint.y + diff.y;
                    } else {
                      diff.x = Math.abs(sx - sx2);
                      diff.y = Math.abs(sy - sy2);
                      sx1 = prevPoint.x;
                      sy1 = prevPoint.y;
                    }

                    points.push({ curve: { type: 'cubic', x1: sx1, y1: sy1, x2: sx2, y2: sy2 }, x: sx, y: sy });

                    break;

                  case 'Q':
                    points.push({
                      curve: {
                        type: 'quadratic',
                        x1: (relative ? prevPoint.x : 0) + commandParams.shift(),
                        y1: (relative ? prevPoint.y : 0) + commandParams.shift()
                      },
                      x: (relative ? prevPoint.x : 0) + commandParams.shift(),
                      y: (relative ? prevPoint.y : 0) + commandParams.shift()
                    });

                    break;

                  case 'T':
                    var tx = (relative ? prevPoint.x : 0) + commandParams.shift();
                    var ty = (relative ? prevPoint.y : 0) + commandParams.shift();

                    var tx1 = void 0;
                    var ty1 = void 0;

                    if (prevPoint.curve && prevPoint.curve.type === 'quadratic') {
                      var _diff = {
                        x: Math.abs(prevPoint.x - prevPoint.curve.x1),
                        y: Math.abs(prevPoint.y - prevPoint.curve.y1)
                      };

                      tx1 = prevPoint.x < prevPoint.curve.x1 ? prevPoint.x - _diff.x : prevPoint.x + _diff.x;
                      ty1 = prevPoint.y < prevPoint.curve.y1 ? prevPoint.y - _diff.y : prevPoint.y + _diff.y;
                    } else {
                      tx1 = prevPoint.x;
                      ty1 = prevPoint.y;
                    }

                    points.push({ curve: { type: 'quadratic', x1: tx1, y1: ty1 }, x: tx, y: ty });

                    break;
                }
              }
            } else {
              var _prevPoint = points[points.length - 1] || { x: 0, y: 0 };

              if (_prevPoint.x !== moveTo.x || _prevPoint.y !== moveTo.y) {
                points.push({ x: moveTo.x, y: moveTo.y });
              }
            }
          }

          return points;
        };

        var getPointsFromPolygon = function getPointsFromPolygon(_ref6) {
          var points = _ref6.points;

          return getPointsFromPoints({ closed: true, points: points });
        };

        var getPointsFromPolyline = function getPointsFromPolyline(_ref7) {
          var points = _ref7.points;

          return getPointsFromPoints({ closed: false, points: points });
        };

        var getPointsFromPoints = function getPointsFromPoints(_ref8) {
          var closed = _ref8.closed,
            points = _ref8.points;

          var numbers = points.split(/[\s,]+/).map(function (n) {
            return parseFloat(n);
          });

          var p = numbers.reduce(function (arr, point, i) {
            if (i % 2 === 0) {
              arr.push({ x: point });
            } else {
              arr[(i - 1) / 2].y = point;
            }

            return arr;
          }, []);

          if (closed) {
            p.push(_extends({}, p[0]));
          }

          p[0].moveTo = true;

          return p;
        };

        var getPointsFromRect = function getPointsFromRect(_ref9) {
          var height = _ref9.height,
            rx = _ref9.rx,
            ry = _ref9.ry,
            width = _ref9.width,
            x = _ref9.x,
            y = _ref9.y;

          if (rx || ry) {
            return getPointsFromRectWithCornerRadius({
              height: height,
              rx: rx || ry,
              ry: ry || rx,
              width: width,
              x: x,
              y: y
            });
          }

          return getPointsFromBasicRect({ height: height, width: width, x: x, y: y });
        };

        var getPointsFromBasicRect = function getPointsFromBasicRect(_ref10) {
          var height = _ref10.height,
            width = _ref10.width,
            x = _ref10.x,
            y = _ref10.y;

          return [{ x: x, y: y, moveTo: true }, { x: x + width, y: y }, { x: x + width, y: y + height }, { x: x, y: y + height }, { x: x, y: y }];
        };

        var getPointsFromRectWithCornerRadius = function getPointsFromRectWithCornerRadius(_ref11) {
          var height = _ref11.height,
            rx = _ref11.rx,
            ry = _ref11.ry,
            width = _ref11.width,
            x = _ref11.x,
            y = _ref11.y;

          var curve = { type: 'arc', rx: rx, ry: ry, sweepFlag: 1 };

          return [{ x: x + rx, y: y, moveTo: true }, { x: x + width - rx, y: y }, { x: x + width, y: y + ry, curve: curve }, { x: x + width, y: y + height - ry }, { x: x + width - rx, y: y + height, curve: curve }, { x: x + rx, y: y + height }, { x: x, y: y + height - ry, curve: curve }, { x: x, y: y + ry }, { x: x + rx, y: y, curve: curve }];
        };

        var getPointsFromG = function getPointsFromG(_ref12) {
          var shapes = _ref12.shapes;
          return shapes.map(function (s) {
            return toPoints(s);
          });
        };

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toPoints);

        /***/
      }),

/***/ "./node_modules/svg-points/modules/valid.js":
/*!**************************************************!*\
  !*** ./node_modules/svg-points/modules/valid.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
          /* harmony export */
        });
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

        var getErrors = function getErrors(shape) {
          var rules = getRules(shape);
          var errors = [];

          rules.map(function (_ref) {
            var match = _ref.match,
              prop = _ref.prop,
              required = _ref.required,
              type = _ref.type;

            if (typeof shape[prop] === 'undefined') {
              if (required) {
                errors.push(prop + ' prop is required' + (prop === 'type' ? '' : ' on a ' + shape.type));
              }
            } else {
              if (typeof type !== 'undefined') {
                if (type === 'array') {
                  if (!Array.isArray(shape[prop])) {
                    errors.push(prop + ' prop must be of type array');
                  }
                } else if (_typeof(shape[prop]) !== type) {
                  // eslint-disable-line valid-typeof
                  errors.push(prop + ' prop must be of type ' + type);
                }
              }

              if (Array.isArray(match)) {
                if (match.indexOf(shape[prop]) === -1) {
                  errors.push(prop + ' prop must be one of ' + match.join(', '));
                }
              }
            }
          });

          if (shape.type === 'g' && Array.isArray(shape.shapes)) {
            var childErrors = shape.shapes.map(function (s) {
              return getErrors(s);
            });
            return [].concat.apply(errors, childErrors);
          }

          return errors;
        };

        var getRules = function getRules(shape) {
          var rules = [{
            match: ['circle', 'ellipse', 'line', 'path', 'polygon', 'polyline', 'rect', 'g'],
            prop: 'type',
            required: true,
            type: 'string'
          }];

          switch (shape.type) {
            case 'circle':
              rules.push({ prop: 'cx', required: true, type: 'number' });
              rules.push({ prop: 'cy', required: true, type: 'number' });
              rules.push({ prop: 'r', required: true, type: 'number' });
              break;

            case 'ellipse':
              rules.push({ prop: 'cx', required: true, type: 'number' });
              rules.push({ prop: 'cy', required: true, type: 'number' });
              rules.push({ prop: 'rx', required: true, type: 'number' });
              rules.push({ prop: 'ry', required: true, type: 'number' });
              break;

            case 'line':
              rules.push({ prop: 'x1', required: true, type: 'number' });
              rules.push({ prop: 'x2', required: true, type: 'number' });
              rules.push({ prop: 'y1', required: true, type: 'number' });
              rules.push({ prop: 'y2', required: true, type: 'number' });
              break;

            case 'path':
              rules.push({ prop: 'd', required: true, type: 'string' });
              break;

            case 'polygon':
            case 'polyline':
              rules.push({ prop: 'points', required: true, type: 'string' });
              break;

            case 'rect':
              rules.push({ prop: 'height', required: true, type: 'number' });
              rules.push({ prop: 'rx', type: 'number' });
              rules.push({ prop: 'ry', type: 'number' });
              rules.push({ prop: 'width', required: true, type: 'number' });
              rules.push({ prop: 'x', required: true, type: 'number' });
              rules.push({ prop: 'y', required: true, type: 'number' });
              break;

            case 'g':
              rules.push({ prop: 'shapes', required: true, type: 'array' });
              break;
          }

          return rules;
        };

        var valid = function valid(shape) {
          var errors = getErrors(shape);

          return {
            errors: errors,
            valid: errors.length === 0
          };
        };

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (valid);

        /***/
      }),

/***/ "./node_modules/vec2/vec2.js":
/*!***********************************!*\
  !*** ./node_modules/vec2/vec2.js ***!
  \***********************************/
/***/ ((module) => {

        ; (function inject(clean, precision, undef) {

          var isArray = function (a) {
            return Object.prototype.toString.call(a) === "[object Array]";
          };

          var defined = function (a) {
            return a !== undef;
          };

          function Vec2(x, y) {
            if (!(this instanceof Vec2)) {
              return new Vec2(x, y);
            }

            if (isArray(x)) {
              y = x[1];
              x = x[0];
            } else if ('object' === typeof x && x) {
              y = x.y;
              x = x.x;
            }

            this.x = Vec2.clean(x || 0);
            this.y = Vec2.clean(y || 0);
          }

          Vec2.prototype = {
            change: function (fn) {
              if (typeof fn === 'function') {
                if (this.observers) {
                  this.observers.push(fn);
                } else {
                  this.observers = [fn];
                }
              } else if (this.observers && this.observers.length) {
                for (var i = this.observers.length - 1; i >= 0; i--) {
                  this.observers[i](this, fn);
                }
              }

              return this;
            },

            ignore: function (fn) {
              if (this.observers) {
                if (!fn) {
                  this.observers = [];
                } else {
                  var o = this.observers, l = o.length;
                  while (l--) {
                    o[l] === fn && o.splice(l, 1);
                  }
                }
              }
              return this;
            },

            // set x and y
            set: function (x, y, notify) {
              if ('number' != typeof x) {
                notify = y;
                y = x.y;
                x = x.x;
              }

              if (this.x === x && this.y === y) {
                return this;
              }

              var orig = null;
              if (notify !== false && this.observers && this.observers.length) {
                orig = this.clone();
              }

              this.x = Vec2.clean(x);
              this.y = Vec2.clean(y);

              if (notify !== false) {
                return this.change(orig);
              }
            },

            // reset x and y to zero
            zero: function () {
              return this.set(0, 0);
            },

            // return a new vector with the same component values
            // as this one
            clone: function () {
              return new (this.constructor)(this.x, this.y);
            },

            // negate the values of this vector
            negate: function (returnNew) {
              if (returnNew) {
                return new (this.constructor)(-this.x, -this.y);
              } else {
                return this.set(-this.x, -this.y);
              }
            },

            // Add the incoming `vec2` vector to this vector
            add: function (x, y, returnNew) {

              if (typeof x != 'number') {
                returnNew = y;
                if (isArray(x)) {
                  y = x[1];
                  x = x[0];
                } else {
                  y = x.y;
                  x = x.x;
                }
              }

              x += this.x;
              y += this.y;


              if (!returnNew) {
                return this.set(x, y);
              } else {
                // Return a new vector if `returnNew` is truthy
                return new (this.constructor)(x, y);
              }
            },

            // Subtract the incoming `vec2` from this vector
            subtract: function (x, y, returnNew) {
              if (typeof x != 'number') {
                returnNew = y;
                if (isArray(x)) {
                  y = x[1];
                  x = x[0];
                } else {
                  y = x.y;
                  x = x.x;
                }
              }

              x = this.x - x;
              y = this.y - y;

              if (!returnNew) {
                return this.set(x, y);
              } else {
                // Return a new vector if `returnNew` is truthy
                return new (this.constructor)(x, y);
              }
            },

            // Multiply this vector by the incoming `vec2`
            multiply: function (x, y, returnNew) {
              if (typeof x != 'number') {
                returnNew = y;
                if (isArray(x)) {
                  y = x[1];
                  x = x[0];
                } else {
                  y = x.y;
                  x = x.x;
                }
              } else if (typeof y != 'number') {
                returnNew = y;
                y = x;
              }

              x *= this.x;
              y *= this.y;

              if (!returnNew) {
                return this.set(x, y);
              } else {
                return new (this.constructor)(x, y);
              }
            },

            // Rotate this vector. Accepts a `Rotation` or angle in radians.
            //
            // Passing a truthy `inverse` will cause the rotation to
            // be reversed.
            //
            // If `returnNew` is truthy, a new
            // `Vec2` will be created with the values resulting from
            // the rotation. Otherwise the rotation will be applied
            // to this vector directly, and this vector will be returned.
            rotate: function (r, inverse, returnNew) {
              var
                x = this.x,
                y = this.y,
                cos = Math.cos(r),
                sin = Math.sin(r),
                rx, ry;

              inverse = (inverse) ? -1 : 1;

              rx = cos * x - (inverse * sin) * y;
              ry = (inverse * sin) * x + cos * y;

              if (returnNew) {
                return new (this.constructor)(rx, ry);
              } else {
                return this.set(rx, ry);
              }
            },

            // Calculate the length of this vector
            length: function () {
              var x = this.x, y = this.y;
              return Math.sqrt(x * x + y * y);
            },

            // Get the length squared. For performance, use this instead of `Vec2#length` (if possible).
            lengthSquared: function () {
              var x = this.x, y = this.y;
              return x * x + y * y;
            },

            // Return the distance betwen this `Vec2` and the incoming vec2 vector
            // and return a scalar
            distance: function (vec2) {
              var x = this.x - vec2.x;
              var y = this.y - vec2.y;
              return Math.sqrt(x * x + y * y);
            },

            // Given Array of Vec2, find closest to this Vec2.
            nearest: function (others) {
              var
                shortestDistance = Number.MAX_VALUE,
                nearest = null,
                currentDistance;

              for (var i = others.length - 1; i >= 0; i--) {
                currentDistance = this.distance(others[i]);
                if (currentDistance <= shortestDistance) {
                  shortestDistance = currentDistance;
                  nearest = others[i];
                }
              }

              return nearest;
            },

            // Convert this vector into a unit vector.
            // Returns the length.
            normalize: function (returnNew) {
              var length = this.length();

              // Collect a ratio to shrink the x and y coords
              var invertedLength = (length < Number.MIN_VALUE) ? 0 : 1 / length;

              if (!returnNew) {
                // Convert the coords to be greater than zero
                // but smaller than or equal to 1.0
                return this.set(this.x * invertedLength, this.y * invertedLength);
              } else {
                return new (this.constructor)(this.x * invertedLength, this.y * invertedLength);
              }
            },

            // Determine if another `Vec2`'s components match this one's
            // also accepts 2 scalars
            equal: function (v, w) {
              if (typeof v != 'number') {
                if (isArray(v)) {
                  w = v[1];
                  v = v[0];
                } else {
                  w = v.y;
                  v = v.x;
                }
              }

              return (Vec2.clean(v) === this.x && Vec2.clean(w) === this.y);
            },

            // Return a new `Vec2` that contains the absolute value of
            // each of this vector's parts
            abs: function (returnNew) {
              var x = Math.abs(this.x), y = Math.abs(this.y);

              if (returnNew) {
                return new (this.constructor)(x, y);
              } else {
                return this.set(x, y);
              }
            },

            // Return a new `Vec2` consisting of the smallest values
            // from this vector and the incoming
            //
            // When returnNew is truthy, a new `Vec2` will be returned
            // otherwise the minimum values in either this or `v` will
            // be applied to this vector.
            min: function (v, returnNew) {
              var
                tx = this.x,
                ty = this.y,
                vx = v.x,
                vy = v.y,
                x = tx < vx ? tx : vx,
                y = ty < vy ? ty : vy;

              if (returnNew) {
                return new (this.constructor)(x, y);
              } else {
                return this.set(x, y);
              }
            },

            // Return a new `Vec2` consisting of the largest values
            // from this vector and the incoming
            //
            // When returnNew is truthy, a new `Vec2` will be returned
            // otherwise the minimum values in either this or `v` will
            // be applied to this vector.
            max: function (v, returnNew) {
              var
                tx = this.x,
                ty = this.y,
                vx = v.x,
                vy = v.y,
                x = tx > vx ? tx : vx,
                y = ty > vy ? ty : vy;

              if (returnNew) {
                return new (this.constructor)(x, y);
              } else {
                return this.set(x, y);
              }
            },

            // Clamp values into a range.
            // If this vector's values are lower than the `low`'s
            // values, then raise them.  If they are higher than
            // `high`'s then lower them.
            //
            // Passing returnNew as true will cause a new Vec2 to be
            // returned.  Otherwise, this vector's values will be clamped
            clamp: function (low, high, returnNew) {
              var ret = this.min(high, true).max(low);
              if (returnNew) {
                return ret;
              } else {
                return this.set(ret.x, ret.y);
              }
            },

            // Perform linear interpolation between two vectors
            // amount is a decimal between 0 and 1
            lerp: function (vec, amount, returnNew) {
              return this.add(vec.subtract(this, true).multiply(amount), returnNew);
            },

            // Get the skew vector such that dot(skew_vec, other) == cross(vec, other)
            skew: function (returnNew) {
              if (!returnNew) {
                return this.set(-this.y, this.x)
              } else {
                return new (this.constructor)(-this.y, this.x);
              }
            },

            // calculate the dot product between
            // this vector and the incoming
            dot: function (b) {
              return Vec2.clean(this.x * b.x + b.y * this.y);
            },

            // calculate the perpendicular dot product between
            // this vector and the incoming
            perpDot: function (b) {
              return Vec2.clean(this.x * b.y - this.y * b.x);
            },

            // Determine the angle between two vec2s
            angleTo: function (vec) {
              return Math.atan2(this.perpDot(vec), this.dot(vec));
            },

            // Divide this vector's components by a scalar
            divide: function (x, y, returnNew) {
              if (typeof x != 'number') {
                returnNew = y;
                if (isArray(x)) {
                  y = x[1];
                  x = x[0];
                } else {
                  y = x.y;
                  x = x.x;
                }
              } else if (typeof y != 'number') {
                returnNew = y;
                y = x;
              }

              if (x === 0 || y === 0) {
                throw new Error('division by zero')
              }

              if (isNaN(x) || isNaN(y)) {
                throw new Error('NaN detected');
              }

              if (returnNew) {
                return new (this.constructor)(this.x / x, this.y / y);
              }

              return this.set(this.x / x, this.y / y);
            },

            isPointOnLine: function (start, end) {
              return (start.y - this.y) * (start.x - end.x) ===
                (start.y - end.y) * (start.x - this.x);
            },

            toArray: function () {
              return [this.x, this.y];
            },

            fromArray: function (array) {
              return this.set(array[0], array[1]);
            },
            toJSON: function () {
              return { x: this.x, y: this.y };
            },
            toString: function () {
              return '(' + this.x + ', ' + this.y + ')';
            },
            constructor: Vec2
          };

          Vec2.fromArray = function (array, ctor) {
            return new (ctor || Vec2)(array[0], array[1]);
          };

          // Floating point stability
          Vec2.precision = precision || 8;
          var p = Math.pow(10, Vec2.precision);

          Vec2.clean = clean || function (val) {
            if (isNaN(val)) {
              throw new Error('NaN detected');
            }

            if (!isFinite(val)) {
              throw new Error('Infinity detected');
            }

            if (Math.round(val) === val) {
              return val;
            }

            return Math.round(val * p) / p;
          };

          Vec2.inject = inject;

          if (!clean) {
            Vec2.fast = inject(function (k) { return k; });

            // Expose, but also allow creating a fresh Vec2 subclass.
            if (true && typeof module.exports == 'object') {
              module.exports = Vec2;
            } else {
              window.Vec2 = window.Vec2 || Vec2;
            }
          }
          return Vec2;
        })();


        /***/
      })

    /******/
  });
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
      /******/
    }
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
      /******/
    };
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
    /******/
  }
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
      /******/
    };
    /******/
  })();
/******/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for (var key in definition) {
/******/ 				if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
/******/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function () {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
        /******/
      } catch (e) {
/******/ 				if (typeof window === 'object') return window;
        /******/
      }
      /******/
    })();
    /******/
  })();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
    /******/
  })();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/
      }
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
  (() => {
    "use strict";
    /*!***************************************!*\
      !*** ./experiments/basic/js/entry.js ***!
      \***************************************/
    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toggleTheme: () => (/* binding */ toggleTheme)
      /* harmony export */
    });
/* harmony import */ var vec2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vec2 */ "./node_modules/vec2/vec2.js");
/* harmony import */ var vec2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vec2__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_Network__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/Network */ "./core/Network.js");
/* harmony import */ var _core_AttractorPatterns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/AttractorPatterns */ "./core/AttractorPatterns.js");
/* harmony import */ var _core_Node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/Node */ "./core/Node.js");
/* harmony import */ var _core_Utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/Utilities */ "./core/Utilities.js");
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Settings */ "./experiments/basic/js/Settings.js");







    let canvas, ctx;
    let network;
    let isReversing = false;
    let backgroundOpacity = 1; // Opacità iniziale dello sfondo (1 = pieno, 0 = trasparente)
    const nodesPerFrame = 10; // Numero di nodi da aggiungere/rimuovere per frame
    let isNightMode = false; // Modalità giorno/notte

    // Create initial conditions for simulation
    const setup = () => {
      // Recupera l'elemento canvas
      const canvas = document.getElementById('sketch');

      // Controlla che canvas esista prima di procedere
      if (!canvas) {
        console.error('Impossibile trovare l\'elemento #sketch nel DOM.');
        return;
      }

      // Ottieni il contesto 2D
      const ctx = canvas.getContext('2d');

      // Imposta le dimensioni del canvas
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Avvia la configurazione iniziale della rete (passa ctx se necessario)
      setupNetwork(ctx);

      // Avvia l'animazione
      requestAnimationFrame(update);

      // Avvia il ciclo di rigenerazione ogni 7 secondi
      setInterval(() => {
        isReversing = true;
      }, 7000);
    };

    // Create the network with initial conditions
    const setupNetwork = () => {
      // Reset the background opacity
      backgroundOpacity = 1;

      // Determine colors based on current theme
      const colors = isNightMode ? _Settings__WEBPACK_IMPORTED_MODULE_5__["default"].ColorsNight : _Settings__WEBPACK_IMPORTED_MODULE_5__["default"].ColorsDay;

      // Initialize simulation object with dynamic colors
      network = new _core_Network__WEBPACK_IMPORTED_MODULE_1__["default"](ctx, { ..._Settings__WEBPACK_IMPORTED_MODULE_5__["default"], Colors: colors });

      // Set up the attractors using pre-made patterns
      let gridAttractors = (0, _core_AttractorPatterns__WEBPACK_IMPORTED_MODULE_2__.getGridOfAttractors)(150, 100, ctx, 10);
      network.attractors = gridAttractors;

      // Add a set of random root nodes throughout scene
      for (let i = 0; i < 10; i++) {
        network.addNode(
          new _core_Node__WEBPACK_IMPORTED_MODULE_3__["default"](
            null,
            new vec2__WEBPACK_IMPORTED_MODULE_0__(
              (0, _core_Utilities__WEBPACK_IMPORTED_MODULE_4__.random)(window.innerWidth),
              (0, _core_Utilities__WEBPACK_IMPORTED_MODULE_4__.random)(window.innerHeight)
            ),
            true,
            ctx,
            { ..._Settings__WEBPACK_IMPORTED_MODULE_5__["default"], Colors: colors }
          )
        );
      }
    };

    // Main program loop
    const update = () => {
      if (isReversing) {
        reverseAnimation();
      } else {
        network.update();
        network.draw();
      }

      requestAnimationFrame(update);
    };

    let reverseSpeed = 10; // Velocità di base

    const reverseAnimation = () => {
      const remainingNodes = network.nodes.length;
      reverseSpeed = Math.ceil(remainingNodes / 50); // Velocità basata sul numero di nodi rimanenti

      if (remainingNodes > 40) {
        // Rimuove nodi progressivamente
        for (let i = 0; i < reverseSpeed; i++) {
          if (network.nodes.length > 0) {
            network.nodes.pop();
          }
        }

        // Disegna la rete attuale
        drawBackground();
        network.draw();
      } else {
        // Quando tutti i nodi sono rimossi, ricrea il network
        isReversing = false;
        setupNetwork();
      }
    };

    const drawBackground = () => {
      const colors = isNightMode ? _Settings__WEBPACK_IMPORTED_MODULE_5__["default"].ColorsNight : _Settings__WEBPACK_IMPORTED_MODULE_5__["default"].ColorsDay;
      ctx.fillStyle = colors.BackgroundColor; // Colore di sfondo basato sul tema
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Toggle theme (day/night)
    const toggleTheme = () => {
      isNightMode = !isNightMode; // Cambia modalità
      setupNetwork(); // Ricrea il canvas con i colori aggiornati
    };

    // Kick off the application
    setup();

  })();

  /******/
})()
  ;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFVBQVUsK0NBQUk7O0FBRWQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4Q2tDO0FBQ047QUFDQztBQUNROztBQUV0QjtBQUNmO0FBQ0E7QUFDQSxvQ0FBb0MsRUFBRSxpREFBUTs7QUFFOUMsMkJBQTJCO0FBQzNCLDJCQUEyQjs7QUFFM0IsMkJBQTJCOztBQUUzQiwyQkFBMkI7QUFDM0IsMkJBQTJCOztBQUUzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7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O0FBQ2Y7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLFlBQVk7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM5Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0U7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCO0FBQzlCO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLDBCQUEwQjtBQUMxQiwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBLGdCQUFnQixTQUFTO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixzQkFBc0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTs7QUFFQTtBQUNBLE1BQU0sSUFBMkMsRUFBRSxtQ0FBTyxZQUFZLHFCQUFxQjtBQUFBLGtHQUFDO0FBQzVGO0FBQ0EsTUFBTSxJQUE4QixFQUFFLG9CQUFvQjtBQUMxRDtBQUNBLE9BQU8sRUFBc0U7QUFDN0U7QUFDQSxNQUFNLElBQTZCO0FBQ25DO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeGQ2QjtBQUNJO0FBQ047Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZNOztBQUVsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzREFBc0QsZ0VBQWdFO0FBQ3RIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscURBQVE7QUFDbkIsR0FBRyxJQUFJLHFEQUFROztBQUVmO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBLGlFQUFlLE1BQU07Ozs7Ozs7Ozs7Ozs7OztBQ2hIckIsb0RBQW9ELGdCQUFnQixzQkFBc0IsT0FBTywyQkFBMkIsMEJBQTBCLHlEQUF5RCxpQ0FBaUM7O0FBRWhQLCtDQUErQyxpQkFBaUIscUJBQXFCLG9DQUFvQyw2REFBNkQsc0JBQXNCOztBQUU1TTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVksZ0NBQWdDLElBQUksMkJBQTJCLDJDQUEyQyxJQUFJLDJCQUEyQiwyQ0FBMkM7QUFDaE07O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLGlDQUFpQyxJQUFJLDRCQUE0Qiw2Q0FBNkMsSUFBSSw0QkFBNEIsNkNBQTZDO0FBQ3ZNOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWSw0QkFBNEIsSUFBSSxjQUFjO0FBQzFEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNCQUFzQixnQkFBZ0I7QUFDdEMsdURBQXVEOztBQUV2RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QjtBQUN6Qiw0QkFBNEIsMEJBQTBCO0FBQ3RELGNBQWM7QUFDZCw0QkFBNEIsWUFBWTtBQUN4Qzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEVBQThFLGdFQUFnRTtBQUM5STs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsYUFBYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCQUEwQixTQUFTLG1EQUFtRCxnQkFBZ0I7O0FBRXRHOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsYUFBYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBLDBCQUEwQixTQUFTLHFDQUFxQyxnQkFBZ0I7O0FBRXhGO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixzREFBc0Q7O0FBRXREO0FBQ0Esc0JBQXNCLDBCQUEwQjtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLCtCQUErQiw4QkFBOEI7QUFDN0Q7O0FBRUE7QUFDQTs7QUFFQSwrQkFBK0IsK0JBQStCO0FBQzlEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsaUJBQWlCLFVBQVU7QUFDM0IsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0Esc0JBQXNCO0FBQ3RCOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQSxrQ0FBa0MsMENBQTBDO0FBQzVFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWSwwQkFBMEIsSUFBSSxvQkFBb0IsSUFBSSw2QkFBNkIsSUFBSSxxQkFBcUIsSUFBSSxZQUFZO0FBQ3hJOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQjs7QUFFaEIsWUFBWSwrQkFBK0IsSUFBSSx5QkFBeUIsSUFBSSx1Q0FBdUMsSUFBSSxrQ0FBa0MsSUFBSSxnREFBZ0QsSUFBSSwwQkFBMEIsSUFBSSx3Q0FBd0MsSUFBSSxpQkFBaUIsSUFBSSwrQkFBK0I7QUFDL1U7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsaUVBQWUsUUFBUTs7Ozs7Ozs7Ozs7Ozs7O0FDcll2QixxR0FBcUcscUJBQXFCLG1CQUFtQjs7QUFFN0k7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsbUJBQW1CLDRDQUE0QztBQUMvRCxtQkFBbUIsNENBQTRDO0FBQy9ELG1CQUFtQiwyQ0FBMkM7QUFDOUQ7O0FBRUE7QUFDQSxtQkFBbUIsNENBQTRDO0FBQy9ELG1CQUFtQiw0Q0FBNEM7QUFDL0QsbUJBQW1CLDRDQUE0QztBQUMvRCxtQkFBbUIsNENBQTRDO0FBQy9EOztBQUVBO0FBQ0EsbUJBQW1CLDRDQUE0QztBQUMvRCxtQkFBbUIsNENBQTRDO0FBQy9ELG1CQUFtQiw0Q0FBNEM7QUFDL0QsbUJBQW1CLDRDQUE0QztBQUMvRDs7QUFFQTtBQUNBLG1CQUFtQiwyQ0FBMkM7QUFDOUQ7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixnREFBZ0Q7QUFDbkU7O0FBRUE7QUFDQSxtQkFBbUIsZ0RBQWdEO0FBQ25FLG1CQUFtQiw0QkFBNEI7QUFDL0MsbUJBQW1CLDRCQUE0QjtBQUMvQyxtQkFBbUIsK0NBQStDO0FBQ2xFLG1CQUFtQiwyQ0FBMkM7QUFDOUQsbUJBQW1CLDJDQUEyQztBQUM5RDs7QUFFQTtBQUNBLG1CQUFtQiwrQ0FBK0M7QUFDbEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxLQUFLOzs7Ozs7Ozs7O0FDOUdwQixDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsUUFBUTtBQUNSLDRDQUE0QyxNQUFNO0FBQ2xEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQ0FBc0MsUUFBUTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsY0FBYztBQUNkLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxzQ0FBc0MsV0FBVzs7QUFFakQ7QUFDQSxRQUFRLEtBQTZCO0FBQ3JDO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztVQ3hkRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ042QjtBQUNlO0FBQzBCO0FBQ2hDO0FBQ1c7QUFDZjs7QUFFbEM7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCLDBCQUEwQjtBQUMxQix5QkFBeUI7O0FBRXpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLGlEQUFRLGVBQWUsaURBQVE7O0FBRTlEO0FBQ0EsZ0JBQWdCLHFEQUFPLFFBQVEsR0FBRyxpREFBUSxrQkFBa0I7O0FBRTVEO0FBQ0EsdUJBQXVCLDRFQUFtQjtBQUMxQzs7QUFFQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0EsVUFBVSxrREFBSTtBQUNkO0FBQ0EsWUFBWSxpQ0FBSTtBQUNoQixVQUFVLHVEQUFNO0FBQ2hCLFVBQVUsdURBQU07QUFDaEI7QUFDQTtBQUNBO0FBQ0EsVUFBVSxHQUFHLGlEQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVCQUF1Qjs7QUFFdkI7QUFDQTtBQUNBLGlEQUFpRDs7QUFFakQ7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0IsaURBQVEsZUFBZSxpREFBUTtBQUM5RCwwQ0FBMEM7QUFDMUM7QUFDQTs7QUFFQTtBQUNPO0FBQ1AsOEJBQThCO0FBQzlCLGtCQUFrQjtBQUNsQjs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vMmQtc3BhY2UtY29sb25pemF0aW9uLWV4cGVyaW1lbnRzLy4vY29yZS9BdHRyYWN0b3IuanMiLCJ3ZWJwYWNrOi8vMmQtc3BhY2UtY29sb25pemF0aW9uLWV4cGVyaW1lbnRzLy4vY29yZS9BdHRyYWN0b3JQYXR0ZXJucy5qcyIsIndlYnBhY2s6Ly8yZC1zcGFjZS1jb2xvbml6YXRpb24tZXhwZXJpbWVudHMvLi9jb3JlL0NvbG9yUHJlc2V0cy5qcyIsIndlYnBhY2s6Ly8yZC1zcGFjZS1jb2xvbml6YXRpb24tZXhwZXJpbWVudHMvLi9jb3JlL0RlZmF1bHRzLmpzIiwid2VicGFjazovLzJkLXNwYWNlLWNvbG9uaXphdGlvbi1leHBlcmltZW50cy8uL2NvcmUvTmV0d29yay5qcyIsIndlYnBhY2s6Ly8yZC1zcGFjZS1jb2xvbml6YXRpb24tZXhwZXJpbWVudHMvLi9jb3JlL05vZGUuanMiLCJ3ZWJwYWNrOi8vMmQtc3BhY2UtY29sb25pemF0aW9uLWV4cGVyaW1lbnRzLy4vY29yZS9VdGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vMmQtc3BhY2UtY29sb25pemF0aW9uLWV4cGVyaW1lbnRzLy4vZXhwZXJpbWVudHMvYmFzaWMvanMvU2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vMmQtc3BhY2UtY29sb25pemF0aW9uLWV4cGVyaW1lbnRzLy4vbm9kZV9tb2R1bGVzL2ZpbGUtc2F2ZXIvZGlzdC9GaWxlU2F2ZXIubWluLmpzIiwid2VicGFjazovLzJkLXNwYWNlLWNvbG9uaXphdGlvbi1leHBlcmltZW50cy8uL25vZGVfbW9kdWxlcy9rZGJ1c2gvc3JjL2luZGV4LmpzIiwid2VicGFjazovLzJkLXNwYWNlLWNvbG9uaXphdGlvbi1leHBlcmltZW50cy8uL25vZGVfbW9kdWxlcy9rZGJ1c2gvc3JjL3JhbmdlLmpzIiwid2VicGFjazovLzJkLXNwYWNlLWNvbG9uaXphdGlvbi1leHBlcmltZW50cy8uL25vZGVfbW9kdWxlcy9rZGJ1c2gvc3JjL3NvcnQuanMiLCJ3ZWJwYWNrOi8vMmQtc3BhY2UtY29sb25pemF0aW9uLWV4cGVyaW1lbnRzLy4vbm9kZV9tb2R1bGVzL2tkYnVzaC9zcmMvd2l0aGluLmpzIiwid2VicGFjazovLzJkLXNwYWNlLWNvbG9uaXphdGlvbi1leHBlcmltZW50cy8uL25vZGVfbW9kdWxlcy9zaW1wbGV4LW5vaXNlL3NpbXBsZXgtbm9pc2UuanMiLCJ3ZWJwYWNrOi8vMmQtc3BhY2UtY29sb25pemF0aW9uLWV4cGVyaW1lbnRzLy4vbm9kZV9tb2R1bGVzL3N2Zy1wb2ludHMvbW9kdWxlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8yZC1zcGFjZS1jb2xvbml6YXRpb24tZXhwZXJpbWVudHMvLi9ub2RlX21vZHVsZXMvc3ZnLXBvaW50cy9tb2R1bGVzL3RvUGF0aC5qcyIsIndlYnBhY2s6Ly8yZC1zcGFjZS1jb2xvbml6YXRpb24tZXhwZXJpbWVudHMvLi9ub2RlX21vZHVsZXMvc3ZnLXBvaW50cy9tb2R1bGVzL3RvUG9pbnRzLmpzIiwid2VicGFjazovLzJkLXNwYWNlLWNvbG9uaXphdGlvbi1leHBlcmltZW50cy8uL25vZGVfbW9kdWxlcy9zdmctcG9pbnRzL21vZHVsZXMvdmFsaWQuanMiLCJ3ZWJwYWNrOi8vMmQtc3BhY2UtY29sb25pemF0aW9uLWV4cGVyaW1lbnRzLy4vbm9kZV9tb2R1bGVzL3ZlYzIvdmVjMi5qcyIsIndlYnBhY2s6Ly8yZC1zcGFjZS1jb2xvbml6YXRpb24tZXhwZXJpbWVudHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vMmQtc3BhY2UtY29sb25pemF0aW9uLWV4cGVyaW1lbnRzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLzJkLXNwYWNlLWNvbG9uaXphdGlvbi1leHBlcmltZW50cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vMmQtc3BhY2UtY29sb25pemF0aW9uLWV4cGVyaW1lbnRzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vMmQtc3BhY2UtY29sb25pemF0aW9uLWV4cGVyaW1lbnRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vMmQtc3BhY2UtY29sb25pemF0aW9uLWV4cGVyaW1lbnRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vMmQtc3BhY2UtY29sb25pemF0aW9uLWV4cGVyaW1lbnRzLy4vZXhwZXJpbWVudHMvYmFzaWMvanMvZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERlZmF1bHRzIGZyb20gJy4vRGVmYXVsdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdHRyYWN0b3Ige1xuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbiwgY3R4LCBzZXR0aW5ncyA9IHt9KSB7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uOyAgICAgLy8gdmVjMiBvZiB0aGlzIGF0dHJhY3RvcidzIHBvc2l0aW9uXG4gICAgdGhpcy5jdHggPSBjdHg7ICAgICAgICAgICAgICAgLy8gZ2xvYmFsIGNhbnZhcyBjb250ZXh0XG4gICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRzLCBzZXR0aW5ncyk7XG5cbiAgICB0aGlzLmluZmx1ZW5jaW5nTm9kZXMgPSBbXTsgICAvLyByZWZlcmVuY2VzIHRvIG5vZGVzIHRoaXMgYXR0cmFjdG9yIGlzIGluZmx1ZW5jaW5nIGVhY2ggZnJhbWVcbiAgICB0aGlzLmZyZXNoID0gdHJ1ZTsgICAgICAgICAgICAvLyBmbGFnIHVzZWQgdG8gcHJldmVudCBhdHRyYWN0b3JzIGZyb20gYmVpbmcgcmVtb3ZlZCBkdXJpbmcgZmlyc3QgZnJhbWUgb2YgQ2xvc2VkIHZlbmF0aW9uIG1vZGVcbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgLy8gRHJhdyB0aGUgYXR0cmFjdGlvbiB6b25lXG4gICAgaWYodGhpcy5zZXR0aW5ncy5TaG93QXR0cmFjdGlvblpvbmVzKSB7XG4gICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY3R4LmVsbGlwc2UodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMuc2V0dGluZ3MuQXR0cmFjdGlvbkRpc3RhbmNlLCB0aGlzLnNldHRpbmdzLkF0dHJhY3Rpb25EaXN0YW5jZSwgMCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5zZXR0aW5ncy5Db2xvcnMuQXR0cmFjdGlvblpvbmVDb2xvcjtcbiAgICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICB9XG5cbiAgICAvLyBEcmF3IHRoZSBraWxsIHpvbmVcbiAgICBpZih0aGlzLnNldHRpbmdzLlNob3dLaWxsWm9uZXMpIHtcbiAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jdHguZWxsaXBzZSh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy5zZXR0aW5ncy5LaWxsRGlzdGFuY2UsIHRoaXMuc2V0dGluZ3MuS2lsbERpc3RhbmNlLCAwLCAwLCBNYXRoLlBJICogMik7XG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLnNldHRpbmdzLkNvbG9ycy5LaWxsWm9uZUNvbG9yO1xuICAgICAgdGhpcy5jdHguZmlsbCgpO1xuICAgIH1cblxuICAgIC8vIERyYXcgdGhlIGF0dHJhY3RvclxuICAgIGlmKHRoaXMuc2V0dGluZ3MuU2hvQXR0cmFjdG9ycykge1xuICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmN0eC5lbGxpcHNlKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCAxLCAxLCAwLCAwLCBNYXRoLlBJICogMik7XG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLnNldHRpbmdzLkNvbG9ycy5BdHRyYWN0b3JDb2xvcjtcbiAgICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgQXR0cmFjdG9yIGZyb20gJy4vQXR0cmFjdG9yJztcbmltcG9ydCBWZWMyIGZyb20gJ3ZlYzInO1xuaW1wb3J0IHsgcmFuZG9tLCBtYXAgfSBmcm9tICcuL1V0aWxpdGllcyc7XG52YXIgU2ltcGxleE5vaXNlID0gcmVxdWlyZSgnc2ltcGxleC1ub2lzZScpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZG9tQXR0cmFjdG9ycyhudW1BdHRyYWN0b3JzLCBjdHgsIGJvdW5kcyA9IHVuZGVmaW5lZCwgb2JzdGFjbGVzID0gdW5kZWZpbmVkKSB7XG4gIGxldCBhdHRyYWN0b3JzID0gW107XG4gIGxldCB4LCB5O1xuICBsZXQgaXNJbnNpZGVBbnlCb3VuZHMsIGlzSW5zaWRlQW55T2JzdGFjbGUsIGlzT25TY3JlZW47XG5cbiAgZm9yKGxldCBpPTA7IGk8bnVtQXR0cmFjdG9yczsgaSsrKSB7XG4gICAgeCA9IHJhbmRvbSh3aW5kb3cuaW5uZXJXaWR0aCk7XG4gICAgeSA9IHJhbmRvbSh3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIGlzSW5zaWRlQW55Qm91bmRzID0gZmFsc2U7XG4gICAgaXNJbnNpZGVBbnlPYnN0YWNsZSA9IGZhbHNlO1xuICAgIGlzT25TY3JlZW4gPSBmYWxzZTtcblxuICAgIC8vIE9ubHkgYWxsb3cgYXR0cmFjdG9ycyB0aGF0IGFyZSBpbiB0aGUgdmlld3BvcnRcbiAgICBpZihcbiAgICAgIHggPiAwICYmXG4gICAgICB4IDwgd2luZG93LmlubmVyV2lkdGggJiZcbiAgICAgIHkgPiAwICYmXG4gICAgICB5IDwgd2luZG93LmlubmVySGVpZ2h0XG4gICAgKSB7XG4gICAgICBpc09uU2NyZWVuID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBPbmx5IGFsbG93IHJvb3Qgbm9kZXMgaW5zaWRlIG9mIGRlZmluZWQgYm91bmRzXG4gICAgaWYoYm91bmRzICE9IHVuZGVmaW5lZCAmJiBib3VuZHMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yKGxldCBib3VuZCBvZiBib3VuZHMpIHtcbiAgICAgICAgaWYoYm91bmQuY29udGFpbnMoeCwgeSkpIHtcbiAgICAgICAgICBpc0luc2lkZUFueUJvdW5kcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEb24ndCBhbGxvdyBhbnkgcm9vdCBub2RlcyB0aGF0IGFyZSBpbnNpZGUgb2YgYW4gb2JzdGFjbGVcbiAgICBpZihvYnN0YWNsZXMgIT0gdW5kZWZpbmVkICYmIG9ic3RhY2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IobGV0IG9ic3RhY2xlIG9mIG9ic3RhY2xlcykge1xuICAgICAgICBpZihvYnN0YWNsZS5jb250YWlucyh4LCB5KSkge1xuICAgICAgICAgIGlzSW5zaWRlQW55T2JzdGFjbGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoXG4gICAgICAoaXNJbnNpZGVBbnlCb3VuZHMgfHwgYm91bmRzID09PSB1bmRlZmluZWQpICYmXG4gICAgICAoIWlzSW5zaWRlQW55T2JzdGFjbGUgfHwgb2JzdGFjbGVzID09PSB1bmRlZmluZWQpXG4gICAgKSB7XG4gICAgICBhdHRyYWN0b3JzLnB1c2goXG4gICAgICAgIG5ldyBBdHRyYWN0b3IoXG4gICAgICAgICAgbmV3IFZlYzIoeCx5KSxcbiAgICAgICAgICBjdHhcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXR0cmFjdG9ycztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEdyaWRPZkF0dHJhY3RvcnMobnVtUm93cywgbnVtQ29sdW1ucywgY3R4LCBqaXR0ZXJSYW5nZSA9IDAsIGJvdW5kcyA9IHVuZGVmaW5lZCwgb2JzdGFjbGVzID0gdW5kZWZpbmVkKSB7XG4gIGxldCBhdHRyYWN0b3JzID0gW107XG4gIGxldCB4LCB5O1xuICBsZXQgaXNJbnNpZGVBbnlCb3VuZHMsIGlzSW5zaWRlQW55T2JzdGFjbGUsIGlzT25TY3JlZW47XG5cbiAgZm9yKGxldCBpPTA7IGk8PW51bVJvd3M7IGkrKykge1xuICAgIGZvcihsZXQgaj0wOyBqPD1udW1Db2x1bW5zOyBqKyspIHtcbiAgICAgIHggPSAod2luZG93LmlubmVyV2lkdGggLyBudW1Db2x1bW5zKSAqIGogKyByYW5kb20oLWppdHRlclJhbmdlLCBqaXR0ZXJSYW5nZSk7XG4gICAgICB5ID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIG51bVJvd3MpICogaSArIHJhbmRvbSgtaml0dGVyUmFuZ2UsIGppdHRlclJhbmdlKTtcbiAgICAgIGlzSW5zaWRlQW55Qm91bmRzID0gZmFsc2U7XG4gICAgICBpc0luc2lkZUFueU9ic3RhY2xlID0gZmFsc2U7XG4gICAgICBpc09uU2NyZWVuID0gZmFsc2U7XG5cbiAgICAgIC8vIE9ubHkgYWxsb3cgYXR0cmFjdG9ycyB0aGF0IGFyZSBpbiB0aGUgdmlld3BvcnRcbiAgICAgIGlmKFxuICAgICAgICB4ID4gMCAmJlxuICAgICAgICB4IDwgd2luZG93LmlubmVyV2lkdGggJiZcbiAgICAgICAgeSA+IDAgJiZcbiAgICAgICAgeSA8IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgKSB7XG4gICAgICAgIGlzT25TY3JlZW4gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBPbmx5IGFsbG93IGF0dHJhY3RvcnMgaW5zaWRlIG9mIGFueSBvZiB0aGUgZGVmaW5lZCBib3VuZHMgKGlmIHVzZWQpXG4gICAgICBpZihib3VuZHMgIT0gdW5kZWZpbmVkICYmIGJvdW5kcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvcihsZXQgYm91bmQgb2YgYm91bmRzKSB7XG4gICAgICAgICAgaWYoYm91bmQuY29udGFpbnMoeCwgeSkpIHtcbiAgICAgICAgICAgIGlzSW5zaWRlQW55Qm91bmRzID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gRG9uJ3QgYWxsb3cgYW55IHJvb3Qgbm9kZXMgdGhhdCBhcmUgaW5zaWRlIG9mIGFuIG9ic3RhY2xlIChpZiB1c2VkKVxuICAgICAgaWYob2JzdGFjbGVzICE9IHVuZGVmaW5lZCAmJiBvYnN0YWNsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IobGV0IG9ic3RhY2xlIG9mIG9ic3RhY2xlcykge1xuICAgICAgICAgIGlmKG9ic3RhY2xlLmNvbnRhaW5zKHgsIHkpKSB7XG4gICAgICAgICAgICBpc0luc2lkZUFueU9ic3RhY2xlID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYoXG4gICAgICAgIGlzT25TY3JlZW4gJiZcbiAgICAgICAgKGlzSW5zaWRlQW55Qm91bmRzIHx8IGJvdW5kcyA9PT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAoIWlzSW5zaWRlQW55T2JzdGFjbGUgfHwgb2JzdGFjbGVzID09PSB1bmRlZmluZWQpXG4gICAgICApIHtcbiAgICAgICAgYXR0cmFjdG9ycy5wdXNoKFxuICAgICAgICAgIG5ldyBBdHRyYWN0b3IoXG4gICAgICAgICAgICBuZXcgVmVjMih4LHkpLFxuICAgICAgICAgICAgY3R4XG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhdHRyYWN0b3JzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGh5bGxvdGF4aXNBdHRyYWN0b3JzKGN0eCkge1xuICBsZXQgYXR0cmFjdG9ycyA9IFtdO1xuICBsZXQgbnVtQ2lyY2xlcyA9IDUwMDAsXG4gIGdvbGRlbl9yYXRpbyA9IChNYXRoLnNxcnQoNSkrMSkvMiAtIDEsXG4gIGdvbGRlbl9hbmdsZSA9IGdvbGRlbl9yYXRpbyAqICgyKk1hdGguUEkpLFxuICBjaXJjbGVfcmFkID0gd2luZG93LmlubmVyV2lkdGgvMjtcblxuXG4gIGZvcihsZXQgaT0wOyBpPG51bUNpcmNsZXM7IGkrKykge1xuICAgIGxldCByYXRpbyA9IGkgLyBudW1DaXJjbGVzLFxuICAgICAgYW5nbGUgPSBpICogZ29sZGVuX2FuZ2xlLFxuICAgICAgc3BpcmFsX3JhZCA9IHJhdGlvICogY2lyY2xlX3JhZDtcblxuICAgIGF0dHJhY3RvcnMucHVzaChcbiAgICAgIG5ldyBBdHRyYWN0b3IoXG4gICAgICAgIG5ldyBWZWMyKFxuICAgICAgICAgIHdpbmRvdy5pbm5lcldpZHRoLzIgKyBNYXRoLmNvcyhhbmdsZSkgKiBzcGlyYWxfcmFkLFxuICAgICAgICAgIHdpbmRvdy5pbm5lckhlaWdodC8yICsgTWF0aC5zaW4oYW5nbGUpICogc3BpcmFsX3JhZFxuICAgICAgICApLFxuICAgICAgICBjdHhcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGF0dHJhY3RvcnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXYXZlT2ZBdHRyYWN0b3JzKGN0eCkge1xuICBsZXQgYXR0cmFjdG9ycyA9IFtdO1xuICBsZXQgbnVtUm93cyA9IDcwO1xuICBsZXQgbnVtQ29sdW1ucyA9IDEwMDtcbiAgbGV0IHJvd1NwYWNpbmcgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyBudW1Sb3dzO1xuICBsZXQgY29sU3BhY2luZyA9IHdpbmRvdy5pbm5lcldpZHRoIC8gbnVtQ29sdW1ucztcblxuICBmb3IobGV0IHJvdyA9IDA7IHJvdyA8IG51bVJvd3M7IHJvdysrKSB7XG4gICAgZm9yKGxldCBjb2wgPSAwOyBjb2wgPCBudW1Db2x1bW5zOyBjb2wrKykge1xuICAgICAgYXR0cmFjdG9ycy5wdXNoKFxuICAgICAgICBuZXcgQXR0cmFjdG9yKFxuICAgICAgICAgIG5ldyBWZWMyKFxuICAgICAgICAgICAgKGNvbCAqIGNvbFNwYWNpbmcpICsgKE1hdGguc2luKG1hcChjb2wsIDAsIG51bUNvbHVtbnMsIDAsIE1hdGguUEkgKiAyKSkgKiAyMDApLFxuICAgICAgICAgICAgKHJvdyAqIHJvd1NwYWNpbmcpICsgKE1hdGguc2luKG1hcChyb3csIDAsIG51bVJvd3MsIDAsIE1hdGguUEkgKiAyKSkgKiA1MClcbiAgICAgICAgICApLFxuICAgICAgICAgIGN0eFxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGF0dHJhY3RvcnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseU5vaXNlKGF0dHJhY3RvcnMpIHtcbiAgbGV0IG5vaXNlID0gbmV3IFNpbXBsZXhOb2lzZSgpO1xuXG4gIGZvcihsZXQgYXR0cmFjdG9yIG9mIGF0dHJhY3RvcnMpIHtcbiAgICBhdHRyYWN0b3IucG9zaXRpb24ueCArPSBub2lzZS5ub2lzZTJEKGF0dHJhY3Rvci5wb3NpdGlvbi54LCBhdHRyYWN0b3IucG9zaXRpb24ueSkgKiAxMDtcbiAgICBhdHRyYWN0b3IucG9zaXRpb24ueSArPSBub2lzZS5ub2lzZTJEKHNvdWF0dHJhY3RvcnJjZS5wb3NpdGlvbi54LCBhdHRyYWN0b3IucG9zaXRpb24ueSkgKiAxMDtcbiAgfVxuXG4gIHJldHVybiBhdHRyYWN0b3JzO1xufSIsImV4cG9ydCBjb25zdCBMaWdodCA9IHtcbiAgQmFja2dyb3VuZENvbG9yOiAncmdiYSgyNTUsMjU1LDI1NSwxKScsXG4gIEF0dHJhY3RvckNvbG9yOiAncmdiYSgwLDAsMCwuNSknLFxuICBCcmFuY2hDb2xvcjogJ3JnYmEoMCwwLDAsMSknLFxuICBUaXBDb2xvcjogJ3JnYmEoMjU1LDAsMCwxKScsXG4gIEF0dHJhY3Rpb25ab25lQ29sb3I6ICdyZ2JhKDAsMjU1LDAsLjAwMiknLFxuICBLaWxsWm9uZUNvbG9yOiAncmdiYSgyNTUsMCwwLC40KScsXG4gIEluZmx1ZW5jZUxpbmVzQ29sb3I6ICdyZ2JhKDAsMCwyNTUsMSknLFxuICBCb3VuZHNGaWxsQ29sb3I6ICdyZ2JhKDAsMCwwLC4xKScsXG4gIEJvdW5kc0JvcmRlckNvbG9yOiAncmdiYSgwLDAsMCwuMSknLFxuICBPYnN0YWNsZUZpbGxDb2xvcjogJ3JnYmEoMCwwLDAsLjcpJ1xufVxuXG5leHBvcnQgY29uc3QgRGFyayA9IHtcbiAgQmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwuOSknLFxuICBBdHRyYWN0b3JDb2xvcjogJ3JnYmEoMjU1LDI1NSwyNTUsLjUpJyxcbiAgQnJhbmNoQ29sb3I6ICdyZ2JhKDI1NSwyNTUsMjU1LDEpJyxcbiAgVGlwQ29sb3I6ICdyZ2JhKDAsMjU1LDI1NSwxKScsXG4gIEF0dHJhY3Rpb25ab25lQ29sb3I6ICdyZ2JhKDI1NSwyNTUsMjU1LC4wMDIpJyxcbiAgS2lsbFpvbmVDb2xvcjogJ3JnYmEoMjU1LDAsMCwuNCknLFxuICBJbmZsdWVuY2VMaW5lc0NvbG9yOiAncmdiYSgyNTUsMjU1LDI1NSwuMiknLFxuICBCb3VuZHNGaWxsQ29sb3I6ICdyZ2JhKDI1NSwyNTUsMjU1LDApJyxcbiAgQm91bmRzQm9yZGVyQ29sb3I6ICdyZ2JhKDI1NSwyNTUsMjU1LC4wNSknLFxuICBPYnN0YWNsZUZpbGxDb2xvcjogJ3JnYmEoMjU1LDI1NSwyNTUsLjIpJ1xufVxuXG5leHBvcnQgY29uc3QgUmVhbGlzdGljID0ge1xuICBCYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI1NSwyNTUsMjU1LDEpJyxcbiAgQXR0cmFjdG9yQ29sb3I6ICdyZ2JhKDI1NSwyNTUsMjU1LDEpJyxcbiAgQnJhbmNoQ29sb3I6ICdyZ2JhKDI1NSwyNTUsMjU1LC42KScsXG4gIC8vIEJyYW5jaENvbG9yOiAncmdiYSgwLDAsMCwuMiknLFxuICBUaXBDb2xvcjogJ3JnYmEoMjU1LDAsMCwxKScsXG4gIEF0dHJhY3Rpb25ab25lQ29sb3I6ICdyZ2JhKDAsMjU1LDAsLjAwMiknLFxuICBLaWxsWm9uZUNvbG9yOiAncmdiYSgyNTUsMCwwLC40KScsXG4gIEluZmx1ZW5jZUxpbmVzQ29sb3I6ICdyZ2JhKDAsMCwyNTUsMSknLFxuICBCb3VuZHNGaWxsQ29sb3I6ICdyZ2JhKDYxLDE2NiwxMiwxKScsXG4gIEJvdW5kc0JvcmRlckNvbG9yOiAncmdiYSgyNTUsMjU1LDI1NSwxKScsXG4gIE9ic3RhY2xlRmlsbENvbG9yOiAncmdiYSgyNTUsMjU1LDI1NSwxKSdcbn1cblxuZXhwb3J0IGNvbnN0IEN1c3RvbSA9IHtcbiAgQmFja2dyb3VuZENvbG9yOiAncmdiKDI0MiwyNDIsMjQyKScsXG4gIEF0dHJhY3RvckNvbG9yOiAncmdiYSgyNTUsMjU1LDI1NSwuNiknLFxuICBCcmFuY2hDb2xvcjogJ3JnYmEoMjU1LDI1NSwyNTUsMSknLFxuICBJbmZsdWVuY2VMaW5lc0NvbG9yOiAncmdiYSgyNTUsMjU1LDI1NSwuMyknLFxuICAvLyBCb3VuZHNGaWxsQ29sb3I6ICdyZ2IoNjEsODUsMTM2KScsXG4gIC8vIEJvdW5kc0JvcmRlckNvbG9yOiAncmdiKDYxLDg1LDEzNiknXG4gIEJvdW5kc0ZpbGxDb2xvcjogJ3JnYigyMTAsIDgxLCA5NCknLFxuICBCb3VuZHNCb3JkZXJDb2xvcjogJ3JnYigyMTAsIDgxLCA5NCknXG59IiwiaW1wb3J0IHsgTGlnaHQsIERhcmssIFJlYWxpc3RpYywgQ3VzdG9tIH0gZnJvbSAnLi9Db2xvclByZXNldHMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgIFNpbXVsYXRpb24gY29uZmlndXJhdGlvbnNcbiAgKi9cblxuICBWZW5hdGlvblR5cGU6ICdPcGVuJywgICAgICAgICAvLyB2ZW5hdGlvbiBjYW4gYmUgXCJPcGVuXCIgb3IgXCJDbG9zZWRcIlxuICBTZWdtZW50TGVuZ3RoOiA1LCAgICAgICAgICAgICAvLyBsZW5ndGggb2YgZWFjaCBicmFuY2ggc2VnbWVudC4gU21hbGxlciBudW1iZXJzIG1lYW4gc21vb3RoZXIgbGluZXMsIGJ1dCBtb3JlIGNvbXB1dGF0aW9uIGNvc3RcbiAgQXR0cmFjdGlvbkRpc3RhbmNlOiAzMCwgICAgICAgLy8gcmFkaXVzIG9mIGluZmx1ZW5jZSAoZF9pKSBhcm91bmQgZWFjaCBhdHRyYWN0b3IgdGhhdCBhdHRyYWN0cyBub2Rlc1xuICBLaWxsRGlzdGFuY2U6IDUsICAgICAgICAgICAgICAvLyBkaXN0YW5jZSAoZF9rKSBiZXR3ZWVuIGF0dHJhY3RvcnMgYW5kIG5vZGVzIHdoZW4gYnJhbmNoZXMgYXJlIGVuZGVkXG4gIElzUGF1c2VkOiBmYWxzZSwgICAgICAgICAgICAgIC8vIGluaXRpYWwgcGF1c2UvdW5wYXVzZSBzdGF0ZVxuICBFbmFibGVDYW5hbGl6YXRpb246IHRydWUsICAgICAvLyB0dXJucyBvbi9vZmYgYXV4aW4gZmx1eCBjYW5hbGl6YXRpb24gKGxpbmUgc2VnbWVudCB0aGlja2VuaW5nKVxuICBFbmFibGVPcGFjaXR5QmxlbmRpbmc6IHRydWUsICAvLyB0dXJucyBvbi9vZmYgb3BhY2l0eVxuXG5cbiAgLyoqXG4gICAgUmVuZGVyaW5nIGNvbmZpZ3VyYXRpb25zXG4gICovXG5cbiAgLy8gVmlzaWJpbGl0eSB0b2dnbGVzXG4gIFNob3dBdHRyYWN0b3JzOiBmYWxzZSwgICAgICAgLy8gdG9nZ2xlZCB3aXRoICdhJ1xuICBTaG93Tm9kZXM6IHRydWUsICAgICAgICAgICAgIC8vIHRvZ2dsZWQgd2l0aCAnbidcbiAgU2hvd1RpcHM6IGZhbHNlLCAgICAgICAgICAgICAvLyB0b2dnbGVkIHdpdGggJ3QnXG4gIFNob3dBdHRyYWN0aW9uWm9uZXM6IGZhbHNlLCAgLy8gdG9nZ2xlZCB3aXRoICd6J1xuICBTaG93S2lsbFpvbmVzOiBmYWxzZSwgICAgICAgIC8vIHRvZ2dsZWQgd2l0aCAnaydcbiAgU2hvd0luZmx1ZW5jZUxpbmVzOiBmYWxzZSwgICAvLyB0b2dnbGVkIHdpdGggJ2knXG4gIFNob3dCb3VuZHM6IGZhbHNlLCAgICAgICAgICAgLy8gdG9nZ2xlZCB3aXRoICdiJ1xuICBTaG93T2JzdGFjbGVzOiBmYWxzZSwgICAgICAgIC8vIHRvZ2dsZWQgd2l0aCAnbydcblxuICAvLyBNb2Rlc1xuICBSZW5kZXJNb2RlOiAnTGluZXMnLCAgLy8gZHJhdyBicmFuY2ggc2VnbWVudHMgYXMgXCJMaW5lc1wiIG9yIFwiRG90c1wiXG5cbiAgLy8gQ29sb3JzXG4gIENvbG9yczogRGFyayxcblxuICAvLyBMaW5lIHRoaWNrbmVzc2VzXG4gIEJyYW5jaFRoaWNrbmVzczogMS41LFxuICBUaXBUaGlja25lc3M6IDIsXG4gIEJvdW5kc0JvcmRlclRoaWNrbmVzczogMVxufSIsImltcG9ydCBEZWZhdWx0cyBmcm9tICcuL0RlZmF1bHRzJztcbmltcG9ydCBLREJ1c2ggZnJvbSAna2RidXNoJztcbmltcG9ydCAqIGFzIFZlYzIgZnJvbSAndmVjMic7XG5pbXBvcnQgeyByYW5kb20gfSBmcm9tICcuL1V0aWxpdGllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ldHdvcmsge1xuICBjb25zdHJ1Y3RvcihjdHgsIHNldHRpbmdzKSB7XG4gICAgdGhpcy5jdHggPSBjdHg7XG4gICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRzLCBzZXR0aW5ncyk7XG5cbiAgICB0aGlzLmF0dHJhY3RvcnMgPSBbXTsgIC8vIGF0dHJhY3RvcnMgaW5mbHVlbmNlIG5vZGUgZ3Jvd3RoXG4gICAgdGhpcy5ub2RlcyA9IFtdOyAgICAgICAvLyBub2RlcyBhcmUgY29ubmVjdGVkIHRvIGZvcm0gYnJhbmNoZXNcblxuICAgIHRoaXMubm9kZXNJbmRleDsgICAgICAgLy8ga2QtYnVzaCBzcGF0aWFsIGluZGV4IGZvciBhbGwgbm9kZXNcblxuICAgIHRoaXMuYm91bmRzID0gW107ICAgICAgLy8gYXJyYXkgb2YgUGF0aCBvYmplY3RzIHRoYXQgYnJhbmNoZXMgY2Fubm90IGdyb3cgb3V0c2lkZSBvZlxuICAgIHRoaXMub2JzdGFjbGVzID0gW107ICAgLy8gYXJyYXkgb2YgUGF0aCBvYmplY3RzIHRoYXQgYnJhbmNoZXMgbXVzdCBhdm9pZFxuXG4gICAgdGhpcy5idWlsZFNwYXRpYWxJbmRpY2VzKCk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgLy8gU2tpcCBpdGVyYXRpb24gaWYgcGF1c2VkXG4gICAgaWYodGhpcy5zZXR0aW5ncy5Jc1BhdXNlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEFzc29jaWF0ZSBhdHRyYWN0b3JzIHdpdGggbmVhcmJ5IG5vZGVzIHRvIGZpZ3VyZSBvdXQgd2hlcmUgZ3Jvd3RoIHNob3VsZCBvY2N1clxuICAgIGZvcihsZXQgW2F0dHJhY3RvcklELCBhdHRyYWN0b3JdIG9mIHRoaXMuYXR0cmFjdG9ycy5lbnRyaWVzKCkpIHtcbiAgICAgIHN3aXRjaCh0aGlzLnNldHRpbmdzLlZlbmF0aW9uVHlwZSkge1xuICAgICAgICAvLyBGb3Igb3BlbiB2ZW5hdGlvbiwgb25seSBhc3NvY2lhdGUgdGhpcyBhdHRyYWN0b3Igd2l0aCBpdHMgY2xvc2VzdCBub2RlXG4gICAgICAgIGNhc2UgJ09wZW4nOlxuICAgICAgICAgIGxldCBjbG9zZXN0Tm9kZSA9IHRoaXMuZ2V0Q2xvc2VzdE5vZGUoYXR0cmFjdG9yLCB0aGlzLmdldE5vZGVzSW5BdHRyYWN0aW9uWm9uZShhdHRyYWN0b3IpKTtcblxuICAgICAgICAgIGlmKGNsb3Nlc3ROb2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNsb3Nlc3ROb2RlLmluZmx1ZW5jZWRCeS5wdXNoKGF0dHJhY3RvcklEKTtcbiAgICAgICAgICAgIGF0dHJhY3Rvci5pbmZsdWVuY2luZ05vZGVzID0gW2Nsb3Nlc3ROb2RlXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAvLyBGb3IgY2xvc2VkIHZlbmF0aW9uLCBhc3NvY2lhdGUgdGhpcyBhdHRyYWN0b3Igd2l0aCBhbGwgbm9kZXMgaW4gaXRzIHJlbGF0aXZlIG5laWdoYm9yaG9vZFxuICAgICAgICBjYXNlICdDbG9zZWQnOlxuICAgICAgICAgIGxldCBuZWlnaGJvcmhvb2ROb2RlcyA9IHRoaXMuZ2V0UmVsYXRpdmVOZWlnaGJvck5vZGVzKGF0dHJhY3Rvcik7XG4gICAgICAgICAgbGV0IG5vZGVzSW5LaWxsWm9uZSA9IHRoaXMuZ2V0Tm9kZXNJbktpbGxab25lKGF0dHJhY3Rvcik7XG5cbiAgICAgICAgICAvLyBFeGNsdWRlIG5vZGVzIHRoYXQgYXJlIGluIHRoZSBhdHRyYWN0b3IncyBraWxsIHpvbmUgKHRoZXNlIHNob3VsZCBzdG9wIGdyb3dpbmcpXG4gICAgICAgICAgbGV0IG5vZGVzVG9Hcm93ID0gbmVpZ2hib3Job29kTm9kZXMuZmlsdGVyKChuZWlnaGJvck5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAhbm9kZXNJbktpbGxab25lLmluY2x1ZGVzKG5laWdoYm9yTm9kZSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBhdHRyYWN0b3IuaW5mbHVlbmNpbmdOb2RlcyA9IG5laWdoYm9yaG9vZE5vZGVzO1xuXG4gICAgICAgICAgaWYobm9kZXNUb0dyb3cubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgYXR0cmFjdG9yLmZyZXNoID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGZvcihsZXQgbm9kZSBvZiBub2Rlc1RvR3Jvdykge1xuICAgICAgICAgICAgICBub2RlLmluZmx1ZW5jZWRCeS5wdXNoKGF0dHJhY3RvcklEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdyb3cgdGhlIG5ldHdvcmsgYnkgYWRkaW5nIG5ldyBub2RlcyBvbnRvIGFueSBub2RlcyBiZWluZyBpbmZsdWVuY2VkIGJ5IGF0dHJhY3RvcnNcbiAgICBmb3IobGV0IG5vZGUgb2YgdGhpcy5ub2Rlcykge1xuICAgICAgaWYobm9kZS5pbmZsdWVuY2VkQnkubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgYXZlcmFnZURpcmVjdGlvbiA9IHRoaXMuZ2V0QXZlcmFnZURpcmVjdGlvbihub2RlLCBub2RlLmluZmx1ZW5jZWRCeS5tYXAoaWQgPT4gdGhpcy5hdHRyYWN0b3JzW2lkXSkpO1xuICAgICAgICBsZXQgbmV4dE5vZGUgPSBub2RlLmdldE5leHROb2RlKGF2ZXJhZ2VEaXJlY3Rpb24pO1xuICAgICAgICBsZXQgaXNJbnNpZGVBbnlCb3VuZHMgPSBmYWxzZTtcbiAgICAgICAgbGV0IGlzSW5zaWRlQW55T2JzdGFjbGUgPSBmYWxzZTtcblxuICAgICAgICAvLyBPbmx5IGFsbG93IHJvb3Qgbm9kZXMgaW5zaWRlIG9mIGRlZmluZWQgYm91bmRzXG4gICAgICAgIGlmKHRoaXMuYm91bmRzICE9IHVuZGVmaW5lZCAmJiB0aGlzLmJvdW5kcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgZm9yKGxldCBib3VuZCBvZiB0aGlzLmJvdW5kcykge1xuICAgICAgICAgICAgaWYoYm91bmQuY29udGFpbnMobmV4dE5vZGUucG9zaXRpb24ueCwgbmV4dE5vZGUucG9zaXRpb24ueSkpIHtcbiAgICAgICAgICAgICAgaXNJbnNpZGVBbnlCb3VuZHMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERvbid0IGFsbG93IGFueSByb290IG5vZGVzIHRoYXQgYXJlIGluc2lkZSBvZiBhbiBvYnN0YWNsZVxuICAgICAgICBpZih0aGlzLm9ic3RhY2xlcyAhPSB1bmRlZmluZWQgJiYgdGhpcy5vYnN0YWNsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGZvcihsZXQgb2JzdGFjbGUgb2YgdGhpcy5vYnN0YWNsZXMpIHtcbiAgICAgICAgICAgIGlmKG9ic3RhY2xlLmNvbnRhaW5zKG5leHROb2RlLnBvc2l0aW9uLngsIG5leHROb2RlLnBvc2l0aW9uLnkpKSB7XG4gICAgICAgICAgICAgIGlzSW5zaWRlQW55T2JzdGFjbGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5PVEU6IGRpc2FibGluZyB0aGlzIGNoZWNrIGxldHMgbm9kZXMgZ3JvdyBhY3Jvc3MgZ2FwcyBpbiBib3VuZHMgLSBjb29sIGVmZmVjdCFcbiAgICAgICAgaWYoXG4gICAgICAgICAgKGlzSW5zaWRlQW55Qm91bmRzIHx8IHRoaXMuYm91bmRzLmxlbmd0aCA9PT0gMCkgJiZcbiAgICAgICAgICAoIWlzSW5zaWRlQW55T2JzdGFjbGUgfHwgdGhpcy5vYnN0YWNsZXMubGVuZ3RoID09PSAwKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLm5vZGVzLnB1c2gobmV4dE5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG5vZGUuaW5mbHVlbmNlZEJ5ID0gW107XG5cbiAgICAgIC8vIFBlcmZvcm0gYXV4aW4gZmx1eCBjYW5hbGl6YXRpb24gKGxpbmUgc2VnbWVudCB0aGlja2VuaW5nKVxuICAgICAgaWYobm9kZS5pc1RpcCAmJiB0aGlzLnNldHRpbmdzLkVuYWJsZUNhbmFsaXphdGlvbikge1xuICAgICAgICBsZXQgY3VycmVudE5vZGUgPSBub2RlO1xuXG4gICAgICAgIHdoaWxlKGN1cnJlbnROb2RlLnBhcmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgLy8gV2hlbiB0aGVyZSBhcmUgbXVsdGlwbGUgY2hpbGQgbm9kZXMsIHVzZSB0aGUgdGhpY2tlc3Qgb2YgdGhlbSBhbGxcbiAgICAgICAgICBpZihjdXJyZW50Tm9kZS5wYXJlbnQudGhpY2tuZXNzIDwgY3VycmVudE5vZGUudGhpY2tuZXNzICsgLjA3KSB7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZS5wYXJlbnQudGhpY2tuZXNzID0gY3VycmVudE5vZGUudGhpY2tuZXNzICsgLjAzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUucGFyZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGFueSBhdHRyYWN0b3JzIHRoYXQgaGF2ZSBiZWVuIHJlYWNoZWQgYnkgdGhlaXIgYXNzb2NpYXRlZCBub2Rlc1xuICAgIGZvcihsZXQgW2F0dHJhY3RvcklELCBhdHRyYWN0b3JdIG9mIHRoaXMuYXR0cmFjdG9ycy5lbnRyaWVzKCkpIHtcbiAgICAgIHN3aXRjaCh0aGlzLnNldHRpbmdzLlZlbmF0aW9uVHlwZSkge1xuICAgICAgICAvLyBGb3Igb3BlbiB2ZW5hdGlvbiwgcmVtb3ZlIHRoZSBhdHRyYWN0b3IgYXMgc29vbiBhcyBhbnkgbm9kZSByZWFjaGVzIGl0XG4gICAgICAgIGNhc2UgJ09wZW4nOlxuICAgICAgICAgIGlmKGF0dHJhY3Rvci5yZWFjaGVkKSB7XG4gICAgICAgICAgICB0aGlzLmF0dHJhY3RvcnMuc3BsaWNlKGF0dHJhY3RvcklELCAxKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAvLyBGb3IgY2xvc2VkIHZlbmF0aW9uLCByZW1vdmUgdGhlIGF0dHJhY3RvciBvbmx5IHdoZW4gYWxsIGFzc29jaWF0ZWQgbm9kZXMgaGF2ZSByZWFjaGVkIGl0XG4gICAgICAgIGNhc2UgJ0Nsb3NlZCc6XG4gICAgICAgICAgaWYoYXR0cmFjdG9yLmluZmx1ZW5jaW5nTm9kZXMubGVuZ3RoID4gMCAmJiAhYXR0cmFjdG9yLmZyZXNoKSB7XG4gICAgICAgICAgICBsZXQgYWxsTm9kZXNSZWFjaGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgZm9yKGxldCBub2RlIG9mIGF0dHJhY3Rvci5pbmZsdWVuY2luZ05vZGVzKSB7XG4gICAgICAgICAgICAgIGlmKG5vZGUucG9zaXRpb24uZGlzdGFuY2UoYXR0cmFjdG9yLnBvc2l0aW9uKSA+IHRoaXMuc2V0dGluZ3MuS2lsbERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgYWxsTm9kZXNSZWFjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoYWxsTm9kZXNSZWFjaGVkKSB7XG4gICAgICAgICAgICAgIHRoaXMuYXR0cmFjdG9ycy5zcGxpY2UoYXR0cmFjdG9ySUQsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlYnVpbGQgc3BhdGlhbCBpbmRpY2VzXG4gICAgdGhpcy5idWlsZFNwYXRpYWxJbmRpY2VzKCk7XG4gIH1cblxuICBkcmF3KCkge1xuICAgIHRoaXMuZHJhd0JhY2tncm91bmQoKTtcbiAgICB0aGlzLmRyYXdCb3VuZHMoKTtcbiAgICB0aGlzLmRyYXdPYnN0YWNsZXMoKTtcbiAgICB0aGlzLmRyYXdhdHRyYWN0b3JzKCk7XG4gICAgdGhpcy5kcmF3Tm9kZXMoKTtcbiAgfVxuXG4gIGRyYXdCYWNrZ3JvdW5kKCkge1xuICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMuc2V0dGluZ3MuQ29sb3JzLkJhY2tncm91bmRDb2xvcjtcbiAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgfVxuXG4gIGRyYXdCb3VuZHMoKSB7XG4gICAgaWYodGhpcy5zZXR0aW5ncy5TaG93Qm91bmRzICYmIHRoaXMuYm91bmRzICE9IHVuZGVmaW5lZCkge1xuICAgICAgZm9yKGxldCBib3VuZCBvZiB0aGlzLmJvdW5kcykge1xuICAgICAgICBib3VuZC5kcmF3KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZHJhd09ic3RhY2xlcygpIHtcbiAgICBpZih0aGlzLnNldHRpbmdzLlNob3dPYnN0YWNsZXMgJiYgdGhpcy5vYnN0YWNsZXMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICBmb3IobGV0IG9ic3RhY2xlIG9mIHRoaXMub2JzdGFjbGVzKSB7XG4gICAgICAgIG9ic3RhY2xlLmRyYXcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkcmF3Tm9kZXMoKSB7XG4gICAgaWYodGhpcy5zZXR0aW5ncy5TaG93Tm9kZXMpIHtcbiAgICAgIGZvcihsZXQgbm9kZSBvZiB0aGlzLm5vZGVzKSB7XG4gICAgICAgIG5vZGUuZHJhdygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRyYXdhdHRyYWN0b3JzKCkge1xuICAgIGZvcihsZXQgYXR0cmFjdG9yIG9mIHRoaXMuYXR0cmFjdG9ycykge1xuICAgICAgYXR0cmFjdG9yLmRyYXcoKTtcblxuICAgICAgLy8gRHJhdyBsaW5lcyBiZXR3ZWVuIGVhY2ggYXR0cmFjdG9yIGFuZCB0aGUgbm9kZXMgdGhleSBhcmUgaW5mbHVlbmNpbmdcbiAgICAgIGlmKHRoaXMuc2V0dGluZ3MuU2hvd0luZmx1ZW5jZUxpbmVzICYmIGF0dHJhY3Rvci5pbmZsdWVuY2luZ05vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yKGxldCBub2RlIG9mIGF0dHJhY3Rvci5pbmZsdWVuY2luZ05vZGVzKSB7XG4gICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgdGhpcy5jdHgubW92ZVRvKGF0dHJhY3Rvci5wb3NpdGlvbi54LCBhdHRyYWN0b3IucG9zaXRpb24ueSk7XG4gICAgICAgICAgdGhpcy5jdHgubGluZVRvKG5vZGUucG9zaXRpb24ueCwgbm9kZS5wb3NpdGlvbi55KTtcbiAgICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMuc2V0dGluZ3MuQ29sb3JzLkluZmx1ZW5jZUxpbmVzQ29sb3I7XG4gICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRSZWxhdGl2ZU5laWdoYm9yTm9kZXMoYXR0cmFjdG9yKSB7XG4gICAgbGV0IGZhaWw7XG5cbiAgICBsZXQgbmVhcmJ5Tm9kZXMgPSB0aGlzLmdldE5vZGVzSW5BdHRyYWN0aW9uWm9uZShhdHRyYWN0b3IpO1xuICAgIGxldCByZWxhdGl2ZU5laWdoYm9ycyA9IFtdO1xuICAgIGxldCBhdHRyYWN0b3JUb1AwLCBhdHRyYWN0b3JUb1AxLCBwMFRvUDE7XG5cbiAgICAvLyBwMCBpcyBhIHJlbGF0aXZlIG5laWdoYm9yIG9mIGF1eGluUG9zIGlmZlxuICAgIC8vIGZvciBhbnkgcG9pbnQgcDEgdGhhdCBpcyBjbG9zZXIgdG8gYXV4aW5Qb3MgdGhhbiBpcyBwMCxcbiAgICAvLyBwMCBpcyBjbG9zZXIgdG8gYXV4aW5Qb3MgdGhhbiB0byBwMVxuICAgIGZvcihsZXQgcDAgb2YgbmVhcmJ5Tm9kZXMpIHtcbiAgICAgIGZhaWwgPSBmYWxzZTtcbiAgICAgIGF0dHJhY3RvclRvUDAgPSBwMC5wb3NpdGlvbi5zdWJ0cmFjdChhdHRyYWN0b3IucG9zaXRpb24sIHRydWUpO1xuXG4gICAgICBmb3IobGV0IHAxIG9mIG5lYXJieU5vZGVzKSB7XG4gICAgICAgIGlmKHAwID09PSBwMSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgYXR0cmFjdG9yVG9QMSA9IHAxLnBvc2l0aW9uLnN1YnRyYWN0KGF0dHJhY3Rvci5wb3NpdGlvbiwgdHJ1ZSk7XG5cbiAgICAgICAgaWYoYXR0cmFjdG9yVG9QMS5sZW5ndGgoKSA+IGF0dHJhY3RvclRvUDAubGVuZ3RoKCkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHAwVG9QMSA9IHAxLnBvc2l0aW9uLnN1YnRyYWN0KHAwLnBvc2l0aW9uLCB0cnVlKTtcblxuICAgICAgICBpZihhdHRyYWN0b3JUb1AwLmxlbmd0aCgpID4gcDBUb1AxLmxlbmd0aCgpKSB7XG4gICAgICAgICAgZmFpbCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYoIWZhaWwpIHtcbiAgICAgICAgcmVsYXRpdmVOZWlnaGJvcnMucHVzaChwMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbGF0aXZlTmVpZ2hib3JzO1xuICB9XG5cbiAgZ2V0Tm9kZXNJbkF0dHJhY3Rpb25ab25lKGF0dHJhY3Rvcikge1xuICAgIHJldHVybiB0aGlzLm5vZGVzSW5kZXgud2l0aGluKFxuICAgICAgYXR0cmFjdG9yLnBvc2l0aW9uLngsXG4gICAgICBhdHRyYWN0b3IucG9zaXRpb24ueSxcbiAgICAgIHRoaXMuc2V0dGluZ3MuQXR0cmFjdGlvbkRpc3RhbmNlXG4gICAgKS5tYXAoXG4gICAgICBpZCA9PiB0aGlzLm5vZGVzW2lkXVxuICAgICk7XG4gIH1cblxuICBnZXROb2Rlc0luS2lsbFpvbmUoYXR0cmFjdG9yKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZXNJbmRleC53aXRoaW4oXG4gICAgICBhdHRyYWN0b3IucG9zaXRpb24ueCxcbiAgICAgIGF0dHJhY3Rvci5wb3NpdGlvbi55LFxuICAgICAgdGhpcy5zZXR0aW5ncy5LaWxsRGlzdGFuY2VcbiAgICApLm1hcChcbiAgICAgIGlkID0+IHRoaXMubm9kZXNbaWRdXG4gICAgKTtcbiAgfVxuXG4gIGdldENsb3Nlc3ROb2RlKGF0dHJhY3RvciwgbmVhcmJ5Tm9kZXMpIHtcbiAgICBsZXQgY2xvc2VzdE5vZGUgPSBudWxsLFxuICAgICAgcmVjb3JkID0gdGhpcy5zZXR0aW5ncy5BdHRyYWN0aW9uRGlzdGFuY2U7XG5cbiAgICBmb3IobGV0IG5vZGUgb2YgbmVhcmJ5Tm9kZXMpIHtcbiAgICAgIGxldCBkaXN0YW5jZSA9IG5vZGUucG9zaXRpb24uZGlzdGFuY2UoYXR0cmFjdG9yLnBvc2l0aW9uKTtcblxuICAgICAgaWYoZGlzdGFuY2UgPCB0aGlzLnNldHRpbmdzLktpbGxEaXN0YW5jZSkge1xuICAgICAgICBhdHRyYWN0b3IucmVhY2hlZCA9IHRydWU7XG4gICAgICAgIGNsb3Nlc3ROb2RlID0gbnVsbDtcbiAgICAgIH0gZWxzZSBpZihkaXN0YW5jZSA8IHJlY29yZCkge1xuICAgICAgICBjbG9zZXN0Tm9kZSA9IG5vZGU7XG4gICAgICAgIHJlY29yZCA9IGRpc3RhbmNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjbG9zZXN0Tm9kZTtcbiAgfVxuXG4gIGdldEF2ZXJhZ2VEaXJlY3Rpb24obm9kZSwgbmVhcmJ5YXR0cmFjdG9ycykge1xuICAgIC8vIEFkZCB1cCBub3JtYWxpemVkIHZlY3RvcnMgcG9pbnRpbmcgdG8gZWFjaCBhdHRyYWN0b3JcbiAgICBsZXQgYXZlcmFnZURpcmVjdGlvbiA9IG5ldyBWZWMyKDAsMCk7XG5cbiAgICBmb3IobGV0IGF0dHJhY3RvciBvZiBuZWFyYnlhdHRyYWN0b3JzKSB7XG4gICAgICBhdmVyYWdlRGlyZWN0aW9uLmFkZChcbiAgICAgICAgYXR0cmFjdG9yLnBvc2l0aW9uLnN1YnRyYWN0KG5vZGUucG9zaXRpb24sIHRydWUpLm5vcm1hbGl6ZSgpXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEFkZCBzbWFsbCBhbW91bnQgb2YgcmFuZG9tIFwiaml0dGVyXCIgdG8gYXZvaWQgZ2V0dGluZyBzdHVjayBiZXR3ZWVuIHR3byBhdHRyYWN0b3JzIGFuZCBlbmRsZXNzbHkgZ2VuZXJhdGluZyBub2RlcyBpbiB0aGUgc2FtZSBwbGFjZVxuICAgIC8vIChDcmVkaXQgdG8gRGF2aWRlIFByYXRpIChlZGFwKSBmb3IgdGhlIGlkZWEsIHNlZW4gaW4gb2Z4U3BhY2VDb2xvbml6YXRpb24pXG4gICAgYXZlcmFnZURpcmVjdGlvbi5hZGQobmV3IFZlYzIocmFuZG9tKC0uMSwgLjEpLCByYW5kb20oLS4xLCAuMSkpKS5ub3JtYWxpemUoKTtcblxuICAgIGF2ZXJhZ2VEaXJlY3Rpb24uZGl2aWRlKG5vZGUuaW5mbHVlbmNlZEJ5Lmxlbmd0aCkubm9ybWFsaXplKCk7XG5cbiAgICByZXR1cm4gYXZlcmFnZURpcmVjdGlvbjtcbiAgfVxuXG4gIGFkZE5vZGUobm9kZSkge1xuICAgIGxldCBpc0luc2lkZUFueUJvdW5kcyA9IGZhbHNlO1xuICAgIGxldCBpc0luc2lkZUFueU9ic3RhY2xlID0gZmFsc2U7XG5cbiAgICAvLyBPbmx5IGFsbG93IHJvb3Qgbm9kZXMgaW5zaWRlIG9mIGRlZmluZWQgYm91bmRzXG4gICAgaWYodGhpcy5ib3VuZHMgIT0gdW5kZWZpbmVkICYmIHRoaXMuYm91bmRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvcihsZXQgYm91bmQgb2YgdGhpcy5ib3VuZHMpIHtcbiAgICAgICAgaWYoYm91bmQuY29udGFpbnMobm9kZS5wb3NpdGlvbi54LCBub2RlLnBvc2l0aW9uLnkpKSB7XG4gICAgICAgICAgaXNJbnNpZGVBbnlCb3VuZHMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRG9uJ3QgYWxsb3cgYW55IHJvb3Qgbm9kZXMgdGhhdCBhcmUgaW5zaWRlIG9mIGFuIG9ic3RhY2xlXG4gICAgaWYodGhpcy5vYnN0YWNsZXMgIT0gdW5kZWZpbmVkICYmIHRoaXMub2JzdGFjbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvcihsZXQgb2JzdGFjbGUgb2YgdGhpcy5vYnN0YWNsZXMpIHtcbiAgICAgICAgaWYob2JzdGFjbGUuY29udGFpbnMobm9kZS5wb3NpdGlvbi54LCBub2RlLnBvc2l0aW9uLnkpKSB7XG4gICAgICAgICAgaXNJbnNpZGVBbnlPYnN0YWNsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihcbiAgICAgIChpc0luc2lkZUFueUJvdW5kcyB8fCB0aGlzLmJvdW5kcy5sZW5ndGggPT09IDApICYmXG4gICAgICAoIWlzSW5zaWRlQW55T2JzdGFjbGUgfHwgdGhpcy5vYnN0YWNsZXMubGVuZ3RoID09PSAwKVxuICAgICkge1xuICAgICAgdGhpcy5ub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgdGhpcy5idWlsZFNwYXRpYWxJbmRpY2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5ub2RlcyA9IFtdO1xuICAgIHRoaXMuYXR0cmFjdG9ycyA9IFtdO1xuXG4gICAgdGhpcy5idWlsZFNwYXRpYWxJbmRpY2VzKCk7XG4gIH1cblxuICBidWlsZFNwYXRpYWxJbmRpY2VzKCkge1xuICAgIHRoaXMubm9kZXNJbmRleCA9IG5ldyBLREJ1c2godGhpcy5ub2RlcywgcCA9PiBwLnBvc2l0aW9uLngsIHAgPT4gcC5wb3NpdGlvbi55KTtcbiAgfVxuXG4gIHRvZ2dsZU5vZGVzKCkge1xuICAgIHRoaXMuc2V0dGluZ3MuU2hvd05vZGVzID0gIXRoaXMuc2V0dGluZ3MuU2hvd05vZGVzO1xuICB9XG5cbiAgdG9nZ2xlVGlwcygpIHtcbiAgICB0aGlzLnNldHRpbmdzLlNob3dUaXBzID0gIXRoaXMuc2V0dGluZ3MuU2hvd1RpcHM7XG5cbiAgICBmb3IobGV0IG5vZGUgb2YgdGhpcy5ub2Rlcykge1xuICAgICAgbm9kZS5zZXR0aW5ncy5TaG93VGlwcyA9ICFub2RlLnNldHRpbmdzLlNob3dUaXBzO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZWF0dHJhY3RvcnMoKSB7XG4gICAgdGhpcy5zZXR0aW5ncy5TaG93YXR0cmFjdG9ycyA9ICF0aGlzLnNldHRpbmdzLlNob3dhdHRyYWN0b3JzO1xuXG4gICAgZm9yKGxldCBhdHRyYWN0b3Igb2YgdGhpcy5hdHRyYWN0b3JzKSB7XG4gICAgICBhdHRyYWN0b3Iuc2V0dGluZ3MuU2hvd2F0dHJhY3RvcnMgPSAhYXR0cmFjdG9yLnNldHRpbmdzLlNob3dhdHRyYWN0b3JzO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZUF0dHJhY3Rpb25ab25lcygpIHtcbiAgICB0aGlzLnNldHRpbmdzLlNob3dBdHRyYWN0aW9uWm9uZXMgPSAhdGhpcy5zZXR0aW5ncy5TaG93QXR0cmFjdGlvblpvbmVzO1xuXG4gICAgZm9yKGxldCBhdHRyYWN0b3Igb2YgdGhpcy5hdHRyYWN0b3JzKSB7XG4gICAgICBhdHRyYWN0b3Iuc2V0dGluZ3MuU2hvd0F0dHJhY3Rpb25ab25lcyA9ICFhdHRyYWN0b3Iuc2V0dGluZ3MuU2hvd0F0dHJhY3Rpb25ab25lcztcbiAgICB9XG4gIH1cblxuICB0b2dnbGVLaWxsWm9uZXMoKSB7XG4gICAgdGhpcy5zZXR0aW5ncy5TaG93S2lsbFpvbmVzID0gIXRoaXMuc2V0dGluZ3MuU2hvd0tpbGxab25lcztcblxuICAgIGZvcihsZXQgYXR0cmFjdG9yIG9mIHRoaXMuYXR0cmFjdG9ycykge1xuICAgICAgYXR0cmFjdG9yLnNldHRpbmdzLlNob3dLaWxsWm9uZXMgPSAhYXR0cmFjdG9yLnNldHRpbmdzLlNob3dLaWxsWm9uZXM7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlSW5mbHVlbmNlTGluZXMoKSB7XG4gICAgdGhpcy5zZXR0aW5ncy5TaG93SW5mbHVlbmNlTGluZXMgPSAhdGhpcy5zZXR0aW5ncy5TaG93SW5mbHVlbmNlTGluZXM7XG4gIH1cblxuICB0b2dnbGVCb3VuZHMoKSB7XG4gICAgdGhpcy5zZXR0aW5ncy5TaG93Qm91bmRzID0gIXRoaXMuc2V0dGluZ3MuU2hvd0JvdW5kcztcbiAgfVxuXG4gIHRvZ2dsZU9ic3RhY2xlcygpIHtcbiAgICB0aGlzLnNldHRpbmdzLlNob3dPYnN0YWNsZXMgPSAhdGhpcy5zZXR0aW5ncy5TaG93T2JzdGFjbGVzO1xuICB9XG5cbiAgdG9nZ2xlQ2FuYWxpemF0aW9uKCkge1xuICAgIHRoaXMuc2V0dGluZ3MuRW5hYmxlQ2FuYWxpemF0aW9uID0gIXRoaXMuc2V0dGluZ3MuRW5hYmxlQ2FuYWxpemF0aW9uO1xuXG4gICAgaWYoIXRoaXMuc2V0dGluZ3MuRW5hYmxlQ2FuYWxpemF0aW9uKSB7XG4gICAgICBmb3IobGV0IG5vZGUgb2YgdGhpcy5ub2Rlcykge1xuICAgICAgICBub2RlLnRoaWNrbmVzcyA9IDA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlT3BhY2l0eUJsZW5kaW5nKCkge1xuICAgIHRoaXMuc2V0dGluZ3MuRW5hYmxlT3BhY2l0eUJsZW5kaW5nID0gIXRoaXMuc2V0dGluZ3MuRW5hYmxlT3BhY2l0eUJsZW5kaW5nO1xuXG4gICAgZm9yKGxldCBub2RlIG9mIHRoaXMubm9kZXMpIHtcbiAgICAgIG5vZGUuc2V0dGluZ3MuRW5hYmxlT3BhY2l0eUJsZW5kaW5nID0gdGhpcy5zZXR0aW5ncy5FbmFibGVPcGFjaXR5QmxlbmRpbmc7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlUGF1c2UoKSB7XG4gICAgdGhpcy5zZXR0aW5ncy5Jc1BhdXNlZCA9ICF0aGlzLnNldHRpbmdzLklzUGF1c2VkO1xuICB9XG59IiwiaW1wb3J0IERlZmF1bHRzIGZyb20gJy4vRGVmYXVsdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb2RlIHtcbiAgY29uc3RydWN0b3IocGFyZW50LCBwb3NpdGlvbiwgaXNUaXAsIGN0eCwgc2V0dGluZ3MsIGNvbG9yID0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7ICAgICAgIC8vIHJlZmVyZW5jZSB0byBwYXJlbnQgbm9kZSwgbmVjZXNzYXJ5IGZvciB2ZWluIHRoaWNrZW5pbmcgbGF0ZXJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247ICAgLy8ge3ZlYzJ9IG9mIHRoaXMgbm9kZSdzIHBvc2l0aW9uXG4gICAgdGhpcy5pc1RpcCA9IGlzVGlwOyAgICAgICAgIC8vIHtib29sZWFufVxuICAgIHRoaXMuY3R4ID0gY3R4OyAgICAgICAgICAgICAvLyBnbG9iYWwgY2FudmFzIGNvbnRleHQgZm9yIGRyYXdpbmdcbiAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdHMsIHNldHRpbmdzKTtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7ICAgICAgICAgLy8gY29sb3IsIHVzdWFsbHkgcGFzc2VkIGRvd24gZnJvbSBwYXJlbnRcblxuICAgIHRoaXMuaW5mbHVlbmNlZEJ5ID0gW107ICAgICAvLyByZWZlcmVuY2VzIHRvIGFsbCBBdHRyYWN0b3JzIGluZmx1ZW5jaW5nIHRoaXMgbm9kZSBlYWNoIGZyYW1lXG4gICAgdGhpcy50aGlja25lc3MgPSAwOyAgICAgICAgIC8vIHRoaWNrbmVzcyAtIHRoaXMgaXMgaW5jcmVhc2VkIGR1cmluZyB2ZWluIHRoaWNrZW5pbmcgcHJvY2Vzc1xuICB9XG5cbiAgZHJhdygpIHtcbiAgICBpZih0aGlzLnBhcmVudCAhPSBudWxsKSB7XG4gICAgICAvLyBTbW9vdGhseSByYW1wIHVwIG9wYWNpdHkgYmFzZWQgb24gdmVpbiB0aGlja25lc3NcbiAgICAgIGlmKHRoaXMuc2V0dGluZ3MuRW5hYmxlT3BhY2l0eUJsZW5kaW5nKSB7XG4gICAgICAgIHRoaXMuY3R4Lmdsb2JhbEFscGhhID0gdGhpcy50aGlja25lc3MgLyAzICsgLjI7XG4gICAgICB9XG5cbiAgICAgIC8vIFwiTGluZXNcIiByZW5kZXIgbW9kZVxuICAgICAgaWYodGhpcy5zZXR0aW5ncy5SZW5kZXJNb2RlID09ICdMaW5lcycpIHtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSk7XG4gICAgICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLnBhcmVudC5wb3NpdGlvbi54LCB0aGlzLnBhcmVudC5wb3NpdGlvbi55KTtcblxuICAgICAgICBpZih0aGlzLmlzVGlwICYmIHRoaXMuc2V0dGluZ3MuU2hvd1RpcHMpIHtcbiAgICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMuc2V0dGluZ3MuQ29sb3JzLlRpcENvbG9yO1xuICAgICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IHRoaXMuc2V0dGluZ3MuVGlwVGhpY2tuZXNzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmKHRoaXMuY29sb3IgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5zZXR0aW5ncy5Db2xvcnMuQnJhbmNoQ29sb3I7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gdGhpcy5zZXR0aW5ncy5CcmFuY2hUaGlja25lc3MgKyB0aGlzLnRoaWNrbmVzcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAxO1xuXG4gICAgICAvLyBcIkRvdHNcIiByZW5kZXIgbW9kZVxuICAgICAgfSBlbHNlIGlmKHRoaXMuc2V0dGluZ3MuUmVuZGVyTW9kZSA9PSAnRG90cycpIHtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmVsbGlwc2UoXG4gICAgICAgICAgdGhpcy5wb3NpdGlvbi54LFxuICAgICAgICAgIHRoaXMucG9zaXRpb24ueSxcbiAgICAgICAgICAxICsgdGhpcy50aGlja25lc3MgLyAyLFxuICAgICAgICAgIDEgKyB0aGlzLnRoaWNrbmVzcyAvIDIsXG4gICAgICAgICAgMCxcbiAgICAgICAgICAwLFxuICAgICAgICAgIE1hdGguUEkgKiAyXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gQ2hhbmdlIGNvbG9yIG9yIFwidGlwXCIgbm9kZXNcbiAgICAgICAgaWYodGhpcy5pc1RpcCAmJiB0aGlzLnNldHRpbmdzLlNob3dUaXBzKSB7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5zZXR0aW5ncy5Db2xvcnMuVGlwQ29sb3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5zZXR0aW5ncy5Db2xvcnMuQnJhbmNoQ29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN0eC5maWxsKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlc2V0IGdsb2JhbCBvcGFjaXR5IGlmIGl0IHdhcyBjaGFuZ2VkIGR1ZSB0byBvcGFjaXR5IGdyYWRpZW50IGZsYWdcbiAgICAgIGlmKHRoaXMuc2V0dGluZ3MuRW5hYmxlT3BhY2l0eUJsZW5kaW5nKSB7XG4gICAgICAgIHRoaXMuY3R4Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDcmVhdGUgYSBuZXcgbm9kZSBpbiB0aGUgcHJvdmlkZWQgZGlyZWN0aW9uIGFuZCBhIHByZS1kZWZpbmVkIGRpc3RhbmNlIChTZWdtZW50TGVuZ3RoKVxuICBnZXROZXh0Tm9kZShhdmVyYWdlQXR0cmFjdG9yRGlyZWN0aW9uKSB7XG4gICAgdGhpcy5pc1RpcCA9IGZhbHNlO1xuICAgIHRoaXMubmV4dFBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5hZGQoYXZlcmFnZUF0dHJhY3RvckRpcmVjdGlvbi5tdWx0aXBseSh0aGlzLnNldHRpbmdzLlNlZ21lbnRMZW5ndGgpLCB0cnVlKTtcblxuICAgIHJldHVybiBuZXcgTm9kZShcbiAgICAgIHRoaXMsXG4gICAgICB0aGlzLm5leHRQb3NpdGlvbixcbiAgICAgIHRydWUsXG4gICAgICB0aGlzLmN0eCxcbiAgICAgIHRoaXMuc2V0dGluZ3MsXG4gICAgICB0aGlzLmNvbG9yXG4gICAgKTtcbiAgfVxufSIsImltcG9ydCB7IHNhdmVBcyB9IGZyb20gJ2ZpbGUtc2F2ZXInO1xuaW1wb3J0IHsgdG9QYXRoIH0gZnJvbSAnc3ZnLXBvaW50cyc7XG5cbi8vIHJhbmRvbSgpLCBzaW1pbGFyIHRvIFByb2Nlc3Npbmcnc1xuLy8gSWYgdHdvIHBhcmFtZXRlcnMgYXJlIHBhc3NlZCwgdGhleSBhcmUgaW50ZXJwcmV0ZWQgYXMgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gb2YgdGhlIGRlc2lyZWQgcmFuZ2Vcbi8vIElmIG9ubHkgb25lIHBhcmFtZXRlciBpcyBwYXNzZWQsIGl0IGlzIGludGVycHJldGVkIGFzIHRoZSBtYXhpbXVtLCB3aGlsZSB6ZXJvIGlzIHVzZWQgYXMgdGhlIG1pbmltdW1cbmV4cG9ydCBmdW5jdGlvbiByYW5kb20obWluLCBtYXgpIHtcbiAgaWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbWF4ID0gbWluO1xuICAgIG1pbiA9IDA7XG4gIH1cblxuICBpZiAodHlwZW9mIG1pbiAhPT0gJ251bWJlcicgfHwgdHlwZW9mIG1heCAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhbGwgYXJndW1lbnRzIHRvIGJlIG51bWJlcnMnKTtcbiAgfVxuXG4gIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG59XG5cbi8vIENvbnZlcnRzIGEgbnVtYmVyIGZyb20gb25lIHJhbmdlIHRvIGFub3RoZXJcbmV4cG9ydCBmdW5jdGlvbiBtYXAodmFsdWUsIG9yaWdpbmFsTG93ZXIsIG9yaWdpbmFsVXBwZXIsIG5ld0xvd2VyLCBuZXdVcHBlcikge1xuICByZXR1cm4gbmV3TG93ZXIgKyAobmV3VXBwZXIgLSBuZXdMb3dlcikgKiAoKHZhbHVlIC0gb3JpZ2luYWxMb3dlcikgLyAob3JpZ2luYWxVcHBlciAtIG9yaWdpbmFsTG93ZXIpKTtcbn1cblxuLy8gUmV0dXJucyBhbiBhcnJheSBvZiBwb2ludCBjb29yZGluYXRlcyAoYWxzbyBhcnJheXMsIHdpdGggdHdvIGVudHJpZXMpIGZvciBwb2ludHMgYXJyYW5nZWQgaW4gYSBjaXJjbGVcbmV4cG9ydCBmdW5jdGlvbiBnZXRDaXJjbGVPZlBvaW50cyhjeCwgY3ksIHJhZGl1cywgcmVzb2x1dGlvbikge1xuICBsZXQgYW5nbGUsIHgsIHk7XG4gIGxldCBwb2ludHMgPSBbXTtcblxuICBmb3IobGV0IGkgPSAwOyBpIDwgcmVzb2x1dGlvbjsgaSsrKSB7XG4gICAgYW5nbGUgPSAyICogTWF0aC5QSSAqIGkgLyByZXNvbHV0aW9uO1xuICAgIHggPSBjeCArIE1hdGguZmxvb3IocmFkaXVzICogTWF0aC5jb3MoYW5nbGUpKTtcbiAgICB5ID0gY3kgKyBNYXRoLmZsb29yKHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlKSk7XG5cbiAgICBwb2ludHMucHVzaChbeCwgeV0pO1xuICB9XG5cbiAgcmV0dXJuIHBvaW50cztcbn1cblxuLy8gQ3JlYXRlcyBhbiBTVkcgZG9jdW1lbnQgY29udGFpbmluZyBhbGwgb2YgdGhlIHZpc2libGUgZ2VvbWV0cnksIHRoZW4gcHVzaGVzIGl0IHRvIHRoZSBjbGllbnRcbi8vIC0gVHJpZ2dlcmVkIGJ5IHByZXNzaW5nIGBlYCBpbiBhbnkgc2tldGNoLiBTZWUgS2V5Ym9hcmRJbnRlcmFjdGlvbnMuanMgZm9yIGRlZmluaXRpb25cbmV4cG9ydCBmdW5jdGlvbiBleHBvcnRTVkcobmV0d29yaykge1xuICAvLyBTZXQgdXAgPHN2Zz4gZWxlbWVudFxuICBsZXQgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKTtcbiAgc3ZnLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3htbG5zLycsICd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xuICBzdmcuc2V0QXR0cmlidXRlTlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvJywgJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcbiAgc3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aW5kb3cuaW5uZXJXaWR0aCk7XG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwICcgKyB3aW5kb3cuaW5uZXJXaWR0aCArICcgJyArIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgLy8gQ3JlYXRlIDxsaW5lPnMgZm9yIGVhY2ggYnJhbmNoIHNlZ21lbnRcbiAgaWYobmV0d29yay5zZXR0aW5ncy5TaG93QnJhbmNoZXMpIHtcbiAgICBsZXQgbm9kZUxpbmVzR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2cnKTtcblxuICAgIGZvcihsZXQgbm9kZSBvZiBuZXR3b3JrLm5vZGVzKSB7XG4gICAgICBpZihub2RlLnBhcmVudCAhPSBudWxsKSB7XG4gICAgICAgIGxldCBsaW5lTm9kZSA9IGBcbiAgICAgICAgICA8bGluZVxuICAgICAgICAgICAgeDE9XCIke25vZGUucGFyZW50LnBvc2l0aW9uLnh9XCJcbiAgICAgICAgICAgIHkxPVwiJHtub2RlLnBhcmVudC5wb3NpdGlvbi55fVwiXG4gICAgICAgICAgICB4Mj1cIiR7bm9kZS5wb3NpdGlvbi54fVwiXG4gICAgICAgICAgICB5Mj1cIiR7bm9kZS5wb3NpdGlvbi55fVwiXG4gICAgICAgICAgICBzdHJva2U9XCJibGFja1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgYDtcblxuICAgICAgICBub2RlTGluZXNHcm91cC5pbm5lckhUTUwgKz0gbGluZU5vZGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3ZnLmFwcGVuZENoaWxkKG5vZGVMaW5lc0dyb3VwKTtcbiAgfVxuXG4gIC8vIENyZWF0ZSA8cGF0aD5zIGZvciBib3VuZHNcbiAgaWYobmV0d29yay5zZXR0aW5ncy5TaG93Qm91bmRzKSB7XG4gICAgaWYobmV0d29yay5ib3VuZHMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IGJvdW5kc0dyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdnJyk7XG5cbiAgICAgIGZvcihsZXQgYm91bmQgb2YgbmV0d29yay5ib3VuZHMpIHtcbiAgICAgICAgYm91bmRzR3JvdXAuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgZ2V0UGF0aEVsRnJvbVBvaW50cyhib3VuZC5wb2x5Z29uKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBzdmcuYXBwZW5kQ2hpbGQoYm91bmRzR3JvdXApO1xuICAgIH1cbiAgfVxuXG4gIC8vIENyZWF0ZSA8cGF0aD5zIGZvciBvYnN0YWNsZXNcbiAgaWYobmV0d29yay5zZXR0aW5ncy5TaG93T2JzdGFjbGVzKSB7XG4gICAgaWYobmV0d29yay5vYnN0YWNsZXMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IG9ic3RhY2xlc0dyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdnJyk7XG5cbiAgICAgIGZvcihsZXQgb2JzdGFjbGUgb2YgbmV0d29yay5vYnN0YWNsZXMpIHtcbiAgICAgICAgb2JzdGFjbGVzR3JvdXAuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgZ2V0UGF0aEVsRnJvbVBvaW50cyhvYnN0YWNsZS5wb2x5Z29uKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBzdmcuYXBwZW5kQ2hpbGQob2JzdGFjbGVzR3JvdXApO1xuICAgIH1cbiAgfVxuXG4gIC8vIEdlbmVyYXRlIHRoZSBkb2N1bWVudCBhcyBhIEJsb2IgYW5kIGZvcmNlIGEgZG93bmxvYWQgYXMgYSB0aW1lc3RhbXBlZCAuc3ZnIGZpbGVcbiAgY29uc3Qgc3ZnRG9jdHlwZSA9ICc8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJVVEYtOFwiIHN0YW5kYWxvbmU9XCJub1wiPz4nO1xuICBjb25zdCBzZXJpYWxpemVkU3ZnID0gKG5ldyBYTUxTZXJpYWxpemVyKCkpLnNlcmlhbGl6ZVRvU3RyaW5nKHN2Zyk7XG4gIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbc3ZnRG9jdHlwZSwgc2VyaWFsaXplZFN2Z10sIHsgdHlwZTogJ2ltYWdlL3N2Zyt4bWw7JyB9KVxuICBzYXZlQXMoYmxvYiwgJ3ZlbmF0aW9uLScgKyBEYXRlLm5vdygpICsgJy5zdmcnKTtcbn1cblxuICAvLyBDcmVhdGUgYSA8cGF0aD4gZWxlbWVudCB3aXRoIGEgcHJvcGVybHktZm9ybWF0dGVkIGBkYCBhdHRyaWJ1dGUgY29udGFpbmluZyBhbGwgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBwYXNzZWQgcG9pbnRzXG4gIGZ1bmN0aW9uIGdldFBhdGhFbEZyb21Qb2ludHMocG9pbnRzKSB7XG4gICAgbGV0IHBvaW50c1N0cmluZyA9ICcnO1xuXG4gICAgZm9yKGxldCBbaW5kZXgsIHBvaW50XSBvZiBwb2ludHMuZW50cmllcygpKSB7XG4gICAgICBwb2ludHNTdHJpbmcgKz0gcG9pbnRbMF0gKyAnLCcgKyBwb2ludFsxXTtcblxuICAgICAgaWYoaW5kZXggPCBwb2ludHMubGVuZ3RoIC0gMSkge1xuICAgICAgICBwb2ludHNTdHJpbmcgKz0gJyAnO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBjbG9zZXBhdGggY29tbWFuZCB0byBhdXRvbWF0aWNhbGx5IGRyYXcgbGluZSBiYWNrIHRvIGluaXRpYWwgcG9pbnRcbiAgICBwb2ludHNTdHJpbmcgKz0gJyAnICsgcG9pbnRzWzBdWzBdICsgJywnICsgcG9pbnRzWzBdWzFdO1xuXG4gICAgbGV0IGQgPSB0b1BhdGgoe1xuICAgICAgdHlwZTogJ3BvbHlsaW5lJyxcbiAgICAgIHBvaW50czogcG9pbnRzU3RyaW5nXG4gICAgfSk7XG5cbiAgICBsZXQgcGF0aEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdwYXRoJyk7XG4gICAgcGF0aEVsLnNldEF0dHJpYnV0ZSgnZCcsIGQpO1xuICAgIHBhdGhFbC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2ZpbGw6IG5vbmU7IHN0cm9rZTogYmxhY2s7IHN0cm9rZS13aWR0aDogMScpO1xuXG4gICAgcmV0dXJuIHBhdGhFbDtcbiAgfSIsImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAgU2ltdWxhdGlvbiBjb25maWd1cmF0aW9uc1xuICAqL1xuICBWZW5hdGlvblR5cGU6ICdPcGVuJyxcbiAgU2VnbWVudExlbmd0aDogNSxcbiAgQXR0cmFjdGlvbkRpc3RhbmNlOiAzMCxcbiAgS2lsbERpc3RhbmNlOiA1LFxuICBJc1BhdXNlZDogZmFsc2UsXG4gIEVuYWJsZUNhbmFsaXphdGlvbjogdHJ1ZSxcbiAgRW5hYmxlT3BhY2l0eUJsZW5kaW5nOiBmYWxzZSxcblxuICAvKipcbiAgICBSZW5kZXJpbmcgY29uZmlndXJhdGlvbnNcbiAgKi9cbiAgU2hvd0F0dHJhY3RvcnM6IGZhbHNlLFxuICBTaG93Tm9kZXM6IHRydWUsXG4gIFNob3dUaXBzOiBmYWxzZSxcbiAgU2hvd0F0dHJhY3Rpb25ab25lczogZmFsc2UsXG4gIFNob3dLaWxsWm9uZXM6IGZhbHNlLFxuICBTaG93SW5mbHVlbmNlTGluZXM6IGZhbHNlLFxuICBTaG93Qm91bmRzOiB0cnVlLFxuICBTaG93T2JzdGFjbGVzOiBmYWxzZSxcbiAgUmVuZGVyTW9kZTogJ0xpbmVzJyxcblxuICAvLyBDb2xvcnNcbiAgQ29sb3JzRGF5OiB7XG4gICAgQmFja2dyb3VuZENvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAxKScsIC8vIEJpYW5jb1xuICAgIEJyYW5jaENvbG9yOiAncmdiYSgwLCAwLCAwLCAxKScsICAgICAgICAgICAvLyBOZXJvXG4gIH0sXG4gIENvbG9yc05pZ2h0OiB7XG4gICAgQmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAxKScsICAgICAgIC8vIE5lcm9cbiAgICBCcmFuY2hDb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMSknLCAgICAgLy8gQmlhbmNvXG4gIH0sXG5cbiAgLy8gTGluZSB0aGlja25lc3Nlc1xuICBCcmFuY2hUaGlja25lc3M6IDEsXG4gIFRpcFRoaWNrbmVzczogMixcbiAgQm91bmRzQm9yZGVyVGhpY2tuZXNzOiAxLFxufTtcbiIsIihmdW5jdGlvbihhLGIpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sYik7ZWxzZSBpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cyliKCk7ZWxzZXtiKCksYS5GaWxlU2F2ZXI9e2V4cG9ydHM6e319LmV4cG9ydHN9fSkodGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYSxiKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgYj9iPXthdXRvQm9tOiExfTpcIm9iamVjdFwiIT10eXBlb2YgYiYmKGNvbnNvbGUud2FybihcIkRlcHJlY2F0ZWQ6IEV4cGVjdGVkIHRoaXJkIGFyZ3VtZW50IHRvIGJlIGEgb2JqZWN0XCIpLGI9e2F1dG9Cb206IWJ9KSxiLmF1dG9Cb20mJi9eXFxzKig/OnRleHRcXC9cXFMqfGFwcGxpY2F0aW9uXFwveG1sfFxcUypcXC9cXFMqXFwreG1sKVxccyo7LipjaGFyc2V0XFxzKj1cXHMqdXRmLTgvaS50ZXN0KGEudHlwZSk/bmV3IEJsb2IoW1wiXFx1RkVGRlwiLGFdLHt0eXBlOmEudHlwZX0pOmF9ZnVuY3Rpb24gYyhhLGIsYyl7dmFyIGQ9bmV3IFhNTEh0dHBSZXF1ZXN0O2Qub3BlbihcIkdFVFwiLGEpLGQucmVzcG9uc2VUeXBlPVwiYmxvYlwiLGQub25sb2FkPWZ1bmN0aW9uKCl7ZyhkLnJlc3BvbnNlLGIsYyl9LGQub25lcnJvcj1mdW5jdGlvbigpe2NvbnNvbGUuZXJyb3IoXCJjb3VsZCBub3QgZG93bmxvYWQgZmlsZVwiKX0sZC5zZW5kKCl9ZnVuY3Rpb24gZChhKXt2YXIgYj1uZXcgWE1MSHR0cFJlcXVlc3Q7Yi5vcGVuKFwiSEVBRFwiLGEsITEpO3RyeXtiLnNlbmQoKX1jYXRjaChhKXt9cmV0dXJuIDIwMDw9Yi5zdGF0dXMmJjI5OT49Yi5zdGF0dXN9ZnVuY3Rpb24gZShhKXt0cnl7YS5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIikpfWNhdGNoKGMpe3ZhciBiPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudHNcIik7Yi5pbml0TW91c2VFdmVudChcImNsaWNrXCIsITAsITAsd2luZG93LDAsMCwwLDgwLDIwLCExLCExLCExLCExLDAsbnVsbCksYS5kaXNwYXRjaEV2ZW50KGIpfX12YXIgZj1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93JiZ3aW5kb3cud2luZG93PT09d2luZG93P3dpbmRvdzpcIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZj9zZWxmOlwib2JqZWN0XCI9PXR5cGVvZiBnbG9iYWwmJmdsb2JhbC5nbG9iYWw9PT1nbG9iYWw/Z2xvYmFsOnZvaWQgMCxhPWYubmF2aWdhdG9yJiYvTWFjaW50b3NoLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpJiYvQXBwbGVXZWJLaXQvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkmJiEvU2FmYXJpLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLGc9Zi5zYXZlQXN8fChcIm9iamVjdFwiIT10eXBlb2Ygd2luZG93fHx3aW5kb3chPT1mP2Z1bmN0aW9uKCl7fTpcImRvd25sb2FkXCJpbiBIVE1MQW5jaG9yRWxlbWVudC5wcm90b3R5cGUmJiFhP2Z1bmN0aW9uKGIsZyxoKXt2YXIgaT1mLlVSTHx8Zi53ZWJraXRVUkwsaj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtnPWd8fGIubmFtZXx8XCJkb3dubG9hZFwiLGouZG93bmxvYWQ9ZyxqLnJlbD1cIm5vb3BlbmVyXCIsXCJzdHJpbmdcIj09dHlwZW9mIGI/KGouaHJlZj1iLGoub3JpZ2luPT09bG9jYXRpb24ub3JpZ2luP2Uoaik6ZChqLmhyZWYpP2MoYixnLGgpOmUoaixqLnRhcmdldD1cIl9ibGFua1wiKSk6KGouaHJlZj1pLmNyZWF0ZU9iamVjdFVSTChiKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aS5yZXZva2VPYmplY3RVUkwoai5ocmVmKX0sNEU0KSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShqKX0sMCkpfTpcIm1zU2F2ZU9yT3BlbkJsb2JcImluIG5hdmlnYXRvcj9mdW5jdGlvbihmLGcsaCl7aWYoZz1nfHxmLm5hbWV8fFwiZG93bmxvYWRcIixcInN0cmluZ1wiIT10eXBlb2YgZiluYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYihiKGYsaCksZyk7ZWxzZSBpZihkKGYpKWMoZixnLGgpO2Vsc2V7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7aS5ocmVmPWYsaS50YXJnZXQ9XCJfYmxhbmtcIixzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShpKX0pfX06ZnVuY3Rpb24oYixkLGUsZyl7aWYoZz1nfHxvcGVuKFwiXCIsXCJfYmxhbmtcIiksZyYmKGcuZG9jdW1lbnQudGl0bGU9Zy5kb2N1bWVudC5ib2R5LmlubmVyVGV4dD1cImRvd25sb2FkaW5nLi4uXCIpLFwic3RyaW5nXCI9PXR5cGVvZiBiKXJldHVybiBjKGIsZCxlKTt2YXIgaD1cImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiPT09Yi50eXBlLGk9L2NvbnN0cnVjdG9yL2kudGVzdChmLkhUTUxFbGVtZW50KXx8Zi5zYWZhcmksaj0vQ3JpT1NcXC9bXFxkXSsvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7aWYoKGp8fGgmJml8fGEpJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgRmlsZVJlYWRlcil7dmFyIGs9bmV3IEZpbGVSZWFkZXI7ay5vbmxvYWRlbmQ9ZnVuY3Rpb24oKXt2YXIgYT1rLnJlc3VsdDthPWo/YTphLnJlcGxhY2UoL15kYXRhOlteO10qOy8sXCJkYXRhOmF0dGFjaG1lbnQvZmlsZTtcIiksZz9nLmxvY2F0aW9uLmhyZWY9YTpsb2NhdGlvbj1hLGc9bnVsbH0say5yZWFkQXNEYXRhVVJMKGIpfWVsc2V7dmFyIGw9Zi5VUkx8fGYud2Via2l0VVJMLG09bC5jcmVhdGVPYmplY3RVUkwoYik7Zz9nLmxvY2F0aW9uPW06bG9jYXRpb24uaHJlZj1tLGc9bnVsbCxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bC5yZXZva2VPYmplY3RVUkwobSl9LDRFNCl9fSk7Zi5zYXZlQXM9Zy5zYXZlQXM9ZyxcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYobW9kdWxlLmV4cG9ydHM9Zyl9KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RmlsZVNhdmVyLm1pbi5qcy5tYXAiLCJcbmltcG9ydCBzb3J0IGZyb20gJy4vc29ydCc7XG5pbXBvcnQgcmFuZ2UgZnJvbSAnLi9yYW5nZSc7XG5pbXBvcnQgd2l0aGluIGZyb20gJy4vd2l0aGluJztcblxuY29uc3QgZGVmYXVsdEdldFggPSBwID0+IHBbMF07XG5jb25zdCBkZWZhdWx0R2V0WSA9IHAgPT4gcFsxXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS0RCdXNoIHtcbiAgICBjb25zdHJ1Y3Rvcihwb2ludHMsIGdldFggPSBkZWZhdWx0R2V0WCwgZ2V0WSA9IGRlZmF1bHRHZXRZLCBub2RlU2l6ZSA9IDY0LCBBcnJheVR5cGUgPSBGbG9hdDY0QXJyYXkpIHtcbiAgICAgICAgdGhpcy5ub2RlU2l6ZSA9IG5vZGVTaXplO1xuICAgICAgICB0aGlzLnBvaW50cyA9IHBvaW50cztcblxuICAgICAgICBjb25zdCBJbmRleEFycmF5VHlwZSA9IHBvaW50cy5sZW5ndGggPCA2NTUzNiA/IFVpbnQxNkFycmF5IDogVWludDMyQXJyYXk7XG5cbiAgICAgICAgY29uc3QgaWRzID0gdGhpcy5pZHMgPSBuZXcgSW5kZXhBcnJheVR5cGUocG9pbnRzLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IHRoaXMuY29vcmRzID0gbmV3IEFycmF5VHlwZShwb2ludHMubGVuZ3RoICogMik7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlkc1tpXSA9IGk7XG4gICAgICAgICAgICBjb29yZHNbMiAqIGldID0gZ2V0WChwb2ludHNbaV0pO1xuICAgICAgICAgICAgY29vcmRzWzIgKiBpICsgMV0gPSBnZXRZKHBvaW50c1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICBzb3J0KGlkcywgY29vcmRzLCBub2RlU2l6ZSwgMCwgaWRzLmxlbmd0aCAtIDEsIDApO1xuICAgIH1cblxuICAgIHJhbmdlKG1pblgsIG1pblksIG1heFgsIG1heFkpIHtcbiAgICAgICAgcmV0dXJuIHJhbmdlKHRoaXMuaWRzLCB0aGlzLmNvb3JkcywgbWluWCwgbWluWSwgbWF4WCwgbWF4WSwgdGhpcy5ub2RlU2l6ZSk7XG4gICAgfVxuXG4gICAgd2l0aGluKHgsIHksIHIpIHtcbiAgICAgICAgcmV0dXJuIHdpdGhpbih0aGlzLmlkcywgdGhpcy5jb29yZHMsIHgsIHksIHIsIHRoaXMubm9kZVNpemUpO1xuICAgIH1cbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFuZ2UoaWRzLCBjb29yZHMsIG1pblgsIG1pblksIG1heFgsIG1heFksIG5vZGVTaXplKSB7XG4gICAgY29uc3Qgc3RhY2sgPSBbMCwgaWRzLmxlbmd0aCAtIDEsIDBdO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGxldCB4LCB5O1xuXG4gICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBheGlzID0gc3RhY2sucG9wKCk7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gc3RhY2sucG9wKCk7XG4gICAgICAgIGNvbnN0IGxlZnQgPSBzdGFjay5wb3AoKTtcblxuICAgICAgICBpZiAocmlnaHQgLSBsZWZ0IDw9IG5vZGVTaXplKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gbGVmdDsgaSA8PSByaWdodDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgeCA9IGNvb3Jkc1syICogaV07XG4gICAgICAgICAgICAgICAgeSA9IGNvb3Jkc1syICogaSArIDFdO1xuICAgICAgICAgICAgICAgIGlmICh4ID49IG1pblggJiYgeCA8PSBtYXhYICYmIHkgPj0gbWluWSAmJiB5IDw9IG1heFkpIHJlc3VsdC5wdXNoKGlkc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG0gPSBNYXRoLmZsb29yKChsZWZ0ICsgcmlnaHQpIC8gMik7XG5cbiAgICAgICAgeCA9IGNvb3Jkc1syICogbV07XG4gICAgICAgIHkgPSBjb29yZHNbMiAqIG0gKyAxXTtcblxuICAgICAgICBpZiAoeCA+PSBtaW5YICYmIHggPD0gbWF4WCAmJiB5ID49IG1pblkgJiYgeSA8PSBtYXhZKSByZXN1bHQucHVzaChpZHNbbV0pO1xuXG4gICAgICAgIGNvbnN0IG5leHRBeGlzID0gKGF4aXMgKyAxKSAlIDI7XG5cbiAgICAgICAgaWYgKGF4aXMgPT09IDAgPyBtaW5YIDw9IHggOiBtaW5ZIDw9IHkpIHtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobGVmdCk7XG4gICAgICAgICAgICBzdGFjay5wdXNoKG0gLSAxKTtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobmV4dEF4aXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChheGlzID09PSAwID8gbWF4WCA+PSB4IDogbWF4WSA+PSB5KSB7XG4gICAgICAgICAgICBzdGFjay5wdXNoKG0gKyAxKTtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gocmlnaHQpO1xuICAgICAgICAgICAgc3RhY2sucHVzaChuZXh0QXhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuIiwiXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzb3J0S0QoaWRzLCBjb29yZHMsIG5vZGVTaXplLCBsZWZ0LCByaWdodCwgZGVwdGgpIHtcbiAgICBpZiAocmlnaHQgLSBsZWZ0IDw9IG5vZGVTaXplKSByZXR1cm47XG5cbiAgICBjb25zdCBtID0gKGxlZnQgKyByaWdodCkgPj4gMTtcblxuICAgIHNlbGVjdChpZHMsIGNvb3JkcywgbSwgbGVmdCwgcmlnaHQsIGRlcHRoICUgMik7XG5cbiAgICBzb3J0S0QoaWRzLCBjb29yZHMsIG5vZGVTaXplLCBsZWZ0LCBtIC0gMSwgZGVwdGggKyAxKTtcbiAgICBzb3J0S0QoaWRzLCBjb29yZHMsIG5vZGVTaXplLCBtICsgMSwgcmlnaHQsIGRlcHRoICsgMSk7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdChpZHMsIGNvb3JkcywgaywgbGVmdCwgcmlnaHQsIGluYykge1xuXG4gICAgd2hpbGUgKHJpZ2h0ID4gbGVmdCkge1xuICAgICAgICBpZiAocmlnaHQgLSBsZWZ0ID4gNjAwKSB7XG4gICAgICAgICAgICBjb25zdCBuID0gcmlnaHQgLSBsZWZ0ICsgMTtcbiAgICAgICAgICAgIGNvbnN0IG0gPSBrIC0gbGVmdCArIDE7XG4gICAgICAgICAgICBjb25zdCB6ID0gTWF0aC5sb2cobik7XG4gICAgICAgICAgICBjb25zdCBzID0gMC41ICogTWF0aC5leHAoMiAqIHogLyAzKTtcbiAgICAgICAgICAgIGNvbnN0IHNkID0gMC41ICogTWF0aC5zcXJ0KHogKiBzICogKG4gLSBzKSAvIG4pICogKG0gLSBuIC8gMiA8IDAgPyAtMSA6IDEpO1xuICAgICAgICAgICAgY29uc3QgbmV3TGVmdCA9IE1hdGgubWF4KGxlZnQsIE1hdGguZmxvb3IoayAtIG0gKiBzIC8gbiArIHNkKSk7XG4gICAgICAgICAgICBjb25zdCBuZXdSaWdodCA9IE1hdGgubWluKHJpZ2h0LCBNYXRoLmZsb29yKGsgKyAobiAtIG0pICogcyAvIG4gKyBzZCkpO1xuICAgICAgICAgICAgc2VsZWN0KGlkcywgY29vcmRzLCBrLCBuZXdMZWZ0LCBuZXdSaWdodCwgaW5jKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHQgPSBjb29yZHNbMiAqIGsgKyBpbmNdO1xuICAgICAgICBsZXQgaSA9IGxlZnQ7XG4gICAgICAgIGxldCBqID0gcmlnaHQ7XG5cbiAgICAgICAgc3dhcEl0ZW0oaWRzLCBjb29yZHMsIGxlZnQsIGspO1xuICAgICAgICBpZiAoY29vcmRzWzIgKiByaWdodCArIGluY10gPiB0KSBzd2FwSXRlbShpZHMsIGNvb3JkcywgbGVmdCwgcmlnaHQpO1xuXG4gICAgICAgIHdoaWxlIChpIDwgaikge1xuICAgICAgICAgICAgc3dhcEl0ZW0oaWRzLCBjb29yZHMsIGksIGopO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgai0tO1xuICAgICAgICAgICAgd2hpbGUgKGNvb3Jkc1syICogaSArIGluY10gPCB0KSBpKys7XG4gICAgICAgICAgICB3aGlsZSAoY29vcmRzWzIgKiBqICsgaW5jXSA+IHQpIGotLTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb29yZHNbMiAqIGxlZnQgKyBpbmNdID09PSB0KSBzd2FwSXRlbShpZHMsIGNvb3JkcywgbGVmdCwgaik7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgc3dhcEl0ZW0oaWRzLCBjb29yZHMsIGosIHJpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChqIDw9IGspIGxlZnQgPSBqICsgMTtcbiAgICAgICAgaWYgKGsgPD0gaikgcmlnaHQgPSBqIC0gMTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHN3YXBJdGVtKGlkcywgY29vcmRzLCBpLCBqKSB7XG4gICAgc3dhcChpZHMsIGksIGopO1xuICAgIHN3YXAoY29vcmRzLCAyICogaSwgMiAqIGopO1xuICAgIHN3YXAoY29vcmRzLCAyICogaSArIDEsIDIgKiBqICsgMSk7XG59XG5cbmZ1bmN0aW9uIHN3YXAoYXJyLCBpLCBqKSB7XG4gICAgY29uc3QgdG1wID0gYXJyW2ldO1xuICAgIGFycltpXSA9IGFycltqXTtcbiAgICBhcnJbal0gPSB0bXA7XG59XG4iLCJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdpdGhpbihpZHMsIGNvb3JkcywgcXgsIHF5LCByLCBub2RlU2l6ZSkge1xuICAgIGNvbnN0IHN0YWNrID0gWzAsIGlkcy5sZW5ndGggLSAxLCAwXTtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBjb25zdCByMiA9IHIgKiByO1xuXG4gICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBheGlzID0gc3RhY2sucG9wKCk7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gc3RhY2sucG9wKCk7XG4gICAgICAgIGNvbnN0IGxlZnQgPSBzdGFjay5wb3AoKTtcblxuICAgICAgICBpZiAocmlnaHQgLSBsZWZ0IDw9IG5vZGVTaXplKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gbGVmdDsgaSA8PSByaWdodDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNxRGlzdChjb29yZHNbMiAqIGldLCBjb29yZHNbMiAqIGkgKyAxXSwgcXgsIHF5KSA8PSByMikgcmVzdWx0LnB1c2goaWRzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbSA9IE1hdGguZmxvb3IoKGxlZnQgKyByaWdodCkgLyAyKTtcblxuICAgICAgICBjb25zdCB4ID0gY29vcmRzWzIgKiBtXTtcbiAgICAgICAgY29uc3QgeSA9IGNvb3Jkc1syICogbSArIDFdO1xuXG4gICAgICAgIGlmIChzcURpc3QoeCwgeSwgcXgsIHF5KSA8PSByMikgcmVzdWx0LnB1c2goaWRzW21dKTtcblxuICAgICAgICBjb25zdCBuZXh0QXhpcyA9IChheGlzICsgMSkgJSAyO1xuXG4gICAgICAgIGlmIChheGlzID09PSAwID8gcXggLSByIDw9IHggOiBxeSAtIHIgPD0geSkge1xuICAgICAgICAgICAgc3RhY2sucHVzaChsZWZ0KTtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobSAtIDEpO1xuICAgICAgICAgICAgc3RhY2sucHVzaChuZXh0QXhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF4aXMgPT09IDAgPyBxeCArIHIgPj0geCA6IHF5ICsgciA+PSB5KSB7XG4gICAgICAgICAgICBzdGFjay5wdXNoKG0gKyAxKTtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gocmlnaHQpO1xuICAgICAgICAgICAgc3RhY2sucHVzaChuZXh0QXhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBzcURpc3QoYXgsIGF5LCBieCwgYnkpIHtcbiAgICBjb25zdCBkeCA9IGF4IC0gYng7XG4gICAgY29uc3QgZHkgPSBheSAtIGJ5O1xuICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbn1cbiIsIi8qXG4gKiBBIGZhc3QgamF2YXNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiBzaW1wbGV4IG5vaXNlIGJ5IEpvbmFzIFdhZ25lclxuXG5CYXNlZCBvbiBhIHNwZWVkLWltcHJvdmVkIHNpbXBsZXggbm9pc2UgYWxnb3JpdGhtIGZvciAyRCwgM0QgYW5kIDREIGluIEphdmEuXG5XaGljaCBpcyBiYXNlZCBvbiBleGFtcGxlIGNvZGUgYnkgU3RlZmFuIEd1c3RhdnNvbiAoc3RlZ3VAaXRuLmxpdS5zZSkuXG5XaXRoIE9wdGltaXNhdGlvbnMgYnkgUGV0ZXIgRWFzdG1hbiAocGVhc3RtYW5AZHJpenpsZS5zdGFuZm9yZC5lZHUpLlxuQmV0dGVyIHJhbmsgb3JkZXJpbmcgbWV0aG9kIGJ5IFN0ZWZhbiBHdXN0YXZzb24gaW4gMjAxMi5cblxuXG4gQ29weXJpZ2h0IChjKSAyMDE4IEpvbmFzIFdhZ25lclxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBGMiA9IDAuNSAqIChNYXRoLnNxcnQoMy4wKSAtIDEuMCk7XG4gIHZhciBHMiA9ICgzLjAgLSBNYXRoLnNxcnQoMy4wKSkgLyA2LjA7XG4gIHZhciBGMyA9IDEuMCAvIDMuMDtcbiAgdmFyIEczID0gMS4wIC8gNi4wO1xuICB2YXIgRjQgPSAoTWF0aC5zcXJ0KDUuMCkgLSAxLjApIC8gNC4wO1xuICB2YXIgRzQgPSAoNS4wIC0gTWF0aC5zcXJ0KDUuMCkpIC8gMjAuMDtcblxuICBmdW5jdGlvbiBTaW1wbGV4Tm9pc2UocmFuZG9tT3JTZWVkKSB7XG4gICAgdmFyIHJhbmRvbTtcbiAgICBpZiAodHlwZW9mIHJhbmRvbU9yU2VlZCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByYW5kb20gPSByYW5kb21PclNlZWQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJhbmRvbU9yU2VlZCkge1xuICAgICAgcmFuZG9tID0gYWxlYShyYW5kb21PclNlZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByYW5kb20gPSBNYXRoLnJhbmRvbTtcbiAgICB9XG4gICAgdGhpcy5wID0gYnVpbGRQZXJtdXRhdGlvblRhYmxlKHJhbmRvbSk7XG4gICAgdGhpcy5wZXJtID0gbmV3IFVpbnQ4QXJyYXkoNTEyKTtcbiAgICB0aGlzLnBlcm1Nb2QxMiA9IG5ldyBVaW50OEFycmF5KDUxMik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1MTI7IGkrKykge1xuICAgICAgdGhpcy5wZXJtW2ldID0gdGhpcy5wW2kgJiAyNTVdO1xuICAgICAgdGhpcy5wZXJtTW9kMTJbaV0gPSB0aGlzLnBlcm1baV0gJSAxMjtcbiAgICB9XG5cbiAgfVxuICBTaW1wbGV4Tm9pc2UucHJvdG90eXBlID0ge1xuICAgIGdyYWQzOiBuZXcgRmxvYXQzMkFycmF5KFsxLCAxLCAwLFxuICAgICAgLTEsIDEsIDAsXG4gICAgICAxLCAtMSwgMCxcblxuICAgICAgLTEsIC0xLCAwLFxuICAgICAgMSwgMCwgMSxcbiAgICAgIC0xLCAwLCAxLFxuXG4gICAgICAxLCAwLCAtMSxcbiAgICAgIC0xLCAwLCAtMSxcbiAgICAgIDAsIDEsIDEsXG5cbiAgICAgIDAsIC0xLCAxLFxuICAgICAgMCwgMSwgLTEsXG4gICAgICAwLCAtMSwgLTFdKSxcbiAgICBncmFkNDogbmV3IEZsb2F0MzJBcnJheShbMCwgMSwgMSwgMSwgMCwgMSwgMSwgLTEsIDAsIDEsIC0xLCAxLCAwLCAxLCAtMSwgLTEsXG4gICAgICAwLCAtMSwgMSwgMSwgMCwgLTEsIDEsIC0xLCAwLCAtMSwgLTEsIDEsIDAsIC0xLCAtMSwgLTEsXG4gICAgICAxLCAwLCAxLCAxLCAxLCAwLCAxLCAtMSwgMSwgMCwgLTEsIDEsIDEsIDAsIC0xLCAtMSxcbiAgICAgIC0xLCAwLCAxLCAxLCAtMSwgMCwgMSwgLTEsIC0xLCAwLCAtMSwgMSwgLTEsIDAsIC0xLCAtMSxcbiAgICAgIDEsIDEsIDAsIDEsIDEsIDEsIDAsIC0xLCAxLCAtMSwgMCwgMSwgMSwgLTEsIDAsIC0xLFxuICAgICAgLTEsIDEsIDAsIDEsIC0xLCAxLCAwLCAtMSwgLTEsIC0xLCAwLCAxLCAtMSwgLTEsIDAsIC0xLFxuICAgICAgMSwgMSwgMSwgMCwgMSwgMSwgLTEsIDAsIDEsIC0xLCAxLCAwLCAxLCAtMSwgLTEsIDAsXG4gICAgICAtMSwgMSwgMSwgMCwgLTEsIDEsIC0xLCAwLCAtMSwgLTEsIDEsIDAsIC0xLCAtMSwgLTEsIDBdKSxcbiAgICBub2lzZTJEOiBmdW5jdGlvbih4aW4sIHlpbikge1xuICAgICAgdmFyIHBlcm1Nb2QxMiA9IHRoaXMucGVybU1vZDEyO1xuICAgICAgdmFyIHBlcm0gPSB0aGlzLnBlcm07XG4gICAgICB2YXIgZ3JhZDMgPSB0aGlzLmdyYWQzO1xuICAgICAgdmFyIG4wID0gMDsgLy8gTm9pc2UgY29udHJpYnV0aW9ucyBmcm9tIHRoZSB0aHJlZSBjb3JuZXJzXG4gICAgICB2YXIgbjEgPSAwO1xuICAgICAgdmFyIG4yID0gMDtcbiAgICAgIC8vIFNrZXcgdGhlIGlucHV0IHNwYWNlIHRvIGRldGVybWluZSB3aGljaCBzaW1wbGV4IGNlbGwgd2UncmUgaW5cbiAgICAgIHZhciBzID0gKHhpbiArIHlpbikgKiBGMjsgLy8gSGFpcnkgZmFjdG9yIGZvciAyRFxuICAgICAgdmFyIGkgPSBNYXRoLmZsb29yKHhpbiArIHMpO1xuICAgICAgdmFyIGogPSBNYXRoLmZsb29yKHlpbiArIHMpO1xuICAgICAgdmFyIHQgPSAoaSArIGopICogRzI7XG4gICAgICB2YXIgWDAgPSBpIC0gdDsgLy8gVW5za2V3IHRoZSBjZWxsIG9yaWdpbiBiYWNrIHRvICh4LHkpIHNwYWNlXG4gICAgICB2YXIgWTAgPSBqIC0gdDtcbiAgICAgIHZhciB4MCA9IHhpbiAtIFgwOyAvLyBUaGUgeCx5IGRpc3RhbmNlcyBmcm9tIHRoZSBjZWxsIG9yaWdpblxuICAgICAgdmFyIHkwID0geWluIC0gWTA7XG4gICAgICAvLyBGb3IgdGhlIDJEIGNhc2UsIHRoZSBzaW1wbGV4IHNoYXBlIGlzIGFuIGVxdWlsYXRlcmFsIHRyaWFuZ2xlLlxuICAgICAgLy8gRGV0ZXJtaW5lIHdoaWNoIHNpbXBsZXggd2UgYXJlIGluLlxuICAgICAgdmFyIGkxLCBqMTsgLy8gT2Zmc2V0cyBmb3Igc2Vjb25kIChtaWRkbGUpIGNvcm5lciBvZiBzaW1wbGV4IGluIChpLGopIGNvb3Jkc1xuICAgICAgaWYgKHgwID4geTApIHtcbiAgICAgICAgaTEgPSAxO1xuICAgICAgICBqMSA9IDA7XG4gICAgICB9IC8vIGxvd2VyIHRyaWFuZ2xlLCBYWSBvcmRlcjogKDAsMCktPigxLDApLT4oMSwxKVxuICAgICAgZWxzZSB7XG4gICAgICAgIGkxID0gMDtcbiAgICAgICAgajEgPSAxO1xuICAgICAgfSAvLyB1cHBlciB0cmlhbmdsZSwgWVggb3JkZXI6ICgwLDApLT4oMCwxKS0+KDEsMSlcbiAgICAgIC8vIEEgc3RlcCBvZiAoMSwwKSBpbiAoaSxqKSBtZWFucyBhIHN0ZXAgb2YgKDEtYywtYykgaW4gKHgseSksIGFuZFxuICAgICAgLy8gYSBzdGVwIG9mICgwLDEpIGluIChpLGopIG1lYW5zIGEgc3RlcCBvZiAoLWMsMS1jKSBpbiAoeCx5KSwgd2hlcmVcbiAgICAgIC8vIGMgPSAoMy1zcXJ0KDMpKS82XG4gICAgICB2YXIgeDEgPSB4MCAtIGkxICsgRzI7IC8vIE9mZnNldHMgZm9yIG1pZGRsZSBjb3JuZXIgaW4gKHgseSkgdW5za2V3ZWQgY29vcmRzXG4gICAgICB2YXIgeTEgPSB5MCAtIGoxICsgRzI7XG4gICAgICB2YXIgeDIgPSB4MCAtIDEuMCArIDIuMCAqIEcyOyAvLyBPZmZzZXRzIGZvciBsYXN0IGNvcm5lciBpbiAoeCx5KSB1bnNrZXdlZCBjb29yZHNcbiAgICAgIHZhciB5MiA9IHkwIC0gMS4wICsgMi4wICogRzI7XG4gICAgICAvLyBXb3JrIG91dCB0aGUgaGFzaGVkIGdyYWRpZW50IGluZGljZXMgb2YgdGhlIHRocmVlIHNpbXBsZXggY29ybmVyc1xuICAgICAgdmFyIGlpID0gaSAmIDI1NTtcbiAgICAgIHZhciBqaiA9IGogJiAyNTU7XG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIGNvbnRyaWJ1dGlvbiBmcm9tIHRoZSB0aHJlZSBjb3JuZXJzXG4gICAgICB2YXIgdDAgPSAwLjUgLSB4MCAqIHgwIC0geTAgKiB5MDtcbiAgICAgIGlmICh0MCA+PSAwKSB7XG4gICAgICAgIHZhciBnaTAgPSBwZXJtTW9kMTJbaWkgKyBwZXJtW2pqXV0gKiAzO1xuICAgICAgICB0MCAqPSB0MDtcbiAgICAgICAgbjAgPSB0MCAqIHQwICogKGdyYWQzW2dpMF0gKiB4MCArIGdyYWQzW2dpMCArIDFdICogeTApOyAvLyAoeCx5KSBvZiBncmFkMyB1c2VkIGZvciAyRCBncmFkaWVudFxuICAgICAgfVxuICAgICAgdmFyIHQxID0gMC41IC0geDEgKiB4MSAtIHkxICogeTE7XG4gICAgICBpZiAodDEgPj0gMCkge1xuICAgICAgICB2YXIgZ2kxID0gcGVybU1vZDEyW2lpICsgaTEgKyBwZXJtW2pqICsgajFdXSAqIDM7XG4gICAgICAgIHQxICo9IHQxO1xuICAgICAgICBuMSA9IHQxICogdDEgKiAoZ3JhZDNbZ2kxXSAqIHgxICsgZ3JhZDNbZ2kxICsgMV0gKiB5MSk7XG4gICAgICB9XG4gICAgICB2YXIgdDIgPSAwLjUgLSB4MiAqIHgyIC0geTIgKiB5MjtcbiAgICAgIGlmICh0MiA+PSAwKSB7XG4gICAgICAgIHZhciBnaTIgPSBwZXJtTW9kMTJbaWkgKyAxICsgcGVybVtqaiArIDFdXSAqIDM7XG4gICAgICAgIHQyICo9IHQyO1xuICAgICAgICBuMiA9IHQyICogdDIgKiAoZ3JhZDNbZ2kyXSAqIHgyICsgZ3JhZDNbZ2kyICsgMV0gKiB5Mik7XG4gICAgICB9XG4gICAgICAvLyBBZGQgY29udHJpYnV0aW9ucyBmcm9tIGVhY2ggY29ybmVyIHRvIGdldCB0aGUgZmluYWwgbm9pc2UgdmFsdWUuXG4gICAgICAvLyBUaGUgcmVzdWx0IGlzIHNjYWxlZCB0byByZXR1cm4gdmFsdWVzIGluIHRoZSBpbnRlcnZhbCBbLTEsMV0uXG4gICAgICByZXR1cm4gNzAuMCAqIChuMCArIG4xICsgbjIpO1xuICAgIH0sXG4gICAgLy8gM0Qgc2ltcGxleCBub2lzZVxuICAgIG5vaXNlM0Q6IGZ1bmN0aW9uKHhpbiwgeWluLCB6aW4pIHtcbiAgICAgIHZhciBwZXJtTW9kMTIgPSB0aGlzLnBlcm1Nb2QxMjtcbiAgICAgIHZhciBwZXJtID0gdGhpcy5wZXJtO1xuICAgICAgdmFyIGdyYWQzID0gdGhpcy5ncmFkMztcbiAgICAgIHZhciBuMCwgbjEsIG4yLCBuMzsgLy8gTm9pc2UgY29udHJpYnV0aW9ucyBmcm9tIHRoZSBmb3VyIGNvcm5lcnNcbiAgICAgIC8vIFNrZXcgdGhlIGlucHV0IHNwYWNlIHRvIGRldGVybWluZSB3aGljaCBzaW1wbGV4IGNlbGwgd2UncmUgaW5cbiAgICAgIHZhciBzID0gKHhpbiArIHlpbiArIHppbikgKiBGMzsgLy8gVmVyeSBuaWNlIGFuZCBzaW1wbGUgc2tldyBmYWN0b3IgZm9yIDNEXG4gICAgICB2YXIgaSA9IE1hdGguZmxvb3IoeGluICsgcyk7XG4gICAgICB2YXIgaiA9IE1hdGguZmxvb3IoeWluICsgcyk7XG4gICAgICB2YXIgayA9IE1hdGguZmxvb3IoemluICsgcyk7XG4gICAgICB2YXIgdCA9IChpICsgaiArIGspICogRzM7XG4gICAgICB2YXIgWDAgPSBpIC0gdDsgLy8gVW5za2V3IHRoZSBjZWxsIG9yaWdpbiBiYWNrIHRvICh4LHkseikgc3BhY2VcbiAgICAgIHZhciBZMCA9IGogLSB0O1xuICAgICAgdmFyIFowID0gayAtIHQ7XG4gICAgICB2YXIgeDAgPSB4aW4gLSBYMDsgLy8gVGhlIHgseSx6IGRpc3RhbmNlcyBmcm9tIHRoZSBjZWxsIG9yaWdpblxuICAgICAgdmFyIHkwID0geWluIC0gWTA7XG4gICAgICB2YXIgejAgPSB6aW4gLSBaMDtcbiAgICAgIC8vIEZvciB0aGUgM0QgY2FzZSwgdGhlIHNpbXBsZXggc2hhcGUgaXMgYSBzbGlnaHRseSBpcnJlZ3VsYXIgdGV0cmFoZWRyb24uXG4gICAgICAvLyBEZXRlcm1pbmUgd2hpY2ggc2ltcGxleCB3ZSBhcmUgaW4uXG4gICAgICB2YXIgaTEsIGoxLCBrMTsgLy8gT2Zmc2V0cyBmb3Igc2Vjb25kIGNvcm5lciBvZiBzaW1wbGV4IGluIChpLGosaykgY29vcmRzXG4gICAgICB2YXIgaTIsIGoyLCBrMjsgLy8gT2Zmc2V0cyBmb3IgdGhpcmQgY29ybmVyIG9mIHNpbXBsZXggaW4gKGksaixrKSBjb29yZHNcbiAgICAgIGlmICh4MCA+PSB5MCkge1xuICAgICAgICBpZiAoeTAgPj0gejApIHtcbiAgICAgICAgICBpMSA9IDE7XG4gICAgICAgICAgajEgPSAwO1xuICAgICAgICAgIGsxID0gMDtcbiAgICAgICAgICBpMiA9IDE7XG4gICAgICAgICAgajIgPSAxO1xuICAgICAgICAgIGsyID0gMDtcbiAgICAgICAgfSAvLyBYIFkgWiBvcmRlclxuICAgICAgICBlbHNlIGlmICh4MCA+PSB6MCkge1xuICAgICAgICAgIGkxID0gMTtcbiAgICAgICAgICBqMSA9IDA7XG4gICAgICAgICAgazEgPSAwO1xuICAgICAgICAgIGkyID0gMTtcbiAgICAgICAgICBqMiA9IDA7XG4gICAgICAgICAgazIgPSAxO1xuICAgICAgICB9IC8vIFggWiBZIG9yZGVyXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGkxID0gMDtcbiAgICAgICAgICBqMSA9IDA7XG4gICAgICAgICAgazEgPSAxO1xuICAgICAgICAgIGkyID0gMTtcbiAgICAgICAgICBqMiA9IDA7XG4gICAgICAgICAgazIgPSAxO1xuICAgICAgICB9IC8vIFogWCBZIG9yZGVyXG4gICAgICB9XG4gICAgICBlbHNlIHsgLy8geDA8eTBcbiAgICAgICAgaWYgKHkwIDwgejApIHtcbiAgICAgICAgICBpMSA9IDA7XG4gICAgICAgICAgajEgPSAwO1xuICAgICAgICAgIGsxID0gMTtcbiAgICAgICAgICBpMiA9IDA7XG4gICAgICAgICAgajIgPSAxO1xuICAgICAgICAgIGsyID0gMTtcbiAgICAgICAgfSAvLyBaIFkgWCBvcmRlclxuICAgICAgICBlbHNlIGlmICh4MCA8IHowKSB7XG4gICAgICAgICAgaTEgPSAwO1xuICAgICAgICAgIGoxID0gMTtcbiAgICAgICAgICBrMSA9IDA7XG4gICAgICAgICAgaTIgPSAwO1xuICAgICAgICAgIGoyID0gMTtcbiAgICAgICAgICBrMiA9IDE7XG4gICAgICAgIH0gLy8gWSBaIFggb3JkZXJcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaTEgPSAwO1xuICAgICAgICAgIGoxID0gMTtcbiAgICAgICAgICBrMSA9IDA7XG4gICAgICAgICAgaTIgPSAxO1xuICAgICAgICAgIGoyID0gMTtcbiAgICAgICAgICBrMiA9IDA7XG4gICAgICAgIH0gLy8gWSBYIFogb3JkZXJcbiAgICAgIH1cbiAgICAgIC8vIEEgc3RlcCBvZiAoMSwwLDApIGluIChpLGosaykgbWVhbnMgYSBzdGVwIG9mICgxLWMsLWMsLWMpIGluICh4LHkseiksXG4gICAgICAvLyBhIHN0ZXAgb2YgKDAsMSwwKSBpbiAoaSxqLGspIG1lYW5zIGEgc3RlcCBvZiAoLWMsMS1jLC1jKSBpbiAoeCx5LHopLCBhbmRcbiAgICAgIC8vIGEgc3RlcCBvZiAoMCwwLDEpIGluIChpLGosaykgbWVhbnMgYSBzdGVwIG9mICgtYywtYywxLWMpIGluICh4LHkseiksIHdoZXJlXG4gICAgICAvLyBjID0gMS82LlxuICAgICAgdmFyIHgxID0geDAgLSBpMSArIEczOyAvLyBPZmZzZXRzIGZvciBzZWNvbmQgY29ybmVyIGluICh4LHkseikgY29vcmRzXG4gICAgICB2YXIgeTEgPSB5MCAtIGoxICsgRzM7XG4gICAgICB2YXIgejEgPSB6MCAtIGsxICsgRzM7XG4gICAgICB2YXIgeDIgPSB4MCAtIGkyICsgMi4wICogRzM7IC8vIE9mZnNldHMgZm9yIHRoaXJkIGNvcm5lciBpbiAoeCx5LHopIGNvb3Jkc1xuICAgICAgdmFyIHkyID0geTAgLSBqMiArIDIuMCAqIEczO1xuICAgICAgdmFyIHoyID0gejAgLSBrMiArIDIuMCAqIEczO1xuICAgICAgdmFyIHgzID0geDAgLSAxLjAgKyAzLjAgKiBHMzsgLy8gT2Zmc2V0cyBmb3IgbGFzdCBjb3JuZXIgaW4gKHgseSx6KSBjb29yZHNcbiAgICAgIHZhciB5MyA9IHkwIC0gMS4wICsgMy4wICogRzM7XG4gICAgICB2YXIgejMgPSB6MCAtIDEuMCArIDMuMCAqIEczO1xuICAgICAgLy8gV29yayBvdXQgdGhlIGhhc2hlZCBncmFkaWVudCBpbmRpY2VzIG9mIHRoZSBmb3VyIHNpbXBsZXggY29ybmVyc1xuICAgICAgdmFyIGlpID0gaSAmIDI1NTtcbiAgICAgIHZhciBqaiA9IGogJiAyNTU7XG4gICAgICB2YXIga2sgPSBrICYgMjU1O1xuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjb250cmlidXRpb24gZnJvbSB0aGUgZm91ciBjb3JuZXJzXG4gICAgICB2YXIgdDAgPSAwLjYgLSB4MCAqIHgwIC0geTAgKiB5MCAtIHowICogejA7XG4gICAgICBpZiAodDAgPCAwKSBuMCA9IDAuMDtcbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgZ2kwID0gcGVybU1vZDEyW2lpICsgcGVybVtqaiArIHBlcm1ba2tdXV0gKiAzO1xuICAgICAgICB0MCAqPSB0MDtcbiAgICAgICAgbjAgPSB0MCAqIHQwICogKGdyYWQzW2dpMF0gKiB4MCArIGdyYWQzW2dpMCArIDFdICogeTAgKyBncmFkM1tnaTAgKyAyXSAqIHowKTtcbiAgICAgIH1cbiAgICAgIHZhciB0MSA9IDAuNiAtIHgxICogeDEgLSB5MSAqIHkxIC0gejEgKiB6MTtcbiAgICAgIGlmICh0MSA8IDApIG4xID0gMC4wO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBnaTEgPSBwZXJtTW9kMTJbaWkgKyBpMSArIHBlcm1bamogKyBqMSArIHBlcm1ba2sgKyBrMV1dXSAqIDM7XG4gICAgICAgIHQxICo9IHQxO1xuICAgICAgICBuMSA9IHQxICogdDEgKiAoZ3JhZDNbZ2kxXSAqIHgxICsgZ3JhZDNbZ2kxICsgMV0gKiB5MSArIGdyYWQzW2dpMSArIDJdICogejEpO1xuICAgICAgfVxuICAgICAgdmFyIHQyID0gMC42IC0geDIgKiB4MiAtIHkyICogeTIgLSB6MiAqIHoyO1xuICAgICAgaWYgKHQyIDwgMCkgbjIgPSAwLjA7XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIGdpMiA9IHBlcm1Nb2QxMltpaSArIGkyICsgcGVybVtqaiArIGoyICsgcGVybVtrayArIGsyXV1dICogMztcbiAgICAgICAgdDIgKj0gdDI7XG4gICAgICAgIG4yID0gdDIgKiB0MiAqIChncmFkM1tnaTJdICogeDIgKyBncmFkM1tnaTIgKyAxXSAqIHkyICsgZ3JhZDNbZ2kyICsgMl0gKiB6Mik7XG4gICAgICB9XG4gICAgICB2YXIgdDMgPSAwLjYgLSB4MyAqIHgzIC0geTMgKiB5MyAtIHozICogejM7XG4gICAgICBpZiAodDMgPCAwKSBuMyA9IDAuMDtcbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgZ2kzID0gcGVybU1vZDEyW2lpICsgMSArIHBlcm1bamogKyAxICsgcGVybVtrayArIDFdXV0gKiAzO1xuICAgICAgICB0MyAqPSB0MztcbiAgICAgICAgbjMgPSB0MyAqIHQzICogKGdyYWQzW2dpM10gKiB4MyArIGdyYWQzW2dpMyArIDFdICogeTMgKyBncmFkM1tnaTMgKyAyXSAqIHozKTtcbiAgICAgIH1cbiAgICAgIC8vIEFkZCBjb250cmlidXRpb25zIGZyb20gZWFjaCBjb3JuZXIgdG8gZ2V0IHRoZSBmaW5hbCBub2lzZSB2YWx1ZS5cbiAgICAgIC8vIFRoZSByZXN1bHQgaXMgc2NhbGVkIHRvIHN0YXkganVzdCBpbnNpZGUgWy0xLDFdXG4gICAgICByZXR1cm4gMzIuMCAqIChuMCArIG4xICsgbjIgKyBuMyk7XG4gICAgfSxcbiAgICAvLyA0RCBzaW1wbGV4IG5vaXNlLCBiZXR0ZXIgc2ltcGxleCByYW5rIG9yZGVyaW5nIG1ldGhvZCAyMDEyLTAzLTA5XG4gICAgbm9pc2U0RDogZnVuY3Rpb24oeCwgeSwgeiwgdykge1xuICAgICAgdmFyIHBlcm0gPSB0aGlzLnBlcm07XG4gICAgICB2YXIgZ3JhZDQgPSB0aGlzLmdyYWQ0O1xuXG4gICAgICB2YXIgbjAsIG4xLCBuMiwgbjMsIG40OyAvLyBOb2lzZSBjb250cmlidXRpb25zIGZyb20gdGhlIGZpdmUgY29ybmVyc1xuICAgICAgLy8gU2tldyB0aGUgKHgseSx6LHcpIHNwYWNlIHRvIGRldGVybWluZSB3aGljaCBjZWxsIG9mIDI0IHNpbXBsaWNlcyB3ZSdyZSBpblxuICAgICAgdmFyIHMgPSAoeCArIHkgKyB6ICsgdykgKiBGNDsgLy8gRmFjdG9yIGZvciA0RCBza2V3aW5nXG4gICAgICB2YXIgaSA9IE1hdGguZmxvb3IoeCArIHMpO1xuICAgICAgdmFyIGogPSBNYXRoLmZsb29yKHkgKyBzKTtcbiAgICAgIHZhciBrID0gTWF0aC5mbG9vcih6ICsgcyk7XG4gICAgICB2YXIgbCA9IE1hdGguZmxvb3IodyArIHMpO1xuICAgICAgdmFyIHQgPSAoaSArIGogKyBrICsgbCkgKiBHNDsgLy8gRmFjdG9yIGZvciA0RCB1bnNrZXdpbmdcbiAgICAgIHZhciBYMCA9IGkgLSB0OyAvLyBVbnNrZXcgdGhlIGNlbGwgb3JpZ2luIGJhY2sgdG8gKHgseSx6LHcpIHNwYWNlXG4gICAgICB2YXIgWTAgPSBqIC0gdDtcbiAgICAgIHZhciBaMCA9IGsgLSB0O1xuICAgICAgdmFyIFcwID0gbCAtIHQ7XG4gICAgICB2YXIgeDAgPSB4IC0gWDA7IC8vIFRoZSB4LHkseix3IGRpc3RhbmNlcyBmcm9tIHRoZSBjZWxsIG9yaWdpblxuICAgICAgdmFyIHkwID0geSAtIFkwO1xuICAgICAgdmFyIHowID0geiAtIFowO1xuICAgICAgdmFyIHcwID0gdyAtIFcwO1xuICAgICAgLy8gRm9yIHRoZSA0RCBjYXNlLCB0aGUgc2ltcGxleCBpcyBhIDREIHNoYXBlIEkgd29uJ3QgZXZlbiB0cnkgdG8gZGVzY3JpYmUuXG4gICAgICAvLyBUbyBmaW5kIG91dCB3aGljaCBvZiB0aGUgMjQgcG9zc2libGUgc2ltcGxpY2VzIHdlJ3JlIGluLCB3ZSBuZWVkIHRvXG4gICAgICAvLyBkZXRlcm1pbmUgdGhlIG1hZ25pdHVkZSBvcmRlcmluZyBvZiB4MCwgeTAsIHowIGFuZCB3MC5cbiAgICAgIC8vIFNpeCBwYWlyLXdpc2UgY29tcGFyaXNvbnMgYXJlIHBlcmZvcm1lZCBiZXR3ZWVuIGVhY2ggcG9zc2libGUgcGFpclxuICAgICAgLy8gb2YgdGhlIGZvdXIgY29vcmRpbmF0ZXMsIGFuZCB0aGUgcmVzdWx0cyBhcmUgdXNlZCB0byByYW5rIHRoZSBudW1iZXJzLlxuICAgICAgdmFyIHJhbmt4ID0gMDtcbiAgICAgIHZhciByYW5reSA9IDA7XG4gICAgICB2YXIgcmFua3ogPSAwO1xuICAgICAgdmFyIHJhbmt3ID0gMDtcbiAgICAgIGlmICh4MCA+IHkwKSByYW5reCsrO1xuICAgICAgZWxzZSByYW5reSsrO1xuICAgICAgaWYgKHgwID4gejApIHJhbmt4Kys7XG4gICAgICBlbHNlIHJhbmt6Kys7XG4gICAgICBpZiAoeDAgPiB3MCkgcmFua3grKztcbiAgICAgIGVsc2UgcmFua3crKztcbiAgICAgIGlmICh5MCA+IHowKSByYW5reSsrO1xuICAgICAgZWxzZSByYW5reisrO1xuICAgICAgaWYgKHkwID4gdzApIHJhbmt5Kys7XG4gICAgICBlbHNlIHJhbmt3Kys7XG4gICAgICBpZiAoejAgPiB3MCkgcmFua3orKztcbiAgICAgIGVsc2UgcmFua3crKztcbiAgICAgIHZhciBpMSwgajEsIGsxLCBsMTsgLy8gVGhlIGludGVnZXIgb2Zmc2V0cyBmb3IgdGhlIHNlY29uZCBzaW1wbGV4IGNvcm5lclxuICAgICAgdmFyIGkyLCBqMiwgazIsIGwyOyAvLyBUaGUgaW50ZWdlciBvZmZzZXRzIGZvciB0aGUgdGhpcmQgc2ltcGxleCBjb3JuZXJcbiAgICAgIHZhciBpMywgajMsIGszLCBsMzsgLy8gVGhlIGludGVnZXIgb2Zmc2V0cyBmb3IgdGhlIGZvdXJ0aCBzaW1wbGV4IGNvcm5lclxuICAgICAgLy8gc2ltcGxleFtjXSBpcyBhIDQtdmVjdG9yIHdpdGggdGhlIG51bWJlcnMgMCwgMSwgMiBhbmQgMyBpbiBzb21lIG9yZGVyLlxuICAgICAgLy8gTWFueSB2YWx1ZXMgb2YgYyB3aWxsIG5ldmVyIG9jY3VyLCBzaW5jZSBlLmcuIHg+eT56PncgbWFrZXMgeDx6LCB5PHcgYW5kIHg8d1xuICAgICAgLy8gaW1wb3NzaWJsZS4gT25seSB0aGUgMjQgaW5kaWNlcyB3aGljaCBoYXZlIG5vbi16ZXJvIGVudHJpZXMgbWFrZSBhbnkgc2Vuc2UuXG4gICAgICAvLyBXZSB1c2UgYSB0aHJlc2hvbGRpbmcgdG8gc2V0IHRoZSBjb29yZGluYXRlcyBpbiB0dXJuIGZyb20gdGhlIGxhcmdlc3QgbWFnbml0dWRlLlxuICAgICAgLy8gUmFuayAzIGRlbm90ZXMgdGhlIGxhcmdlc3QgY29vcmRpbmF0ZS5cbiAgICAgIGkxID0gcmFua3ggPj0gMyA/IDEgOiAwO1xuICAgICAgajEgPSByYW5reSA+PSAzID8gMSA6IDA7XG4gICAgICBrMSA9IHJhbmt6ID49IDMgPyAxIDogMDtcbiAgICAgIGwxID0gcmFua3cgPj0gMyA/IDEgOiAwO1xuICAgICAgLy8gUmFuayAyIGRlbm90ZXMgdGhlIHNlY29uZCBsYXJnZXN0IGNvb3JkaW5hdGUuXG4gICAgICBpMiA9IHJhbmt4ID49IDIgPyAxIDogMDtcbiAgICAgIGoyID0gcmFua3kgPj0gMiA/IDEgOiAwO1xuICAgICAgazIgPSByYW5reiA+PSAyID8gMSA6IDA7XG4gICAgICBsMiA9IHJhbmt3ID49IDIgPyAxIDogMDtcbiAgICAgIC8vIFJhbmsgMSBkZW5vdGVzIHRoZSBzZWNvbmQgc21hbGxlc3QgY29vcmRpbmF0ZS5cbiAgICAgIGkzID0gcmFua3ggPj0gMSA/IDEgOiAwO1xuICAgICAgajMgPSByYW5reSA+PSAxID8gMSA6IDA7XG4gICAgICBrMyA9IHJhbmt6ID49IDEgPyAxIDogMDtcbiAgICAgIGwzID0gcmFua3cgPj0gMSA/IDEgOiAwO1xuICAgICAgLy8gVGhlIGZpZnRoIGNvcm5lciBoYXMgYWxsIGNvb3JkaW5hdGUgb2Zmc2V0cyA9IDEsIHNvIG5vIG5lZWQgdG8gY29tcHV0ZSB0aGF0LlxuICAgICAgdmFyIHgxID0geDAgLSBpMSArIEc0OyAvLyBPZmZzZXRzIGZvciBzZWNvbmQgY29ybmVyIGluICh4LHkseix3KSBjb29yZHNcbiAgICAgIHZhciB5MSA9IHkwIC0gajEgKyBHNDtcbiAgICAgIHZhciB6MSA9IHowIC0gazEgKyBHNDtcbiAgICAgIHZhciB3MSA9IHcwIC0gbDEgKyBHNDtcbiAgICAgIHZhciB4MiA9IHgwIC0gaTIgKyAyLjAgKiBHNDsgLy8gT2Zmc2V0cyBmb3IgdGhpcmQgY29ybmVyIGluICh4LHkseix3KSBjb29yZHNcbiAgICAgIHZhciB5MiA9IHkwIC0gajIgKyAyLjAgKiBHNDtcbiAgICAgIHZhciB6MiA9IHowIC0gazIgKyAyLjAgKiBHNDtcbiAgICAgIHZhciB3MiA9IHcwIC0gbDIgKyAyLjAgKiBHNDtcbiAgICAgIHZhciB4MyA9IHgwIC0gaTMgKyAzLjAgKiBHNDsgLy8gT2Zmc2V0cyBmb3IgZm91cnRoIGNvcm5lciBpbiAoeCx5LHosdykgY29vcmRzXG4gICAgICB2YXIgeTMgPSB5MCAtIGozICsgMy4wICogRzQ7XG4gICAgICB2YXIgejMgPSB6MCAtIGszICsgMy4wICogRzQ7XG4gICAgICB2YXIgdzMgPSB3MCAtIGwzICsgMy4wICogRzQ7XG4gICAgICB2YXIgeDQgPSB4MCAtIDEuMCArIDQuMCAqIEc0OyAvLyBPZmZzZXRzIGZvciBsYXN0IGNvcm5lciBpbiAoeCx5LHosdykgY29vcmRzXG4gICAgICB2YXIgeTQgPSB5MCAtIDEuMCArIDQuMCAqIEc0O1xuICAgICAgdmFyIHo0ID0gejAgLSAxLjAgKyA0LjAgKiBHNDtcbiAgICAgIHZhciB3NCA9IHcwIC0gMS4wICsgNC4wICogRzQ7XG4gICAgICAvLyBXb3JrIG91dCB0aGUgaGFzaGVkIGdyYWRpZW50IGluZGljZXMgb2YgdGhlIGZpdmUgc2ltcGxleCBjb3JuZXJzXG4gICAgICB2YXIgaWkgPSBpICYgMjU1O1xuICAgICAgdmFyIGpqID0gaiAmIDI1NTtcbiAgICAgIHZhciBrayA9IGsgJiAyNTU7XG4gICAgICB2YXIgbGwgPSBsICYgMjU1O1xuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjb250cmlidXRpb24gZnJvbSB0aGUgZml2ZSBjb3JuZXJzXG4gICAgICB2YXIgdDAgPSAwLjYgLSB4MCAqIHgwIC0geTAgKiB5MCAtIHowICogejAgLSB3MCAqIHcwO1xuICAgICAgaWYgKHQwIDwgMCkgbjAgPSAwLjA7XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIGdpMCA9IChwZXJtW2lpICsgcGVybVtqaiArIHBlcm1ba2sgKyBwZXJtW2xsXV1dXSAlIDMyKSAqIDQ7XG4gICAgICAgIHQwICo9IHQwO1xuICAgICAgICBuMCA9IHQwICogdDAgKiAoZ3JhZDRbZ2kwXSAqIHgwICsgZ3JhZDRbZ2kwICsgMV0gKiB5MCArIGdyYWQ0W2dpMCArIDJdICogejAgKyBncmFkNFtnaTAgKyAzXSAqIHcwKTtcbiAgICAgIH1cbiAgICAgIHZhciB0MSA9IDAuNiAtIHgxICogeDEgLSB5MSAqIHkxIC0gejEgKiB6MSAtIHcxICogdzE7XG4gICAgICBpZiAodDEgPCAwKSBuMSA9IDAuMDtcbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgZ2kxID0gKHBlcm1baWkgKyBpMSArIHBlcm1bamogKyBqMSArIHBlcm1ba2sgKyBrMSArIHBlcm1bbGwgKyBsMV1dXV0gJSAzMikgKiA0O1xuICAgICAgICB0MSAqPSB0MTtcbiAgICAgICAgbjEgPSB0MSAqIHQxICogKGdyYWQ0W2dpMV0gKiB4MSArIGdyYWQ0W2dpMSArIDFdICogeTEgKyBncmFkNFtnaTEgKyAyXSAqIHoxICsgZ3JhZDRbZ2kxICsgM10gKiB3MSk7XG4gICAgICB9XG4gICAgICB2YXIgdDIgPSAwLjYgLSB4MiAqIHgyIC0geTIgKiB5MiAtIHoyICogejIgLSB3MiAqIHcyO1xuICAgICAgaWYgKHQyIDwgMCkgbjIgPSAwLjA7XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIGdpMiA9IChwZXJtW2lpICsgaTIgKyBwZXJtW2pqICsgajIgKyBwZXJtW2trICsgazIgKyBwZXJtW2xsICsgbDJdXV1dICUgMzIpICogNDtcbiAgICAgICAgdDIgKj0gdDI7XG4gICAgICAgIG4yID0gdDIgKiB0MiAqIChncmFkNFtnaTJdICogeDIgKyBncmFkNFtnaTIgKyAxXSAqIHkyICsgZ3JhZDRbZ2kyICsgMl0gKiB6MiArIGdyYWQ0W2dpMiArIDNdICogdzIpO1xuICAgICAgfVxuICAgICAgdmFyIHQzID0gMC42IC0geDMgKiB4MyAtIHkzICogeTMgLSB6MyAqIHozIC0gdzMgKiB3MztcbiAgICAgIGlmICh0MyA8IDApIG4zID0gMC4wO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBnaTMgPSAocGVybVtpaSArIGkzICsgcGVybVtqaiArIGozICsgcGVybVtrayArIGszICsgcGVybVtsbCArIGwzXV1dXSAlIDMyKSAqIDQ7XG4gICAgICAgIHQzICo9IHQzO1xuICAgICAgICBuMyA9IHQzICogdDMgKiAoZ3JhZDRbZ2kzXSAqIHgzICsgZ3JhZDRbZ2kzICsgMV0gKiB5MyArIGdyYWQ0W2dpMyArIDJdICogejMgKyBncmFkNFtnaTMgKyAzXSAqIHczKTtcbiAgICAgIH1cbiAgICAgIHZhciB0NCA9IDAuNiAtIHg0ICogeDQgLSB5NCAqIHk0IC0gejQgKiB6NCAtIHc0ICogdzQ7XG4gICAgICBpZiAodDQgPCAwKSBuNCA9IDAuMDtcbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgZ2k0ID0gKHBlcm1baWkgKyAxICsgcGVybVtqaiArIDEgKyBwZXJtW2trICsgMSArIHBlcm1bbGwgKyAxXV1dXSAlIDMyKSAqIDQ7XG4gICAgICAgIHQ0ICo9IHQ0O1xuICAgICAgICBuNCA9IHQ0ICogdDQgKiAoZ3JhZDRbZ2k0XSAqIHg0ICsgZ3JhZDRbZ2k0ICsgMV0gKiB5NCArIGdyYWQ0W2dpNCArIDJdICogejQgKyBncmFkNFtnaTQgKyAzXSAqIHc0KTtcbiAgICAgIH1cbiAgICAgIC8vIFN1bSB1cCBhbmQgc2NhbGUgdGhlIHJlc3VsdCB0byBjb3ZlciB0aGUgcmFuZ2UgWy0xLDFdXG4gICAgICByZXR1cm4gMjcuMCAqIChuMCArIG4xICsgbjIgKyBuMyArIG40KTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gYnVpbGRQZXJtdXRhdGlvblRhYmxlKHJhbmRvbSkge1xuICAgIHZhciBpO1xuICAgIHZhciBwID0gbmV3IFVpbnQ4QXJyYXkoMjU2KTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgICAgIHBbaV0gPSBpO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgMjU1OyBpKyspIHtcbiAgICAgIHZhciByID0gaSArIH5+KHJhbmRvbSgpICogKDI1NiAtIGkpKTtcbiAgICAgIHZhciBhdXggPSBwW2ldO1xuICAgICAgcFtpXSA9IHBbcl07XG4gICAgICBwW3JdID0gYXV4O1xuICAgIH1cbiAgICByZXR1cm4gcDtcbiAgfVxuICBTaW1wbGV4Tm9pc2UuX2J1aWxkUGVybXV0YXRpb25UYWJsZSA9IGJ1aWxkUGVybXV0YXRpb25UYWJsZTtcblxuICBmdW5jdGlvbiBhbGVhKCkge1xuICAgIC8vIEpvaGFubmVzIEJhYWfDuGUgPGJhYWdvZUBiYWFnb2UuY29tPiwgMjAxMFxuICAgIHZhciBzMCA9IDA7XG4gICAgdmFyIHMxID0gMDtcbiAgICB2YXIgczIgPSAwO1xuICAgIHZhciBjID0gMTtcblxuICAgIHZhciBtYXNoID0gbWFzaGVyKCk7XG4gICAgczAgPSBtYXNoKCcgJyk7XG4gICAgczEgPSBtYXNoKCcgJyk7XG4gICAgczIgPSBtYXNoKCcgJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgczAgLT0gbWFzaChhcmd1bWVudHNbaV0pO1xuICAgICAgaWYgKHMwIDwgMCkge1xuICAgICAgICBzMCArPSAxO1xuICAgICAgfVxuICAgICAgczEgLT0gbWFzaChhcmd1bWVudHNbaV0pO1xuICAgICAgaWYgKHMxIDwgMCkge1xuICAgICAgICBzMSArPSAxO1xuICAgICAgfVxuICAgICAgczIgLT0gbWFzaChhcmd1bWVudHNbaV0pO1xuICAgICAgaWYgKHMyIDwgMCkge1xuICAgICAgICBzMiArPSAxO1xuICAgICAgfVxuICAgIH1cbiAgICBtYXNoID0gbnVsbDtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdCA9IDIwOTE2MzkgKiBzMCArIGMgKiAyLjMyODMwNjQzNjUzODY5NjNlLTEwOyAvLyAyXi0zMlxuICAgICAgczAgPSBzMTtcbiAgICAgIHMxID0gczI7XG4gICAgICByZXR1cm4gczIgPSB0IC0gKGMgPSB0IHwgMCk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBtYXNoZXIoKSB7XG4gICAgdmFyIG4gPSAweGVmYzgyNDlkO1xuICAgIHJldHVybiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBkYXRhID0gZGF0YS50b1N0cmluZygpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG4gKz0gZGF0YS5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB2YXIgaCA9IDAuMDI1MTk2MDMyODI0MTY5MzggKiBuO1xuICAgICAgICBuID0gaCA+Pj4gMDtcbiAgICAgICAgaCAtPSBuO1xuICAgICAgICBoICo9IG47XG4gICAgICAgIG4gPSBoID4+PiAwO1xuICAgICAgICBoIC09IG47XG4gICAgICAgIG4gKz0gaCAqIDB4MTAwMDAwMDAwOyAvLyAyXjMyXG4gICAgICB9XG4gICAgICByZXR1cm4gKG4gPj4+IDApICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcbiAgICB9O1xuICB9XG5cbiAgLy8gYW1kXG4gIGlmICh0eXBlb2YgZGVmaW5lICE9PSAndW5kZWZpbmVkJyAmJiBkZWZpbmUuYW1kKSBkZWZpbmUoZnVuY3Rpb24oKSB7cmV0dXJuIFNpbXBsZXhOb2lzZTt9KTtcbiAgLy8gY29tbW9uIGpzXG4gIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIGV4cG9ydHMuU2ltcGxleE5vaXNlID0gU2ltcGxleE5vaXNlO1xuICAvLyBicm93c2VyXG4gIGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB3aW5kb3cuU2ltcGxleE5vaXNlID0gU2ltcGxleE5vaXNlO1xuICAvLyBub2RlanNcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTaW1wbGV4Tm9pc2U7XG4gIH1cblxufSkoKTtcbiIsImltcG9ydCB0b1BhdGggZnJvbSAnLi90b1BhdGgnO1xuaW1wb3J0IHRvUG9pbnRzIGZyb20gJy4vdG9Qb2ludHMnO1xuaW1wb3J0IHZhbGlkIGZyb20gJy4vdmFsaWQnO1xuXG5leHBvcnQgeyB0b1BhdGgsIHRvUG9pbnRzLCB2YWxpZCB9OyIsImltcG9ydCB0b1BvaW50cyBmcm9tICcuL3RvUG9pbnRzJztcblxudmFyIHBvaW50c1RvRCA9IGZ1bmN0aW9uIHBvaW50c1RvRChwKSB7XG4gIHZhciBkID0gJyc7XG4gIHZhciBpID0gMDtcbiAgdmFyIGZpcnN0UG9pbnQgPSB2b2lkIDA7XG5cbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gcFtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgIHZhciBwb2ludCA9IF9zdGVwLnZhbHVlO1xuICAgICAgdmFyIF9wb2ludCRjdXJ2ZSA9IHBvaW50LmN1cnZlLFxuICAgICAgICAgIGN1cnZlID0gX3BvaW50JGN1cnZlID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9wb2ludCRjdXJ2ZSxcbiAgICAgICAgICBtb3ZlVG8gPSBwb2ludC5tb3ZlVG8sXG4gICAgICAgICAgeCA9IHBvaW50LngsXG4gICAgICAgICAgeSA9IHBvaW50Lnk7XG5cbiAgICAgIHZhciBpc0ZpcnN0UG9pbnQgPSBpID09PSAwIHx8IG1vdmVUbztcbiAgICAgIHZhciBpc0xhc3RQb2ludCA9IGkgPT09IHAubGVuZ3RoIC0gMSB8fCBwW2kgKyAxXS5tb3ZlVG87XG4gICAgICB2YXIgcHJldlBvaW50ID0gaSA9PT0gMCA/IG51bGwgOiBwW2kgLSAxXTtcblxuICAgICAgaWYgKGlzRmlyc3RQb2ludCkge1xuICAgICAgICBmaXJzdFBvaW50ID0gcG9pbnQ7XG5cbiAgICAgICAgaWYgKCFpc0xhc3RQb2ludCkge1xuICAgICAgICAgIGQgKz0gJ00nICsgeCArICcsJyArIHk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY3VydmUpIHtcbiAgICAgICAgc3dpdGNoIChjdXJ2ZS50eXBlKSB7XG4gICAgICAgICAgY2FzZSAnYXJjJzpcbiAgICAgICAgICAgIHZhciBfcG9pbnQkY3VydmUyID0gcG9pbnQuY3VydmUsXG4gICAgICAgICAgICAgICAgX3BvaW50JGN1cnZlMiRsYXJnZUFyID0gX3BvaW50JGN1cnZlMi5sYXJnZUFyY0ZsYWcsXG4gICAgICAgICAgICAgICAgbGFyZ2VBcmNGbGFnID0gX3BvaW50JGN1cnZlMiRsYXJnZUFyID09PSB1bmRlZmluZWQgPyAwIDogX3BvaW50JGN1cnZlMiRsYXJnZUFyLFxuICAgICAgICAgICAgICAgIHJ4ID0gX3BvaW50JGN1cnZlMi5yeCxcbiAgICAgICAgICAgICAgICByeSA9IF9wb2ludCRjdXJ2ZTIucnksXG4gICAgICAgICAgICAgICAgX3BvaW50JGN1cnZlMiRzd2VlcEZsID0gX3BvaW50JGN1cnZlMi5zd2VlcEZsYWcsXG4gICAgICAgICAgICAgICAgc3dlZXBGbGFnID0gX3BvaW50JGN1cnZlMiRzd2VlcEZsID09PSB1bmRlZmluZWQgPyAwIDogX3BvaW50JGN1cnZlMiRzd2VlcEZsLFxuICAgICAgICAgICAgICAgIF9wb2ludCRjdXJ2ZTIkeEF4aXNSbyA9IF9wb2ludCRjdXJ2ZTIueEF4aXNSb3RhdGlvbixcbiAgICAgICAgICAgICAgICB4QXhpc1JvdGF0aW9uID0gX3BvaW50JGN1cnZlMiR4QXhpc1JvID09PSB1bmRlZmluZWQgPyAwIDogX3BvaW50JGN1cnZlMiR4QXhpc1JvO1xuXG4gICAgICAgICAgICBkICs9ICdBJyArIHJ4ICsgJywnICsgcnkgKyAnLCcgKyB4QXhpc1JvdGF0aW9uICsgJywnICsgbGFyZ2VBcmNGbGFnICsgJywnICsgc3dlZXBGbGFnICsgJywnICsgeCArICcsJyArIHk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjdWJpYyc6XG4gICAgICAgICAgICB2YXIgX3BvaW50JGN1cnZlMyA9IHBvaW50LmN1cnZlLFxuICAgICAgICAgICAgICAgIGN4MSA9IF9wb2ludCRjdXJ2ZTMueDEsXG4gICAgICAgICAgICAgICAgY3kxID0gX3BvaW50JGN1cnZlMy55MSxcbiAgICAgICAgICAgICAgICBjeDIgPSBfcG9pbnQkY3VydmUzLngyLFxuICAgICAgICAgICAgICAgIGN5MiA9IF9wb2ludCRjdXJ2ZTMueTI7XG5cbiAgICAgICAgICAgIGQgKz0gJ0MnICsgY3gxICsgJywnICsgY3kxICsgJywnICsgY3gyICsgJywnICsgY3kyICsgJywnICsgeCArICcsJyArIHk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdxdWFkcmF0aWMnOlxuICAgICAgICAgICAgdmFyIF9wb2ludCRjdXJ2ZTQgPSBwb2ludC5jdXJ2ZSxcbiAgICAgICAgICAgICAgICBxeDEgPSBfcG9pbnQkY3VydmU0LngxLFxuICAgICAgICAgICAgICAgIHF5MSA9IF9wb2ludCRjdXJ2ZTQueTE7XG5cbiAgICAgICAgICAgIGQgKz0gJ1EnICsgcXgxICsgJywnICsgcXkxICsgJywnICsgeCArICcsJyArIHk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0xhc3RQb2ludCAmJiB4ID09PSBmaXJzdFBvaW50LnggJiYgeSA9PT0gZmlyc3RQb2ludC55KSB7XG4gICAgICAgICAgZCArPSAnWic7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNMYXN0UG9pbnQgJiYgeCA9PT0gZmlyc3RQb2ludC54ICYmIHkgPT09IGZpcnN0UG9pbnQueSkge1xuICAgICAgICBkICs9ICdaJztcbiAgICAgIH0gZWxzZSBpZiAoeCAhPT0gcHJldlBvaW50LnggJiYgeSAhPT0gcHJldlBvaW50LnkpIHtcbiAgICAgICAgZCArPSAnTCcgKyB4ICsgJywnICsgeTtcbiAgICAgIH0gZWxzZSBpZiAoeCAhPT0gcHJldlBvaW50LngpIHtcbiAgICAgICAgZCArPSAnSCcgKyB4O1xuICAgICAgfSBlbHNlIGlmICh5ICE9PSBwcmV2UG9pbnQueSkge1xuICAgICAgICBkICs9ICdWJyArIHk7XG4gICAgICB9XG5cbiAgICAgIGkrKztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGQ7XG59O1xuXG52YXIgdG9QYXRoID0gZnVuY3Rpb24gdG9QYXRoKHMpIHtcbiAgdmFyIGlzUG9pbnRzID0gQXJyYXkuaXNBcnJheShzKTtcbiAgdmFyIGlzR3JvdXAgPSBpc1BvaW50cyA/IEFycmF5LmlzQXJyYXkoc1swXSkgOiBzLnR5cGUgPT09ICdnJztcbiAgdmFyIHBvaW50cyA9IGlzUG9pbnRzID8gcyA6IGlzR3JvdXAgPyBzLnNoYXBlcy5tYXAoZnVuY3Rpb24gKHNocCkge1xuICAgIHJldHVybiB0b1BvaW50cyhzaHApO1xuICB9KSA6IHRvUG9pbnRzKHMpO1xuXG4gIGlmIChpc0dyb3VwKSB7XG4gICAgcmV0dXJuIHBvaW50cy5tYXAoZnVuY3Rpb24gKHApIHtcbiAgICAgIHJldHVybiBwb2ludHNUb0QocCk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gcG9pbnRzVG9EKHBvaW50cyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB0b1BhdGg7IiwidmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG52YXIgdG9Qb2ludHMgPSBmdW5jdGlvbiB0b1BvaW50cyhfcmVmKSB7XG4gIHZhciB0eXBlID0gX3JlZi50eXBlLFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZiwgWyd0eXBlJ10pO1xuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ2NpcmNsZSc6XG4gICAgICByZXR1cm4gZ2V0UG9pbnRzRnJvbUNpcmNsZShwcm9wcyk7XG4gICAgY2FzZSAnZWxsaXBzZSc6XG4gICAgICByZXR1cm4gZ2V0UG9pbnRzRnJvbUVsbGlwc2UocHJvcHMpO1xuICAgIGNhc2UgJ2xpbmUnOlxuICAgICAgcmV0dXJuIGdldFBvaW50c0Zyb21MaW5lKHByb3BzKTtcbiAgICBjYXNlICdwYXRoJzpcbiAgICAgIHJldHVybiBnZXRQb2ludHNGcm9tUGF0aChwcm9wcyk7XG4gICAgY2FzZSAncG9seWdvbic6XG4gICAgICByZXR1cm4gZ2V0UG9pbnRzRnJvbVBvbHlnb24ocHJvcHMpO1xuICAgIGNhc2UgJ3BvbHlsaW5lJzpcbiAgICAgIHJldHVybiBnZXRQb2ludHNGcm9tUG9seWxpbmUocHJvcHMpO1xuICAgIGNhc2UgJ3JlY3QnOlxuICAgICAgcmV0dXJuIGdldFBvaW50c0Zyb21SZWN0KHByb3BzKTtcbiAgICBjYXNlICdnJzpcbiAgICAgIHJldHVybiBnZXRQb2ludHNGcm9tRyhwcm9wcyk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGEgdmFsaWQgc2hhcGUgdHlwZScpO1xuICB9XG59O1xuXG52YXIgZ2V0UG9pbnRzRnJvbUNpcmNsZSA9IGZ1bmN0aW9uIGdldFBvaW50c0Zyb21DaXJjbGUoX3JlZjIpIHtcbiAgdmFyIGN4ID0gX3JlZjIuY3gsXG4gICAgICBjeSA9IF9yZWYyLmN5LFxuICAgICAgciA9IF9yZWYyLnI7XG5cbiAgcmV0dXJuIFt7IHg6IGN4LCB5OiBjeSAtIHIsIG1vdmVUbzogdHJ1ZSB9LCB7IHg6IGN4LCB5OiBjeSArIHIsIGN1cnZlOiB7IHR5cGU6ICdhcmMnLCByeDogciwgcnk6IHIsIHN3ZWVwRmxhZzogMSB9IH0sIHsgeDogY3gsIHk6IGN5IC0gciwgY3VydmU6IHsgdHlwZTogJ2FyYycsIHJ4OiByLCByeTogciwgc3dlZXBGbGFnOiAxIH0gfV07XG59O1xuXG52YXIgZ2V0UG9pbnRzRnJvbUVsbGlwc2UgPSBmdW5jdGlvbiBnZXRQb2ludHNGcm9tRWxsaXBzZShfcmVmMykge1xuICB2YXIgY3ggPSBfcmVmMy5jeCxcbiAgICAgIGN5ID0gX3JlZjMuY3ksXG4gICAgICByeCA9IF9yZWYzLnJ4LFxuICAgICAgcnkgPSBfcmVmMy5yeTtcblxuICByZXR1cm4gW3sgeDogY3gsIHk6IGN5IC0gcnksIG1vdmVUbzogdHJ1ZSB9LCB7IHg6IGN4LCB5OiBjeSArIHJ5LCBjdXJ2ZTogeyB0eXBlOiAnYXJjJywgcng6IHJ4LCByeTogcnksIHN3ZWVwRmxhZzogMSB9IH0sIHsgeDogY3gsIHk6IGN5IC0gcnksIGN1cnZlOiB7IHR5cGU6ICdhcmMnLCByeDogcngsIHJ5OiByeSwgc3dlZXBGbGFnOiAxIH0gfV07XG59O1xuXG52YXIgZ2V0UG9pbnRzRnJvbUxpbmUgPSBmdW5jdGlvbiBnZXRQb2ludHNGcm9tTGluZShfcmVmNCkge1xuICB2YXIgeDEgPSBfcmVmNC54MSxcbiAgICAgIHgyID0gX3JlZjQueDIsXG4gICAgICB5MSA9IF9yZWY0LnkxLFxuICAgICAgeTIgPSBfcmVmNC55MjtcblxuICByZXR1cm4gW3sgeDogeDEsIHk6IHkxLCBtb3ZlVG86IHRydWUgfSwgeyB4OiB4MiwgeTogeTIgfV07XG59O1xuXG52YXIgdmFsaWRDb21tYW5kcyA9IC9bTW1MbEhoVnZDY1NzUXFUdEFhWnpdL2c7XG5cbnZhciBjb21tYW5kTGVuZ3RocyA9IHtcbiAgQTogNyxcbiAgQzogNixcbiAgSDogMSxcbiAgTDogMixcbiAgTTogMixcbiAgUTogNCxcbiAgUzogNCxcbiAgVDogMixcbiAgVjogMSxcbiAgWjogMFxufTtcblxudmFyIHJlbGF0aXZlQ29tbWFuZHMgPSBbJ2EnLCAnYycsICdoJywgJ2wnLCAnbScsICdxJywgJ3MnLCAndCcsICd2J107XG5cbnZhciBpc1JlbGF0aXZlID0gZnVuY3Rpb24gaXNSZWxhdGl2ZShjb21tYW5kKSB7XG4gIHJldHVybiByZWxhdGl2ZUNvbW1hbmRzLmluZGV4T2YoY29tbWFuZCkgIT09IC0xO1xufTtcblxudmFyIG9wdGlvbmFsQXJjS2V5cyA9IFsneEF4aXNSb3RhdGlvbicsICdsYXJnZUFyY0ZsYWcnLCAnc3dlZXBGbGFnJ107XG5cbnZhciBnZXRDb21tYW5kcyA9IGZ1bmN0aW9uIGdldENvbW1hbmRzKGQpIHtcbiAgcmV0dXJuIGQubWF0Y2godmFsaWRDb21tYW5kcyk7XG59O1xuXG52YXIgZ2V0UGFyYW1zID0gZnVuY3Rpb24gZ2V0UGFyYW1zKGQpIHtcbiAgcmV0dXJuIGQuc3BsaXQodmFsaWRDb21tYW5kcykubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgcmV0dXJuIHYucmVwbGFjZSgvWzAtOV0rLS9nLCBmdW5jdGlvbiAobSkge1xuICAgICAgcmV0dXJuIG0uc2xpY2UoMCwgLTEpICsgJyAtJztcbiAgICB9KTtcbiAgfSkubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgcmV0dXJuIHYucmVwbGFjZSgvXFwuWzAtOV0rL2csIGZ1bmN0aW9uIChtKSB7XG4gICAgICByZXR1cm4gbSArICcgJztcbiAgICB9KTtcbiAgfSkubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgcmV0dXJuIHYudHJpbSgpO1xuICB9KS5maWx0ZXIoZnVuY3Rpb24gKHYpIHtcbiAgICByZXR1cm4gdi5sZW5ndGggPiAwO1xuICB9KS5tYXAoZnVuY3Rpb24gKHYpIHtcbiAgICByZXR1cm4gdi5zcGxpdCgvWyAsXSsvKS5tYXAocGFyc2VGbG9hdCkuZmlsdGVyKGZ1bmN0aW9uIChuKSB7XG4gICAgICByZXR1cm4gIWlzTmFOKG4pO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbnZhciBnZXRQb2ludHNGcm9tUGF0aCA9IGZ1bmN0aW9uIGdldFBvaW50c0Zyb21QYXRoKF9yZWY1KSB7XG4gIHZhciBkID0gX3JlZjUuZDtcblxuICB2YXIgY29tbWFuZHMgPSBnZXRDb21tYW5kcyhkKTtcbiAgdmFyIHBhcmFtcyA9IGdldFBhcmFtcyhkKTtcblxuICB2YXIgcG9pbnRzID0gW107XG5cbiAgdmFyIG1vdmVUbyA9IHZvaWQgMDtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGNvbW1hbmRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHZhciBjb21tYW5kID0gY29tbWFuZHNbaV07XG4gICAgdmFyIHVwcGVyQ2FzZUNvbW1hbmQgPSBjb21tYW5kLnRvVXBwZXJDYXNlKCk7XG4gICAgdmFyIGNvbW1hbmRMZW5ndGggPSBjb21tYW5kTGVuZ3Roc1t1cHBlckNhc2VDb21tYW5kXTtcbiAgICB2YXIgcmVsYXRpdmUgPSBpc1JlbGF0aXZlKGNvbW1hbmQpO1xuXG4gICAgaWYgKGNvbW1hbmRMZW5ndGggPiAwKSB7XG4gICAgICB2YXIgY29tbWFuZFBhcmFtcyA9IHBhcmFtcy5zaGlmdCgpO1xuICAgICAgdmFyIGl0ZXJhdGlvbnMgPSBjb21tYW5kUGFyYW1zLmxlbmd0aCAvIGNvbW1hbmRMZW5ndGg7XG5cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaXRlcmF0aW9uczsgaisrKSB7XG4gICAgICAgIHZhciBwcmV2UG9pbnQgPSBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdIHx8IHsgeDogMCwgeTogMCB9O1xuXG4gICAgICAgIHN3aXRjaCAodXBwZXJDYXNlQ29tbWFuZCkge1xuICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgdmFyIHggPSAocmVsYXRpdmUgPyBwcmV2UG9pbnQueCA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpO1xuICAgICAgICAgICAgdmFyIHkgPSAocmVsYXRpdmUgPyBwcmV2UG9pbnQueSA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpO1xuXG4gICAgICAgICAgICBpZiAoaiA9PT0gMCkge1xuICAgICAgICAgICAgICBtb3ZlVG8gPSB7IHg6IHgsIHk6IHkgfTtcbiAgICAgICAgICAgICAgcG9pbnRzLnB1c2goeyB4OiB4LCB5OiB5LCBtb3ZlVG86IHRydWUgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwb2ludHMucHVzaCh7IHg6IHgsIHk6IHkgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnTCc6XG4gICAgICAgICAgICBwb2ludHMucHVzaCh7XG4gICAgICAgICAgICAgIHg6IChyZWxhdGl2ZSA/IHByZXZQb2ludC54IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCksXG4gICAgICAgICAgICAgIHk6IChyZWxhdGl2ZSA/IHByZXZQb2ludC55IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ0gnOlxuICAgICAgICAgICAgcG9pbnRzLnB1c2goe1xuICAgICAgICAgICAgICB4OiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueCA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICB5OiBwcmV2UG9pbnQueVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnVic6XG4gICAgICAgICAgICBwb2ludHMucHVzaCh7XG4gICAgICAgICAgICAgIHg6IHByZXZQb2ludC54LFxuICAgICAgICAgICAgICB5OiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueSA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgY3VydmU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYXJjJyxcbiAgICAgICAgICAgICAgICByeDogY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIHJ5OiBjb21tYW5kUGFyYW1zLnNoaWZ0KCksXG4gICAgICAgICAgICAgICAgeEF4aXNSb3RhdGlvbjogY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIGxhcmdlQXJjRmxhZzogY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIHN3ZWVwRmxhZzogY29tbWFuZFBhcmFtcy5zaGlmdCgpXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHg6IChyZWxhdGl2ZSA/IHByZXZQb2ludC54IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCksXG4gICAgICAgICAgICAgIHk6IChyZWxhdGl2ZSA/IHByZXZQb2ludC55IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gb3B0aW9uYWxBcmNLZXlzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBrID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICAgICAgICBpZiAocG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXVsnY3VydmUnXVtrXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgZGVsZXRlIHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV1bJ2N1cnZlJ11ba107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdDJzpcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgY3VydmU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnY3ViaWMnLFxuICAgICAgICAgICAgICAgIHgxOiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueCA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIHkxOiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueSA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIHgyOiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueCA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIHkyOiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueSA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHg6IChyZWxhdGl2ZSA/IHByZXZQb2ludC54IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCksXG4gICAgICAgICAgICAgIHk6IChyZWxhdGl2ZSA/IHByZXZQb2ludC55IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ1MnOlxuICAgICAgICAgICAgdmFyIHN4MiA9IChyZWxhdGl2ZSA/IHByZXZQb2ludC54IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCk7XG4gICAgICAgICAgICB2YXIgc3kyID0gKHJlbGF0aXZlID8gcHJldlBvaW50LnkgOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKTtcbiAgICAgICAgICAgIHZhciBzeCA9IChyZWxhdGl2ZSA/IHByZXZQb2ludC54IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCk7XG4gICAgICAgICAgICB2YXIgc3kgPSAocmVsYXRpdmUgPyBwcmV2UG9pbnQueSA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpO1xuXG4gICAgICAgICAgICB2YXIgZGlmZiA9IHt9O1xuXG4gICAgICAgICAgICB2YXIgc3gxID0gdm9pZCAwO1xuICAgICAgICAgICAgdmFyIHN5MSA9IHZvaWQgMDtcblxuICAgICAgICAgICAgaWYgKHByZXZQb2ludC5jdXJ2ZSAmJiBwcmV2UG9pbnQuY3VydmUudHlwZSA9PT0gJ2N1YmljJykge1xuICAgICAgICAgICAgICBkaWZmLnggPSBNYXRoLmFicyhwcmV2UG9pbnQueCAtIHByZXZQb2ludC5jdXJ2ZS54Mik7XG4gICAgICAgICAgICAgIGRpZmYueSA9IE1hdGguYWJzKHByZXZQb2ludC55IC0gcHJldlBvaW50LmN1cnZlLnkyKTtcbiAgICAgICAgICAgICAgc3gxID0gcHJldlBvaW50LnggPCBwcmV2UG9pbnQuY3VydmUueDIgPyBwcmV2UG9pbnQueCAtIGRpZmYueCA6IHByZXZQb2ludC54ICsgZGlmZi54O1xuICAgICAgICAgICAgICBzeTEgPSBwcmV2UG9pbnQueSA8IHByZXZQb2ludC5jdXJ2ZS55MiA/IHByZXZQb2ludC55IC0gZGlmZi55IDogcHJldlBvaW50LnkgKyBkaWZmLnk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkaWZmLnggPSBNYXRoLmFicyhzeCAtIHN4Mik7XG4gICAgICAgICAgICAgIGRpZmYueSA9IE1hdGguYWJzKHN5IC0gc3kyKTtcbiAgICAgICAgICAgICAgc3gxID0gcHJldlBvaW50Lng7XG4gICAgICAgICAgICAgIHN5MSA9IHByZXZQb2ludC55O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwb2ludHMucHVzaCh7IGN1cnZlOiB7IHR5cGU6ICdjdWJpYycsIHgxOiBzeDEsIHkxOiBzeTEsIHgyOiBzeDIsIHkyOiBzeTIgfSwgeDogc3gsIHk6IHN5IH0pO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ1EnOlxuICAgICAgICAgICAgcG9pbnRzLnB1c2goe1xuICAgICAgICAgICAgICBjdXJ2ZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdxdWFkcmF0aWMnLFxuICAgICAgICAgICAgICAgIHgxOiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueCA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIHkxOiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueSA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHg6IChyZWxhdGl2ZSA/IHByZXZQb2ludC54IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCksXG4gICAgICAgICAgICAgIHk6IChyZWxhdGl2ZSA/IHByZXZQb2ludC55IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ1QnOlxuICAgICAgICAgICAgdmFyIHR4ID0gKHJlbGF0aXZlID8gcHJldlBvaW50LnggOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKTtcbiAgICAgICAgICAgIHZhciB0eSA9IChyZWxhdGl2ZSA/IHByZXZQb2ludC55IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIHZhciB0eDEgPSB2b2lkIDA7XG4gICAgICAgICAgICB2YXIgdHkxID0gdm9pZCAwO1xuXG4gICAgICAgICAgICBpZiAocHJldlBvaW50LmN1cnZlICYmIHByZXZQb2ludC5jdXJ2ZS50eXBlID09PSAncXVhZHJhdGljJykge1xuICAgICAgICAgICAgICB2YXIgX2RpZmYgPSB7XG4gICAgICAgICAgICAgICAgeDogTWF0aC5hYnMocHJldlBvaW50LnggLSBwcmV2UG9pbnQuY3VydmUueDEpLFxuICAgICAgICAgICAgICAgIHk6IE1hdGguYWJzKHByZXZQb2ludC55IC0gcHJldlBvaW50LmN1cnZlLnkxKVxuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIHR4MSA9IHByZXZQb2ludC54IDwgcHJldlBvaW50LmN1cnZlLngxID8gcHJldlBvaW50LnggLSBfZGlmZi54IDogcHJldlBvaW50LnggKyBfZGlmZi54O1xuICAgICAgICAgICAgICB0eTEgPSBwcmV2UG9pbnQueSA8IHByZXZQb2ludC5jdXJ2ZS55MSA/IHByZXZQb2ludC55IC0gX2RpZmYueSA6IHByZXZQb2ludC55ICsgX2RpZmYueTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHR4MSA9IHByZXZQb2ludC54O1xuICAgICAgICAgICAgICB0eTEgPSBwcmV2UG9pbnQueTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcG9pbnRzLnB1c2goeyBjdXJ2ZTogeyB0eXBlOiAncXVhZHJhdGljJywgeDE6IHR4MSwgeTE6IHR5MSB9LCB4OiB0eCwgeTogdHkgfSk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBfcHJldlBvaW50ID0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXSB8fCB7IHg6IDAsIHk6IDAgfTtcblxuICAgICAgaWYgKF9wcmV2UG9pbnQueCAhPT0gbW92ZVRvLnggfHwgX3ByZXZQb2ludC55ICE9PSBtb3ZlVG8ueSkge1xuICAgICAgICBwb2ludHMucHVzaCh7IHg6IG1vdmVUby54LCB5OiBtb3ZlVG8ueSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcG9pbnRzO1xufTtcblxudmFyIGdldFBvaW50c0Zyb21Qb2x5Z29uID0gZnVuY3Rpb24gZ2V0UG9pbnRzRnJvbVBvbHlnb24oX3JlZjYpIHtcbiAgdmFyIHBvaW50cyA9IF9yZWY2LnBvaW50cztcblxuICByZXR1cm4gZ2V0UG9pbnRzRnJvbVBvaW50cyh7IGNsb3NlZDogdHJ1ZSwgcG9pbnRzOiBwb2ludHMgfSk7XG59O1xuXG52YXIgZ2V0UG9pbnRzRnJvbVBvbHlsaW5lID0gZnVuY3Rpb24gZ2V0UG9pbnRzRnJvbVBvbHlsaW5lKF9yZWY3KSB7XG4gIHZhciBwb2ludHMgPSBfcmVmNy5wb2ludHM7XG5cbiAgcmV0dXJuIGdldFBvaW50c0Zyb21Qb2ludHMoeyBjbG9zZWQ6IGZhbHNlLCBwb2ludHM6IHBvaW50cyB9KTtcbn07XG5cbnZhciBnZXRQb2ludHNGcm9tUG9pbnRzID0gZnVuY3Rpb24gZ2V0UG9pbnRzRnJvbVBvaW50cyhfcmVmOCkge1xuICB2YXIgY2xvc2VkID0gX3JlZjguY2xvc2VkLFxuICAgICAgcG9pbnRzID0gX3JlZjgucG9pbnRzO1xuXG4gIHZhciBudW1iZXJzID0gcG9pbnRzLnNwbGl0KC9bXFxzLF0rLykubWFwKGZ1bmN0aW9uIChuKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQobik7XG4gIH0pO1xuXG4gIHZhciBwID0gbnVtYmVycy5yZWR1Y2UoZnVuY3Rpb24gKGFyciwgcG9pbnQsIGkpIHtcbiAgICBpZiAoaSAlIDIgPT09IDApIHtcbiAgICAgIGFyci5wdXNoKHsgeDogcG9pbnQgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyclsoaSAtIDEpIC8gMl0ueSA9IHBvaW50O1xuICAgIH1cblxuICAgIHJldHVybiBhcnI7XG4gIH0sIFtdKTtcblxuICBpZiAoY2xvc2VkKSB7XG4gICAgcC5wdXNoKF9leHRlbmRzKHt9LCBwWzBdKSk7XG4gIH1cblxuICBwWzBdLm1vdmVUbyA9IHRydWU7XG5cbiAgcmV0dXJuIHA7XG59O1xuXG52YXIgZ2V0UG9pbnRzRnJvbVJlY3QgPSBmdW5jdGlvbiBnZXRQb2ludHNGcm9tUmVjdChfcmVmOSkge1xuICB2YXIgaGVpZ2h0ID0gX3JlZjkuaGVpZ2h0LFxuICAgICAgcnggPSBfcmVmOS5yeCxcbiAgICAgIHJ5ID0gX3JlZjkucnksXG4gICAgICB3aWR0aCA9IF9yZWY5LndpZHRoLFxuICAgICAgeCA9IF9yZWY5LngsXG4gICAgICB5ID0gX3JlZjkueTtcblxuICBpZiAocnggfHwgcnkpIHtcbiAgICByZXR1cm4gZ2V0UG9pbnRzRnJvbVJlY3RXaXRoQ29ybmVyUmFkaXVzKHtcbiAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgcng6IHJ4IHx8IHJ5LFxuICAgICAgcnk6IHJ5IHx8IHJ4LFxuICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgeDogeCxcbiAgICAgIHk6IHlcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBnZXRQb2ludHNGcm9tQmFzaWNSZWN0KHsgaGVpZ2h0OiBoZWlnaHQsIHdpZHRoOiB3aWR0aCwgeDogeCwgeTogeSB9KTtcbn07XG5cbnZhciBnZXRQb2ludHNGcm9tQmFzaWNSZWN0ID0gZnVuY3Rpb24gZ2V0UG9pbnRzRnJvbUJhc2ljUmVjdChfcmVmMTApIHtcbiAgdmFyIGhlaWdodCA9IF9yZWYxMC5oZWlnaHQsXG4gICAgICB3aWR0aCA9IF9yZWYxMC53aWR0aCxcbiAgICAgIHggPSBfcmVmMTAueCxcbiAgICAgIHkgPSBfcmVmMTAueTtcblxuICByZXR1cm4gW3sgeDogeCwgeTogeSwgbW92ZVRvOiB0cnVlIH0sIHsgeDogeCArIHdpZHRoLCB5OiB5IH0sIHsgeDogeCArIHdpZHRoLCB5OiB5ICsgaGVpZ2h0IH0sIHsgeDogeCwgeTogeSArIGhlaWdodCB9LCB7IHg6IHgsIHk6IHkgfV07XG59O1xuXG52YXIgZ2V0UG9pbnRzRnJvbVJlY3RXaXRoQ29ybmVyUmFkaXVzID0gZnVuY3Rpb24gZ2V0UG9pbnRzRnJvbVJlY3RXaXRoQ29ybmVyUmFkaXVzKF9yZWYxMSkge1xuICB2YXIgaGVpZ2h0ID0gX3JlZjExLmhlaWdodCxcbiAgICAgIHJ4ID0gX3JlZjExLnJ4LFxuICAgICAgcnkgPSBfcmVmMTEucnksXG4gICAgICB3aWR0aCA9IF9yZWYxMS53aWR0aCxcbiAgICAgIHggPSBfcmVmMTEueCxcbiAgICAgIHkgPSBfcmVmMTEueTtcblxuICB2YXIgY3VydmUgPSB7IHR5cGU6ICdhcmMnLCByeDogcngsIHJ5OiByeSwgc3dlZXBGbGFnOiAxIH07XG5cbiAgcmV0dXJuIFt7IHg6IHggKyByeCwgeTogeSwgbW92ZVRvOiB0cnVlIH0sIHsgeDogeCArIHdpZHRoIC0gcngsIHk6IHkgfSwgeyB4OiB4ICsgd2lkdGgsIHk6IHkgKyByeSwgY3VydmU6IGN1cnZlIH0sIHsgeDogeCArIHdpZHRoLCB5OiB5ICsgaGVpZ2h0IC0gcnkgfSwgeyB4OiB4ICsgd2lkdGggLSByeCwgeTogeSArIGhlaWdodCwgY3VydmU6IGN1cnZlIH0sIHsgeDogeCArIHJ4LCB5OiB5ICsgaGVpZ2h0IH0sIHsgeDogeCwgeTogeSArIGhlaWdodCAtIHJ5LCBjdXJ2ZTogY3VydmUgfSwgeyB4OiB4LCB5OiB5ICsgcnkgfSwgeyB4OiB4ICsgcngsIHk6IHksIGN1cnZlOiBjdXJ2ZSB9XTtcbn07XG5cbnZhciBnZXRQb2ludHNGcm9tRyA9IGZ1bmN0aW9uIGdldFBvaW50c0Zyb21HKF9yZWYxMikge1xuICB2YXIgc2hhcGVzID0gX3JlZjEyLnNoYXBlcztcbiAgcmV0dXJuIHNoYXBlcy5tYXAoZnVuY3Rpb24gKHMpIHtcbiAgICByZXR1cm4gdG9Qb2ludHMocyk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdG9Qb2ludHM7IiwidmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgZ2V0RXJyb3JzID0gZnVuY3Rpb24gZ2V0RXJyb3JzKHNoYXBlKSB7XG4gIHZhciBydWxlcyA9IGdldFJ1bGVzKHNoYXBlKTtcbiAgdmFyIGVycm9ycyA9IFtdO1xuXG4gIHJ1bGVzLm1hcChmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBtYXRjaCA9IF9yZWYubWF0Y2gsXG4gICAgICAgIHByb3AgPSBfcmVmLnByb3AsXG4gICAgICAgIHJlcXVpcmVkID0gX3JlZi5yZXF1aXJlZCxcbiAgICAgICAgdHlwZSA9IF9yZWYudHlwZTtcblxuICAgIGlmICh0eXBlb2Ygc2hhcGVbcHJvcF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgZXJyb3JzLnB1c2gocHJvcCArICcgcHJvcCBpcyByZXF1aXJlZCcgKyAocHJvcCA9PT0gJ3R5cGUnID8gJycgOiAnIG9uIGEgJyArIHNoYXBlLnR5cGUpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShzaGFwZVtwcm9wXSkpIHtcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKHByb3AgKyAnIHByb3AgbXVzdCBiZSBvZiB0eXBlIGFycmF5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKF90eXBlb2Yoc2hhcGVbcHJvcF0pICE9PSB0eXBlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSB2YWxpZC10eXBlb2ZcbiAgICAgICAgICBlcnJvcnMucHVzaChwcm9wICsgJyBwcm9wIG11c3QgYmUgb2YgdHlwZSAnICsgdHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWF0Y2gpKSB7XG4gICAgICAgIGlmIChtYXRjaC5pbmRleE9mKHNoYXBlW3Byb3BdKSA9PT0gLTEpIHtcbiAgICAgICAgICBlcnJvcnMucHVzaChwcm9wICsgJyBwcm9wIG11c3QgYmUgb25lIG9mICcgKyBtYXRjaC5qb2luKCcsICcpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKHNoYXBlLnR5cGUgPT09ICdnJyAmJiBBcnJheS5pc0FycmF5KHNoYXBlLnNoYXBlcykpIHtcbiAgICB2YXIgY2hpbGRFcnJvcnMgPSBzaGFwZS5zaGFwZXMubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3JzKHMpO1xuICAgIH0pO1xuICAgIHJldHVybiBbXS5jb25jYXQuYXBwbHkoZXJyb3JzLCBjaGlsZEVycm9ycyk7XG4gIH1cblxuICByZXR1cm4gZXJyb3JzO1xufTtcblxudmFyIGdldFJ1bGVzID0gZnVuY3Rpb24gZ2V0UnVsZXMoc2hhcGUpIHtcbiAgdmFyIHJ1bGVzID0gW3tcbiAgICBtYXRjaDogWydjaXJjbGUnLCAnZWxsaXBzZScsICdsaW5lJywgJ3BhdGgnLCAncG9seWdvbicsICdwb2x5bGluZScsICdyZWN0JywgJ2cnXSxcbiAgICBwcm9wOiAndHlwZScsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHlwZTogJ3N0cmluZydcbiAgfV07XG5cbiAgc3dpdGNoIChzaGFwZS50eXBlKSB7XG4gICAgY2FzZSAnY2lyY2xlJzpcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAnY3gnLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ2N5JywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICdyJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdlbGxpcHNlJzpcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAnY3gnLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ2N5JywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICdyeCcsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAncnknLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2xpbmUnOlxuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICd4MScsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAneDInLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ3kxJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICd5MicsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAncGF0aCc6XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ2QnLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ3N0cmluZycgfSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3BvbHlnb24nOlxuICAgIGNhc2UgJ3BvbHlsaW5lJzpcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAncG9pbnRzJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdzdHJpbmcnIH0pO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdyZWN0JzpcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAnaGVpZ2h0JywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICdyeCcsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICdyeScsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICd3aWR0aCcsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAneCcsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAneScsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnZyc6XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ3NoYXBlcycsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnYXJyYXknIH0pO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gcnVsZXM7XG59O1xuXG52YXIgdmFsaWQgPSBmdW5jdGlvbiB2YWxpZChzaGFwZSkge1xuICB2YXIgZXJyb3JzID0gZ2V0RXJyb3JzKHNoYXBlKTtcblxuICByZXR1cm4ge1xuICAgIGVycm9yczogZXJyb3JzLFxuICAgIHZhbGlkOiBlcnJvcnMubGVuZ3RoID09PSAwXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB2YWxpZDsiLCI7KGZ1bmN0aW9uIGluamVjdChjbGVhbiwgcHJlY2lzaW9uLCB1bmRlZikge1xuXG4gIHZhciBpc0FycmF5ID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpID09PSBcIltvYmplY3QgQXJyYXldXCI7XG4gIH07XG5cbiAgdmFyIGRlZmluZWQgPSBmdW5jdGlvbihhKSB7XG4gICAgcmV0dXJuIGEgIT09IHVuZGVmO1xuICB9O1xuXG4gIGZ1bmN0aW9uIFZlYzIoeCwgeSkge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBWZWMyKSkge1xuICAgICAgcmV0dXJuIG5ldyBWZWMyKHgsIHkpO1xuICAgIH1cblxuICAgIGlmIChpc0FycmF5KHgpKSB7XG4gICAgICB5ID0geFsxXTtcbiAgICAgIHggPSB4WzBdO1xuICAgIH0gZWxzZSBpZignb2JqZWN0JyA9PT0gdHlwZW9mIHggJiYgeCkge1xuICAgICAgeSA9IHgueTtcbiAgICAgIHggPSB4Lng7XG4gICAgfVxuXG4gICAgdGhpcy54ID0gVmVjMi5jbGVhbih4IHx8IDApO1xuICAgIHRoaXMueSA9IFZlYzIuY2xlYW4oeSB8fCAwKTtcbiAgfVxuXG4gIFZlYzIucHJvdG90eXBlID0ge1xuICAgIGNoYW5nZSA6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmICh0aGlzLm9ic2VydmVycykge1xuICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzLnB1c2goZm4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzID0gW2ZuXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLm9ic2VydmVycyAmJiB0aGlzLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgZm9yICh2YXIgaT10aGlzLm9ic2VydmVycy5sZW5ndGgtMTsgaT49MDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5vYnNlcnZlcnNbaV0odGhpcywgZm4pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBpZ25vcmUgOiBmdW5jdGlvbihmbikge1xuICAgICAgaWYgKHRoaXMub2JzZXJ2ZXJzKSB7XG4gICAgICAgIGlmICghZm4pIHtcbiAgICAgICAgICB0aGlzLm9ic2VydmVycyA9IFtdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBvID0gdGhpcy5vYnNlcnZlcnMsIGwgPSBvLmxlbmd0aDtcbiAgICAgICAgICB3aGlsZShsLS0pIHtcbiAgICAgICAgICAgIG9bbF0gPT09IGZuICYmIG8uc3BsaWNlKGwsIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIHNldCB4IGFuZCB5XG4gICAgc2V0OiBmdW5jdGlvbih4LCB5LCBub3RpZnkpIHtcbiAgICAgIGlmKCdudW1iZXInICE9IHR5cGVvZiB4KSB7XG4gICAgICAgIG5vdGlmeSA9IHk7XG4gICAgICAgIHkgPSB4Lnk7XG4gICAgICAgIHggPSB4Lng7XG4gICAgICB9XG5cbiAgICAgIGlmKHRoaXMueCA9PT0geCAmJiB0aGlzLnkgPT09IHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIHZhciBvcmlnID0gbnVsbDtcbiAgICAgIGlmIChub3RpZnkgIT09IGZhbHNlICYmIHRoaXMub2JzZXJ2ZXJzICYmIHRoaXMub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICBvcmlnID0gdGhpcy5jbG9uZSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnggPSBWZWMyLmNsZWFuKHgpO1xuICAgICAgdGhpcy55ID0gVmVjMi5jbGVhbih5KTtcblxuICAgICAgaWYobm90aWZ5ICE9PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2Uob3JpZyk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8vIHJlc2V0IHggYW5kIHkgdG8gemVyb1xuICAgIHplcm8gOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldCgwLCAwKTtcbiAgICB9LFxuXG4gICAgLy8gcmV0dXJuIGEgbmV3IHZlY3RvciB3aXRoIHRoZSBzYW1lIGNvbXBvbmVudCB2YWx1ZXNcbiAgICAvLyBhcyB0aGlzIG9uZVxuICAgIGNsb25lIDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3ICh0aGlzLmNvbnN0cnVjdG9yKSh0aGlzLngsIHRoaXMueSk7XG4gICAgfSxcblxuICAgIC8vIG5lZ2F0ZSB0aGUgdmFsdWVzIG9mIHRoaXMgdmVjdG9yXG4gICAgbmVnYXRlIDogZnVuY3Rpb24ocmV0dXJuTmV3KSB7XG4gICAgICBpZiAocmV0dXJuTmV3KSB7XG4gICAgICAgIHJldHVybiBuZXcgKHRoaXMuY29uc3RydWN0b3IpKC10aGlzLngsIC10aGlzLnkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0KC10aGlzLngsIC10aGlzLnkpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBBZGQgdGhlIGluY29taW5nIGB2ZWMyYCB2ZWN0b3IgdG8gdGhpcyB2ZWN0b3JcbiAgICBhZGQgOiBmdW5jdGlvbih4LCB5LCByZXR1cm5OZXcpIHtcblxuICAgICAgaWYgKHR5cGVvZiB4ICE9ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybk5ldyA9IHk7XG4gICAgICAgIGlmIChpc0FycmF5KHgpKSB7XG4gICAgICAgICAgeSA9IHhbMV07XG4gICAgICAgICAgeCA9IHhbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeSA9IHgueTtcbiAgICAgICAgICB4ID0geC54O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHggKz0gdGhpcy54O1xuICAgICAgeSArPSB0aGlzLnk7XG5cblxuICAgICAgaWYgKCFyZXR1cm5OZXcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0KHgsIHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmV0dXJuIGEgbmV3IHZlY3RvciBpZiBgcmV0dXJuTmV3YCBpcyB0cnV0aHlcbiAgICAgICAgcmV0dXJuIG5ldyAodGhpcy5jb25zdHJ1Y3RvcikoeCwgeSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8vIFN1YnRyYWN0IHRoZSBpbmNvbWluZyBgdmVjMmAgZnJvbSB0aGlzIHZlY3RvclxuICAgIHN1YnRyYWN0IDogZnVuY3Rpb24oeCwgeSwgcmV0dXJuTmV3KSB7XG4gICAgICBpZiAodHlwZW9mIHggIT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuTmV3ID0geTtcbiAgICAgICAgaWYgKGlzQXJyYXkoeCkpIHtcbiAgICAgICAgICB5ID0geFsxXTtcbiAgICAgICAgICB4ID0geFswXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB5ID0geC55O1xuICAgICAgICAgIHggPSB4Lng7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgeCA9IHRoaXMueCAtIHg7XG4gICAgICB5ID0gdGhpcy55IC0geTtcblxuICAgICAgaWYgKCFyZXR1cm5OZXcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0KHgsIHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmV0dXJuIGEgbmV3IHZlY3RvciBpZiBgcmV0dXJuTmV3YCBpcyB0cnV0aHlcbiAgICAgICAgcmV0dXJuIG5ldyAodGhpcy5jb25zdHJ1Y3RvcikoeCwgeSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8vIE11bHRpcGx5IHRoaXMgdmVjdG9yIGJ5IHRoZSBpbmNvbWluZyBgdmVjMmBcbiAgICBtdWx0aXBseSA6IGZ1bmN0aW9uKHgsIHksIHJldHVybk5ldykge1xuICAgICAgaWYgKHR5cGVvZiB4ICE9ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybk5ldyA9IHk7XG4gICAgICAgIGlmIChpc0FycmF5KHgpKSB7XG4gICAgICAgICAgeSA9IHhbMV07XG4gICAgICAgICAgeCA9IHhbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeSA9IHgueTtcbiAgICAgICAgICB4ID0geC54O1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB5ICE9ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybk5ldyA9IHk7XG4gICAgICAgIHkgPSB4O1xuICAgICAgfVxuXG4gICAgICB4ICo9IHRoaXMueDtcbiAgICAgIHkgKj0gdGhpcy55O1xuXG4gICAgICBpZiAoIXJldHVybk5ldykge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXQoeCwgeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3ICh0aGlzLmNvbnN0cnVjdG9yKSh4LCB5KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gUm90YXRlIHRoaXMgdmVjdG9yLiBBY2NlcHRzIGEgYFJvdGF0aW9uYCBvciBhbmdsZSBpbiByYWRpYW5zLlxuICAgIC8vXG4gICAgLy8gUGFzc2luZyBhIHRydXRoeSBgaW52ZXJzZWAgd2lsbCBjYXVzZSB0aGUgcm90YXRpb24gdG9cbiAgICAvLyBiZSByZXZlcnNlZC5cbiAgICAvL1xuICAgIC8vIElmIGByZXR1cm5OZXdgIGlzIHRydXRoeSwgYSBuZXdcbiAgICAvLyBgVmVjMmAgd2lsbCBiZSBjcmVhdGVkIHdpdGggdGhlIHZhbHVlcyByZXN1bHRpbmcgZnJvbVxuICAgIC8vIHRoZSByb3RhdGlvbi4gT3RoZXJ3aXNlIHRoZSByb3RhdGlvbiB3aWxsIGJlIGFwcGxpZWRcbiAgICAvLyB0byB0aGlzIHZlY3RvciBkaXJlY3RseSwgYW5kIHRoaXMgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWQuXG4gICAgcm90YXRlIDogZnVuY3Rpb24ociwgaW52ZXJzZSwgcmV0dXJuTmV3KSB7XG4gICAgICB2YXJcbiAgICAgIHggPSB0aGlzLngsXG4gICAgICB5ID0gdGhpcy55LFxuICAgICAgY29zID0gTWF0aC5jb3MociksXG4gICAgICBzaW4gPSBNYXRoLnNpbihyKSxcbiAgICAgIHJ4LCByeTtcblxuICAgICAgaW52ZXJzZSA9IChpbnZlcnNlKSA/IC0xIDogMTtcblxuICAgICAgcnggPSBjb3MgKiB4IC0gKGludmVyc2UgKiBzaW4pICogeTtcbiAgICAgIHJ5ID0gKGludmVyc2UgKiBzaW4pICogeCArIGNvcyAqIHk7XG5cbiAgICAgIGlmIChyZXR1cm5OZXcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyAodGhpcy5jb25zdHJ1Y3RvcikocngsIHJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldChyeCwgcnkpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIGxlbmd0aCBvZiB0aGlzIHZlY3RvclxuICAgIGxlbmd0aCA6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHggPSB0aGlzLngsIHkgPSB0aGlzLnk7XG4gICAgICByZXR1cm4gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xuICAgIH0sXG5cbiAgICAvLyBHZXQgdGhlIGxlbmd0aCBzcXVhcmVkLiBGb3IgcGVyZm9ybWFuY2UsIHVzZSB0aGlzIGluc3RlYWQgb2YgYFZlYzIjbGVuZ3RoYCAoaWYgcG9zc2libGUpLlxuICAgIGxlbmd0aFNxdWFyZWQgOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB4ID0gdGhpcy54LCB5ID0gdGhpcy55O1xuICAgICAgcmV0dXJuIHgqeCt5Knk7XG4gICAgfSxcblxuICAgIC8vIFJldHVybiB0aGUgZGlzdGFuY2UgYmV0d2VuIHRoaXMgYFZlYzJgIGFuZCB0aGUgaW5jb21pbmcgdmVjMiB2ZWN0b3JcbiAgICAvLyBhbmQgcmV0dXJuIGEgc2NhbGFyXG4gICAgZGlzdGFuY2UgOiBmdW5jdGlvbih2ZWMyKSB7XG4gICAgICB2YXIgeCA9IHRoaXMueCAtIHZlYzIueDtcbiAgICAgIHZhciB5ID0gdGhpcy55IC0gdmVjMi55O1xuICAgICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkpO1xuICAgIH0sXG5cbiAgICAvLyBHaXZlbiBBcnJheSBvZiBWZWMyLCBmaW5kIGNsb3Nlc3QgdG8gdGhpcyBWZWMyLlxuICAgIG5lYXJlc3QgOiBmdW5jdGlvbihvdGhlcnMpIHtcbiAgICAgIHZhclxuICAgICAgc2hvcnRlc3REaXN0YW5jZSA9IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICBuZWFyZXN0ID0gbnVsbCxcbiAgICAgIGN1cnJlbnREaXN0YW5jZTtcblxuICAgICAgZm9yICh2YXIgaSA9IG90aGVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBjdXJyZW50RGlzdGFuY2UgPSB0aGlzLmRpc3RhbmNlKG90aGVyc1tpXSk7XG4gICAgICAgIGlmIChjdXJyZW50RGlzdGFuY2UgPD0gc2hvcnRlc3REaXN0YW5jZSkge1xuICAgICAgICAgIHNob3J0ZXN0RGlzdGFuY2UgPSBjdXJyZW50RGlzdGFuY2U7XG4gICAgICAgICAgbmVhcmVzdCA9IG90aGVyc1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmVhcmVzdDtcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCB0aGlzIHZlY3RvciBpbnRvIGEgdW5pdCB2ZWN0b3IuXG4gICAgLy8gUmV0dXJucyB0aGUgbGVuZ3RoLlxuICAgIG5vcm1hbGl6ZSA6IGZ1bmN0aW9uKHJldHVybk5ldykge1xuICAgICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoKCk7XG5cbiAgICAgIC8vIENvbGxlY3QgYSByYXRpbyB0byBzaHJpbmsgdGhlIHggYW5kIHkgY29vcmRzXG4gICAgICB2YXIgaW52ZXJ0ZWRMZW5ndGggPSAobGVuZ3RoIDwgTnVtYmVyLk1JTl9WQUxVRSkgPyAwIDogMS9sZW5ndGg7XG5cbiAgICAgIGlmICghcmV0dXJuTmV3KSB7XG4gICAgICAgIC8vIENvbnZlcnQgdGhlIGNvb3JkcyB0byBiZSBncmVhdGVyIHRoYW4gemVyb1xuICAgICAgICAvLyBidXQgc21hbGxlciB0aGFuIG9yIGVxdWFsIHRvIDEuMFxuICAgICAgICByZXR1cm4gdGhpcy5zZXQodGhpcy54ICogaW52ZXJ0ZWRMZW5ndGgsIHRoaXMueSAqIGludmVydGVkTGVuZ3RoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgKHRoaXMuY29uc3RydWN0b3IpKHRoaXMueCAqIGludmVydGVkTGVuZ3RoLCB0aGlzLnkgKiBpbnZlcnRlZExlbmd0aCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8vIERldGVybWluZSBpZiBhbm90aGVyIGBWZWMyYCdzIGNvbXBvbmVudHMgbWF0Y2ggdGhpcyBvbmUnc1xuICAgIC8vIGFsc28gYWNjZXB0cyAyIHNjYWxhcnNcbiAgICBlcXVhbCA6IGZ1bmN0aW9uKHYsIHcpIHtcbiAgICAgIGlmICh0eXBlb2YgdiAhPSAnbnVtYmVyJykge1xuICAgICAgICBpZiAoaXNBcnJheSh2KSkge1xuICAgICAgICAgIHcgPSB2WzFdO1xuICAgICAgICAgIHYgPSB2WzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHcgPSB2Lnk7XG4gICAgICAgICAgdiA9IHYueDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFZlYzIuY2xlYW4odikgPT09IHRoaXMueCAmJiBWZWMyLmNsZWFuKHcpID09PSB0aGlzLnkpO1xuICAgIH0sXG5cbiAgICAvLyBSZXR1cm4gYSBuZXcgYFZlYzJgIHRoYXQgY29udGFpbnMgdGhlIGFic29sdXRlIHZhbHVlIG9mXG4gICAgLy8gZWFjaCBvZiB0aGlzIHZlY3RvcidzIHBhcnRzXG4gICAgYWJzIDogZnVuY3Rpb24ocmV0dXJuTmV3KSB7XG4gICAgICB2YXIgeCA9IE1hdGguYWJzKHRoaXMueCksIHkgPSBNYXRoLmFicyh0aGlzLnkpO1xuXG4gICAgICBpZiAocmV0dXJuTmV3KSB7XG4gICAgICAgIHJldHVybiBuZXcgKHRoaXMuY29uc3RydWN0b3IpKHgsIHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0KHgsIHkpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBSZXR1cm4gYSBuZXcgYFZlYzJgIGNvbnNpc3Rpbmcgb2YgdGhlIHNtYWxsZXN0IHZhbHVlc1xuICAgIC8vIGZyb20gdGhpcyB2ZWN0b3IgYW5kIHRoZSBpbmNvbWluZ1xuICAgIC8vXG4gICAgLy8gV2hlbiByZXR1cm5OZXcgaXMgdHJ1dGh5LCBhIG5ldyBgVmVjMmAgd2lsbCBiZSByZXR1cm5lZFxuICAgIC8vIG90aGVyd2lzZSB0aGUgbWluaW11bSB2YWx1ZXMgaW4gZWl0aGVyIHRoaXMgb3IgYHZgIHdpbGxcbiAgICAvLyBiZSBhcHBsaWVkIHRvIHRoaXMgdmVjdG9yLlxuICAgIG1pbiA6IGZ1bmN0aW9uKHYsIHJldHVybk5ldykge1xuICAgICAgdmFyXG4gICAgICB0eCA9IHRoaXMueCxcbiAgICAgIHR5ID0gdGhpcy55LFxuICAgICAgdnggPSB2LngsXG4gICAgICB2eSA9IHYueSxcbiAgICAgIHggPSB0eCA8IHZ4ID8gdHggOiB2eCxcbiAgICAgIHkgPSB0eSA8IHZ5ID8gdHkgOiB2eTtcblxuICAgICAgaWYgKHJldHVybk5ldykge1xuICAgICAgICByZXR1cm4gbmV3ICh0aGlzLmNvbnN0cnVjdG9yKSh4LCB5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldCh4LCB5KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gUmV0dXJuIGEgbmV3IGBWZWMyYCBjb25zaXN0aW5nIG9mIHRoZSBsYXJnZXN0IHZhbHVlc1xuICAgIC8vIGZyb20gdGhpcyB2ZWN0b3IgYW5kIHRoZSBpbmNvbWluZ1xuICAgIC8vXG4gICAgLy8gV2hlbiByZXR1cm5OZXcgaXMgdHJ1dGh5LCBhIG5ldyBgVmVjMmAgd2lsbCBiZSByZXR1cm5lZFxuICAgIC8vIG90aGVyd2lzZSB0aGUgbWluaW11bSB2YWx1ZXMgaW4gZWl0aGVyIHRoaXMgb3IgYHZgIHdpbGxcbiAgICAvLyBiZSBhcHBsaWVkIHRvIHRoaXMgdmVjdG9yLlxuICAgIG1heCA6IGZ1bmN0aW9uKHYsIHJldHVybk5ldykge1xuICAgICAgdmFyXG4gICAgICB0eCA9IHRoaXMueCxcbiAgICAgIHR5ID0gdGhpcy55LFxuICAgICAgdnggPSB2LngsXG4gICAgICB2eSA9IHYueSxcbiAgICAgIHggPSB0eCA+IHZ4ID8gdHggOiB2eCxcbiAgICAgIHkgPSB0eSA+IHZ5ID8gdHkgOiB2eTtcblxuICAgICAgaWYgKHJldHVybk5ldykge1xuICAgICAgICByZXR1cm4gbmV3ICh0aGlzLmNvbnN0cnVjdG9yKSh4LCB5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldCh4LCB5KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gQ2xhbXAgdmFsdWVzIGludG8gYSByYW5nZS5cbiAgICAvLyBJZiB0aGlzIHZlY3RvcidzIHZhbHVlcyBhcmUgbG93ZXIgdGhhbiB0aGUgYGxvd2Anc1xuICAgIC8vIHZhbHVlcywgdGhlbiByYWlzZSB0aGVtLiAgSWYgdGhleSBhcmUgaGlnaGVyIHRoYW5cbiAgICAvLyBgaGlnaGAncyB0aGVuIGxvd2VyIHRoZW0uXG4gICAgLy9cbiAgICAvLyBQYXNzaW5nIHJldHVybk5ldyBhcyB0cnVlIHdpbGwgY2F1c2UgYSBuZXcgVmVjMiB0byBiZVxuICAgIC8vIHJldHVybmVkLiAgT3RoZXJ3aXNlLCB0aGlzIHZlY3RvcidzIHZhbHVlcyB3aWxsIGJlIGNsYW1wZWRcbiAgICBjbGFtcCA6IGZ1bmN0aW9uKGxvdywgaGlnaCwgcmV0dXJuTmV3KSB7XG4gICAgICB2YXIgcmV0ID0gdGhpcy5taW4oaGlnaCwgdHJ1ZSkubWF4KGxvdyk7XG4gICAgICBpZiAocmV0dXJuTmV3KSB7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXQocmV0LngsIHJldC55KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gUGVyZm9ybSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byB2ZWN0b3JzXG4gICAgLy8gYW1vdW50IGlzIGEgZGVjaW1hbCBiZXR3ZWVuIDAgYW5kIDFcbiAgICBsZXJwIDogZnVuY3Rpb24odmVjLCBhbW91bnQsIHJldHVybk5ldykge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkKHZlYy5zdWJ0cmFjdCh0aGlzLCB0cnVlKS5tdWx0aXBseShhbW91bnQpLCByZXR1cm5OZXcpO1xuICAgIH0sXG5cbiAgICAvLyBHZXQgdGhlIHNrZXcgdmVjdG9yIHN1Y2ggdGhhdCBkb3Qoc2tld192ZWMsIG90aGVyKSA9PSBjcm9zcyh2ZWMsIG90aGVyKVxuICAgIHNrZXcgOiBmdW5jdGlvbihyZXR1cm5OZXcpIHtcbiAgICAgIGlmICghcmV0dXJuTmV3KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldCgtdGhpcy55LCB0aGlzLngpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3ICh0aGlzLmNvbnN0cnVjdG9yKSgtdGhpcy55LCB0aGlzLngpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBjYWxjdWxhdGUgdGhlIGRvdCBwcm9kdWN0IGJldHdlZW5cbiAgICAvLyB0aGlzIHZlY3RvciBhbmQgdGhlIGluY29taW5nXG4gICAgZG90IDogZnVuY3Rpb24oYikge1xuICAgICAgcmV0dXJuIFZlYzIuY2xlYW4odGhpcy54ICogYi54ICsgYi55ICogdGhpcy55KTtcbiAgICB9LFxuXG4gICAgLy8gY2FsY3VsYXRlIHRoZSBwZXJwZW5kaWN1bGFyIGRvdCBwcm9kdWN0IGJldHdlZW5cbiAgICAvLyB0aGlzIHZlY3RvciBhbmQgdGhlIGluY29taW5nXG4gICAgcGVycERvdCA6IGZ1bmN0aW9uKGIpIHtcbiAgICAgIHJldHVybiBWZWMyLmNsZWFuKHRoaXMueCAqIGIueSAtIHRoaXMueSAqIGIueCk7XG4gICAgfSxcblxuICAgIC8vIERldGVybWluZSB0aGUgYW5nbGUgYmV0d2VlbiB0d28gdmVjMnNcbiAgICBhbmdsZVRvIDogZnVuY3Rpb24odmVjKSB7XG4gICAgICByZXR1cm4gTWF0aC5hdGFuMih0aGlzLnBlcnBEb3QodmVjKSwgdGhpcy5kb3QodmVjKSk7XG4gICAgfSxcblxuICAgIC8vIERpdmlkZSB0aGlzIHZlY3RvcidzIGNvbXBvbmVudHMgYnkgYSBzY2FsYXJcbiAgICBkaXZpZGUgOiBmdW5jdGlvbih4LCB5LCByZXR1cm5OZXcpIHtcbiAgICAgIGlmICh0eXBlb2YgeCAhPSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm5OZXcgPSB5O1xuICAgICAgICBpZiAoaXNBcnJheSh4KSkge1xuICAgICAgICAgIHkgPSB4WzFdO1xuICAgICAgICAgIHggPSB4WzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHkgPSB4Lnk7XG4gICAgICAgICAgeCA9IHgueDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgeSAhPSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm5OZXcgPSB5O1xuICAgICAgICB5ID0geDtcbiAgICAgIH1cblxuICAgICAgaWYgKHggPT09IDAgfHwgeSA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RpdmlzaW9uIGJ5IHplcm8nKVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNOYU4oeCkgfHwgaXNOYU4oeSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOYU4gZGV0ZWN0ZWQnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJldHVybk5ldykge1xuICAgICAgICByZXR1cm4gbmV3ICh0aGlzLmNvbnN0cnVjdG9yKSh0aGlzLnggLyB4LCB0aGlzLnkgLyB5KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuc2V0KHRoaXMueCAvIHgsIHRoaXMueSAvIHkpO1xuICAgIH0sXG5cbiAgICBpc1BvaW50T25MaW5lIDogZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgcmV0dXJuIChzdGFydC55IC0gdGhpcy55KSAqIChzdGFydC54IC0gZW5kLngpID09PVxuICAgICAgICAgICAgIChzdGFydC55IC0gZW5kLnkpICogKHN0YXJ0LnggLSB0aGlzLngpO1xuICAgIH0sXG5cbiAgICB0b0FycmF5OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBbdGhpcy54LCB0aGlzLnldO1xuICAgIH0sXG5cbiAgICBmcm9tQXJyYXk6IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXQoYXJyYXlbMF0sIGFycmF5WzFdKTtcbiAgICB9LFxuICAgIHRvSlNPTjogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHt4OiB0aGlzLngsIHk6IHRoaXMueX07XG4gICAgfSxcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJygnICsgdGhpcy54ICsgJywgJyArIHRoaXMueSArICcpJztcbiAgICB9LFxuICAgIGNvbnN0cnVjdG9yIDogVmVjMlxuICB9O1xuXG4gIFZlYzIuZnJvbUFycmF5ID0gZnVuY3Rpb24oYXJyYXksIGN0b3IpIHtcbiAgICByZXR1cm4gbmV3IChjdG9yIHx8IFZlYzIpKGFycmF5WzBdLCBhcnJheVsxXSk7XG4gIH07XG5cbiAgLy8gRmxvYXRpbmcgcG9pbnQgc3RhYmlsaXR5XG4gIFZlYzIucHJlY2lzaW9uID0gcHJlY2lzaW9uIHx8IDg7XG4gIHZhciBwID0gTWF0aC5wb3coMTAsIFZlYzIucHJlY2lzaW9uKTtcblxuICBWZWMyLmNsZWFuID0gY2xlYW4gfHwgZnVuY3Rpb24odmFsKSB7XG4gICAgaWYgKGlzTmFOKHZhbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTmFOIGRldGVjdGVkJyk7XG4gICAgfVxuXG4gICAgaWYgKCFpc0Zpbml0ZSh2YWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luZmluaXR5IGRldGVjdGVkJyk7XG4gICAgfVxuXG4gICAgaWYoTWF0aC5yb3VuZCh2YWwpID09PSB2YWwpIHtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGgucm91bmQodmFsICogcCkvcDtcbiAgfTtcblxuICBWZWMyLmluamVjdCA9IGluamVjdDtcblxuICBpZighY2xlYW4pIHtcbiAgICBWZWMyLmZhc3QgPSBpbmplY3QoZnVuY3Rpb24gKGspIHsgcmV0dXJuIGs7IH0pO1xuXG4gICAgLy8gRXhwb3NlLCBidXQgYWxzbyBhbGxvdyBjcmVhdGluZyBhIGZyZXNoIFZlYzIgc3ViY2xhc3MuXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PSAnb2JqZWN0Jykge1xuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBWZWMyO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuVmVjMiA9IHdpbmRvdy5WZWMyIHx8IFZlYzI7XG4gICAgfVxuICB9XG4gIHJldHVybiBWZWMyO1xufSkoKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIFZlYzIgZnJvbSAndmVjMic7XG5pbXBvcnQgTmV0d29yayBmcm9tICcuLi8uLi8uLi9jb3JlL05ldHdvcmsnO1xuaW1wb3J0IHsgZ2V0R3JpZE9mQXR0cmFjdG9ycyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvQXR0cmFjdG9yUGF0dGVybnMnO1xuaW1wb3J0IE5vZGUgZnJvbSAnLi4vLi4vLi4vY29yZS9Ob2RlJztcbmltcG9ydCB7IHJhbmRvbSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvVXRpbGl0aWVzJztcbmltcG9ydCBTZXR0aW5ncyBmcm9tICcuL1NldHRpbmdzJztcblxubGV0IGNhbnZhcywgY3R4O1xubGV0IG5ldHdvcms7XG5sZXQgaXNSZXZlcnNpbmcgPSBmYWxzZTtcbmxldCBiYWNrZ3JvdW5kT3BhY2l0eSA9IDE7IC8vIE9wYWNpdMOgIGluaXppYWxlIGRlbGxvIHNmb25kbyAoMSA9IHBpZW5vLCAwID0gdHJhc3BhcmVudGUpXG5jb25zdCBub2Rlc1BlckZyYW1lID0gMTA7IC8vIE51bWVybyBkaSBub2RpIGRhIGFnZ2l1bmdlcmUvcmltdW92ZXJlIHBlciBmcmFtZVxubGV0IGlzTmlnaHRNb2RlID0gZmFsc2U7IC8vIE1vZGFsaXTDoCBnaW9ybm8vbm90dGVcblxuLy8gQ3JlYXRlIGluaXRpYWwgY29uZGl0aW9ucyBmb3Igc2ltdWxhdGlvblxuY29uc3Qgc2V0dXAgPSAoKSA9PiB7XG4gIC8vIEluaXRpYWxpemUgY2FudmFzIGFuZCBjb250ZXh0XG4gIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdza2V0Y2gnKTtcbiAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgLy8gU2V0dXAgTmV0d29yayB3aXRoIGluaXRpYWwgY29uZGl0aW9uc1xuICBzZXR1cE5ldHdvcmsoKTtcblxuICAvLyBCZWdpbiBhbmltYXRpb24gbG9vcFxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcblxuICAvLyBTdGFydCByZXZlcnNlL3JlZ2VuZXJhdGUgY3ljbGUgZXZlcnkgNyBzZWNvbmRzXG4gIHNldEludGVydmFsKCgpID0+IHtcbiAgICBpc1JldmVyc2luZyA9IHRydWU7XG4gIH0sIDcwMDApO1xufTtcblxuLy8gQ3JlYXRlIHRoZSBuZXR3b3JrIHdpdGggaW5pdGlhbCBjb25kaXRpb25zXG5jb25zdCBzZXR1cE5ldHdvcmsgPSAoKSA9PiB7XG4gIC8vIFJlc2V0IHRoZSBiYWNrZ3JvdW5kIG9wYWNpdHlcbiAgYmFja2dyb3VuZE9wYWNpdHkgPSAxO1xuXG4gIC8vIERldGVybWluZSBjb2xvcnMgYmFzZWQgb24gY3VycmVudCB0aGVtZVxuICBjb25zdCBjb2xvcnMgPSBpc05pZ2h0TW9kZSA/IFNldHRpbmdzLkNvbG9yc05pZ2h0IDogU2V0dGluZ3MuQ29sb3JzRGF5O1xuXG4gIC8vIEluaXRpYWxpemUgc2ltdWxhdGlvbiBvYmplY3Qgd2l0aCBkeW5hbWljIGNvbG9yc1xuICBuZXR3b3JrID0gbmV3IE5ldHdvcmsoY3R4LCB7IC4uLlNldHRpbmdzLCBDb2xvcnM6IGNvbG9ycyB9KTtcblxuICAvLyBTZXQgdXAgdGhlIGF0dHJhY3RvcnMgdXNpbmcgcHJlLW1hZGUgcGF0dGVybnNcbiAgbGV0IGdyaWRBdHRyYWN0b3JzID0gZ2V0R3JpZE9mQXR0cmFjdG9ycygxNTAsIDEwMCwgY3R4LCAxMCk7XG4gIG5ldHdvcmsuYXR0cmFjdG9ycyA9IGdyaWRBdHRyYWN0b3JzO1xuXG4gIC8vIEFkZCBhIHNldCBvZiByYW5kb20gcm9vdCBub2RlcyB0aHJvdWdob3V0IHNjZW5lXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIG5ldHdvcmsuYWRkTm9kZShcbiAgICAgIG5ldyBOb2RlKFxuICAgICAgICBudWxsLFxuICAgICAgICBuZXcgVmVjMihcbiAgICAgICAgICByYW5kb20od2luZG93LmlubmVyV2lkdGgpLFxuICAgICAgICAgIHJhbmRvbSh3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgICAgICksXG4gICAgICAgIHRydWUsXG4gICAgICAgIGN0eCxcbiAgICAgICAgeyAuLi5TZXR0aW5ncywgQ29sb3JzOiBjb2xvcnMgfVxuICAgICAgKVxuICAgICk7XG4gIH1cbn07XG5cbi8vIE1haW4gcHJvZ3JhbSBsb29wXG5jb25zdCB1cGRhdGUgPSAoKSA9PiB7XG4gIGlmIChpc1JldmVyc2luZykge1xuICAgIHJldmVyc2VBbmltYXRpb24oKTtcbiAgfSBlbHNlIHtcbiAgICBuZXR3b3JrLnVwZGF0ZSgpO1xuICAgIG5ldHdvcmsuZHJhdygpO1xuICB9XG5cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG59O1xuXG5sZXQgcmV2ZXJzZVNwZWVkID0gMTA7IC8vIFZlbG9jaXTDoCBkaSBiYXNlXG5cbmNvbnN0IHJldmVyc2VBbmltYXRpb24gPSAoKSA9PiB7XG4gIGNvbnN0IHJlbWFpbmluZ05vZGVzID0gbmV0d29yay5ub2Rlcy5sZW5ndGg7XG4gIHJldmVyc2VTcGVlZCA9IE1hdGguY2VpbChyZW1haW5pbmdOb2RlcyAvIDUwKTsgLy8gVmVsb2NpdMOgIGJhc2F0YSBzdWwgbnVtZXJvIGRpIG5vZGkgcmltYW5lbnRpXG5cbiAgaWYgKHJlbWFpbmluZ05vZGVzID4gNDApIHtcbiAgICAvLyBSaW11b3ZlIG5vZGkgcHJvZ3Jlc3NpdmFtZW50ZVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmV2ZXJzZVNwZWVkOyBpKyspIHtcbiAgICAgIGlmIChuZXR3b3JrLm5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbmV0d29yay5ub2Rlcy5wb3AoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEaXNlZ25hIGxhIHJldGUgYXR0dWFsZVxuICAgIGRyYXdCYWNrZ3JvdW5kKCk7XG4gICAgbmV0d29yay5kcmF3KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gUXVhbmRvIHR1dHRpIGkgbm9kaSBzb25vIHJpbW9zc2ksIHJpY3JlYSBpbCBuZXR3b3JrXG4gICAgaXNSZXZlcnNpbmcgPSBmYWxzZTtcbiAgICBzZXR1cE5ldHdvcmsoKTtcbiAgfVxufTtcblxuY29uc3QgZHJhd0JhY2tncm91bmQgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbG9ycyA9IGlzTmlnaHRNb2RlID8gU2V0dGluZ3MuQ29sb3JzTmlnaHQgOiBTZXR0aW5ncy5Db2xvcnNEYXk7XG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvcnMuQmFja2dyb3VuZENvbG9yOyAvLyBDb2xvcmUgZGkgc2ZvbmRvIGJhc2F0byBzdWwgdGVtYVxuICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbn07XG5cbi8vIFRvZ2dsZSB0aGVtZSAoZGF5L25pZ2h0KVxuZXhwb3J0IGNvbnN0IHRvZ2dsZVRoZW1lID0gKCkgPT4ge1xuICBpc05pZ2h0TW9kZSA9ICFpc05pZ2h0TW9kZTsgLy8gQ2FtYmlhIG1vZGFsaXTDoFxuICBzZXR1cE5ldHdvcmsoKTsgLy8gUmljcmVhIGlsIGNhbnZhcyBjb24gaSBjb2xvcmkgYWdnaW9ybmF0aVxufTtcblxuLy8gS2ljayBvZmYgdGhlIGFwcGxpY2F0aW9uXG5zZXR1cCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9