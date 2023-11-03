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
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAnalysis_1 = require(".././BaseAnalysis");
var simpleStats = require("simple-statistics");
var basePointAverage = /** @class */ (function (_super) {
    __extends(basePointAverage, _super);
    function basePointAverage(team, sourceTeams, tournamentScoutedSettings, action, timeMin, timeMax) {
        var _this = _super.call(this) || this;
        _this.teamAvg = 0;
        _this.teamArray = [];
        _this.allTeamAvg = 0;
        _this.difference = 0;
        _this.team = team;
        _this.tournamentScoutedSettings = tournamentScoutedSettings;
        _this.sourceTeams = sourceTeams;
        _this.action = action;
        _this.timeMin = timeMax;
        _this.timeMax = timeMax;
        _this.allTeamArr = [];
        _this.zScore = 0;
        return _this;
    }
    basePointAverage.prototype.getTeamAverage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, arr, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.supabase.rpc('groupAndCountPointsTeam', {
                            tournament_keys: this.tournamentScoutedSettings,
                            source_teams: this.sourceTeams,
                            single_team: this.team,
                            single_action: this.action,
                            timeMax_input: this.timeMax,
                            timeMin_input: this.timeMin
                        })];
                    case 1:
                        _a = _b.sent(), arr = _a.data, error = _a.error;
                        this.teamArray = arr;
                        this.teamAvg = this.teamArray.reduce(function (partialSum, a) { return partialSum + a; }, 0) / this.teamArray.length;
                        return [2 /*return*/];
                }
            });
        });
    };
    basePointAverage.prototype.getAllTeamsAverage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, allArr, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.supabase.rpc('groupAndCountPoints', {
                            tournament_keys: this.tournamentScoutedSettings,
                            source_teams: this.sourceTeams,
                            single_team: this.team,
                            timeMax_input: this.timeMax,
                            timeMin_input: this.timeMin
                        })];
                    case 1:
                        _a = _b.sent(), allArr = _a.data, error = _a.error;
                        this.allTeamArr = allArr;
                        this.allTeamAvg = allArr.reduce(function (partialSum, a) { return partialSum + a; }, 0) / this.teamArray.length;
                        this.difference = this.teamAvg - this.allTeamAvg;
                        this.zScore = this.difference / simpleStats.standardDeviation(this.allTeamArr);
                        return [2 /*return*/];
                }
            });
        });
    };
    basePointAverage.prototype.runAnalysis = function () {
        var _this = this;
        var a = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, a.getTeamAverage().catch(function (err) {
                            reject(err);
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, a.getAllTeamsAverage().catch(function (err) {
                                reject(err);
                            })];
                    case 2:
                        _a.sent();
                        resolve("done");
                        return [2 /*return*/];
                }
            });
        }); });
    };
    basePointAverage.prototype.finalizeResults = function () {
        return {
            "team": this.team,
            "teamAvg": this.teamAvg,
            "allTeamAvg": this.allTeamAvg,
            "teamArray": this.teamArray,
            "difference": this.difference
        };
    };
    return basePointAverage;
}(BaseAnalysis_1.default));
exports.default = basePointAverage;
