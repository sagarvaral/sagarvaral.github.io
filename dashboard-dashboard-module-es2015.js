(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dashboard-dashboard-module"],{

/***/ "./node_modules/ngx-pagination/dist/ngx-pagination.js":
/*!************************************************************!*\
  !*** ./node_modules/ngx-pagination/dist/ngx-pagination.js ***!
  \************************************************************/
/*! exports provided: ɵb, ɵa, NgxPaginationModule, PaginationService, PaginationControlsComponent, PaginationControlsDirective, PaginatePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return DEFAULT_STYLES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return DEFAULT_TEMPLATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxPaginationModule", function() { return NgxPaginationModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginationService", function() { return PaginationService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginationControlsComponent", function() { return PaginationControlsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginationControlsDirective", function() { return PaginationControlsDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginatePipe", function() { return PaginatePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");



var PaginationService = /** @class */ (function () {
    function PaginationService() {
        this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.instances = {};
        this.DEFAULT_ID = 'DEFAULT_PAGINATION_ID';
    }
    PaginationService.prototype.defaultId = function () { return this.DEFAULT_ID; };
    /**
     * Register a PaginationInstance with this service. Returns a
     * boolean value signifying whether the instance is new or
     * updated (true = new or updated, false = unchanged).
     */
    PaginationService.prototype.register = function (instance) {
        if (instance.id == null) {
            instance.id = this.DEFAULT_ID;
        }
        if (!this.instances[instance.id]) {
            this.instances[instance.id] = instance;
            return true;
        }
        else {
            return this.updateInstance(instance);
        }
    };
    /**
     * Check each property of the instance and update any that have changed. Return
     * true if any changes were made, else return false.
     */
    PaginationService.prototype.updateInstance = function (instance) {
        var changed = false;
        for (var prop in this.instances[instance.id]) {
            if (instance[prop] !== this.instances[instance.id][prop]) {
                this.instances[instance.id][prop] = instance[prop];
                changed = true;
            }
        }
        return changed;
    };
    /**
     * Returns the current page number.
     */
    PaginationService.prototype.getCurrentPage = function (id) {
        if (this.instances[id]) {
            return this.instances[id].currentPage;
        }
    };
    /**
     * Sets the current page number.
     */
    PaginationService.prototype.setCurrentPage = function (id, page) {
        if (this.instances[id]) {
            var instance = this.instances[id];
            var maxPage = Math.ceil(instance.totalItems / instance.itemsPerPage);
            if (page <= maxPage && 1 <= page) {
                this.instances[id].currentPage = page;
                this.change.emit(id);
            }
        }
    };
    /**
     * Sets the value of instance.totalItems
     */
    PaginationService.prototype.setTotalItems = function (id, totalItems) {
        if (this.instances[id] && 0 <= totalItems) {
            this.instances[id].totalItems = totalItems;
            this.change.emit(id);
        }
    };
    /**
     * Sets the value of instance.itemsPerPage.
     */
    PaginationService.prototype.setItemsPerPage = function (id, itemsPerPage) {
        if (this.instances[id]) {
            this.instances[id].itemsPerPage = itemsPerPage;
            this.change.emit(id);
        }
    };
    /**
     * Returns a clone of the pagination instance object matching the id. If no
     * id specified, returns the instance corresponding to the default id.
     */
    PaginationService.prototype.getInstance = function (id) {
        if (id === void 0) { id = this.DEFAULT_ID; }
        if (this.instances[id]) {
            return this.clone(this.instances[id]);
        }
        return {};
    };
    /**
     * Perform a shallow clone of an object.
     */
    PaginationService.prototype.clone = function (obj) {
        var target = {};
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                target[i] = obj[i];
            }
        }
        return target;
    };
    return PaginationService;
}());

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LARGE_NUMBER = Number.MAX_SAFE_INTEGER;
var PaginatePipe = /** @class */ (function () {
    function PaginatePipe(service) {
        this.service = service;
        // store the values from the last time the pipe was invoked
        this.state = {};
    }
    PaginatePipe.prototype.transform = function (collection, args) {
        // When an observable is passed through the AsyncPipe, it will output
        // `null` until the subscription resolves. In this case, we want to
        // use the cached data from the `state` object to prevent the NgFor
        // from flashing empty until the real values arrive.
        if (!(collection instanceof Array)) {
            var _id = args.id || this.service.defaultId();
            if (this.state[_id]) {
                return this.state[_id].slice;
            }
            else {
                return collection;
            }
        }
        var serverSideMode = args.totalItems && args.totalItems !== collection.length;
        var instance = this.createInstance(collection, args);
        var id = instance.id;
        var start, end;
        var perPage = instance.itemsPerPage;
        var emitChange = this.service.register(instance);
        if (!serverSideMode && collection instanceof Array) {
            perPage = +perPage || LARGE_NUMBER;
            start = (instance.currentPage - 1) * perPage;
            end = start + perPage;
            var isIdentical = this.stateIsIdentical(id, collection, start, end);
            if (isIdentical) {
                return this.state[id].slice;
            }
            else {
                var slice = collection.slice(start, end);
                this.saveState(id, collection, slice, start, end);
                this.service.change.emit(id);
                return slice;
            }
        }
        else {
            if (emitChange) {
                this.service.change.emit(id);
            }
            // save the state for server-side collection to avoid null
            // flash as new data loads.
            this.saveState(id, collection, collection, start, end);
            return collection;
        }
    };
    /**
     * Create an PaginationInstance object, using defaults for any optional properties not supplied.
     */
    PaginatePipe.prototype.createInstance = function (collection, config) {
        this.checkConfig(config);
        return {
            id: config.id != null ? config.id : this.service.defaultId(),
            itemsPerPage: +config.itemsPerPage || 0,
            currentPage: +config.currentPage || 1,
            totalItems: +config.totalItems || collection.length
        };
    };
    /**
     * Ensure the argument passed to the filter contains the required properties.
     */
    PaginatePipe.prototype.checkConfig = function (config) {
        var required = ['itemsPerPage', 'currentPage'];
        var missing = required.filter(function (prop) { return !(prop in config); });
        if (0 < missing.length) {
            throw new Error("PaginatePipe: Argument is missing the following required properties: " + missing.join(', '));
        }
    };
    /**
     * To avoid returning a brand new array each time the pipe is run, we store the state of the sliced
     * array for a given id. This means that the next time the pipe is run on this collection & id, we just
     * need to check that the collection, start and end points are all identical, and if so, return the
     * last sliced array.
     */
    PaginatePipe.prototype.saveState = function (id, collection, slice, start, end) {
        this.state[id] = {
            collection: collection,
            size: collection.length,
            slice: slice,
            start: start,
            end: end
        };
    };
    /**
     * For a given id, returns true if the collection, size, start and end values are identical.
     */
    PaginatePipe.prototype.stateIsIdentical = function (id, collection, start, end) {
        var state = this.state[id];
        if (!state) {
            return false;
        }
        var isMetaDataIdentical = state.size === collection.length &&
            state.start === start &&
            state.end === end;
        if (!isMetaDataIdentical) {
            return false;
        }
        return state.slice.every(function (element, index) { return element === collection[start + index]; });
    };
    PaginatePipe = __decorate$1([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'paginate',
            pure: false
        }),
        __metadata("design:paramtypes", [PaginationService])
    ], PaginatePipe);
    return PaginatePipe;
}());

