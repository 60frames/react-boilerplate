// Not sure if this should be here on in the JestWebpackModuleLoader (when that file is actually doing something)
// The require function
// 
// Should prob be in the module loader, not here as this is shitty code to try and hook
// into...


/******/ (function(modules) { // webpackBootstrap



 	var installedModules = {};
	var installedMockedModules = {};

function getMockedModule(moduleId) {
	var module;
	if (installedMockedModules[moduleId]) {
		module = installedMockedModules[moduleId].exports;
	}
	if (installedModules[moduleId]) {
		module = installedModules[moduleId].exports;
	}

	// NOTE: HasteModuleLoader caches the meta too with another wrapper around
	// this.

	var loader = jest.loader,
		moduleMocker = jest.moduleMocker;
	
	if (!loader._mockMetaDataCache.hasOwnProperty(moduleId)) {
		// This allows us to handle circular dependencies while generating an
		// automock -- NOTE: not sure if this is neccesary in webpack?
		loader._mockMetaDataCache[moduleId] = moduleMocker.getMetadata({});

		var origMockRegistry = installedModules;
	    var origModuleRegistry = installedMockedModules;
		installedModules = {};
		installedMockedModules = {};

		module = getModule(moduleId);

	    // Restore the "real" module/mock registries
		installedModules = origMockRegistry;
	    installedMockedModules = origModuleRegistry;

	    loader._mockMetaDataCache[moduleId] = moduleMocker.getMetadata(module);

	}

	return moduleMocker.generateFromMetadata(
		loader._mockMetaDataCache[moduleId]
	  );
};

function getModule(moduleId) {
	// Check if module is in cache
	if(installedModules[moduleId])
		return installedModules[moduleId].exports;

	// Create a new module (and put it into the cache)
	var module = installedModules[moduleId] = {
		exports: {},
		id: moduleId,
		loaded: false
	};

	// Execute the module function
	modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	// Flag the module as loaded
	module.loaded = true;

	// Return the exports of the module
	return module.exports;
}

function shouldMock(moduleId) {
	// console.log(jest.loader._explicitShouldMock);
	if (jest.loader._explicitShouldMock.hasOwnProperty(moduleId)
		&& jest.loader._explicitShouldMock[moduleId]
		&& moduleId !== 0) { // moduleId 0 is the file under test.
		return true;
	}
	return false;
}

function __webpack_require__(moduleId) {

	if (shouldMock(moduleId)) {
		return getMockedModule(moduleId);
	}

	return getModule(moduleId);
	
}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

			global.__webpack_require__ = __webpack_require__;
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
	
	jest.dontMock(1);
	jest.mock(2);
	
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
/***/ function(module, exports, __webpack_require__) {

	// import React from 'react';
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _boilerplateCss = __webpack_require__(2);
	
	var _boilerplateCss2 = _interopRequireDefault(_boilerplateCss);

	console.warn(_boilerplateCss);
	
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
	
	function Boilerplate() {}
	
	Boilerplate.prototype.sum = function doSomething(a, b) {
	    return a + b;
	};
	
	exports['default'] = Boilerplate;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	// THIS WILL BE MOCKED, notice the function is a spy
	module.exports = {
		"title":"boilerplate-title_2bSDe",
		"description":"boilerplate-description_3rfh4",
		"logo":"boilerplate-logo_1LxA8",
		multiply: function(a, b) {
			return a * b;
		}
	};

/***/ }
/******/ ]);
//# sourceMappingURL=entry.test.js.map