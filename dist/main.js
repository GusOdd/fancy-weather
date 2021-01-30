/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/@googlemaps/js-api-loader/dist/index.esm.js":
/*!*******************************************************************!*\
  !*** ../node_modules/@googlemaps/js-api-loader/dist/index.esm.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DEFAULT_ID\": function() { return /* binding */ DEFAULT_ID; },\n/* harmony export */   \"Loader\": function() { return /* binding */ Loader; }\n/* harmony export */ });\n// do not edit .js files directly - edit src/index.jst\n\n\n\nvar fastDeepEqual = function equal(a, b) {\n  if (a === b) return true;\n\n  if (a && b && typeof a == 'object' && typeof b == 'object') {\n    if (a.constructor !== b.constructor) return false;\n\n    var length, i, keys;\n    if (Array.isArray(a)) {\n      length = a.length;\n      if (length != b.length) return false;\n      for (i = length; i-- !== 0;)\n        if (!equal(a[i], b[i])) return false;\n      return true;\n    }\n\n\n\n    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;\n    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();\n    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();\n\n    keys = Object.keys(a);\n    length = keys.length;\n    if (length !== Object.keys(b).length) return false;\n\n    for (i = length; i-- !== 0;)\n      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;\n\n    for (i = length; i-- !== 0;) {\n      var key = keys[i];\n\n      if (!equal(a[key], b[key])) return false;\n    }\n\n    return true;\n  }\n\n  // true if both NaN, false otherwise\n  return a!==a && b!==b;\n};\n\n/**\r\n * Copyright 2019 Google LLC. All Rights Reserved.\r\n *\r\n * Licensed under the Apache License, Version 2.0 (the \"License\");\r\n * you may not use this file except in compliance with the License.\r\n * You may obtain a copy of the License at.\r\n *\r\n *      Http://www.apache.org/licenses/LICENSE-2.0.\r\n *\r\n * Unless required by applicable law or agreed to in writing, software\r\n * distributed under the License is distributed on an \"AS IS\" BASIS,\r\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\r\n * See the License for the specific language governing permissions and\r\n * limitations under the License.\r\n */\r\nconst DEFAULT_ID = \"__googleMapsScriptId\";\r\n/**\r\n * [[Loader]] makes it easier to add Google Maps JavaScript API to your application\r\n * dynamically using\r\n * [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).\r\n * It works by dynamically creating and appending a script node to the the\r\n * document head and wrapping the callback function so as to return a promise.\r\n *\r\n * ```\r\n * const loader = new Loader({\r\n *   apiKey: \"\",\r\n *   version: \"weekly\",\r\n *   libraries: [\"places\"]\r\n * });\r\n *\r\n * loader.load().then(() => {\r\n *   const map = new google.maps.Map(...)\r\n * })\r\n * ```\r\n */\r\nclass Loader {\r\n    /**\r\n     * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set\r\n     * using this library, instead the defaults are set by the Google Maps\r\n     * JavaScript API server.\r\n     *\r\n     * ```\r\n     * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});\r\n     * ```\r\n     */\r\n    constructor({ apiKey, channel, client, id = DEFAULT_ID, libraries = [], language, region, version, mapIds, nonce, retries = 3, url = \"https://maps.googleapis.com/maps/api/js\", }) {\r\n        this.CALLBACK = \"__googleMapsCallback\";\r\n        this.callbacks = [];\r\n        this.done = false;\r\n        this.loading = false;\r\n        this.errors = [];\r\n        this.version = version;\r\n        this.apiKey = apiKey;\r\n        this.channel = channel;\r\n        this.client = client;\r\n        this.id = id || DEFAULT_ID; // Do not allow empty string\r\n        this.libraries = libraries;\r\n        this.language = language;\r\n        this.region = region;\r\n        this.mapIds = mapIds;\r\n        this.nonce = nonce;\r\n        this.retries = retries;\r\n        this.url = url;\r\n        if (Loader.instance) {\r\n            if (!fastDeepEqual(this.options, Loader.instance.options)) {\r\n                throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Loader.instance.options)}`);\r\n            }\r\n            return Loader.instance;\r\n        }\r\n        Loader.instance = this;\r\n    }\r\n    get options() {\r\n        return {\r\n            version: this.version,\r\n            apiKey: this.apiKey,\r\n            channel: this.channel,\r\n            client: this.client,\r\n            id: this.id,\r\n            libraries: this.libraries,\r\n            language: this.language,\r\n            region: this.region,\r\n            mapIds: this.mapIds,\r\n            nonce: this.nonce,\r\n            url: this.url,\r\n        };\r\n    }\r\n    /**\r\n     * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].\r\n     *\r\n     * @ignore\r\n     */\r\n    createUrl() {\r\n        let url = this.url;\r\n        url += `?callback=${this.CALLBACK}`;\r\n        if (this.apiKey) {\r\n            url += `&key=${this.apiKey}`;\r\n        }\r\n        if (this.channel) {\r\n            url += `&channel=${this.channel}`;\r\n        }\r\n        if (this.client) {\r\n            url += `&client=${this.client}`;\r\n        }\r\n        if (this.libraries.length > 0) {\r\n            url += `&libraries=${this.libraries.join(\",\")}`;\r\n        }\r\n        if (this.language) {\r\n            url += `&language=${this.language}`;\r\n        }\r\n        if (this.region) {\r\n            url += `&region=${this.region}`;\r\n        }\r\n        if (this.version) {\r\n            url += `&v=${this.version}`;\r\n        }\r\n        if (this.mapIds) {\r\n            url += `&map_ids=${this.mapIds.join(\",\")}`;\r\n        }\r\n        return url;\r\n    }\r\n    /**\r\n     * Load the Google Maps JavaScript API script and return a Promise.\r\n     */\r\n    load() {\r\n        return this.loadPromise();\r\n    }\r\n    /**\r\n     * Load the Google Maps JavaScript API script and return a Promise.\r\n     *\r\n     * @ignore\r\n     */\r\n    loadPromise() {\r\n        return new Promise((resolve, reject) => {\r\n            this.loadCallback((err) => {\r\n                if (!err) {\r\n                    resolve();\r\n                }\r\n                else {\r\n                    reject(err);\r\n                }\r\n            });\r\n        });\r\n    }\r\n    /**\r\n     * Load the Google Maps JavaScript API script with a callback.\r\n     */\r\n    loadCallback(fn) {\r\n        this.callbacks.push(fn);\r\n        this.execute();\r\n    }\r\n    /**\r\n     * Set the script on document.\r\n     */\r\n    setScript() {\r\n        if (document.getElementById(this.id)) {\r\n            // TODO wrap onerror callback for cases where the script was loaded elsewhere\r\n            this.callback();\r\n            return;\r\n        }\r\n        const url = this.createUrl();\r\n        const script = document.createElement(\"script\");\r\n        script.id = this.id;\r\n        script.type = \"text/javascript\";\r\n        script.src = url;\r\n        script.onerror = this.loadErrorCallback.bind(this);\r\n        script.defer = true;\r\n        script.async = true;\r\n        if (this.nonce) {\r\n            script.nonce = this.nonce;\r\n        }\r\n        document.head.appendChild(script);\r\n    }\r\n    deleteScript() {\r\n        const script = document.getElementById(this.id);\r\n        if (script) {\r\n            script.remove();\r\n        }\r\n    }\r\n    resetIfRetryingFailed() {\r\n        const possibleAttempts = this.retries + 1;\r\n        if (this.done && !this.loading && this.errors.length >= possibleAttempts) {\r\n            this.deleteScript();\r\n            this.done = false;\r\n            this.loading = false;\r\n            this.errors = [];\r\n        }\r\n    }\r\n    loadErrorCallback(e) {\r\n        this.errors.push(e);\r\n        if (this.errors.length <= this.retries) {\r\n            const delay = this.errors.length * Math.pow(2, this.errors.length);\r\n            console.log(`Failed to load Google Maps script, retrying in ${delay} ms.`);\r\n            setTimeout(() => {\r\n                this.deleteScript();\r\n                this.setScript();\r\n            }, delay);\r\n        }\r\n        else {\r\n            this.onerrorEvent = e;\r\n            this.callback();\r\n        }\r\n    }\r\n    setCallback() {\r\n        window.__googleMapsCallback = this.callback.bind(this);\r\n    }\r\n    callback() {\r\n        this.done = true;\r\n        this.loading = false;\r\n        this.callbacks.forEach((cb) => {\r\n            cb(this.onerrorEvent);\r\n        });\r\n        this.callbacks = [];\r\n    }\r\n    execute() {\r\n        if (window.google && window.google.maps && window.google.maps.version) {\r\n            console.warn(\"Aborted attempt to load Google Maps JS with @googlemaps/js-api-loader.\" +\r\n                \"This may result in undesirable behavior as script parameters may not match.\");\r\n            this.callback();\r\n        }\r\n        this.resetIfRetryingFailed();\r\n        if (this.done) {\r\n            this.callback();\r\n        }\r\n        else {\r\n            if (this.loading) ;\r\n            else {\r\n                this.loading = true;\r\n                this.setCallback();\r\n                this.setScript();\r\n            }\r\n        }\r\n    }\r\n}\n\n\n//# sourceMappingURL=index.esm.js.map\n\n\n//# sourceURL=webpack:///../node_modules/@googlemaps/js-api-loader/dist/index.esm.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/styles.css */ \"./styles/styles.css\");\n/* harmony import */ var _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @googlemaps/js-api-loader */ \"../node_modules/@googlemaps/js-api-loader/dist/index.esm.js\");\n/* eslint-disable no-undef */\n\n/* eslint-disable no-unused-vars */\n\n // const fetch = require('node-fetch');\n// function setBackgroundOfBody() {\n//   const apiUrl = 'https://api.unsplash.com/photos/random/?client_id=PvaQ97N4zKTuWsCueVfxswth-KG0q6AR3EKzVQVEy4s&query=city&per_page=1&orientation=landscape';\n//   fetch(apiUrl)\n//     .then((response) => response.json())\n//     .then((data) => {\n//       document.body.style.backgroundImage = `url('${data.urls.regular}')`;\n//     });\n// }\n// setBackgroundOfBody();\n\nvar currentGeoData = {\n  lat: -34.397,\n  lng: 150.644\n};\nnavigator.geolocation.getCurrentPosition(function (data) {\n  currentGeoData.lat = data.coords.latitude;\n  currentGeoData.lng = data.coords.longitude;\n});\nvar loader = new _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_1__.Loader({\n  apiKey: 'AIzaSyAyI_32OuCXuiz43WSoMkQlcdmQOFjnu2k',\n  version: 'weekly'\n});\nvar map;\nloader.load().then(function () {\n  map = new google.maps.Map(document.querySelector('.geolocation__map'), {\n    center: currentGeoData,\n    zoom: 8\n  });\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./styles/styles.css":
/*!***************************!*\
  !*** ./styles/styles.css ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./styles/styles.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;