/**
 * The default template and styles for the pagination links are borrowed directly
 * from Zurb Foundation 6: http://foundation.zurb.com/sites/docs/pagination.html
 */
var DEFAULT_TEMPLATE = "\n    <pagination-template  #p=\"paginationApi\"\n                         [id]=\"id\"\n                         [maxSize]=\"maxSize\"\n                         (pageChange)=\"pageChange.emit($event)\"\n                         (pageBoundsCorrection)=\"pageBoundsCorrection.emit($event)\">\n    <ul class=\"ngx-pagination\" \n        role=\"navigation\" \n        [attr.aria-label]=\"screenReaderPaginationLabel\" \n        [class.responsive]=\"responsive\"\n        *ngIf=\"!(autoHide && p.pages.length <= 1)\">\n\n        <li class=\"pagination-previous\" [class.disabled]=\"p.isFirstPage()\" *ngIf=\"directionLinks\"> \n            <a tabindex=\"0\" *ngIf=\"1 < p.getCurrent()\" (keyup.enter)=\"p.previous()\" (click)=\"p.previous()\" [attr.aria-label]=\"previousLabel + ' ' + screenReaderPageLabel\">\n                {{ previousLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n            </a>\n            <span *ngIf=\"p.isFirstPage()\">\n                {{ previousLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n            </span>\n        </li> \n\n        <li class=\"small-screen\">\n            {{ p.getCurrent() }} / {{ p.getLastPage() }}\n        </li>\n\n        <li [class.current]=\"p.getCurrent() === page.value\" \n            [class.ellipsis]=\"page.label === '...'\"\n            *ngFor=\"let page of p.pages\">\n            <a tabindex=\"0\" (keyup.enter)=\"p.setCurrent(page.value)\" (click)=\"p.setCurrent(page.value)\" *ngIf=\"p.getCurrent() !== page.value\">\n                <span class=\"show-for-sr\">{{ screenReaderPageLabel }} </span>\n                <span>{{ (page.label === '...') ? page.label : (page.label | number:'') }}</span>\n            </a>\n            <ng-container *ngIf=\"p.getCurrent() === page.value\">\n                <span class=\"show-for-sr\">{{ screenReaderCurrentLabel }} </span>\n                <span>{{ (page.label === '...') ? page.label : (page.label | number:'') }}</span> \n            </ng-container>\n        </li>\n\n        <li class=\"pagination-next\" [class.disabled]=\"p.isLastPage()\" *ngIf=\"directionLinks\">\n            <a tabindex=\"0\" *ngIf=\"!p.isLastPage()\" (keyup.enter)=\"p.next()\" (click)=\"p.next()\" [attr.aria-label]=\"nextLabel + ' ' + screenReaderPageLabel\">\n                 {{ nextLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n            </a>\n            <span *ngIf=\"p.isLastPage()\">\n                 {{ nextLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n            </span>\n        </li>\n\n    </ul>\n    </pagination-template>\n    ";
var DEFAULT_STYLES = "\n.ngx-pagination {\n  margin-left: 0;\n  margin-bottom: 1rem; }\n  .ngx-pagination::before, .ngx-pagination::after {\n    content: ' ';\n    display: table; }\n  .ngx-pagination::after {\n    clear: both; }\n  .ngx-pagination li {\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n    margin-right: 0.0625rem;\n    border-radius: 0; }\n  .ngx-pagination li {\n    display: inline-block; }\n  .ngx-pagination a,\n  .ngx-pagination button {\n    color: #0a0a0a; \n    display: block;\n    padding: 0.1875rem 0.625rem;\n    border-radius: 0; }\n    .ngx-pagination a:hover,\n    .ngx-pagination button:hover {\n      background: #e6e6e6; }\n  .ngx-pagination .current {\n    padding: 0.1875rem 0.625rem;\n    background: #2199e8;\n    color: #fefefe;\n    cursor: default; }\n  .ngx-pagination .disabled {\n    padding: 0.1875rem 0.625rem;\n    color: #cacaca;\n    cursor: default; } \n    .ngx-pagination .disabled:hover {\n      background: transparent; }\n  .ngx-pagination a, .ngx-pagination button {\n    cursor: pointer; }\n\n.ngx-pagination .pagination-previous a::before,\n.ngx-pagination .pagination-previous.disabled::before { \n  content: '\u00AB';\n  display: inline-block;\n  margin-right: 0.5rem; }\n\n.ngx-pagination .pagination-next a::after,\n.ngx-pagination .pagination-next.disabled::after {\n  content: '\u00BB';\n  display: inline-block;\n  margin-left: 0.5rem; }\n\n.ngx-pagination .show-for-sr {\n  position: absolute !important;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0); }\n.ngx-pagination .small-screen {\n  display: none; }\n@media screen and (max-width: 601px) {\n  .ngx-pagination.responsive .small-screen {\n    display: inline-block; } \n  .ngx-pagination.responsive li:not(.small-screen):not(.pagination-previous):not(.pagination-next) {\n    display: none; }\n}\n  ";

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function coerceToBoolean(input) {
    return !!input && input !== 'false';
}
/**
 * The default pagination controls component. Actually just a default implementation of a custom template.
 */
