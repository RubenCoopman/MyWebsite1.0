class robot{
  constructor(){
   this.xPos = width/2;
   this.yPos = height-50;
   this.bodycolor = color('rgb(103, 172, 96)');
   this.robotsize = 1;
   this.hairColor = color('rgb(255, 13, 0)');
   this.timeDelay=500;
   this.timer=0;
   this.timeDelayTrigger=false;
  } 

  display( ){
   
     let bodyheight=70;
   
     push();
     translate(mouseX -200,height-250);
     scale(this.robotsize);

     stroke(0); 
     //hoofd
     fill('rgb(180,237,151)');
     ellipse(200,120,120,80);
     //armen 
     fill('rgb(98,137,94)');
     ellipse(140,160,40,40);
     ellipse(260,160,40,40);
     //benen
     ellipse(160,bodyheight+120,40);
     ellipse(240,bodyheight+120,40);
     //buik
     fill(this.bodycolor);
     rect(140,120,120,bodyheight);
     //ogen
     fill(255);
     ellipse(180,100,20,20);
     ellipse(220,100,20,20);
     //mond
     line(190,115,215,112);
     strokeWeight(10);
     //puppilen
     point(180,100);
     point(220,100);
     //bollen antenne
     point(240,60);
     point(160,60);
     
     stroke(this.hairColor);
     strokeWeight(2);
     line(220,80,240,60);
     line(180,80,160,60);

     pop();
   }
  

   kleurverandering(timeInterval) 
   {
     this.timeDelay=timeInterval; // default 500ms
     if (millis()-this.timer >= this.timeDelay)
     {
       this.timeDelayTrigger = !this.timeDelayTrigger; //change the trigger after each delay
       this.timer = millis();
     }
 
     if (this.timeDelayTrigger) {
       this.hairColor = color('rgb(88, 5, 77)'); //haircolor groen
     } else {
       this.hairColor = color('rgb(255, 124, 211)'); //haircolor roze
     }
   }
 }
