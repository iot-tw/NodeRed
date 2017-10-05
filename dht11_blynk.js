[
    {
        "id": "ca2a9d00.3835d",
        "type": "tab",
        "label": "DHT11-Blynk",
        "disabled": false,
        "info": ""
    },
    {
        "id": "dbcc1894.7167b8",
        "type": "inject",
        "z": "ca2a9d00.3835d",
        "name": "Test Input 40 Now",
        "topic": "",
        "payload": "40",
        "payloadType": "num",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 503.1000213623047,
        "y": 226.800030708313,
        "wires": [
            [
                "7ef7f9ca.12af38"
            ]
        ]
    },
    {
        "id": "7ef7f9ca.12af38",
        "type": "blynk-websockets-out-write",
        "z": "ca2a9d00.3835d",
        "name": "Android-V7",
        "pin": "7",
        "client": "3c7f14a9.2b32dc",
        "x": 884.1001091003418,
        "y": 481.00006103515625,
        "wires": []
    },
    {
        "id": "8ac02167.271c6",
        "type": "mqtt in",
        "z": "ca2a9d00.3835d",
        "name": "mqtt sub",
        "topic": "client/200000020/200000020-GIOT-MAKER",
        "qos": "2",
        "broker": "71f422e4.0f062c",
        "x": 170,
        "y": 322,
        "wires": [
            [
                "3635a1b7.d00dee",
                "13d69501.29f00b"
            ]
        ]
    },
    {
        "id": "3635a1b7.d00dee",
        "type": "debug",
        "z": "ca2a9d00.3835d",
        "name": "All json",
        "active": false,
        "console": "false",
        "complete": "payload",
        "x": 436.00001525878906,
        "y": 322,
        "wires": []
    },
    {
        "id": "cc5892bd.f19f1",
        "type": "function",
        "z": "ca2a9d00.3835d",
        "name": "payload.data2ACSII",
        "func": "function hex2a(hexx) {\n    var hex = hexx.toString();//force conversion\n    var str = '';\n    for (var i = 0; i < hex.length; i += 2)\n        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));\n    return str;\n}\nvar payload = msg.payload;\n//Change \"05010320\" to your LoRa MacAddr and Change 1 to 0\nif (payload.macAddr == \"04000476\" || 1){\n    msg.payload = hex2a(payload.data);\n    // 21.56/78.00\n    var pm = parseInt(msg.payload.substr(0,5));      //Humidity的資訊\n    var temp = parseInt(msg.payload.substr(6,5));    //Temperature.Celsius資訊\n    return [{payload:pm},{payload:temp}];\n    }",
        "outputs": "2",
        "noerr": 0,
        "x": 492.00006103515625,
        "y": 456.00001335144043,
        "wires": [
            [
                "cc5df69.7d3d208",
                "858df84b.630db8"
            ],
            [
                "391bb3ee.cd3d7c",
                "7ef7f9ca.12af38"
            ]
        ]
    },
    {
        "id": "13d69501.29f00b",
        "type": "json",
        "z": "ca2a9d00.3835d",
        "name": "",
        "x": 328.0000305175781,
        "y": 393.0000057220459,
        "wires": [
            [
                "cc5892bd.f19f1"
            ]
        ]
    },
    {
        "id": "db09ddb.bd75b2",
        "type": "comment",
        "z": "ca2a9d00.3835d",
        "name": "GIoT Public MQTT Flow",
        "info": "",
        "x": 208.00000762939453,
        "y": 277.0000081062317,
        "wires": []
    },
    {
        "id": "cc5df69.7d3d208",
        "type": "ui_chart",
        "z": "ca2a9d00.3835d",
        "name": "",
        "group": "d55cd6eb.b659c8",
        "order": 0,
        "width": 0,
        "height": 0,
        "label": "Humidity",
        "chartType": "line",
        "legend": "false",
        "xformat": "HH:mm:ss",
        "interpolate": "linear",
        "nodata": "",
        "dot": false,
        "ymin": "",
        "ymax": "",
        "removeOlder": "5",
        "removeOlderPoints": "",
        "removeOlderUnit": "60",
        "cutout": 0,
        "useOneColor": false,
        "colors": [
            "#1f77b4",
            "#aec7e8",
            "#ff7f0e",
            "#2ca02c",
            "#98df8a",
            "#d62728",
            "#ff9896",
            "#9467bd",
            "#c5b0d5"
        ],
        "x": 889.3000335693359,
        "y": 314.40001487731934,
        "wires": [
            [],
            []
        ]
    },
    {
        "id": "7fc88717.915a18",
        "type": "comment",
        "z": "ca2a9d00.3835d",
        "name": "Add config",
        "info": "please go to \nhttps://cust00-01.giotgateway.com/giot-mqtt/\nto get your mqtt confugeration",
        "x": 171.1000099182129,
        "y": 370.6000108718872,
        "wires": []
    },
    {
        "id": "391bb3ee.cd3d7c",
        "type": "ui_gauge",
        "z": "ca2a9d00.3835d",
        "name": "",
        "group": "d55cd6eb.b659c8",
        "order": 0,
        "width": 0,
        "height": 0,
        "gtype": "gage",
        "title": "Temperature Gauge",
        "label": "units",
        "format": "{{value}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#00b500",
            "#e6e600",
            "#ca3838"
        ],
        "seg1": "",
        "seg2": "",
        "x": 882.1001129150391,
        "y": 540.2000408172607,
        "wires": []
    },
    {
        "id": "8bdec00d.0138e",
        "type": "comment",
        "z": "ca2a9d00.3835d",
        "name": "Config your Bynlk Key",
        "info": "",
        "x": 901.1001129150391,
        "y": 421.6000061035156,
        "wires": []
    },
    {
        "id": "e16c2236.46158",
        "type": "comment",
        "z": "ca2a9d00.3835d",
        "name": "Change \"04000476\" to your LoRa MacAddr",
        "info": "Change \"04000476\" to your LoRa MacAddr and Change 1 to 0",
        "x": 469.10010528564453,
        "y": 516.4000186920166,
        "wires": []
    },
    {
        "id": "13eb1fca.bc4b5",
        "type": "comment",
        "z": "ca2a9d00.3835d",
        "name": "DHT11傳溫度資料給手機",
        "info": "",
        "x": 491.1666564941406,
        "y": 109.00000286102295,
        "wires": []
    },
    {
        "id": "9ef9ac4.d65925",
        "type": "inject",
        "z": "ca2a9d00.3835d",
        "name": "Test Input 20 Now",
        "topic": "",
        "payload": "20",
        "payloadType": "num",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 510,
        "y": 160,
        "wires": [
            [
                "7ef7f9ca.12af38"
            ]
        ]
    },
    {
        "id": "858df84b.630db8",
        "type": "blynk-websockets-out-write",
        "z": "ca2a9d00.3835d",
        "name": "Android-V8",
        "pin": "8",
        "client": "3c7f14a9.2b32dc",
        "x": 890.0000114440918,
        "y": 365.0000047683716,
        "wires": []
    },
    {
        "id": "3c7f14a9.2b32dc",
        "type": "blynk-websockets-client",
        "z": "",
        "name": "blynk-Android",
        "path": "ws://cloud.blynk.cc/websocket",
        "key": "ec2d29e38670478fbafec1966b709ef2"
    },
    {
        "id": "71f422e4.0f062c",
        "type": "mqtt-broker",
        "z": "",
        "broker": "52.193.146.103",
        "port": "80",
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
        "id": "d55cd6eb.b659c8",
        "type": "ui_group",
        "z": "",
        "name": "DHT11",
        "tab": "720cde7b.e3951",
        "disp": true,
        "width": "6"
    },
    {
        "id": "720cde7b.e3951",
        "type": "ui_tab",
        "z": "",
        "name": "Public MQTT blynk",
        "icon": "dashboard"
    }
]
