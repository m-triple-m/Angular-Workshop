import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as CanvasJS from '../../assets/canvasjs.min';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  details;
  chartdata;
  name;
  type_viz;
  dataPoints = [];
  barData = false;
  pieData = false;
  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {

    this.details = this.fb.group({
      
      Python: 20,
      Java : 10,
      Javascript: 10,
      C : 20,
      CPP : 40
    })
  }

  showForms(){
    if(this.type_viz == "bar"){
      this.barData = true;
      this.pieData = false;
    }else if(this.type_viz == "dou"){
      this.pieData = true;
      this.barData = false;
    }
  }

  addDataPoints(name, value){
    this.dataPoints.push({label : name, y : parseInt(value)})
    console.log(this.dataPoints);
    this.updateChart();
  }

  updateChart(formdata = {}){
    
    if(this.type_viz == "bar"){
      this.drawBarChart();
    }else if (this.type_viz == "dou"){
      this.drawPieChart(formdata, this.name, "doughnut");
    }
  }

  drawBarChart(){
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Student Marks Details"
      },
      axisY: {
        title: "Units",
        titleFontSize: 24
      },
      data: [{
        type: "column",
        yValueFormatString: `#,###`,
        dataPoints: this.dataPoints
      }]
    });

    chart.render();
  }


  drawPieChart(data, title, type){

    let chartdata = this.prepareData(data);
    var chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: title
      },
      data: [{
        type: type,
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: chartdata
      }]
    });
    chart.render();
    }

    prepareData(formdata){
      let data = [];

      for(let control of Object.keys(formdata)){
        data.push({ y: parseInt(formdata[control]), label: control })
      }

      return data;
    }
}
