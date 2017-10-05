[
    {
        "id": "51f949d9.b75c88",
        "type": "tab",
        "label": "Lab09 Public DL 2 LCD Class C"
    },
    {
        "id": "6a33c56d.b8ce4c",
        "type": "mqtt out",
        "z": "51f949d9.b75c88",
        "name": "DL to Public ",
        "topic": "client/200000020/200000020-GIOT-MAKER/dl",
        "qos": "",
        "retain": "",
        "broker": "71f422e4.0f062c",
        "x": 880.0000076293945,
        "y": 219.44448852539062,
        "wires": []
    },
    {
        "id": "cf02c173.5fb32",
        "type": "inject",
        "z": "51f949d9.b75c88",
        "name": "Public Broker Clssa C DL",
        "topic": "DL",
        "payload": "{\"correlationId\":\"B180C43D2FAB617EF58267137518B938\",\"dldata\":{\"macAddr\":\"04000476\",\"data\":\"13c51c18\",\"extra\":{\"port\":2, \"txpara\":\"22\"}}}",
        "payloadType": "str",
        "repeat": "",
        "crontab": "",
        "once": true,
        "x": 158.99998474121094,
        "y": 224.8888931274414,
        "wires": [
            [
                "26219c26.492334"
            ]
        ]
    },
    {
        "id": "5e5b9cc.b2ce064",
        "type": "function",
        "z": "51f949d9.b75c88",
        "name": "04000476 DownLink",
        "func": "function addZero(i) {\n    if (i < 10) {\n        i = \"0\" + i;\n    }\n    return i;\n}\nvar d = new Date();\nvar h = addZero(d.getHours());\nvar m = addZero(d.getMinutes());\nvar s = addZero(d.getSeconds());\n//{\"correlationId\":\"B180C43D2FAB61\",\"dldata\":{\"macAddr\":\"04000476\",\"data\":\"13c51c18\",\"extra\":{\"port\":2, \"txpara\":\"6\"}}}\nvar payload = msg.payload;\nmsg.payload.dldata.data = h.toString()+\"c\"+m.toString() +\"c\"+ s.toString();\nmsg.payload.correlationId = Math.floor(Math.random()*4294967295).toString(16);\nmsg.payload.dldata.macAddr = \"04000476\";\nmsg.payload.dldata.extra.txpara = 34; //Old IDU Class C\n//msg.payload.dldata.extra.txpara = \"22\"; //New IDU & ODU Class C, Class C don't have comfirmed (\"26\")\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 548.0000190734863,
        "y": 224.22220993041992,
        "wires": [
            [
                "6a33c56d.b8ce4c",
                "a3ac6642.b2c198"
            ]
        ]
    },
    {
        "id": "26219c26.492334",
        "type": "json",
        "z": "51f949d9.b75c88",
        "name": "",
        "pretty": false,
        "x": 356.9999771118164,
        "y": 224,
        "wires": [
            [
                "5e5b9cc.b2ce064"
            ]
        ]
    },
    {
        "id": "a3ac6642.b2c198",
        "type": "debug",
        "z": "51f949d9.b75c88",
        "name": "",
        "active": false,
        "console": "false",
        "complete": "payload",
        "x": 849.1666793823242,
        "y": 287.11111545562744,
        "wires": []
    },
    {
        "id": "ed888e2e.5b71a",
        "type": "mqtt in",
        "z": "51f949d9.b75c88",
        "name": "DL response",
        "topic": "client/200000020/200000020-GIOT-MAKER/dl-resp",
        "qos": "2",
        "broker": "71f422e4.0f062c",
        "x": 568.1666717529297,
        "y": 347.55561447143555,
        "wires": [
            [
                "c3789bbf.3f73e8"
            ]
        ]
    },
    {
        "id": "d180fed5.75675",
        "type": "mqtt in",
        "z": "51f949d9.b75c88",
        "name": "DL result",
        "topic": "client/200000020/200000020-GIOT-MAKER/dl-result",
        "qos": "2",
        "broker": "71f422e4.0f062c",
        "x": 575.1667327880859,
        "y": 413.55561447143555,
        "wires": [
            [
                "f374ee7f.8638d"
            ]
        ]
    },
    {
        "id": "c71c05c6.0cd078",
        "type": "blynk-websockets-in-write",
        "z": "51f949d9.b75c88",
        "name": "V1 Terminal Read",
        "pin": "1",
        "client": "3c7f14a9.2b32dc",
        "x": 129.50000381469727,
        "y": 96.00000190734863,
        "wires": [
            [
                "6526aad3.d6e294",
                "deef5349.d2598"
            ]
        ]
    },
    {
        "id": "6526aad3.d6e294",
        "type": "debug",
        "z": "51f949d9.b75c88",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "true",
        "x": 410,
        "y": 100,
        "wires": []
    },
    {
        "id": "deef5349.d2598",
        "type": "function",
        "z": "51f949d9.b75c88",
        "name": "04000476 DownLink",
        "func": "//{\"correlationId\":\"B180C43D2FAB61\",\"dldata\":{\"macAddr\":\"04000476\",\"data\":\"13c51c18\",\"extra\":{\"port\":2, \"txpara\":\"6\"}}}\nvar blynk_data = msg.payload;\n//console.log(blynk_data);\nvar DL_payload = {\"correlationId\":\"B180C43D2FAB61\",\"dldata\":{\"macAddr\":\"04000476\",\"data\":\"13c51c18\",\"extra\":{\"port\":2, \"txpara\":\"26\"}}}\nmsg.payload = DL_payload;\nmsg.payload.dldata.data =  blynk_data;\nmsg.payload.correlationId = Math.floor(Math.random()*4294967295).toString(16);\nmsg.payload.dldata.macAddr = \"04000476\";\nmsg.payload.dldata.extra.txpara = 34; //Old IDU Class C\n//msg.payload.dldata.extra.txpara = \"22\"; //New IDU & ODU Class C, Class C don't have comfirmed (\"26\")\n//return blynk_data;\nreturn msg;",
        "outputs": "1",
        "noerr": 0,
        "x": 545.0000076293945,
        "y": 177.00000190734863,
        "wires": [
            [
                "a9a9a215.4eba3",
                "6a33c56d.b8ce4c"
            ]
        ]
    },
    {
        "id": "a9a9a215.4eba3",
        "type": "debug",
        "z": "51f949d9.b75c88",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "payload",
        "x": 872.1666793823242,
        "y": 142.1111135482788,
        "wires": []
    },
    {
        "id": "c3789bbf.3f73e8",
        "type": "debug",
        "z": "51f949d9.b75c88",
        "name": "",
        "active": false,
        "console": "false",
        "complete": "false",
        "x": 850.1666793823242,
        "y": 347.88889503479004,
        "wires": []
    },
    {
        "id": "f374ee7f.8638d",
        "type": "debug",
        "z": "51f949d9.b75c88",
        "name": "",
        "active": false,
        "console": "false",
        "complete": "payload",
        "x": 854.1666793823242,
        "y": 413.88889503479004,
        "wires": []
    },
    {
        "id": "d6e8c776.5817c8",
        "type": "comment",
        "z": "51f949d9.b75c88",
        "name": "更改 Project Key 為自己 blynk app 的 AUTH Token",
        "info": "",
        "x": 229.16665649414062,
        "y": 54.777785301208496,
        "wires": []
    },
    {
        "id": "c1ca85c6.3044b8",
        "type": "comment",
        "z": "51f949d9.b75c88",
        "name": "改MacAddr 為自己的",
        "info": "",
        "x": 532.1666870117188,
        "y": 139.7777862548828,
        "wires": []
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
        "id": "3c7f14a9.2b32dc",
        "type": "blynk-websockets-client",
        "z": "",
        "name": "blynk-Android",
        "path": "ws://cloud.blynk.cc/websocket",
        "key": "ec2d29e38670478fbafec1966b709ef2"
    }
]
