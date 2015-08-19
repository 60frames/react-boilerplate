/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint-env jasmine */
	/* global jest, require */
	
	'use strict';
	
	// jest.dontMock(1);
	// jest.mock('./boilerplate.css');
	
	// Cannot use ES6 imports as they are hoisted above `jest.dontMock`
	// https://github.com/babel/babel-jest/issues/16
	var Boilerplate = __webpack_require__(1);
	// var React = require('react/addons');
	// var TestUtils = React.addons.TestUtils;
	
	// describe('boilerplate', function() {
	
	//     var component;
	
	//     beforeEach(function() {
	//         component = TestUtils.renderIntoDocument(
	//             <Boilerplate />
	//         );
	//     });
	
	//     it('has a h1 title', function() {
	//         var title = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
	//         expect(title.getDOMNode().textContent).toEqual('react-boilerplate');
	//     });
	
	//     it('has a paragraph with descriptive text', function() {
	//         var paragraph = TestUtils.findRenderedDOMComponentWithTag(component, 'p');
	//         expect(paragraph.getDOMNode().textContent).toEqual('A React and Webpack boilerplate.');
	//     });
	
	// });
	
	describe('boilerplate', function () {
	
	    var instance;
	
	    beforeEach(function () {
	        instance = new Boilerplate();
	    });
	
	    it('sums', function () {
	        expect(instance.sum(1, 3)).toBe(4);
	    });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	// import React from 'react';
	
	// import style from './boilerplate.css';
	
	// var Boilerplate = React.createClass({
	//     render: function() {
	//         return (
	//             <div>
	//                 <h1 className={style.title}>react-boilerplate</h1>
	//                 <p className={style.description}>
	//                     A React and Webpack boilerplate.
	//                 </p>
	//                 <div className={style.logo}></div>
	//             </div>
	//         );
	//     }
	// });
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function Boilerplate() {}
	
	Boilerplate.prototype.sum = function doSomething(a, b) {
	    return a + b;
	};
	
	exports["default"] = Boilerplate;
	module.exports = exports["default"];

/***/ }
/******/ ]);
//# sourceMappingURL=entry.js.map