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
var BaseAnalysis_1 = require("./BaseAnalysis");
var basePointAverage_1 = require("./base/basePointAverage");
var checkNewMatch = /** @class */ (function (_super) {
    __extends(checkNewMatch, _super);
    function checkNewMatch(sourceTeam, scouterUuid, match, tournamentKey, tournamentSettings, sourceTeamSettings) {
        var _this = _super.call(this) || this;
        _this.sourceTeam = sourceTeam;
        _this.scouterUuid = scouterUuid;
        _this.match = match;
        _this.tournamentKey = tournamentKey;
        _this.tournamentSettings = tournamentSettings;
        _this.sourceTeamSettings = sourceTeamSettings;
        return _this;
    }
    checkNewMatch.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, points, error, teamAvg, teamAvgPoints, _b, scouterNames, error_1, teamPoints, _c, data, error_2, _d, data, error_3;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.supabase
                            .from('events')
                            .select('count(points), team')
                            .eq('tournamentKey', this.tournamentKey)
                            .eq('match', this.match)
                            .eq('scouterUuid', this.scouterUuid)
                            .eq('sourceTeam', this.sourceTeam)];
                    case 1:
                        _a = _e.sent(), points = _a.data, error = _a.error;
                        if (error) {
                            console.log(error);
                            return [2 /*return*/, error];
                        }
                        teamAvg = new basePointAverage_1.default(points[0].team, this.sourceTeamSettings, this.tournamentSettings, 2, 0, 300);
                        return [4 /*yield*/, teamAvg.runAnalysis()];
                    case 2:
                        _e.sent();
                        teamAvgPoints = teamAvg.finalizeResults().teamAvg;
                        return [4 /*yield*/, this.supabase
                                .from('flaggedMatches')
                                .select("name")
                                .eq('scouterUuid', this.scouterUuid)];
                    case 3:
                        _b = _e.sent(), scouterNames = _b.data, error_1 = _b.error;
                        if (error_1) {
                            console.error("Error fetching names:", error_1);
                            return [2 /*return*/, error_1];
                        }
                        teamPoints = points[0].count[0].points;
                        if (!(teamPoints > teamAvgPoints + teamAvgPoints * 0.5)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.supabase
                                .from('flaggedMatches')
                                .insert([{ 'sourceTeam': this.sourceTeam, 'uuid': this.scouterUuid, 'match': this.match, "tournamentKey": this.tournamentKey, "note": "very high points recorded", "name": scouterNames[0].name }])];
                    case 4:
                        _c = _e.sent(), data = _c.data, error_2 = _c.error;
                        if (error_2) {
                            console.log(error_2);
                            return [2 /*return*/, error_2];
                        }
                        _e.label = 5;
                    case 5:
                        if (!(teamPoints == 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.supabase
                                .from('flaggedMatches')
                                .insert([{ 'sourceTeam': this.sourceTeam, 'uuid': this.scouterUuid, 'match': this.match, "tournamentKey": this.tournamentKey, "note": "0 non-endgame points recorded", "name": scouterNames[0].name }])];
                    case 6:
                        _d = _e.sent(), data = _d.data, error_3 = _d.error;
                        if (error_3) {
                            console.log(error_3);
                            return [2 /*return*/, error_3];
                        }
                        _e.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    checkNewMatch.prototype.runAnalysis = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData().catch(function (err) {
                            console.log(err);
                            reject(err);
                        })];
                    case 1:
                        _a.sent();
                        resolve("done");
                        return [2 /*return*/];
                }
            });
        }); });
    };
    checkNewMatch.prototype.finalizeResults = function () {
        return {};
    };
    return checkNewMatch;
}(BaseAnalysis_1.default));
exports.default = checkNewMatch;
