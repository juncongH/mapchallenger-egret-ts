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
var SelectArea = (function (_super) {
    __extends(SelectArea, _super);
    function SelectArea() {
        return _super.call(this) || this;
    }
    SelectArea.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    SelectArea.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.America.touchEnabled = true;
        this.America.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick.bind(this, "America"), this);
    };
    SelectArea.prototype.onButtonClick = function (AreaName) {
        this.addChild(new StageOne(AreaName));
    };
    return SelectArea;
}(eui.Component));
__reflect(SelectArea.prototype, "SelectArea", ["eui.UIComponent", "egret.DisplayObject"]);