var PaginationControlsComponent = /** @class */ (function () {
    function PaginationControlsComponent() {
        this.maxSize = 7;
        this.previousLabel = 'Previous';
        this.nextLabel = 'Next';
        this.screenReaderPaginationLabel = 'Pagination';
        this.screenReaderPageLabel = 'page';
        this.screenReaderCurrentLabel = "You're on page";
        this.pageChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.pageBoundsCorrection = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._directionLinks = true;
        this._autoHide = false;
        this._responsive = false;
    }
    Object.defineProperty(PaginationControlsComponent.prototype, "directionLinks", {
        get: function () {
            return this._directionLinks;
        },
        set: function (value) {
            this._directionLinks = coerceToBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationControlsComponent.prototype, "autoHide", {
        get: function () {
            return this._autoHide;
        },
        set: function (value) {
            this._autoHide = coerceToBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationControlsComponent.prototype, "responsive", {
        get: function () {
            return this._responsive;
        },
        set: function (value) {
            this._responsive = coerceToBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", String)
    ], PaginationControlsComponent.prototype, "id", void 0);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", Number)
    ], PaginationControlsComponent.prototype, "maxSize", void 0);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", Boolean),
        __metadata$1("design:paramtypes", [Boolean])
    ], PaginationControlsComponent.prototype, "directionLinks", null);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", Boolean),
        __metadata$1("design:paramtypes", [Boolean])
    ], PaginationControlsComponent.prototype, "autoHide", null);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", Boolean),
        __metadata$1("design:paramtypes", [Boolean])
    ], PaginationControlsComponent.prototype, "responsive", null);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", String)
    ], PaginationControlsComponent.prototype, "previousLabel", void 0);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", String)
    ], PaginationControlsComponent.prototype, "nextLabel", void 0);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", String)
    ], PaginationControlsComponent.prototype, "screenReaderPaginationLabel", void 0);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", String)
    ], PaginationControlsComponent.prototype, "screenReaderPageLabel", void 0);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", String)
    ], PaginationControlsComponent.prototype, "screenReaderCurrentLabel", void 0);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata$1("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], PaginationControlsComponent.prototype, "pageChange", void 0);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata$1("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], PaginationControlsComponent.prototype, "pageBoundsCorrection", void 0);
    PaginationControlsComponent = __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'pagination-controls',
            template: DEFAULT_TEMPLATE,
            styles: [DEFAULT_STYLES],
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        })
    ], PaginationControlsComponent);
    return PaginationControlsComponent;
}());

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * This directive is what powers all pagination controls components, including the default one.
 * It exposes an API which is hooked up to the PaginationService to keep the PaginatePipe in sync
 * with the pagination controls.
 */
