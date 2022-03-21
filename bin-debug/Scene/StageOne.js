var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var StageOne = (function (_super) {
    __extends(StageOne, _super);
    function StageOne(AreaName) {
        var _this = _super.call(this) || this;
        _this.Area = AreaName;
        _this.isStart = false;
        return _this;
    }
    StageOne.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    StageOne.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.Bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.StartGame();
        }, this);
    };
    StageOne.prototype.StartGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                //移除标题
                if (!this.isStart) {
                    egret.Tween.get(this.title1).to({ alpha: 0 }, 1000, egret.Ease.sineIn);
                    egret.Tween.get(this.title2).to({ alpha: 0 }, 1000, egret.Ease.sineIn);
                    this.isStart = true;
                    self = this;
                    setTimeout(function () {
                        self.removeChild(self.title1);
                        self.removeChild(self.title2);
                        self.GetRandomOption(self.Area).then(function (data) {
                            self.SetQandOptions(data);
                        });
                    }, 1000);
                }
                return [2 /*return*/];
            });
        });
    };
    StageOne.prototype.SetQandOptions = function (data) {
        var QandOptions = data;
        //随机选取一对作为正确答案
        var num = Math.floor(Math.random() * 3);
        var Answer = QandOptions[num]['Capital'];
        this.Question = new eui.Label();
        this.Question.horizontalCenter = 0;
        this.Question.y = 400;
        this.Question.text = QandOptions[num]["CName"] + "的首都/首府是？";
        this.Question.textColor = 256;
        this.addChild(this.Question);
        this.Question.size = 100;
        this.OptionLayout = new eui.Group();
        this.OptionLayout.horizontalCenter = 0;
        this.OptionLayout.y = 800;
        this.addChild(this.OptionLayout);
        this.OptionLayout.width = 2400;
        this.OptionLayout.height = 300;
        // var btn: eui.Button = new OptionBT();
        // btn.label = QandOptions[0]["Capital"];
        // btn.horizontalCenter = 0;
        // btn.verticalCenter = 0;
        // btn.width = 500;
        // btn.height = 200;
        // this.OptionLayout.addChild(btn);
        // (<eui.Label>btn.labelDisplay).size = 50;
        // // btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        // // 	if(num==0){
        // // 	}
        // // }, this);
        var btn = new eui.Button();
        btn.label = QandOptions[1]["Capital"];
        btn.top = 20;
        btn.left = 100;
        btn.width = 500;
        btn.height = 200;
        this.OptionLayout.addChild(btn);
        btn.labelDisplay.size = 50;
        var btn = new eui.Button();
        btn.label = QandOptions[2]["Capital"];
        btn.right = 100;
        btn.bottom = 20;
        btn.width = 500;
        btn.height = 200;
        this.OptionLayout.addChild(btn);
        btn.labelDisplay.size = 50;
        var hLayout = new eui.HorizontalLayout();
        hLayout.gap = 50;
        hLayout.paddingTop = 30;
        hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        this.OptionLayout.layout = hLayout;
    };
    StageOne.prototype.GetRandomOption = function (AreaName) {
        return __awaiter(this, void 0, void 0, function () {
            var result, countrys, options, num;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RES.getResAsync("information_json")];
                    case 1:
                        result = _a.sent();
                        countrys = result[AreaName].country;
                        options = [];
                        while (options.length < 3) {
                            num = Math.floor(Math.random() * countrys.length);
                            if (options.indexOf(countrys[num])) {
                                options.push(countrys[num]);
                            }
                        }
                        return [2 /*return*/, options];
                }
            });
        });
    };
    return StageOne;
}(eui.Component));
__reflect(StageOne.prototype, "StageOne", ["eui.UIComponent", "egret.DisplayObject"]);
