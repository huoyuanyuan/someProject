class Main extends egret.DisplayObjectContainer  {

    private cardWidth = 50;
    private cardHeight = 50;
    private cardNumber = 5;
    private _card = {};
    private txt = {};
    private flag = 1;

    public constructor() {
        super();
        // this.addCard();
        this.restartGame();
        
    }
    private card(number,x,y){
        
        this._card[number] = new egret.Sprite();
        this._card[number].graphics.beginFill(0xff0000);
        this._card[number].graphics.drawRect(0,0,this.cardWidth-2,this.cardHeight-2);
        this._card[number].graphics.endFill();
        this._card[number].x = x;
        this._card[number].y = y;
        this._card[number].touchEnabled = true;

        this.txt[number] = new egret.TextField();
        this.txt[number].text = number;
        this.txt[number].size = 20;
        this.txt[number].textAlign = egret.HorizontalAlign.CENTER;
        this.txt[number].lineSpacing = 6;
        this.txt[number].x = this.cardWidth/2 - this.txt[number].width/2;
        this.txt[number].y = this.cardHeight/2 - this.txt[number].height/2;
        this.txt[number].textColor = 0xffffff;
        this._card[number].addChild(this.txt[number]);
        this.addChild(this._card[number]);
        
    }
    private turnCard(){
        for(let i=1;i<=this.cardNumber;i++){
            this._card[i].graphics.beginFill(0x0000ff);
            this._card[i].graphics.drawRect(0,0,this.cardWidth-2,this.cardHeight-2);
            this._card[i].graphics.endFill();
            this.txt[i].visible = false;
        }
    };
    private addEventListeners(){
        for(let i=1;i<=this.cardNumber;i++){
            this._card[i].addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            this.turnCard();
            console.log(this._card[i]);
            if(this.flag == i){
                this.removeChild(this._card[i]);
                this.flag++;
                if(this.flag > this.cardNumber){
                    this.flag = 1;
                    alert("闯关成功,难度增加");
                    this.cardNumber++;
                    this.restartGame();
                }
            }else{
                alert("点错啦");
            }
        },this ); 
        }
    }
    private addCard(){
        
        var points = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 6; j++) {
                points.push({x: 50* i, y: 50 * j});
            }
        }

        for(let i=1;i<=this.cardNumber;i++){
            var id = i;
            var randIndex = Math.floor(Math.random() * points.length);
            var point = points[randIndex];
            points.splice(randIndex, 1);
            var x = point.x;
            var y = point.y;
            this.card(i,x,y);
        }
    }
    private restartGame(){
        this.addCard();
        this.addEventListeners();
    }
}