var PaginationControlsDirective = /** @class */ (function () {
    function PaginationControlsDirective(service, changeDetectorRef) {
        var _this = this;
        this.service = service;
        this.changeDetectorRef = changeDetectorRef;
        this.maxSize = 7;
        this.pageChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.pageBoundsCorrection = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.pages = [];
        this.changeSub = this.service.change
            .subscribe(function (id) {
            if (_this.id === id) {
                _this.updatePageLinks();
                _this.changeDetectorRef.markForCheck();
                _this.changeDetectorRef.detectChanges();
            }
        });
    }
    PaginationControlsDirective.prototype.ngOnInit = function () {
        if (this.id === undefined) {
            this.id = this.service.defaultId();
        }
        this.updatePageLinks();
    };
    PaginationControlsDirective.prototype.ngOnChanges = function (changes) {
        this.updatePageLinks();
    };
    PaginationControlsDirective.prototype.ngOnDestroy = function () {
        this.changeSub.unsubscribe();
    };
    /**
     * Go to the previous page
     */
    PaginationControlsDirective.prototype.previous = function () {
        this.checkValidId();
        this.setCurrent(this.getCurrent() - 1);
    };
    /**
     * Go to the next page
     */
    PaginationControlsDirective.prototype.next = function () {
        this.checkValidId();
        this.setCurrent(this.getCurrent() + 1);
    };
    /**
     * Returns true if current page is first page
     */
    PaginationControlsDirective.prototype.isFirstPage = function () {
        return this.getCurrent() === 1;
    };
    /**
     * Returns true if current page is last page
     */
    PaginationControlsDirective.prototype.isLastPage = function () {
        return this.getLastPage() === this.getCurrent();
    };
    /**
     * Set the current page number.
     */
    PaginationControlsDirective.prototype.setCurrent = function (page) {
        this.pageChange.emit(page);
    };
    /**
     * Get the current page number.
     */
    PaginationControlsDirective.prototype.getCurrent = function () {
        return this.service.getCurrentPage(this.id);
    };
    /**
     * Returns the last page number
     */
    PaginationControlsDirective.prototype.getLastPage = function () {
        var inst = this.service.getInstance(this.id);
        if (inst.totalItems < 1) {
            // when there are 0 or fewer (an error case) items, there are no "pages" as such,
            // but it makes sense to consider a single, empty page as the last page.
            return 1;
        }
        return Math.ceil(inst.totalItems / inst.itemsPerPage);
    };
    PaginationControlsDirective.prototype.getTotalItems = function () {
        return this.service.getInstance(this.id).totalItems;
    };
    PaginationControlsDirective.prototype.checkValidId = function () {
        if (this.service.getInstance(this.id).id == null) {
            console.warn("PaginationControlsDirective: the specified id \"" + this.id + "\" does not match any registered PaginationInstance");
        }
    };
    /**
     * Updates the page links and checks that the current page is valid. Should run whenever the
     * PaginationService.change stream emits a value matching the current ID, or when any of the
     * input values changes.
     */
    PaginationControlsDirective.prototype.updatePageLinks = function () {
        var _this = this;
        var inst = this.service.getInstance(this.id);
        var correctedCurrentPage = this.outOfBoundCorrection(inst);
        if (correctedCurrentPage !== inst.currentPage) {
            setTimeout(function () {
                _this.pageBoundsCorrection.emit(correctedCurrentPage);
                _this.pages = _this.createPageArray(inst.currentPage, inst.itemsPerPage, inst.totalItems, _this.maxSize);
            });
        }
        else {
            this.pages = this.createPageArray(inst.currentPage, inst.itemsPerPage, inst.totalItems, this.maxSize);
        }
    };
    /**
     * Checks that the instance.currentPage property is within bounds for the current page range.
     * If not, return a correct value for currentPage, or the current value if OK.
     */
    PaginationControlsDirective.prototype.outOfBoundCorrection = function (instance) {
        var totalPages = Math.ceil(instance.totalItems / instance.itemsPerPage);
        if (totalPages < instance.currentPage && 0 < totalPages) {
            return totalPages;
        }
        else if (instance.currentPage < 1) {
            return 1;
        }
        return instance.currentPage;
    };
    /**
     * Returns an array of Page objects to use in the pagination controls.
     */
    PaginationControlsDirective.prototype.createPageArray = function (currentPage, itemsPerPage, totalItems, paginationRange) {
        // paginationRange could be a string if passed from attribute, so cast to number.
        paginationRange = +paginationRange;
        var pages = [];
        var totalPages = Math.ceil(totalItems / itemsPerPage);
        var halfWay = Math.ceil(paginationRange / 2);
        var isStart = currentPage <= halfWay;
        var isEnd = totalPages - halfWay < currentPage;
        var isMiddle = !isStart && !isEnd;
        var ellipsesNeeded = paginationRange < totalPages;
        var i = 1;
        while (i <= totalPages && i <= paginationRange) {
            var label = void 0;
            var pageNumber = this.calculatePageNumber(i, currentPage, paginationRange, totalPages);
            var openingEllipsesNeeded = (i === 2 && (isMiddle || isEnd));
            var closingEllipsesNeeded = (i === paginationRange - 1 && (isMiddle || isStart));
            if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                label = '...';
            }
            else {
                label = pageNumber;
            }
            pages.push({
                label: label,
                value: pageNumber
            });
            i++;
        }
        return pages;
    };
    /**
     * Given the position in the sequence of pagination links [i],
     * figure out what page number corresponds to that position.
     */
    PaginationControlsDirective.prototype.calculatePageNumber = function (i, currentPage, paginationRange, totalPages) {
        var halfWay = Math.ceil(paginationRange / 2);
        if (i === paginationRange) {
            return totalPages;
        }
        else if (i === 1) {
            return i;
        }
        else if (paginationRange < totalPages) {
            if (totalPages - halfWay < currentPage) {
                return totalPages - paginationRange + i;
            }
            else if (halfWay < currentPage) {
                return currentPage - halfWay + i;
            }
            else {
                return i;
            }
        }
        else {
            return i;
        }
    };
    __decorate$3([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$2("design:type", String)
    ], PaginationControlsDirective.prototype, "id", void 0);
    __decorate$3([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$2("design:type", Number)
    ], PaginationControlsDirective.prototype, "maxSize", void 0);
    __decorate$3([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata$2("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], PaginationControlsDirective.prototype, "pageChange", void 0);
    __decorate$3([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata$2("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], PaginationControlsDirective.prototype, "pageBoundsCorrection", void 0);
    PaginationControlsDirective = __decorate$3([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: 'pagination-template,[pagination-template]',
            exportAs: 'paginationApi'
        }),
        __metadata$2("design:paramtypes", [PaginationService,
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], PaginationControlsDirective);
    return PaginationControlsDirective;
}());

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NgxPaginationModule = /** @class */ (function () {
    function NgxPaginationModule() {
    }
    NgxPaginationModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
            declarations: [
                PaginatePipe,
                PaginationControlsComponent,
                PaginationControlsDirective
            ],
            providers: [PaginationService],
            exports: [PaginatePipe, PaginationControlsComponent, PaginationControlsDirective]
        })
    ], NgxPaginationModule);
    return NgxPaginationModule;
}());

/**
 * Generated bundle index. Do not edit.
 */




/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/addemployee/addemployee.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/addemployee/addemployee.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"container-fluid\">\n    <app-header></app-header>\n</div> \n\n<br>\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col\">\n\n        <form #f=\"ngForm\" (ngSubmit)=\"onSubmit(f)\">\n\n          <mat-form-field appearance=\"outline\" class=\"myclass\" [color]=\"'accent'\">\n            <mat-label>Employee Name</mat-label>\n            <input matInput type=\"text\" placeholder=\"Enter the Employee Name\"\n              #empname=\"ngModel\" ngModel \n              name=\"name\"        \n              required  >\n\n              <mat-error *ngIf=\"empname.touched && !empname.valid\"> ** Please Enter the  Employee Name</mat-error>\n\n          </mat-form-field>\n\n          <mat-form-field appearance=\"outline\" class=\"myclass\" [color]=\"'accent'\">\n            <mat-label>Employee Phone</mat-label>\n            <input matInput type=\"number\" minlength=\"10\" maxlength=\"13\" placeholder=\"Enter the Employee Mobile No\"\n                      #empphone=\"ngModel\" ngModel \n                      name=\"phoneno\"\n                      required\n                  >\n              \n              <mat-error *ngIf=\"empphone.touched && !empphone.valid\"> ** Please Enter the  Employee Phone Number</mat-error>\n\n          </mat-form-field>\n\n\n          <mat-form-field appearance=\"outline\" class=\"myclass\" [color]=\"'accent'\">\n            <mat-label>Employee Department</mat-label>\n            <input matInput type=\"text\" placeholder=\"Enter the Employee Department\"\n            #empdept=\"ngModel\" ngModel \n            name=\"department\"\n              required  >\n            \n            <mat-error *ngIf=\"empdept.touched && !empdept.valid\"> ** Please Enter the  Department</mat-error>\n       </mat-form-field>\n\n       <mat-form-field appearance=\"outline\" class=\"myclass\" [color]=\"'accent'\">\n        <mat-label>Employee Status</mat-label>\n        <input matInput type=\"text\" placeholder=\"Enter the Employee Status\"\n        #empstatus=\"ngModel\" ngModel \n        name=\"status\"\n          required  >\n        \n        <mat-error *ngIf=\"empstatus.touched && !empstatus.valid\"> ** Please Enter the  Status</mat-error>\n   </mat-form-field>\n\n   <mat-form-field class=\"myclass\">\n    <mat-label>Select Country</mat-label>\n    <mat-select required #country=\"ngModel\" name=\"country\" ngModel>\n        <mat-option>---</mat-option>\n        <mat-option *ngFor=\"let item of allCountry\" [value]=\"item\">\n          {{item.cname}}\n        </mat-option>\n\n    </mat-select>\n  </mat-form-field>\n  <button mat-raised-button color=\"primary\" [disabled]=\"!f.valid\">Submit</button>\n\n        </form>\n\n      </div>\n\n    </div>\n\n  </div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/employeedetails/employeedetails.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/employeedetails/employeedetails.component.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"container-fluid\">\n    <app-header></app-header>\n</div>\n\n<br>\n  <div class=\"container-fluid\">\n\n\n  <div class=\"row\">\n      <div class=\"col\">\n          <div >                    \n              <div class=\"card myrgb\" style=\"width:400px\">\n                 \n                  <div class=\"card-body\">\n                    <h4 class=\"card-title\" >{{empobj.name}} </h4>\n                    <div class=\"card-text\">\n                      <h5 >\n                      <label for=\"\">Status:</label> &nbsp;  \n                       <span [ngClass]=\"{\n                          'badge':true,\n                          'badge-pill':true,\n                          'badge-success':empobj.status.toLowerCase() == 'active',\n                          'badge-warning':empobj.status.toLowerCase()=='inactive',\n                          'badge-danger':empobj.status.toLowerCase()=='suspend'\n                      }\" style=\"padding: 10px;\">{{empobj.status}}</span>\n                  \n                  </h5> \n                  \n                        <label><strong>Mobile No:</strong></label>\n                        <span> <strong>{{empobj.mobileNo}}</strong> </span><br>\n                        <label><strong>Created By:</strong></label>\n                        <span> <strong> {{empobj.createdBy}} </strong> </span><br>\n                        <label><strong>Department:</strong></label>\n                        <span> <strong> {{empobj.department}} </strong> </span>\n\n                        \n                        \n                    </div>\n                   \n                   <button class=\"btn btn-primary\"\n                    (click)=\"OnUpdate()\">Update Employee</button> \n                   <button routerLink=\"/home\" class=\"btn btn-warning\">Home</button>\n            \n      </div>\n  </div>\n\n\n  </div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/header/header.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/header/header.component.html ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"row\" style=\"margin-top: 10px\">\n    <div class=\"col\">\n      <nav class=\"navbar navbar-expand-md navbar-dark bg-dark\">\n        <a class=\"navbar-brand\" style=\"color: white\" routerLink=\"/home\">\n          Employee Work Force</a>\n  \n        <div class=\"collapse navbar-collapse\">\n          <div class=\"navbar-nav ml-auto\">\n            <span   class=\"nav-item nav-link\"\n              style=\"font-weight: bold; color: whitesmoke\"\n              >Hi Welcome {{ username }} </span\n            >&nbsp;\n            <a (click)=\"onLogout()\"\n              style=\"cursor: pointer; font-weight: bold; color: whitesmoke\"\n              class=\"nav-item nav-link\"\n              >LogOut</a >\n          </div>\n        </div>\n      </nav>\n    </div>\n  </div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.component.html ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n\n<!-- <h2>{{myusername}}</h2> -->\n\n<div class=\"container-fluid\">\n    <app-header></app-header>\n    <br>\n      <div class=\"row\">\n         <div class=\"col\">\n        \n          <div>\n            <button routerLink=\"addemployee\" class=\"btn btn-success\">Add Employee</button>\n            <button (click)=\"onUpdate(popUp)\" class=\"btn btn-warning\">Update Employee</button>\n            <button  (click)=\"onDelete()\" class=\"btn btn-danger\">Delete Employee</button> \n            <button  (click)=\"onChange()\" class=\"btn btn-primary\">Change Status</button> \n            <div class=\"form-group\" class=\"pull-right\" style=\"margin-top: 10px;\">\n              <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\" style=\"font-size: 1em;\">\n                      <i class=\"fa fa-search\"></i></span>\n                      <input type=\"text\" class=\"form-control\" placeholder=\"Search\"\n                      style=\"width: min-content;\" [(ngModel)]=\"nameSearch\">\n                 </div>\n                </div>\n          </div>\n\n          <ng-template #popUp>\n             <app-updateemployee [parentData]=\"empobj\"></app-updateemployee>\n             <button class=\"btn btn-danger\" (click)=\"modalRef.hide()\">Cancel</button>\n          </ng-template>\n          <br>\n            <table class=\"table table-bordered table-hover\">\n                <thead>\n                    <th>#</th> \n                    <th>Action</th>  \n                    <th>Name</th>\n                    <th>Gender</th>\n                    <th>Department</th>\n                    <th>Status</th>                   \n                    <th>Created date</th>\n                    <th>Upadatated date</th>\n                    \n                </thead>\n                <tbody>\n                      <tr *ngFor=\"let item of empdata | paginate: { itemsPerPage: 5, currentPage: p }  | filter:nameSearch;index as i\">\n                          <td>{{i+1}}</td>\n                          <td><input type=\"radio\" name=\"record\" (click)=\"onRadio(item)\"></td>\n                          <td><a [routerLink]=\"['employeedetails',item.id]\">{{item.name}}</a></td>\n                          <td>{{item.gender}}</td>\n                          <td>{{item.department}}</td>\n                          <td> <h5><span\n                            [ngClass]=\"{\n                              'badge':true,'badge-pill':true,\n                              'badge-danger':item.status.toLowerCase()=='suspend',\n                               'badge-success':item.status.toLowerCase()=='active',\n                              'badge-warning':item.status.toLowerCase()=='inactive'\n                            }\"  \n                          style=\"padding: 8px;\">{{item.status}}</span></h5> </td>\n                          <td>{{item.createdDate|date:'dd-MM-yyyy'}}</td>\n                          <td>{{item.updatedDate|date}}</td>\n                     </tr>\n                </tbody>\n            </table> \n             <pagination-controls (pageChange)=\"p = $event\"></pagination-controls>\n         </div>\n\n      </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/updateemployee/updateemployee.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/updateemployee/updateemployee.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div style=\"margin: 5px;padding: 5px;\">\n    \n    <div class=\"form-group\">\n        <label for=\"\">ID </label>\n        <input type=\"text\" class=\"form-control\" \n         placeholder=\"Enter the id\"\n          [(ngModel)]=\"parentData.id\" readonly>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"\">Employee Name </label>\n        <input type=\"text\" class=\"form-control\" \n         placeholder=\"Enter the id\"\n         [(ngModel)]=\"parentData.name\" >\n    </div>\n    <div class=\"form-group\">\n        <label for=\"\">Employee Department </label>\n        <input type=\"text\" class=\"form-control\"  placeholder=\"Enter the id\"\n         [(ngModel)]=\"parentData.department\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"\">Employee Status </label>\n        <input type=\"text\" class=\"form-control\"  placeholder=\"Enter the id\"\n         [(ngModel)]=\"parentData.status\" >\n    </div>\n   \n   <div class=\"form-group\">\n        <select name=\"\" id=\"\" [(ngModel)]=\"parentData.country\" >\n            <!-- <option [value]=\"item.cid\" *ngFor=\"let item of allCountry\"> -->\n                <option  [ngValue]=\"item\" *ngFor=\"let item of allCountry\">\n                {{item.cname}}\n            </option>\n        </select>\n  \n   </div>\n   \n  \n    <hr>\n    <div class=\"form-group\">\n        <button (click)=\"onupdate()\" class=\"btn btn-success\" \n        [disabled]=\"!issubmitDissabled\">Submit</button>\n        <br><br> \n        <span class=\"alert alert-success\" \n        [hidden]=\"issubmitDissabled\"> {{backendResponse}} </span>\n    </div>\n  \n  </div>\n");

