var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.cardWidth = 50;
        this.cardHeight = 50;
        this.cardNumber = 5;
        this._card = {};
        this.txt = {};
        this.flag = 1;
        // this.addCard();
        this.restartGame();
    }
    var d = __define,c=Main,p=c.prototype;
    p.card = function (number, x, y) {
        this._card[number] = new egret.Sprite();
        this._card[number].graphics.beginFill(0xff0000);
        this._card[number].graphics.drawRect(0, 0, this.cardWidth - 2, this.cardHeight - 2);
        this._card[number].graphics.endFill();
        this._card[number].x = x;
        this._card[number].y = y;
        this._card[number].touchEnabled = true;
        this.txt[number] = new egret.TextField();
        this.txt[number].text = number;
        this.txt[number].size = 20;
        this.txt[number].textAlign = egret.HorizontalAlign.CENTER;
        this.txt[number].lineSpacing = 6;
        this.txt[number].x = this.cardWidth / 2 - this.txt[number].width / 2;
        this.txt[number].y = this.cardHeight / 2 - this.txt[number].height / 2;
        this.txt[number].textColor = 0xffffff;
        this._card[number].addChild(this.txt[number]);
        this.addChild(this._card[number]);
        // this._card[number].addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
        //     this.turnCard();
        //     console.log(this._card[number]);
        //     if(this.flag == number){
        //         this.removeChild(this._card[number]);
        //         this.flag++;
        //         if(this.flag > this.cardNumber){
        //             this.flag = 1;
        //             alert("闯关成功,难度增加");
        //             this.cardNumber++;
        //             this.addCard();
        //         }
        //     }else{
        //         alert("点错啦");
        //     }
        // },this ); 
    };
    p.turnCard = function () {
        for (var i = 1; i <= this.cardNumber; i++) {
            this._card[i].graphics.beginFill(0x0000ff);
            this._card[i].graphics.drawRect(0, 0, this.cardWidth - 2, this.cardHeight - 2);
            this._card[i].graphics.endFill();
            this.txt[i].visible = false;
        }
    };
    ;
    p.addEventListeners = function () {
        var _this = this;
        var _loop_1 = function(i) {
            this_1._card[i].addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.turnCard();
                console.log(_this._card[i]);
                if (_this.flag == i) {
                    _this.removeChild(_this._card[i]);
                    _this.flag++;
                    if (_this.flag > _this.cardNumber) {
                        _this.flag = 1;
                        alert("闯关成功,难度增加");
                        _this.cardNumber++;
                        _this.restartGame();
                    }
                }
                else {
                    alert("点错啦");
                }
            }, this_1);
        };
        var this_1 = this;
        for (var i = 1; i <= this.cardNumber; i++) {
            _loop_1(i);
        }
    };
    p.addCard = function () {
        var points = [];
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 6; j++) {
                points.push({ x: 50 * i, y: 50 * j });
            }
        }
        for (var i = 1; i <= this.cardNumber; i++) {
            var id = i;
            var randIndex = Math.floor(Math.random() * points.length);
            var point = points[randIndex];
            points.splice(randIndex, 1);
            var x = point.x;
            var y = point.y;
            this.card(i, x, y);
        }
    };
    p.restartGame = function () {
        this.addCard();
        this.addEventListeners();
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map