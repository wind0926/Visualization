var myChart = echarts.init(document.getElementById('main'));
option=null;
$.get('data/car.json', function (data) {
    var hStep = 300 / (data.length - 1);
    var busLines = [].concat.apply([], data.map(function (busLine, idx) {
        var prevPt;
        var points = [];
        for (var i = 0; i < busLine.length; i += 2) {
            var pt = [busLine[i], busLine[i + 1]];
            if (i > 0) {
                pt = [
                    prevPt[0] + pt[0],
                    prevPt[1] + pt[1]
                ];
            }
            prevPt = pt;

            points.push([pt[0] / 1e4, pt[1] / 1e4]);
        }
        return {
            coords: points,
            lineStyle: {
                normal: {
                    //color: echarts.color.modifyHSL('#D014DF', Math.round(hStep * idx))
                   color: echarts.color.modifyHSL('#f015ff', Math.round(hStep * idx))
                }
            }
        };
    }));
    myChart.setOption(option = {
        bmap: {
            center: [118.416438, 31.357057],
            zoom: 13,//10
            roam: true,
            mapStyle: {
                'styleJson': [
                    {
                        'featureType': 'water',
                        'elementType': 'all',
                        'stylers': {
                            'color':'#062244'       //'#031628'
                        }
                    },
                    {
                        'featureType': 'land',
                        'elementType': 'geometry',
                        'stylers': {
                            'color':'#020222'         //'#000102'
                        }
                    },
                    {
                        'featureType': 'highway',
                        'elementType': 'all',
                        'stylers': {
                            'visibility': 'off'
                        }
                    },
                    {
                        'featureType': 'arterial',
                        'elementType': 'geometry.fill',
                        'stylers': {
                            'color': '#000000'
                        }
                    },
                    {
                        'featureType': 'arterial',
                        'elementType': 'geometry.stroke',
                        'stylers': {
                            'color': '#0b3d51'
                        }
                    },
                    {
                        'featureType': 'local',
                        'elementType': 'geometry',
                        'stylers': {
                            'color': '#000000'
                        }
                    },
                    {
                        'featureType': 'railway',
                        'elementType': 'geometry.fill',
                        'stylers': {
                            'color': '#000000'
                        }
                    },
                    {
                        'featureType': 'railway',
                        'elementType': 'geometry.stroke',
                        'stylers': {
                            'color': '#08304b'
                        }
                    },
                    {
                        'featureType': 'subway',
                        'elementType': 'geometry',
                        'stylers': {
                            'lightness': -70
                        }
                    },
                    {
                        'featureType': 'building',
                        'elementType': 'geometry.fill',
                        'stylers': {
                            'color': '#000000'
                        }
                    },
                    {
                        'featureType': 'all',
                        'elementType': 'labels.text.fill',
                        'stylers': {
                            'color': '#857f7f'
                        }
                    },
                    {
                        'featureType': 'all',
                        'elementType': 'labels.text.stroke',
                        'stylers': {
                            'color': '#000000'
                        }
                    },
                    {
                        'featureType': 'building',
                        'elementType': 'geometry',
                        'stylers': {
                            'color': '#022338'
                        }
                    },
                    {
                        'featureType': 'green',
                        'elementType': 'geometry',
                        'stylers': {
                            'color': '#062032'
                        }
                    },
                    {
                        'featureType': 'boundary',
                        'elementType': 'all',
                        'stylers': {
                            'color': '#465b6c'
                        }
                    },
                    {
                        'featureType': 'manmade',
                        'elementType': 'all',
                        'stylers': {
                            'color': '#022338'
                        }
                    },
                    {
                        'featureType': 'label',
                        'elementType': 'all',
                        'stylers': {
                            'visibility': 'off'
                        }
                    }
                ]
                // 'styleJson':[
                //     {
                //     "featureType": "land",
                //     "elementType": "geometry",
                //     "stylers": {
                //         "color": "#f9f5edff"
                //     }
                // }, {
                //     "featureType": "water",
                //     "elementType": "geometry",
                //     "stylers": {
                //         "color": "#aee1f5ff"
                //     }
                // }, {
                //     "featureType": "green",
                //     "elementType": "geometry",
                //     "stylers": {
                //         "color": "#cbe8bcff"
                //     }
                // }, {
                //     "featureType": "building",
                //     "elementType": "geometry.fill",
                //     "stylers": {
                //         "color": "#f7efdfff"
                //     }
                // }, {
                //     "featureType": "manmade",
                //     "elementType": "geometry",
                //     "stylers": {
                //         "color": "#f7efdfff"
                //     }
                // }]
            }
        },
        series: [{
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            data: busLines,
            silent: true,
            lineStyle: {
                normal: {
                    // color: '#c23531',
                    // color: 'rgb(200, 35, 45)',
                    opacity: 0.2,
                    width: 1
                }
            },
            progressiveThreshold: 500,
            progressive: 200
        }, {
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            data: busLines,
            lineStyle: {
                normal: {
                    width:  0   //0
                }
            },
            effect: {
                constantSpeed: 20,
                show: true,
                trailLength: 0.1,
                symbolSize: 3//1.5
            },
            zlevel: 1 //1
        }]
    });
});

if(option&&typeof option==="object"){
    myChart.setOption(option,true);
}





































// 首先lines-bus.json是一个二维数组，里面每一个一维数组存储一辆公交车的轨迹，其中第一个和第二个元素为初始坐标（经纬度*10000），
// 往后每两个元素为一组表示经纬度的偏移量（*10000）。
//
// var busLines = [].concat.apply([], data.map(function (busLine, idx) {}))是将data数组映射到一个新的数组里，即将lines-bus.json转换为真实的经纬度坐标。
//
// var pt = [busLine[i], busLine[i + 1]];为起始点坐标。
//
// if (i > 0) {
//
//     pt = [prevPt[0] + pt[0], prevPt[1] + pt[1] ];
//
// }计算加上偏移量后的经纬度*10000
//
// prevPt = pt;将当前坐标赋值给上一个点坐标，继续循环；
//
// points.push([pt[0] / 1e4, pt[1] / 1e4]);坐标小数点前移四位得到真实的经纬度值，存储到points数组里。
//
//  return {
//
//      coords: points,
//
//      lineStyle: {
//
//          normal: {
//
//              color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * idx))
//
//          }
//
//      }
//
//  };为新数组的存储格式，新的数组每一个元素是一个对象。




