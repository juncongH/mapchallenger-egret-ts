class  NextStage extends egret.Event {
    public static DATE: string = "GoToNextStage";
    public _COUNT_1: number = 0;
	public _COUNT_2: number = 0;
	public _COUNT_3: number = 0;
	public _Score:number;
    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }
}