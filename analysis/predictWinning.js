"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import BaseAnalysis from "./BaseAnalysis.js";
var predictWinning = /** @class */ (function (_super) {
    __extends(predictWinning, _super);
    function predictWinning(red1, red2, red3, blue1, blue2, blue3) {
        var _this = _super.call(this) || this;
        _this.red1 = red1;
        _this.red2 = red2;
        _this.red3 = red3;
        _this.blue1 = blue1;
        _this.blue2 = blue2;
        _this.blue3 = blue3;
        _this.winningAlliance = 2;
        _this.redWinning = 0;
        _this.blueWinning;
        //red = 0
        //blue = 1
        _this.blueAlliance = {};
        _this.redAlliance = {};
        return _this;
    }
    predictWinning.prototype.getWinner = function () {
        return __awaiter(this, void 0, void 0, function () {
            var a;
            return __generator(this, function (_a) {
                a = this;
                return [2 /*return*/];
            });
        });
    };
    predictWinning.prototype.GetZPercent = function (z) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        // if(err)
                        // {
                        //     reject(err);
                        // }
                        if (z < -6.5)
                            resolve(0.0);
                        if (z > 6.5)
                            resolve(1.0);
                        var factK = 1;
                        var sum = 0;
                        var term = 1;
                        var k = 0;
                        var loopStop = Math.exp(-23);
                        while (Math.abs(term) > loopStop) {
                            term = .3989422804 * Math.pow(-1, k) * Math.pow(z, k) / (2 * k + 1) / Math.pow(2, k) * Math.pow(z, k + 1) / factK;
                            sum += term;
                            k++;
                            factK *= k;
                        }
                        sum += 0.5;
                        resolve(sum);
                    })
                    //z == number of standard deviations from the mean
                    //if z is greater than 6.5 standard deviations from the mean
                    //the number of significant digits will be outside of a reasonable 
                    //range
                ];
            });
        });
    };
    predictWinning.prototype.getMean = function (teamArray) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var total = 0;
                        for (var i = 0; i < teamArray.length; i++) {
                            total += teamArray[i];
                        }
                        resolve(total / teamArray.length);
                    })];
            });
        });
    };
    predictWinning.prototype.runAnalysis = function () {
        var _this = this;
        var a = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, a.getWinner().catch(function (err) {
                        })
                        // a.result = temp   
                    ];
                    case 1:
                        _a.sent();
                        // a.result = temp   
                        resolve("done");
                        return [2 /*return*/];
                }
            });
        }); });
    };
    predictWinning.prototype.finalizeResults = function () {
        return {
            "red1": this.red1,
            "red2": this.red2,
            "red3": this.red3,
            "blue1": this.blue1,
            "blue2": this.blue2,
            "blue3": this.blue3,
            "redWinning": this.redWinning,
            "blueWinning": this.blueWinning,
            "winningAlliance": this.winningAlliance,
            "redAlliance": this.redAlliance,
            "blueAlliance": this.blueAlliance
        };
    };
    return predictWinning;
}(BaseAnalysis));
var MainItem = /** @class */ (function () {
    function MainItem() {
    }
    return MainItem;
}());
export default predictWinning;