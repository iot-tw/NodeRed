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
        "x": 761,
        "y": 224.444486618042,
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
        "once": false,
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
        "func": "function addZero(i) {\n    if (i < 10) {\n        i = \"0\" + i;\n    }\n    return i;\n}\nvar d = new Date();\nvar h = addZero(d.getHours());\nvar m = addZero(d.getMinutes());\nvar s = addZero(d.getSeconds());\n//{\"correlationId\":\"B180C43D2FAB61\",\"dldata\":{\"macAddr\":\"04000476\",\"data\":\"13c51c18\",\"extra\":{\"port\":2, \"txpara\":\"6\"}}}\nvar payload = msg.payload;\nmsg.payload.dldata.data = h.toString()+\"c\"+m.toString() +\"c\"+ s.toString();\nmsg.payload.correlationId = Math.floor(Math.random()*4294967295).toString(16);\nmsg.payload.dldata.macAddr = \"004000476\";\nreturn msg;",
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
        "active": true,
        "console": "false",
        "complete": "payload",
        "x": 775.1666870117188,
        "y": 352.1111145019531,
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
        "x": 430.1666564941406,
        "y": 353.555588722229,
        "wires": [
            [
                "a3ac6642.b2c198"
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
        "x": 420.1667022705078,
        "y": 407.5555896759033,
        "wires": [
            [
                "a3ac6642.b2c198"
            ]
        ]
    },
    {
        "id": "c71c05c6.0cd078",
        "type": "blynk-websockets-in-write",
        "z": "51f949d9.b75c88",
        "name": "V1 Read",
        "pin": "1",
        "client": "3c7f14a9.2b32dc",
        "x": 206.50000381469727,
        "y": 129.00000190734863,
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
        "active": false,
        "console": "false",
        "complete": "true",
        "x": 445.16669845581055,
        "y": 103.11111259460449,
        "wires": []
    },
    {
        "id": "deef5349.d2598",
        "type": "function",
        "z": "51f949d9.b75c88",
        "name": "04000476 DownLink",
        "func": "//{\"correlationId\":\"B180C43D2FAB61\",\"dldata\":{\"macAddr\":\"04000476\",\"data\":\"13c51c18\",\"extra\":{\"port\":2, \"txpara\":\"6\"}}}\nvar blynk_data = msg.payload;\n//console.log(blynk_data);\nvar DL_payload = {\"correlationId\":\"B180C43D2FAB61\",\"dldata\":{\"macAddr\":\"04000476\",\"data\":\"13c51c18\",\"extra\":{\"port\":2, \"txpara\":\"26\"}}}\nmsg.payload = DL_payload;\nmsg.payload.dldata.data =  blynk_data;\nmsg.payload.correlationId = Math.floor(Math.random()*4294967295).toString(16);\nmsg.payload.dldata.macAddr = \"04000476\";\n//return blynk_data;\nreturn msg;",
        "outputs": "1",
        "noerr": 0,
        "x": 501.00000762939453,
        "y": 154.00000286102295,
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
        "x": 748.166675567627,
        "y": 143.1111125946045,
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
        "key": "25a69250c5f045839ea912ca1c65ce2e"
    }
]