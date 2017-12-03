var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var w = canvas.width = document.getElementsByTagName('body')[0].offsetWidth;
var h = canvas.height = document.getElementsByTagName('body')[0].offsetHeight;
var drops = [];

//获取随机数
var random = (min,max) => ((Math.random()*(max - min))) + min;

//创建雨滴对象
function Drop(){};

//为原型添加方法
Drop.prototype = {
	//初始化
	init: function(){
		this.x = random(0,w);//初始位置
		this.y = 0;//初始位置
		this.vy = random(2,5);//下落速度变化
		this.vanish_h = random(0.8*h,0.9*h);//雨滴消失范围
		this.r = 20;//波纹半径
		this.vr = 1;//波纹变化速度
		this.a = 1;//透明度
		this.va = 0.94;//透明度变化速度
	},
	
	//绘制
	draw:function(){
		
		if (this.y <= this.vanish_h) {//未到达消失位置，绘制雨滴	
			ctx.fillStyle = 'rgb(0,255,255)';
			ctx.fillRect(this.x,this.y,2,10);
		} else {//到达后绘制波纹
			ctx.strokeStyle = 'rgba(0,255,255,'+ this.a +')';
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
			ctx.stroke();	
		}
		this.update();
	},
	
	//更新
	update:function(){
		if (this.y <= this.vanish_h) {//未到达消失位置，更新雨滴		
			this.y += this.vy;
		} else {//到达消失位置，更新波纹
			if (this.a > 0.03) {
				this.r += this.vr;
				if(this.r > 60){
					this.a *= this.va;					
				}
			} else {//波纹最大后，重新初始化雨滴
				this.init();
			}
		}
	},
};


//添加雨滴对象
(function add(){
	for (var i = 0; i < 40; i++) {
		var drop = new Drop();
		drop.init();
		drops.push(drop);
	} 	
})();


//雨滴运动函数
(function move(){
	
	ctx.fillStyle = 'rgba(0,0,0,0.1)'
	ctx.fillRect(0,0,w,h)
	
	drops.forEach(function(item,index){			
		item.draw();		
	});
	
	requestAnimationFrame(move);
})();