/***/ }),

/***/ "./src/app/addemployee/addemployee.component.css":
/*!*******************************************************!*\
  !*** ./src/app/addemployee/addemployee.component.css ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".myclass {\r\n    display: flex;\r\n    flex-direction: column;\r\n  }\r\n  \r\n  .myclass > * {\r\n    width: 100%;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRkZW1wbG95ZWUvYWRkZW1wbG95ZWUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxXQUFXO0VBQ2IiLCJmaWxlIjoic3JjL2FwcC9hZGRlbXBsb3llZS9hZGRlbXBsb3llZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm15Y2xhc3Mge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgfVxyXG4gIFxyXG4gIC5teWNsYXNzID4gKiB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9Il19 */");

/***/ }),

/***/ "./src/app/addemployee/addemployee.component.ts":
/*!******************************************************!*\
  !*** ./src/app/addemployee/addemployee.component.ts ***!
  \******************************************************/
/*! exports provided: AddemployeeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddemployeeComponent", function() { return AddemployeeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _httplogin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../httplogin.service */ "./src/app/httplogin.service.ts");




let AddemployeeComponent = class AddemployeeComponent {
    constructor(service, router) {
        this.service = service;
        this.router = router;
        this.allCountry = [];
    }
    ngOnInit() {
        this.getCountryFrombackend();
    }
    getCountryFrombackend() {
        this.service.getCountry().subscribe((response) => {
            this.allCountry = response;
        });
    }
    onSubmit(f) {
        console.log(f.value.country);
        let obj = {
            name: f.value.name,
            mobileNo: f.value.phoneno,
            department: f.value.department,
            status: f.value.status,
            // country:f.val.country,
            createdBy: sessionStorage.getItem("username"),
            createdDate: Date.now(),
            updatedBy: sessionStorage.getItem("username"),
            updatedDate: Date.now()
        };
        this.service.addEmployee(obj).subscribe((response) => {
            console.log(response);
            this.router.navigate(['/home']);
        });
    }
};
AddemployeeComponent.ctorParameters = () => [
    { type: _httplogin_service__WEBPACK_IMPORTED_MODULE_3__["HttploginService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
AddemployeeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-addemployee',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./addemployee.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/addemployee/addemployee.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./addemployee.component.css */ "./src/app/addemployee/addemployee.component.css")).default]
    })
], AddemployeeComponent);



