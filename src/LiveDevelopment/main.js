/*
 * Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */

/**
 * main loads a LiveDevelopment implementation:
 * 
 * LiveDevelopment implementation its being set by 'livedev.impl' preference.
 * There are currently two alternative values:
 * 
 * 'default'  : current default implementation based on CDT
 * 'livedev2' : experimental implementation (CDT-independent)
 * 
 * See impls/livedev2/README.md for more details on livedev2 implemetantion.
 *  
 */

define(function main(require, exports, module) {
    "use strict";
    
    // preference to set the implementation to be loaded
    var LIVEDEV_IMPL_PREF  = 'livedev.impl';
        
    // pre-defined implementations
    var DEFAULT_IMPL       = 'default',
        LIVEDEV2_IMPL      = 'livedev2';
    
    var AppInit            = require("utils/AppInit"),
        PreferencesManager = require("preferences/PreferencesManager");
    
    /**
     * current active implementation
     */
    var LiveDevelopment;
        
    // pre-load implementations
    var liveDevImpls = {};
    liveDevImpls[DEFAULT_IMPL]  = require("LiveDevelopment/impls/default/main");
    liveDevImpls[LIVEDEV2_IMPL] = require("LiveDevelopment/impls/livedev2/main");
    
    // define livedev.impl preference
    PreferencesManager.definePreference(LIVEDEV_IMPL_PREF, 'string', 'default');

    /** Initialize LiveDevelopment */
    AppInit.appReady(function () {
        
        // get choose LiveDevelopment implementation based on preference value
        LiveDevelopment = liveDevImpls[PreferencesManager.get(LIVEDEV_IMPL_PREF)];
        if (!LiveDevelopment) {
            // preference value doesn't match any implementation, switching to 'default'
            console.log("invalid livedev.impl value - switching to default implemenation");
            LiveDevelopment = liveDevImpls[DEFAULT_IMPL];
        }
        // init
        LiveDevelopment.init();
    });
    
    // exports public API
    exports.LIVEDEV_IMPL_PREF = LIVEDEV_IMPL_PREF;
    exports.DEFAULT_IMPL      = DEFAULT_IMPL;
    exports.LIVEDEV2_IMPL     = LIVEDEV2_IMPL;
});
