[
    {
        "id": "4dc3c301.3ed89c",
        "type": "websocket out",
        "z": "afa86fe7.01a97",
        "name": "",
        "server": "1afc542f.87911c",
        "client": "",
        "x": 834.6665420532227,
        "y": 215.00003623962402,
        "wires": []
    },
    {
        "id": "ae8ee08b.c7dde",
        "type": "function",
        "z": "afa86fe7.01a97",
        "name": "context.global.location",
        "func": "// The received message is stored in 'msg'\n// It will have at least a 'payload' property:\n//   console.log(msg.payload);\n// The 'context' object is available to store state\n// between invocations of the function\n//   context = {};\ncontext.global.location = msg.payload;\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 593.6664810180664,
        "y": 329.00001335144043,
        "wires": [
            [
                "4dc3c301.3ed89c",
                "4239bb83.04ddd4"
            ]
        ]
    },
    {
        "id": "a8b30b23.b19288",
        "type": "websocket in",
        "z": "afa86fe7.01a97",
        "name": "",
        "server": "1afc542f.87911c",
        "client": "",
        "x": 370.66666412353516,
        "y": 218.0000228881836,
        "wires": [
            [
                "d9f5fa3c.77a288"
            ]
        ]
    },
    {
        "id": "d9f5fa3c.77a288",
        "type": "function",
        "z": "afa86fe7.01a97",
        "name": "context.global.location",
        "func": "// The received message is stored in 'msg'\n// It will have at least a 'payload' property:\n//   console.log(msg.payload);\n// The 'context' object is available to store state\n// between invocations of the function\n//   context = {};\n\nmsg.payload = context.global.location;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 598.6666488647461,
        "y": 219.0000228881836,
        "wires": [
            [
                "4dc3c301.3ed89c"
            ]
        ]
    },
    {
        "id": "3dc7d85e.d29a28",
        "type": "http response",
        "z": "afa86fe7.01a97",
        "name": "",
        "x": 740.6665954589844,
        "y": 272.0000114440918,
        "wires": []
    },
    {
        "id": "57e0b01a.e0df8",
        "type": "http in",
        "z": "afa86fe7.01a97",
        "name": "",
        "url": "/map",
        "method": "get",
        "swaggerDoc": "",
        "x": 345.66666412353516,
        "y": 273.0000114440918,
        "wires": [
            [
                "56c0d6b0.ba9c58"
            ]
        ]
    },
    {
        "id": "22392806.c08768",
        "type": "debug",
        "z": "afa86fe7.01a97",
        "name": "",
        "active": false,
        "console": false,
        "complete": false,
        "x": 416.66667556762695,
        "y": 65.00000190734863,
        "wires": []
    },
    {
        "id": "d11c33e3.2fa72",
        "type": "inject",
        "z": "afa86fe7.01a97",
        "name": "Location Example Input",
        "topic": "",
        "payload": "[{\"lat\":54.9619349,\"lng\":-1.6003813},{\"lat\":54.9656694,\"lng\":-1.5239833},{\"lat\":54.9696456,\"lng\":-1.5069755},{\"lat\":54.9378907,\"lng\":-1.5273729}]",
        "payloadType": "str",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 146.6666717529297,
        "y": 65.00000095367432,
        "wires": [
            [
                "ae8ee08b.c7dde",
                "22392806.c08768"
            ]
        ]
    },
    {
        "id": "56c0d6b0.ba9c58",
        "type": "template",
        "z": "afa86fe7.01a97",
        "name": "http://10.6.1.12:1880/map",
        "field": "payload",
        "fieldType": "msg",
        "format": "handlebars",
        "syntax": "mustache",
        "template": "<!DOCTYPE html>\n<html>\n<head>\n  <title>Owntracks & Node-Red Live Map</title>\n  <script type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js\"></script>\n  <script type=\"text/javascript\" src=\"http://maps.google.com/maps/api/js?sensor=true\"></script>\n  <script type=\"text/javascript\" src=\"http://yourjavascript.com/4594301102/gmaps.js\"></script>\n \n  <style type=\"text/css\" media=\"screen\">\n    #map {\n      position:absolute;\n      top: 0; bottom: 0; left: 0; right: 0;\n    }\n  </style>\n</head>\n<body>\n \n  <div id=\"map\"></div>\n  <script type=\"text/javascript\">\n  var socketaddy = \"ws://10.6.1.12:1880/ws/location\";\n    var map;\n    var sock;\n    $(document).ready(function(){\n      \n      map = new GMaps({\n        div: '#map',\n        lat: -12.043333,\n        lng: -77.028333\n      });\n      \n      \n      sock = new WebSocket(socketaddy);\n      sock.onopen = function(){ console.log(\"Connected websocket\");\n\t      console.log(\"Sending ping..\");\n\t      sock.send(\"Ping!\");\n\t      console.log(\"Ping sent..\");\n      };\n      sock.onerror = function(){ console.log(\"Websocket error\"); };\n      sock.onmessage = function(evt){\n        var latlng = JSON.parse(evt.data);\n        var array = $.map(latlng, function(el) {\n  \t\t\treturn [[el.lat, el.lng]];\n\t\t\t});\n        \n      //  map.removeMarkers();\n        map.removePolylines();\n       \tconsole.log(\"Got marker at \" + latlng[0].lat + \", \" + latlng[0].lng, latlng);\n        map.setZoom(17);\n       \tmap.setCenter(latlng[0].lat, latlng[0].lng);\n        map.addMarkers(latlng);\n      \tmap.drawPolyline({\n\t\t  path: array,\n\t\t  strokeColor: '#131540',\n\t\t  strokeOpacity: 0.6,\n\t\t  strokeWeight: 6\n\t\t});\n      }\n    });\n  </script>\n</body>\n</html>",
        "x": 558.6665954589844,
        "y": 271.0000114440918,
        "wires": [
            [
                "3dc7d85e.d29a28"
            ]
        ]
    },
    {
        "id": "4239bb83.04ddd4",
        "type": "debug",
        "z": "afa86fe7.01a97",
        "name": "",
        "active": false,
        "console": "false",
        "complete": "false",
        "x": 836.6665954589844,
        "y": 330.00001335144043,
        "wires": []
    },
    {
        "id": "a164a3a7.a3c",
        "type": "function",
        "z": "afa86fe7.01a97",
        "name": "map",
        "func": "//var lat=(24.824253+Math.random()*0.1).toFixed(6);\n//var lng=(121.015235+Math.random()*0.1).toFixed(6);\nvar lat=parseInt(msg.payload[0].data.substr(6,8),16)/1000000;\nvar lng=parseInt(msg.payload[0].data.substr(14,8),16)/1000000;\nvar msg2=\"[{\\\"lat\\\":\"+lat+\",\\\"lng\\\":\"+lng+\"}]\";\nreturn {payload:msg2};\n",
        "outputs": 1,
        "noerr": 0,
        "x": 335.66661834716797,
        "y": 344.99998664855957,
        "wires": [
            [
                "34f09f68.25a4b",
                "ae8ee08b.c7dde"
            ]
        ]
    },
    {
        "id": "34f09f68.25a4b",
        "type": "debug",
        "z": "afa86fe7.01a97",
        "name": "",
        "active": false,
        "console": "false",
        "complete": "false",
        "x": 562.6665382385254,
        "y": 366.00001335144043,
        "wires": []
    },
    {
        "id": "8466a5e2.2ad108",
        "type": "json",
        "z": "afa86fe7.01a97",
        "name": "",
        "x": 111.00003051757812,
        "y": 220.66668891906738,
        "wires": [
            [
                "d43f0b21.bc6f68"
            ]
        ]
    },
    {
        "id": "274bba55.b6af96",
        "type": "mqtt in",
        "z": "afa86fe7.01a97",
        "name": "",
        "topic": "GIOT-GW/UL/+",
        "qos": "2",
        "broker": "341d61e8.e78b4e",
        "x": 127.00003051757812,
        "y": 118.66668891906738,
        "wires": [
            [
                "8466a5e2.2ad108",
                "a2368171.5fd3c"
            ]
        ]
    },
    {
        "id": "815a43bb.43fac",
        "type": "function",
        "z": "afa86fe7.01a97",
        "name": "RSSI",
        "func": "\nreturn {payload:msg.payload[0].rssi};",
        "outputs": 1,
        "noerr": 0,
        "x": 497.0000305175781,
        "y": 438.66665840148926,
        "wires": [
            [
                "f3e43da2.b2c44",
                "b719a713.3df698"
            ]
        ]
    },
    {
        "id": "a2368171.5fd3c",
        "type": "debug",
        "z": "afa86fe7.01a97",
        "name": "",
        "active": false,
        "console": "false",
        "complete": "false",
        "x": 362.0000305175781,
        "y": 157.66668891906738,
        "wires": []
    },
    {
        "id": "f3e43da2.b2c44",
        "type": "ui_gauge",
        "z": "afa86fe7.01a97",
        "name": "",
        "group": "e7bd402.759ffc",
        "order": 1,
        "width": 0,
        "height": 0,
        "gtype": "gage",
        "title": "Gauge",
        "label": "dBm",
        "format": "{{value}}",
        "min": "-150",
        "max": "0",
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff40"
        ],
        "x": 676.0000305175781,
        "y": 431.66665840148926,
        "wires": []
    },
    {
        "id": "b719a713.3df698",
        "type": "ui_chart",
        "z": "afa86fe7.01a97",
        "name": "",
        "group": "e7bd402.759ffc",
        "order": 2,
        "width": 0,
        "height": 0,
        "label": "chart",
        "chartType": "line",
        "legend": "false",
        "xformat": "HH:mm:ss",
        "interpolate": "linear",
        "nodata": "",
        "ymin": "-150",
        "ymax": "0",
        "removeOlder": 1,
        "removeOlderPoints": "",
        "removeOlderUnit": "3600",
        "cutout": 0,
        "x": 675.0000305175781,
        "y": 476.66665840148926,
        "wires": [
            [],
            []
        ]
    },
    {
        "id": "b8b157fb.b3f188",
        "type": "function",
        "z": "afa86fe7.01a97",
        "name": "Temperature",
        "func": "var tem=parseInt(msg.payload[0].data.substr(2,2),16);\nif (tem>63) return {payload:tem-64+0.5};\nelse return {payload:tem};",
        "outputs": 1,
        "noerr": 0,
        "x": 511.0000305175781,
        "y": 530.6666584014893,
        "wires": [
            [
                "daa15c36.6a1e",
                "7322ede8.556104"
            ]
        ]
    },
    {
        "id": "daa15c36.6a1e",
        "type": "ui_gauge",
        "z": "afa86fe7.01a97",
        "name": "",
        "group": "9a169a8e.8b5518",
        "order": 1,
        "width": 0,
        "height": 0,
        "gtype": "gage",
        "title": "Gauge",
        "label": "Degree C",
        "format": "{{value}}",
        "min": "0",
        "max": "50",
        "colors": [
            "#00ff40",
            "#e6e600",
            "#ff0000"
        ],
        "x": 670.0000305175781,
        "y": 523.6666584014893,
        "wires": []
    },
    {
        "id": "7322ede8.556104",
        "type": "ui_chart",
        "z": "afa86fe7.01a97",
        "name": "",
        "group": "9a169a8e.8b5518",
        "order": 2,
        "width": 0,
        "height": 0,
        "label": "chart",
        "chartType": "line",
        "legend": "false",
        "xformat": "HH:mm:ss",
        "interpolate": "linear",
        "nodata": "",
        "ymin": "0",
        "ymax": "50",
        "removeOlder": 1,
        "removeOlderPoints": "",
        "removeOlderUnit": "3600",
        "cutout": 0,
        "x": 669.0000305175781,
        "y": 568.6666584014893,
        "wires": [
            [],
            []
        ]
    },
    {
        "id": "3c9a0ec3.4053f2",
        "type": "function",
        "z": "afa86fe7.01a97",
        "name": "Battery",
        "func": "\nreturn {payload:parseInt(msg.payload[0].data.substr(4,2), 16)};",
        "outputs": 1,
        "noerr": 0,
        "x": 505.0000305175781,
        "y": 634.6666584014893,
        "wires": [
            [
                "ddede29c.b77a1",
                "4b31034d.ccc5ac"
            ]
        ]
    },
    {
        "id": "ddede29c.b77a1",
        "type": "ui_gauge",
        "z": "afa86fe7.01a97",
        "name": "",
        "group": "913f6def.50c1d",
        "order": 1,
        "width": 0,
        "height": 0,
        "gtype": "gage",
        "title": "Gauge",
        "label": "0~255",
        "format": "{{value}}",
        "min": "0",
        "max": "255",
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff40"
        ],
        "x": 674.0000305175781,
        "y": 627.6666584014893,
        "wires": []
    },
    {
        "id": "4b31034d.ccc5ac",
        "type": "ui_chart",
        "z": "afa86fe7.01a97",
        "name": "",
        "group": "913f6def.50c1d",
        "order": 2,
        "width": 0,
        "height": 0,
        "label": "chart",
        "chartType": "line",
        "legend": "false",
        "xformat": "HH:mm:ss",
        "interpolate": "linear",
        "nodata": "",
        "ymin": "0",
        "ymax": "255",
        "removeOlder": 1,
        "removeOlderPoints": "",
        "removeOlderUnit": "3600",
        "cutout": 0,
        "x": 673.0000305175781,
        "y": 672.6666584014893,
        "wires": [
            [],
            []
        ]
    },
    {
        "id": "7b239006.a0d2d",
        "type": "ui_text",
        "z": "afa86fe7.01a97",
        "group": "811854e2.d95968",
        "order": 0,
        "width": "4",
        "height": "4",
        "name": "",
        "label": "text",
        "format": "{{msg.payload}}",
        "layout": "col-center",
        "x": 673.0000305175781,
        "y": 733.6666584014893,
        "wires": []
    },
    {
        "id": "f497fd77.5191b",
        "type": "function",
        "z": "afa86fe7.01a97",
        "name": "Status",
        "func": "var status1=parseInt(msg.payload[0].data.substr(0,2),16);\nvar status_msg=\"<br>\"\nif (status1&0x01) status_msg+=\"Positioned <br>\";\nelse status_msg+=\"Not Positioned <br>\";\n\nif (status1&0x02) status_msg+=\"South Latitude<br>\";\nelse status_msg+=\"North Latitude <br>\";\n\nif (status1&0x04) status_msg+=\"West Longitude<br>\";\nelse status_msg+=\"East Longitude <br>\";\n\nif (status1&0x08) status_msg+=\"G-sensor Data<br>\";\nelse status_msg+=\"GPS Data <br>\";\n\nif (status1&0x10) status_msg+=\"hardFault<br>\";\nelse status_msg+=\"No Error <br>\";\n\nif (status1&0x20) status_msg+=\"MFT LoRa Packet<br>\";\nelse status_msg+=\"Normal LoRa Packet <br>\";\n\nif (status1&0x40) status_msg+=\"Error Code Bit1=1<br>\";\nelse status_msg+=\"Error Code Bit1=0 <br>\";\n\nif (status1&0x80) status_msg+=\"Error Code Bit2=1<br>\";\nelse status_msg+=\"Error Code Bit2=0 <br>\";\n\nstatus_msg+=\"<br>FrameCnt=\";\n\nstatus_msg+=msg.payload[0].frameCnt;\nreturn {payload:status_msg};",
        "outputs": 1,
        "noerr": 0,
        "x": 511.0000305175781,
        "y": 732.6666584014893,
        "wires": [
            [
                "7b239006.a0d2d"
            ]
        ]
    },
    {
        "id": "185f0741.d95599",
        "type": "ui_chart",
        "z": "afa86fe7.01a97",
        "name": "",
        "group": "811854e2.d95968",
        "order": 0,
        "width": 0,
        "height": 0,
        "label": "chart",
        "chartType": "line",
        "legend": "false",
        "xformat": "HH:mm:ss",
        "interpolate": "linear",
        "nodata": "",
        "ymin": "",
        "ymax": "",
        "removeOlder": 1,
        "removeOlderPoints": "",
        "removeOlderUnit": "3600",
        "cutout": 0,
        "x": 675.5555610656738,
        "y": 789.3333530426025,
        "wires": [
            [],
            []
        ]
    },
    {
        "id": "59cfec29.013824",
        "type": "function",
        "z": "afa86fe7.01a97",
        "name": "frameCnt",
        "func": "\nreturn {payload:msg.payload[0].time+\",\"+msg.payload[0].frameCnt};",
        "outputs": 1,
        "noerr": 0,
        "x": 523.333366394043,
        "y": 789.333324432373,
        "wires": [
            [
                "185f0741.d95599",
                "c24e0d0b.14d6a"
            ]
        ]
    },
    {
        "id": "c24e0d0b.14d6a",
        "type": "file",
        "z": "afa86fe7.01a97",
        "name": "",
        "filename": "\\tmp\\smallTracker.txt",
        "appendNewline": true,
        "createDir": false,
        "overwriteFile": "false",
        "x": 731.0000305175781,
        "y": 869.6666507720947,
        "wires": []
    },
    {
        "id": "d43f0b21.bc6f68",
        "type": "function",
        "z": "afa86fe7.01a97",
        "name": "macAddr==\"000000000a010183\"",
        "func": "if (msg.payload[0].macAddr==\"000000000a010183\") return msg;\nelse return null;",
        "outputs": 1,
        "noerr": 0,
        "x": 198,
        "y": 579.6667394638062,
        "wires": [
            [
                "a164a3a7.a3c",
                "815a43bb.43fac",
                "b8b157fb.b3f188",
                "f497fd77.5191b",
                "59cfec29.013824",
                "3c9a0ec3.4053f2"
            ]
        ]
    },
    {
        "id": "ca49fd54.7d439",
        "type": "comment",
        "z": "afa86fe7.01a97",
        "name": "Filter Tracker by MacAddr",
        "info": "Hello",
        "x": 166.38890075683594,
        "y": 531.222207069397,
        "wires": []
    },
    {
        "id": "1afc542f.87911c",
        "type": "websocket-listener",
        "z": "",
        "path": "/ws/location",
        "wholemsg": "false"
    },
    {
        "id": "341d61e8.e78b4e",
        "type": "mqtt-broker",
        "z": "",
        "broker": "localhost",
        "port": "1883",
        "clientid": "",
        "usetls": false,
        "compatmode": true,
        "keepalive": "60",
        "cleansession": true,
        "willTopic": "",
        "willQos": "0",
        "willPayload": "",
        "birthTopic": "",
        "birthQos": "0",
        "birthPayload": ""
    },
    {
        "id": "e7bd402.759ffc",
        "type": "ui_group",
        "z": "",
        "name": "RSSI",
        "tab": "53385ccf.7e63c4",
        "order": 3,
        "disp": true,
        "width": "6"
    },
    {
        "id": "9a169a8e.8b5518",
        "type": "ui_group",
        "z": "",
        "name": "Temperature",
        "tab": "53385ccf.7e63c4",
        "order": 1,
        "disp": true,
        "width": "6"
    },
    {
        "id": "913f6def.50c1d",
        "type": "ui_group",
        "z": "",
        "name": "Battery",
        "tab": "53385ccf.7e63c4",
        "disp": true,
        "width": "6"
    },
    {
        "id": "811854e2.d95968",
        "type": "ui_group",
        "z": "",
        "name": "Status",
        "tab": "53385ccf.7e63c4",
        "disp": true,
        "width": "6"
    },
    {
        "id": "53385ccf.7e63c4",
        "type": "ui_tab",
        "z": "",
        "name": "Tracker Status",
        "icon": "dashboard"
    }
]