/***/ }),

/***/ "./src/app/auth.guard.ts":
/*!*******************************!*\
  !*** ./src/app/auth.guard.ts ***!
  \*******************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");



let AuthGuard = class AuthGuard {
    constructor(router) {
        this.router = router;
    }
    canActivate(next, state) {
        if (sessionStorage.getItem("username") == null) {
            this.router.navigate(["/login"]);
            return false;
        }
        return true;
    }
};
AuthGuard.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], AuthGuard);



/***/ }),

/***/ "./src/app/dashboard/dashboard-routing.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/dashboard/dashboard-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: DashboardRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardRoutingModule", function() { return DashboardRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _addemployee_addemployee_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addemployee/addemployee.component */ "./src/app/addemployee/addemployee.component.ts");
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../auth.guard */ "./src/app/auth.guard.ts");
/* harmony import */ var _employeedetails_employeedetails_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../employeedetails/employeedetails.component */ "./src/app/employeedetails/employeedetails.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../home/home.component */ "./src/app/home/home.component.ts");







const routes = [
    {
        path: "", component: _home_home_component__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]]
    },
    {
        path: "employeedetails/:id", component: _employeedetails_employeedetails_component__WEBPACK_IMPORTED_MODULE_5__["EmployeedetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]]
    },
    {
        path: "addemployee", component: _addemployee_addemployee_component__WEBPACK_IMPORTED_MODULE_3__["AddemployeeComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]]
    },
    {
        path: "**", pathMatch: 'full', redirectTo: '/login',
    }
];
let DashboardRoutingModule = class DashboardRoutingModule {
};
DashboardRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], DashboardRoutingModule);



/***/ }),

/***/ "./src/app/dashboard/dashboard.module.ts":
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.module.ts ***!
  \***********************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard-routing.module */ "./src/app/dashboard/dashboard-routing.module.ts");
/* harmony import */ var _addemployee_addemployee_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addemployee/addemployee.component */ "./src/app/addemployee/addemployee.component.ts");
/* harmony import */ var _employeedetails_employeedetails_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../employeedetails/employeedetails.component */ "./src/app/employeedetails/employeedetails.component.ts");
/* harmony import */ var _filter_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../filter.pipe */ "./src/app/filter.pipe.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _updateemployee_updateemployee_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../updateemployee/updateemployee.component */ "./src/app/updateemployee/updateemployee.component.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../header/header.component */ "./src/app/header/header.component.ts");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _shared_material_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../shared/material.module */ "./src/app/shared/material.module.ts");













let DashboardModule = class DashboardModule {
};
DashboardModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_home_home_component__WEBPACK_IMPORTED_MODULE_7__["HomeComponent"],
            _employeedetails_employeedetails_component__WEBPACK_IMPORTED_MODULE_5__["EmployeedetailsComponent"],
            _addemployee_addemployee_component__WEBPACK_IMPORTED_MODULE_4__["AddemployeeComponent"],
            _header_header_component__WEBPACK_IMPORTED_MODULE_9__["HeaderComponent"],
            _updateemployee_updateemployee_component__WEBPACK_IMPORTED_MODULE_8__["UpdateemployeeComponent"],
            _filter_pipe__WEBPACK_IMPORTED_MODULE_6__["FilterPipe"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_3__["DashboardRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"],
            _shared_material_module__WEBPACK_IMPORTED_MODULE_12__["MaterialModule"],
            ngx_pagination__WEBPACK_IMPORTED_MODULE_10__["NgxPaginationModule"],
        ]
    })
], DashboardModule);



/***/ }),

/***/ "./src/app/dialogue.service.ts":
/*!*************************************!*\
  !*** ./src/app/dialogue.service.ts ***!
  \*************************************/
/*! exports provided: DialogService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogService", function() { return DialogService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _shared_mat_confirm_dialogue_mat_confirm_dialogue_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/mat-confirm-dialogue/mat-confirm-dialogue.component */ "./src/app/shared/mat-confirm-dialogue/mat-confirm-dialogue.component.ts");




//import { MatConfirmDialogComponent } from './shared/mat-confirm-dialog/mat-confirm-dialog.component';
let DialogService = class DialogService {
    constructor(dialog) {
        this.dialog = dialog;
    }
    OpenConfirmDialog(msg) {
        return this.dialog.open(_shared_mat_confirm_dialogue_mat_confirm_dialogue_component__WEBPACK_IMPORTED_MODULE_3__["MatConfirmDialogueComponent"], {
            width: '390px',
            panelClass: 'confirm-dialog-container',
            //Panel class is used to allow our customize dialog box to apply css & make it as custom
            disableClose: true,
            position: { top: "35vh" },
            data: {
                message: msg
            }
        });
    }
};
DialogService.ctorParameters = () => [
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
];
DialogService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], DialogService);



