[
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
                "7ef7f9ca.12af38",
                "31381bcb.e35554"
            ]
        ]
    },
    {
        "id": "7ef7f9ca.12af38",
        "type": "blynk-websockets-out-write",
        "z": "ca2a9d00.3835d",
        "name": "Android",
        "pin": "7",
        "client": "3c7f14a9.2b32dc",
        "x": 791.1001205444336,
        "y": 164.00003147125244,
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
        "func": "function hex2a(hexx) {\n    var hex = hexx.toString();//force conversion\n    var str = '';\n    for (var i = 0; i < hex.length; i += 2)\n        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));\n    return str;\n}\nvar payload = msg.payload;\nmsg.payload = hex2a(payload.data);\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 557.0000152587891,
        "y": 373,
        "wires": [
            [
                "31381bcb.e35554",
                "cc5df69.7d3d208",
                "7ef7f9ca.12af38",
                "391bb3ee.cd3d7c"
            ]
        ]
    },
    {
        "id": "13d69501.29f00b",
        "type": "json",
        "z": "ca2a9d00.3835d",
        "name": "",
        "x": 379.00001525878906,
        "y": 373,
        "wires": [
            [
                "cc5892bd.f19f1"
            ]
        ]
    },
    {
        "id": "31381bcb.e35554",
        "type": "debug",
        "z": "ca2a9d00.3835d",
        "name": "json debug",
        "active": true,
        "console": "false",
        "complete": "payload",
        "x": 805.0000228881836,
        "y": 376.00000953674316,
        "wires": []
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
        "group": "8e23401b.e16bb",
        "order": 0,
        "width": 0,
        "height": 0,
        "label": "VR chart",
        "chartType": "line",
        "legend": "false",
        "xformat": "HH:mm:ss",
        "interpolate": "linear",
        "nodata": "",
        "ymin": "",
        "ymax": "",
        "removeOlder": "5",
        "removeOlderPoints": "",
        "removeOlderUnit": "60",
        "cutout": 0,
        "x": 790.3000221252441,
        "y": 425.4000129699707,
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
        "group": "8e23401b.e16bb",
        "order": 0,
        "width": 0,
        "height": 0,
        "gtype": "gage",
        "title": "VR Gauge",
        "label": "units",
        "format": "{{value}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#00b500",
            "#e6e600",
            "#ca3838"
        ],
        "x": 792.1000709533691,
        "y": 482.2000141143799,
        "wires": []
    },
    {
        "id": "8bdec00d.0138e",
        "type": "comment",
        "z": "ca2a9d00.3835d",
        "name": "Config your Bynlk Key",
        "info": "",
        "x": 833.1000747680664,
        "y": 123.60000991821289,
        "wires": []
    },
    {
        "id": "3c7f14a9.2b32dc",
        "type": "blynk-websockets-client",
        "z": "",
        "name": "blynk-Android",
        "path": "ws://cloud.blynk.cc/websocket",
        "key": "f4e9ca3b2f034e57bfaba8c8cbf4f5a7"
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
        "id": "8e23401b.e16bb",
        "type": "ui_group",
        "z": "",
        "name": "VR",
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
