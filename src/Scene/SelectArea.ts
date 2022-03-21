class SelectArea extends eui.Component implements eui.UIComponent {
	public America: eui.ToggleButton
	public Asia: eui.ToggleButton
	public Europe: eui.ToggleButton
	public Africa: eui.ToggleButton
	public Oceanic: eui.ToggleButton
	private stage1: StageOne
	private stage2: StageTwo
	private stage3: StageThree
	private score: number
	public ScoreLabel:eui.Label
	public Bg: eui.Rect;

	public constructor() {
		super();

		this.score = 0;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.America.touchEnabled = true
		this.America.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick.bind(this, "America"), this);
		this.Asia.touchEnabled = true
		this.Asia.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick.bind(this, "Asia"), this);
		this.Europe.touchEnabled = true
		this.Europe.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick.bind(this, "Europe"), this);
		this.Africa.touchEnabled = true
		this.Africa.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick.bind(this, "Africa"), this);
		this.Oceanic.touchEnabled = true
		this.Oceanic.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick.bind(this, "Oceanic"), this);

	}

	private onButtonClick(AreaName) {
		this.stage1 = new StageOne(AreaName)
		this.stage2 = new StageTwo(AreaName)
		this.stage3 = new StageThree(AreaName)

		this.addChild(this.stage1)

		this.stage1.addEventListener("GoToNextStage", this.ChangeStage, this);
		this.stage2.addEventListener("GoToNextStage", this.ChangeStage, this);
		this.stage3.addEventListener("GoToNextStage", this.ChangeStage, this);
	}

	public ChangeStage(evt: NextStage) {
		if (evt._COUNT_1 == 3) {
			this.score += evt._Score
			this.removeChild(this.stage1)
			this.addChild(this.stage2)
			evt._COUNT_1 = 0;
		}
		if (evt._COUNT_2 == 3) {
			this.score += evt._Score
			this.removeChild(this.stage2)
			this.addChild(this.stage3)
			evt._COUNT_2 = 0;
		}
		if (evt._COUNT_3 == 4) {
			this.score += evt._Score
			this.removeChild(this.stage3)
			evt._COUNT_3 = 0;
			//显示分数
			// let ScoreLabel = new eui.Label();
			var color, text;
			if (this.score < 6) {
				color = 0xFF0000;
				text = "不及格！";
			} else if (this.score <= 8) {
				color = 0x008000;
				text = "良好！";
			} else {
				color = 0x0000FF;
				text = "优秀！";
			}

			this.currentState="finish";

			this.ScoreLabel.textColor = color;
			this.ScoreLabel.text = "您的成绩是:" + this.score.toString() + "0分," + text;

			// this.addChild(this.ScoreLabel);
			this.Bg.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			evt._Score=0;
			this.currentState="start";
		}, this);
		}
	}
}