/***/ }),

/***/ "./src/app/employeedetails/employeedetails.component.css":
/*!***************************************************************!*\
  !*** ./src/app/employeedetails/employeedetails.component.css ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("button{\r\n    margin: 10px;\r\n  }\r\n  \r\n  \r\n  .card{\r\n    width:500px;\r\n    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.9);\r\n    border-radius: 26px;\r\n    text-align: justify;\r\n   \r\n    transform-style: preserve-3d;\r\n    /* transform: perspective(1000px); */\r\n  }\r\n  \r\n  \r\n  .myrgb::after {\r\n    content:\"\";\r\n    background: linear-gradient(45deg,\r\n    #ff0000 0%, \r\n    #ff9a00 10%,\r\n    #d0de21 20%,\r\n    #4fdc4a 30%, \r\n    #3fdad8 40%,\r\n    #2fc9e2 50%, \r\n    #1c7fee 60%, \r\n    #5f15f2 70%, \r\n    #ba0cf8 80%, \r\n    #fb07d9 90%, \r\n    #ff0000 100%  ) repeat 0% 0% / 300% 100%;\r\n    position: absolute;\r\n    inset: -3px;\r\n    -webkit-animation: rgb 5s linear infinite;\r\n            animation: rgb 5s linear infinite;\r\n    border-radius: 16px;\r\n    -webkit-filter: blur(8px);\r\n            filter: blur(8px);\r\n    transform: translateZ(-1px); \r\n   \r\n  }\r\n  \r\n  \r\n  @-webkit-keyframes rgb {\r\n    0% {background-position: 0% 50%;}\r\n    50% {background-position: 100% 50%;}\r\n    100% {background-position: 0% 50%;}\r\n\r\n  }\r\n  \r\n  \r\n  @keyframes rgb {\r\n    0% {background-position: 0% 50%;}\r\n    50% {background-position: 100% 50%;}\r\n    100% {background-position: 0% 50%;}\r\n\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZW1wbG95ZWVkZXRhaWxzL2VtcGxveWVlZGV0YWlscy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksWUFBWTtFQUNkOzs7RUFHQTtJQUNFLFdBQVc7SUFDWCwyQ0FBMkM7SUFDM0MsbUJBQW1CO0lBQ25CLG1CQUFtQjs7SUFFbkIsNEJBQTRCO0lBQzVCLG9DQUFvQztFQUN0Qzs7O0VBRUE7SUFDRSxVQUFVO0lBQ1Y7Ozs7Ozs7Ozs7OzRDQUEwUTtJQUMxUSxrQkFBa0I7SUFDbEIsV0FBVztJQUNYLHlDQUFpQztZQUFqQyxpQ0FBaUM7SUFDakMsbUJBQW1CO0lBQ25CLHlCQUFpQjtZQUFqQixpQkFBaUI7SUFDakIsMkJBQTJCOztFQUU3Qjs7O0VBR0E7SUFDRSxJQUFJLDJCQUEyQixDQUFDO0lBQ2hDLEtBQUssNkJBQTZCLENBQUM7SUFDbkMsTUFBTSwyQkFBMkIsQ0FBQzs7RUFFcEM7OztFQUxBO0lBQ0UsSUFBSSwyQkFBMkIsQ0FBQztJQUNoQyxLQUFLLDZCQUE2QixDQUFDO0lBQ25DLE1BQU0sMkJBQTJCLENBQUM7O0VBRXBDIiwiZmlsZSI6InNyYy9hcHAvZW1wbG95ZWVkZXRhaWxzL2VtcGxveWVlZGV0YWlscy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYnV0dG9ue1xyXG4gICAgbWFyZ2luOiAxMHB4O1xyXG4gIH1cclxuICBcclxuICBcclxuICAuY2FyZHtcclxuICAgIHdpZHRoOjUwMHB4O1xyXG4gICAgYm94LXNoYWRvdzogNXB4IDVweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC45KTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDI2cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xyXG4gICBcclxuICAgIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XHJcbiAgICAvKiB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMDBweCk7ICovXHJcbiAgfVxyXG4gIFxyXG4gIC5teXJnYjo6YWZ0ZXIge1xyXG4gICAgY29udGVudDpcIlwiO1xyXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLFxyXG4gICAgI2ZmMDAwMCAwJSwgXHJcbiAgICAjZmY5YTAwIDEwJSxcclxuICAgICNkMGRlMjEgMjAlLFxyXG4gICAgIzRmZGM0YSAzMCUsIFxyXG4gICAgIzNmZGFkOCA0MCUsXHJcbiAgICAjMmZjOWUyIDUwJSwgXHJcbiAgICAjMWM3ZmVlIDYwJSwgXHJcbiAgICAjNWYxNWYyIDcwJSwgXHJcbiAgICAjYmEwY2Y4IDgwJSwgXHJcbiAgICAjZmIwN2Q5IDkwJSwgXHJcbiAgICAjZmYwMDAwIDEwMCUgICkgcmVwZWF0IDAlIDAlIC8gMzAwJSAxMDAlO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgaW5zZXQ6IC0zcHg7XHJcbiAgICBhbmltYXRpb246IHJnYiA1cyBsaW5lYXIgaW5maW5pdGU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xyXG4gICAgZmlsdGVyOiBibHVyKDhweCk7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooLTFweCk7IFxyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgQGtleWZyYW1lcyByZ2Ige1xyXG4gICAgMCUge2JhY2tncm91bmQtcG9zaXRpb246IDAlIDUwJTt9XHJcbiAgICA1MCUge2JhY2tncm91bmQtcG9zaXRpb246IDEwMCUgNTAlO31cclxuICAgIDEwMCUge2JhY2tncm91bmQtcG9zaXRpb246IDAlIDUwJTt9XHJcblxyXG4gIH0iXX0= */");

/***/ }),

/***/ "./src/app/employeedetails/employeedetails.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/employeedetails/employeedetails.component.ts ***!
  \**************************************************************/
/*! exports provided: EmployeedetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmployeedetailsComponent", function() { return EmployeedetailsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _httplogin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../httplogin.service */ "./src/app/httplogin.service.ts");




let EmployeedetailsComponent = class EmployeedetailsComponent {
    constructor(route, service) {
        this.route = route;
        this.service = service;
        this.empobj = {};
    }
    ngOnInit() {
        this.getDataFromUrl();
    }
    getDataFromUrl() {
        this.route.paramMap.subscribe((param) => {
            //console.log(param);
            this.getDataFromBackend(param.get("id"));
        });
    }
    getDataFromBackend(id) {
        this.service.getEmployeeById(id).subscribe((response) => {
            console.log(response);
            this.empobj = response;
        });
    }
    OnUpdate() {
    }
};
EmployeedetailsComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _httplogin_service__WEBPACK_IMPORTED_MODULE_3__["HttploginService"] }
];
EmployeedetailsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-employeedetails',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./employeedetails.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/employeedetails/employeedetails.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./employeedetails.component.css */ "./src/app/employeedetails/employeedetails.component.css")).default]
    })
], EmployeedetailsComponent);



