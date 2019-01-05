import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  plyHeight: Number;
  garmentCount: Number;
  
  xsSize: Number;
  sSize: Number;
  mSize: Number;
  lSize: Number;
  xlSize: Number;
  xxlSize:Number;
  xxsSize: Number;
  result:number[][];


  constructor(public navCtrl: NavController) {
    let xxsSize= 0;
  }

  clickLogin(){
    console.log(Number(this.plyHeight)+10);
  }

  cutOrderPlan(){
    let counter = 0;
    let totalCost = 0;
    let sizeMix =0;
    let fabricCost = 0;
    this.result = [ [0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0]  ];
    console.log(this.result);
    let sizeList: number[] = [Number(this.xxsSize)>0 ? Number(this.xxsSize) : null, 
      Number(this.xsSize)>0 ? Number(this.xsSize) : null, 
      Number(this.sSize)>0 ? Number(this.sSize) : null, 
      Number(this.mSize)>0 ? Number(this.mSize) : null, 
      Number(this.lSize)>0 ? Number(this.lSize) : null, 
      Number(this.xlSize)>0 ? Number(this.xlSize) : null, 
      Number(this.xxlSize)>0 ? Number(this.xxlSize) : null];
    // Range("H16:N16").Value = Range("H3:N3").Value
    // Range("H19:N19").Value = Range("H3:N3").Value

    let sizeListFirst = sizeList.slice(0);
    let sizeListThird = sizeList.slice(0);
    let sizeListFifth = [0,0,0,0,0,0,0];
    
    for (var j = 0; j < 10; j++) {
        let sum=0;
        sum = Number(this.xsSize)+Number(this.sSize)+Number(this.mSize)+Number(this.lSize)+
              Number(this.xlSize)+Number(this.xxlSize)+Number(this.xxsSize);
        if(sum == 0){
          break;
        }
        let noOfLay =0;
        noOfLay = noOfLay + 1
        // Range("H17:N17").Value = Range("H16:N16").Value
        let sizeListSecond = sizeListFirst.slice(0);
        // For a = 1 To Range("q5"){
        
        for (var i = 0; i < Number(this.garmentCount); i++) {
            let max1 =0;
            // max1 = WorksheetFunction.max(Range("H17:N17"))
            max1 = Math.max(...sizeListSecond)
            if(max1 >= Number(this.plyHeight)){
                // For k = 8 To 14
                for (var k = 0; k < sizeList.length; k++) {
                    if( max1 == sizeListFirst[k]){
                        sizeListFirst[k] = sizeListFirst[k] - Number(this.plyHeight) == 0 ? null : sizeListFirst[k] - Number(this.plyHeight)
                        sizeListSecond[k] = null
                        break;
                    }
                }
    
                counter = counter + 1
            }
        }
        // Next a
        
        if (counter == Number(this.garmentCount) ){
          
            let sizeListFourth = sizeListThird.slice(0);
            // For i = 1 To Range("q5")
            for (var i = 0; i < Number(this.garmentCount); i++) {
                let max =0;
                max = Math.max(...sizeListFourth)
                if ( max >= Number(this.plyHeight)){
                    // For k = 8 To 14
                    for (var k = 0; k < sizeList.length; k++) {
                        // If max = Cells(20, k).Value Then
                        if( max == sizeListFourth[k]){
                            // Cells(19, k).Value = Cells(19, k).Value - Range("q4").Value
                            sizeListThird[k] = sizeListThird[k] - Number(this.plyHeight)
                            this.result[j][k] = Number(this.plyHeight) 
                            sizeMix = sizeMix + 1
                            sizeListFourth[k] = null
                            break;
                        }
                    }
                  }
                }
        }else{
            let sizeListFourth = sizeListThird.slice(0);
            
            let min =0;
            for (var a = 0; a < Number(this.garmentCount); a++) {
                let max2 = 0;
                max2 = Math.max(...sizeListFourth)
                if( max2 == 0 ){
                    break;
                }
                for (var b = 0; b < sizeList.length; b++) {
                    if( max2 == sizeListFourth[b]){
                        // Cells(21, b).Value = Cells(20, b)
                        sizeListFifth[b] = sizeListFourth[b]
                        sizeListFourth[b] = null;
                        // Cells(20, b).Value = Empty
                        break;
                    }
                }
            }
            // min = WorksheetFunction.min(Range("H21:N21"))
            let tempArray = new Array();
            for (var i = 0; i < sizeListFifth.length; i++) {
              if(sizeListFifth[i] == 0 || sizeListFifth[i] == null){
                
              }else{
                tempArray.push(sizeListFifth[i])
              }
            }
            // sizeListFifth = tempArray;
            min = Math.min(...tempArray)
            if( min > Number(this.plyHeight)){
                min = Number(this.plyHeight)
            }
            for (var c = 0; c < sizeList.length; c++) {
                if (sizeListFifth[c] > 0){
                    sizeListFifth[c]= sizeListFifth[c] - min
                    sizeListThird[c] = sizeListThird[c] - min
                    sizeListFirst[c] = sizeListFirst[c] - min
                    this.result[j][c] = min
                    sizeMix = sizeMix + 1
                    sizeListFifth[c] = 0
                }
            }
        }

        counter = 0
        
        // if (sizeMix = 4){

        
        //     fabricCost = (Cells(j, 16).Value - (Cells(j, 16).Value * Range("Q10").Value)) * Range("Q12").Value
        // ElseIf sizeMix = 3 Then
        //     fabricCost = (Cells(j, 16).Value - (Cells(j, 16).Value * Range("Q9").Value)) * Range("Q12").Value
        // ElseIf sizeMix = 2 Then
        //     fabricCost = (Cells(j, 16).Value - (Cells(j, 16).Value * Range("Q8").Value)) * Range("Q12").Value
        // Else
        //     fabricCost = (Cells(j, 16).Value) * Range("Q12").Value
        // }
        // sizeMix = 0
        // totalfabriccost = totalfabriccost + fabricCost

    // sizeMix = 0
    // Range("R15").Value = totalfabriccost + noOfLay * Range("Q7").Value
      }
      console.log(this.result);
  }
  
}
