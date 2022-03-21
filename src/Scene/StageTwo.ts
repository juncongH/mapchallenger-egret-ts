class StageTwo extends eui.Component implements eui.UIComponent {
	public Bg: eui.Rect;
	public Area: string;
	public title1: eui.Label;
	public title2: eui.Label;
	private Question: eui.Image;
	private OptionLayout: eui.Group;
	private ScoreBoard: eui.Label;

	private isStart: boolean;
	//已完成题目数量
	private Count: number;
	//分数
	private Score: number;

	public constructor(AreaName: string) {
		super();

		this.Area = AreaName
		this.isStart = false;
		this.Count = 0;
		this.Score = 0;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();

		this.Bg.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.StartGame();
		}, this);
	}

	private async StartGame() {
		//移除标题
		if (!this.isStart) {
			egret.Tween.get(this.title1).to({ alpha: 0 }, 1000, egret.Ease.sineIn)
			egret.Tween.get(this.title2).to({ alpha: 0 }, 1000, egret.Ease.sineIn)
			this.isStart = true;
			var self = this;
			setTimeout(function () {
				self.removeChild(self.title1);
				self.removeChild(self.title2);
				self.GetRandomOption(self.Area).then(data => {
					self.SetQandOptions(data);
				})
			}, 1000);
			this.ScoreBoard.text = "得分:" + this.Score + "/" + this.Count;
		}
	}

	private SetQandOptions(data) {
		let QandOptions = data;
		//随机选取一对作为正确答案
		var num = Math.floor(Math.random() * 3)
		let Answer = QandOptions[num]['Capital']

		this.Question = new eui.Image();
		var pictureName=QandOptions[num]["EName"].toLowerCase()
		this.Question.source = "resource/assets/png100px/"+pictureName+".png";
		this.Question.horizontalCenter = 0;
		this.Question.y = 100;
		this.Question.width = 900;
		this.Question.height = 600;
		this.addChild(this.Question)

		this.OptionLayout = new eui.Group();
		this.OptionLayout.horizontalCenter = 0;
		this.OptionLayout.y = 800;
		this.addChild(this.OptionLayout);
		this.OptionLayout.width = 2400;
		this.OptionLayout.height = 300;

		var btn1: eui.Button = new ui.optionbt();
		btn1.label = QandOptions[0]["CName"];
		btn1.horizontalCenter = 0;
		btn1.verticalCenter = 0;
		var btn2: eui.Button = new ui.optionbt();
		btn2.label = QandOptions[1]["CName"];
		btn2.top = 20;
		btn2.left = 100;
		var btn3: eui.Button = new ui.optionbt();
		btn3.label = QandOptions[2]["CName"];
		btn3.right = 100;
		btn3.bottom = 20;

		this.OptionLayout.addChild(btn1);
		this.OptionLayout.addChild(btn2);
		this.OptionLayout.addChild(btn3);

		//检验答案并翻页
		btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			if (num == 0) {
				btn1.currentState = "right";
				this.Score += 1;
			} else {
				btn1.currentState = "error";
				if (num == 1) {
					btn2.currentState = "right"
				} else {
					btn3.currentState = "right"
				}
			}
			this.Count += 1;
			var self = this;
			setTimeout(function () {
				self.removeChild(self.Question);
				self.removeChild(self.OptionLayout);
				self.GetRandomOption(self.Area).then(data => {
					self.SetQandOptions(data);
				})
			}, 2000);
			this.ScoreBoard.text = "得分:" + this.Score + "/" + this.Count;
		}, this);
		//检验答案并翻页
		btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			if (num == 1) {
				btn2.currentState = "right";
				this.Score += 1;
			} else {
				btn2.currentState = "error";
				if (num == 0) {
					btn1.currentState = "right"
				} else {
					btn3.currentState = "right"
				}
			}
			this.Count += 1;
			var self = this;
			setTimeout(function () {
				self.removeChild(self.Question);
				self.removeChild(self.OptionLayout);
				self.GetRandomOption(self.Area).then(data => {
					self.SetQandOptions(data);
				})
			}, 2000);
			this.ScoreBoard.text = "得分:" + this.Score + "/" + this.Count;
		}, this);
		//检验答案并翻页
		btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			if (num == 2) {
				btn3.currentState = "right";
				this.Score += 1;
			} else {
				btn3.currentState = "error";
				if (num == 0) {
					btn1.currentState = "right"
				} else {
					btn2.currentState = "right"
				}
			}
			this.Count += 1;
			var self = this;
			setTimeout(function () {
				self.removeChild(self.Question);
				self.removeChild(self.OptionLayout);
				self.GetRandomOption(self.Area).then(data => {
					self.SetQandOptions(data);
				})
			}, 2000);
			this.ScoreBoard.text = "得分:" + this.Score + "/" + this.Count;
		}, this);

		const dataEvent: NextStage = new NextStage("GoToNextStage");
		dataEvent._COUNT_2 = this.Count;
		dataEvent._Score=this.Score;
		this.dispatchEvent(dataEvent)

		var hLayout: eui.HorizontalLayout = new eui.HorizontalLayout();
		hLayout.gap = 50;
		hLayout.paddingTop = 30;
		hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
		this.OptionLayout.layout = hLayout;
	}

	private async GetRandomOption(AreaName) {
		const result = await RES.getResAsync("information_json")

		let countrys = result[AreaName].country
		let options = []
		while (options.length < 3) {
			var num = Math.floor(Math.random() * countrys.length)
			if (options.indexOf(countrys[num])) {
				options.push(countrys[num])
			}
		}
		return options
	}
}