/***/ }),

/***/ "./src/app/filter.pipe.ts":
/*!********************************!*\
  !*** ./src/app/filter.pipe.ts ***!
  \********************************/
/*! exports provided: FilterPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterPipe", function() { return FilterPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let FilterPipe = class FilterPipe {
    transform(value, searchTerm) {
        let EmpArray = [];
        for (let i = 0; i < value.length; i++) {
            let name = value[i].name;
            let dept = value[i].department;
            let status = value[i].status;
            //let country:string=value[i].country.cname; 
            if (name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                //  if(name.toLowerCase().startsWith(searchTerm.toLowerCase())){
                EmpArray.push(value[i]);
            }
            else if (dept.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                EmpArray.push(value[i]);
            }
            else if (status.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                EmpArray.push(value[i]);
            }
            // else if(country.toLowerCase().startsWith(searchTerm.toLowerCase())){
            //   EmpArray.push(value[i]);
            // }
        }
        return EmpArray;
    }
};
FilterPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
        name: 'filter'
    })
], FilterPipe);



/***/ }),

/***/ "./src/app/header/header.component.css":
/*!*********************************************!*\
  !*** ./src/app/header/header.component.css ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/header/header.component.ts":
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");



let HeaderComponent = class HeaderComponent {
    constructor(router) {
        this.router = router;
        this.username = "";
    }
    ngOnInit() {
        this.username = sessionStorage.getItem("username");
    }
    onLogout() {
        sessionStorage.removeItem("username");
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }
};
HeaderComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-header',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./header.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/header/header.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./header.component.css */ "./src/app/header/header.component.css")).default]
    })
], HeaderComponent);



/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("td,tr,th{\r\n    text-align: center;\r\n}\r\n\r\nbutton{\r\n    margin: 10px;   \r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0ZCx0cix0aHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuYnV0dG9ue1xyXG4gICAgbWFyZ2luOiAxMHB4OyAgIFxyXG59Il19 */");

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm2015/ngx-bootstrap-modal.js");
/* harmony import */ var _dialogue_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dialogue.service */ "./src/app/dialogue.service.ts");
/* harmony import */ var _httplogin_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../httplogin.service */ "./src/app/httplogin.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");






let HomeComponent = class HomeComponent {
    constructor(service, modalservice, dialogservice, toaster) {
        this.service = service;
        this.modalservice = modalservice;
        this.dialogservice = dialogservice;
        this.toaster = toaster;
        //myusername:string='';
        this.p = 1;
        this.nameSearch = '';
        this.empdata = [];
        this.isradiocheck = false;
        this.empobj = {};
        this.config = {
            animated: true,
            ignoreBackdropClick: true,
            class: "alert alert-danger"
        };
    }
    ngOnInit() {
        //this.username=sessionStorage.getItem("username");
        this.getDataFromBackend();
    }
    getDataFromBackend() {
        this.service.getEmployee().subscribe((response) => {
            this.empdata = response;
            console.log(this.empdata);
        });
    }
    onRadio(item) {
        this.isradiocheck = true;
        console.log(item);
        this.empobj = item;
    }
    radioCheck() {
        if (this.isradiocheck) {
            return true;
        }
        else {
            return false;
        }
    }
    onUpdate(popup) {
        if (this.radioCheck()) {
            this.modalRef = this.modalservice.show(popup, this.config);
        }
        else {
            alert("please select a record to update");
        }
    }
    onDelete() {
        if (this.radioCheck()) {
            this.dialogservice.OpenConfirmDialog("Are you sure to delete the record?")
                .afterClosed().subscribe((res) => {
                console.log(res);
                if (res) {
                    //delete a record
                    this.service.DeleteRecord(this.empobj.id).subscribe((response) => {
                        //console.log(response)
                        this.toaster.success(response);
                        this.getDataFromBackend();
                    });
                }
            });
        }
        else {
            alert("Please select a record to delete");
        }
    }
};
HomeComponent.ctorParameters = () => [
    { type: _httplogin_service__WEBPACK_IMPORTED_MODULE_4__["HttploginService"] },
    { type: ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__["BsModalService"] },
    { type: _dialogue_service__WEBPACK_IMPORTED_MODULE_3__["DialogService"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
];
HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./home.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")).default]
    })
], HomeComponent);



/***/ }),

/***/ "./src/app/updateemployee/updateemployee.component.css":
/*!*************************************************************!*\
  !*** ./src/app/updateemployee/updateemployee.component.css ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VwZGF0ZWVtcGxveWVlL3VwZGF0ZWVtcGxveWVlLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/updateemployee/updateemployee.component.ts":
/*!************************************************************!*\
  !*** ./src/app/updateemployee/updateemployee.component.ts ***!
  \************************************************************/
/*! exports provided: UpdateemployeeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateemployeeComponent", function() { return UpdateemployeeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _httplogin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../httplogin.service */ "./src/app/httplogin.service.ts");



let UpdateemployeeComponent = class UpdateemployeeComponent {
    constructor(service) {
        this.service = service;
        this.allCountry = [];
        this.parentData = {};
        this.issubmitDissabled = true;
        this.backendResponse = "";
    }
    ngOnInit() {
        this.GetAllCountry();
    }
    GetAllCountry() {
        this.service.getCountry()
            .subscribe((response) => {
            this.allCountry = response;
        });
    }
    onupdate() {
        this.parentData.updatedDate = Date.now();
        this.parentData.updatedBy = sessionStorage.getItem("username");
        this.service.UpdateEmployee(this.parentData).subscribe((response) => {
            console.log(response);
            this.issubmitDissabled = false;
            this.backendResponse = response;
        });
    }
};
UpdateemployeeComponent.ctorParameters = () => [
    { type: _httplogin_service__WEBPACK_IMPORTED_MODULE_2__["HttploginService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], UpdateemployeeComponent.prototype, "parentData", void 0);
UpdateemployeeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-updateemployee',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./updateemployee.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/updateemployee/updateemployee.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./updateemployee.component.css */ "./src/app/updateemployee/updateemployee.component.css")).default]
    })
], UpdateemployeeComponent);



/***/ })

}]);
//# sourceMappingURL=dashboard-dashboard-module-es2015.js.map