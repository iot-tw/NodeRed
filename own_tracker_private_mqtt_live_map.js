[
    {
        "id": "c953b109.e2df1",
        "type": "websocket out",
        "z": "c1bc2800.6b2f88",
        "name": "",
        "server": "858b5ef7.b5765",
        "client": "",
        "x": 903.0000114440918,
        "y": 157.0000286102295,
        "wires": []
    },
    {
        "id": "22daac5.9915d54",
        "type": "function",
        "z": "c1bc2800.6b2f88",
        "name": "context.global.location",
        "func": "// The received message is stored in 'msg'\n// It will have at least a 'payload' property:\n//   console.log(msg.payload);\n// The 'context' object is available to store state\n// between invocations of the function\n//   context = {};\ncontext.global.location = msg.payload;\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 674.9999542236328,
        "y": 276.00000286102295,
        "wires": [
            [
                "c953b109.e2df1",
                "47aca7d4.36b688"
            ]
        ]
    },
    {
        "id": "47a657df.dc2088",
        "type": "websocket in",
        "z": "c1bc2800.6b2f88",
        "name": "",
        "server": "858b5ef7.b5765",
        "client": "",
        "x": 403.00011444091797,
        "y": 156.00001621246338,
        "wires": [
            [
                "afa8cf10.0b54b"
            ]
        ]
    },
    {
        "id": "afa8cf10.0b54b",
        "type": "function",
        "z": "c1bc2800.6b2f88",
        "name": "context.global.location",
        "func": "// The received message is stored in 'msg'\n// It will have at least a 'payload' property:\n//   console.log(msg.payload);\n// The 'context' object is available to store state\n// between invocations of the function\n//   context = {};\n\nmsg.payload = context.global.location;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 667.0001182556152,
        "y": 161.00001525878906,
        "wires": [
            [
                "c953b109.e2df1"
            ]
        ]
    },
    {
        "id": "f085ceec.a361d",
        "type": "http response",
        "z": "c1bc2800.6b2f88",
        "name": "",
        "x": 872.0000648498535,
        "y": 90.00000762939453,
        "wires": []
    },
    {
        "id": "ff225083.b0612",
        "type": "http in",
        "z": "c1bc2800.6b2f88",
        "name": "",
        "url": "/map",
        "method": "get",
        "swaggerDoc": "",
        "x": 418.00011444091797,
        "y": 95.00000762939453,
        "wires": [
            [
                "5c5133b9.5b6e3c"
            ]
        ]
    },
    {
        "id": "ab5cfed0.f71c8",
        "type": "debug",
        "z": "c1bc2800.6b2f88",
        "name": "",
        "active": false,
        "console": false,
        "complete": false,
        "x": 639.000114440918,
        "y": 220.00000190734863,
        "wires": []
    },
    {
        "id": "e7605c7d.e0ca3",
        "type": "inject",
        "z": "c1bc2800.6b2f88",
        "name": "Location Example Input",
        "topic": "",
        "payload": "[{\"lat\":24.800883,\"lng\":120.984992},{\"lat\":24.8005512,\"lng\":120.9877736},{\"lat\":24.8002866,\"lng\":120.9881207},{\"lat\":24.8001692,\"lng\":120.9895679}]",
        "payloadType": "str",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 387.00012969970703,
        "y": 223.00000095367432,
        "wires": [
            [
                "22daac5.9915d54",
                "ab5cfed0.f71c8"
            ]
        ]
    },
    {
        "id": "5c5133b9.5b6e3c",
        "type": "template",
        "z": "c1bc2800.6b2f88",
        "name": "http://10.6.1.12:1880/map",
        "field": "payload",
        "fieldType": "msg",
        "format": "handlebars",
        "syntax": "mustache",
        "template": "<!DOCTYPE html>\n<html>\n<head>\n  <title>Owntracks Live Map</title>\n  <script type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js\"></script>\n  <script type=\"text/javascript\" src=\"http://maps.google.com/maps/api/js?sensor=true\"></script>\n  <script type=\"text/javascript\" src=\"http://yourjavascript.com/4594301102/gmaps.js\"></script>\n \n  <style type=\"text/css\" media=\"screen\">\n    #map {\n      position:absolute;\n      top: 0; bottom: 0; left: 0; right: 0;\n    }\n  </style>\n</head>\n<body>\n \n  <div id=\"map\"></div>\n  <script type=\"text/javascript\">\n  var socketaddy = \"ws://10.6.1.12:1880/ws/location\";\n    var map;\n    var sock;\n    $(document).ready(function(){\n      \n      map = new GMaps({\n        div: '#map',\n        // 23.97565,120.973882 23.904744, 121.076179\n        lat: 23.97565,\n        lng: 120.973882\n      });\n      \n      \n      sock = new WebSocket(socketaddy);\n      sock.onopen = function(){ console.log(\"Connected websocket\");\n\t      console.log(\"Sending ping..\");\n\t      sock.send(\"Ping!\");\n\t      console.log(\"Ping sent..\");\n      };\n      sock.onerror = function(){ console.log(\"Websocket error\"); };\n      sock.onmessage = function(evt){\n        var latlng = JSON.parse(evt.data);\n        var array = $.map(latlng, function(el) {\n  \t\t\treturn [[el.lat, el.lng]];\n\t\t\t});\n        \n      //  map.removeMarkers();\n        map.removePolylines();\n       \tconsole.log(\"Got marker at \" + latlng[0].lat + \", \" + latlng[0].lng, latlng);\n        map.setZoom(17);\n       \tmap.setCenter(latlng[0].lat, latlng[0].lng);\n        map.addMarkers(latlng);\n      \tmap.drawPolyline({\n\t\t  path: array,\n\t\t  strokeColor: '#131540',\n\t\t  strokeOpacity: 0.6,\n\t\t  strokeWeight: 6\n\t\t});\n      }\n    });\n  </script>\n</body>\n</html>",
        "x": 641.0000648498535,
        "y": 96.00000762939453,
        "wires": [
            [
                "f085ceec.a361d"
            ]
        ]
    },
    {
        "id": "47aca7d4.36b688",
        "type": "debug",
        "z": "c1bc2800.6b2f88",
        "name": "",
        "active": false,
        "console": "false",
        "complete": "false",
        "x": 902.0000686645508,
        "y": 273.00000381469727,
        "wires": []
    },
    {
        "id": "8c57b2b7.d4947",
        "type": "function",
        "z": "c1bc2800.6b2f88",
        "name": "map",
        "func": "//var lat=(24.824253+Math.random()*0.1).toFixed(6);\n//var lng=(121.015235+Math.random()*0.1).toFixed(6);\nvar lat=parseInt(msg.payload[0].data.substr(6,8),16)*180/Math.pow(2,32);\nvar lng=parseInt(msg.payload[0].data.substr(14,8),16)*180/Math.pow(2,32);\nvar msg2=\"[{\\\"lat\\\":\"+lat+\",\\\"lng\\\":\"+lng+\"}]\";\nreturn {payload:msg2};\n",
        "outputs": 1,
        "noerr": 0,
        "x": 427.0000877380371,
        "y": 296.9999771118164,
        "wires": [
            [
                "f9b2c4ab.df1628",
                "22daac5.9915d54"
            ]
        ]
    },
    {
        "id": "f9b2c4ab.df1628",
        "type": "debug",
        "z": "c1bc2800.6b2f88",
        "name": "",
        "active": false,
        "console": "false",
        "complete": "false",
        "x": 647.0000114440918,
        "y": 336.0000057220459,
        "wires": []
    },
    {
        "id": "65720df2.4f2434",
        "type": "json",
        "z": "c1bc2800.6b2f88",
        "name": "",
        "x": 142.33348846435547,
        "y": 238.66668796539307,
        "wires": [
            [
                "2fee4081.59244",
                "d7133bdf.370028"
            ]
        ]
    },
    {
        "id": "d6ec93e.0d7577",
        "type": "mqtt in",
        "z": "c1bc2800.6b2f88",
        "name": "",
        "topic": "GIOT-GW/UL/+",
        "qos": "2",
        "broker": "f8ec8f6f.82e89",
        "x": 158.33348846435547,
        "y": 136.66668796539307,
        "wires": [
            [
                "65720df2.4f2434"
            ]
        ]
    },
    {
        "id": "995b16dc.7add28",
        "type": "function",
        "z": "c1bc2800.6b2f88",
        "name": "RSSI",
        "func": "\nreturn {payload:msg.payload[0].rssi};",
        "outputs": 1,
        "noerr": 0,
        "x": 532.3335037231445,
        "y": 567.6666793823242,
        "wires": [
            [
                "7eef4a78.8d3fb4",
                "a09fbe03.703cb"
            ]
        ]
    },
    {
        "id": "d7133bdf.370028",
        "type": "debug",
        "z": "c1bc2800.6b2f88",
        "name": "",
        "active": false,
        "console": "false",
        "complete": "false",
        "x": 223.33350372314453,
        "y": 491.66670989990234,
        "wires": []
    },
    {
        "id": "7eef4a78.8d3fb4",
        "type": "ui_gauge",
        "z": "c1bc2800.6b2f88",
        "name": "",
        "group": "b6710350.08517",
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
        "x": 701.3335075378418,
        "y": 546.6666793823242,
        "wires": []
    },
    {
        "id": "a09fbe03.703cb",
        "type": "ui_chart",
        "z": "c1bc2800.6b2f88",
        "name": "",
        "group": "b6710350.08517",
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
        "x": 700.3335075378418,
        "y": 591.6666793823242,
        "wires": [
            [],
            []
        ]
    },
    {
        "id": "44eca6c0.d19628",
        "type": "function",
        "z": "c1bc2800.6b2f88",
        "name": "Battery",
        "func": "\nreturn {payload:parseInt(msg.payload[0].data.substr(4,2), 16)};",
        "outputs": 1,
        "noerr": 0,
        "x": 536.3334884643555,
        "y": 652.6666574478149,
        "wires": [
            [
                "e4f67c21.1e526",
                "7b349ab4.522ad4"
            ]
        ]
    },
    {
        "id": "e4f67c21.1e526",
        "type": "ui_gauge",
        "z": "c1bc2800.6b2f88",
        "name": "",
        "group": "9cb23fef.7262a",
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
        "x": 705.3334884643555,
        "y": 645.6666574478149,
        "wires": []
    },
    {
        "id": "7b349ab4.522ad4",
        "type": "ui_chart",
        "z": "c1bc2800.6b2f88",
        "name": "",
        "group": "9cb23fef.7262a",
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
        "x": 704.3334884643555,
        "y": 690.6666574478149,
        "wires": [
            [],
            []
        ]
    },
    {
        "id": "93c025f6.7aea98",
        "type": "ui_text",
        "z": "c1bc2800.6b2f88",
        "group": "20f5329d.4df8be",
        "order": 0,
        "width": "4",
        "height": "4",
        "name": "",
        "label": "text",
        "format": "{{msg.payload}}",
        "layout": "col-center",
        "x": 704.3334884643555,
        "y": 751.6666574478149,
        "wires": []
    },
    {
        "id": "b1e9e23b.cac31",
        "type": "function",
        "z": "c1bc2800.6b2f88",
        "name": "Status",
        "func": "var status1=parseInt(msg.payload[0].data.substr(0,2),16);\nvar status_msg=\"<br>\"\nif (status1&0x01) status_msg+=\"Positioned <br>\";\nelse status_msg+=\"Not Positioned <br>\";\n\nif (status1&0x02) status_msg+=\"South Latitude<br>\";\nelse status_msg+=\"North Latitude <br>\";\n\nif (status1&0x04) status_msg+=\"West Longitude<br>\";\nelse status_msg+=\"East Longitude <br>\";\n\nif (status1&0x08) status_msg+=\"G-sensor Data<br>\";\nelse status_msg+=\"GPS Data <br>\";\n\nif (status1&0x10) status_msg+=\" Error Code Bit0=1<br>\";\nelse status_msg+=\"Error Code Bit0=0 <br>\";\n\nif (status1&0x20) status_msg+=\"MFT LoRa Packet<br>\";\nelse status_msg+=\"Normal LoRa Packet <br>\";\n\nif (status1&0x40) status_msg+=\"Error Code Bit1=1<br>\";\nelse status_msg+=\"Error Code Bit1=0 <br>\";\n\nif (status1&0x80) status_msg+=\"Error Code Bit2=1<br>\";\nelse status_msg+=\"Error Code Bit2=0 <br>\";\n\nstatus_msg+=\"<br>FrameCnt=\";\n\nstatus_msg+=msg.payload[0].frameCnt;\nreturn {payload:status_msg};",
        "outputs": 1,
        "noerr": 0,
        "x": 542.3334884643555,
        "y": 750.6666574478149,
        "wires": [
            [
                "93c025f6.7aea98"
            ]
        ]
    },
    {
        "id": "2abd8eab.4b74f2",
        "type": "file",
        "z": "c1bc2800.6b2f88",
        "name": "",
        "filename": "\\tmp\\smallTracker.txt",
        "appendNewline": true,
        "createDir": false,
        "overwriteFile": "false",
        "x": 596.3335037231445,
        "y": 821.6666316986084,
        "wires": []
    },
    {
        "id": "2fee4081.59244",
        "type": "function",
        "z": "c1bc2800.6b2f88",
        "name": "macAddr==\"000000000a010183\"",
        "func": "if (msg.payload[0].macAddr==\"0000000004000476\") return msg;\nelse return null;",
        "outputs": 1,
        "noerr": 0,
        "x": 229.33345794677734,
        "y": 597.6667385101318,
        "wires": [
            [
                "8c57b2b7.d4947",
                "995b16dc.7add28",
                "b1e9e23b.cac31",
                "44eca6c0.d19628",
                "7d63b07a.23382",
                "2abd8eab.4b74f2"
            ]
        ]
    },
    {
        "id": "5026d49f.0ca30c",
        "type": "comment",
        "z": "c1bc2800.6b2f88",
        "name": "Filter Tracker by MacAddr",
        "info": "Hello",
        "x": 197.72235870361328,
        "y": 549.2222061157227,
        "wires": []
    },
    {
        "id": "7d63b07a.23382",
        "type": "debug",
        "z": "c1bc2800.6b2f88",
        "name": "",
        "active": false,
        "console": "false",
        "complete": "false",
        "x": 441.16668701171875,
        "y": 903.4444885253906,
        "wires": []
    },
    {
        "id": "858b5ef7.b5765",
        "type": "websocket-listener",
        "z": "",
        "path": "/ws/location",
        "wholemsg": "false"
    },
    {
        "id": "f8ec8f6f.82e89",
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
        "id": "b6710350.08517",
        "type": "ui_group",
        "z": "",
        "name": "RSSI",
        "tab": "75b4a4a1.77d60c",
        "order": 3,
        "disp": true,
        "width": "6"
    },
    {
        "id": "9cb23fef.7262a",
        "type": "ui_group",
        "z": "",
        "name": "Battery",
        "tab": "75b4a4a1.77d60c",
        "disp": true,
        "width": "6"
    },
    {
        "id": "20f5329d.4df8be",
        "type": "ui_group",
        "z": "",
        "name": "Status",
        "tab": "75b4a4a1.77d60c",
        "disp": true,
        "width": "6"
    },
    {
        "id": "75b4a4a1.77d60c",
        "type": "ui_tab",
        "z": "",
        "name": "Tracker Status",
        "icon": "dashboard"
    }
]
