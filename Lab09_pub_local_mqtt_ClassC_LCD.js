[
    {
        "id": "91631c64.e643",
        "type": "tab",
        "label": "Lab09 Pub Local MQTT Class C LCD"
    },
    {
        "id": "e8a98308.64ac9",
        "type": "mqtt out",
        "z": "91631c64.e643",
        "name": "DL 00001c497bc0ddea",
        "topic": "GIOT-GW/DL/00001c497bc0ddea",
        "qos": "",
        "retain": "",
        "broker": "ff1a1312.f372c",
        "x": 854.0000095367432,
        "y": 219.00000381469727,
        "wires": []
    },
    {
        "id": "2b1a7f83.241c2",
        "type": "inject",
        "z": "91631c64.e643",
        "name": "Clssa A DL",
        "topic": "DL",
        "payload": "{\"macAddr\":\"0000000004000476\",\"data\":\"14c48c50\",\"id\":\"12345\",\"extra\":{\"port\":2, \"txpara\":\"22\"}}",
        "payloadType": "str",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 184.9999771118164,
        "y": 219.44439220428467,
        "wires": [
            [
                "12ec2359.033aed"
            ]
        ]
    },
    {
        "id": "f53c2b78.369a78",
        "type": "function",
        "z": "91631c64.e643",
        "name": "04000476 DownLink",
        "func": "function addZero(i) {\n    if (i < 10) {\n        i = \"0\" + i;\n    }\n    return i;\n}\nvar d = new Date();\nvar h = addZero(d.getHours());\nvar m = addZero(d.getMinutes());\nvar s = addZero(d.getSeconds());\nvar dataJson ={};\ndataJson.macAddr = \"0000000004000476\";\ndataJson.data = h.toString()+\"c\"+m.toString() +\"c\"+ s.toString();;\ndataJson.id = Math.floor(Math.random()*4294967295).toString(16);\ndataJson.extra = {\"port\":1,\"txpara\":\"22\"};\nvar arr = [dataJson];\nmsg.payload = JSON.stringify(arr);\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 529.0000190734863,
        "y": 217.77772331237793,
        "wires": [
            [
                "e8a98308.64ac9",
                "a4149355.14409"
            ]
        ]
    },
    {
        "id": "12ec2359.033aed",
        "type": "json",
        "z": "91631c64.e643",
        "name": "",
        "x": 337.9999771118164,
        "y": 217.555513381958,
        "wires": [
            [
                "f53c2b78.369a78"
            ]
        ]
    },
    {
        "id": "a4149355.14409",
        "type": "debug",
        "z": "91631c64.e643",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 819.1666793823242,
        "y": 322.11111640930176,
        "wires": []
    },
    {
        "id": "869b7a4d.747cb8",
        "type": "comment",
        "z": "91631c64.e643",
        "name": "Change MacAddr to your Module",
        "info": "",
        "x": 523.1667022705078,
        "y": 260.65278244018555,
        "wires": []
    },
    {
        "id": "4d610b48.512114",
        "type": "comment",
        "z": "91631c64.e643",
        "name": "Change Topic GID to your own LoRaGateway",
        "info": "",
        "x": 848.1666717529297,
        "y": 178.66666984558105,
        "wires": []
    },
    {
        "id": "ff1a1312.f372c",
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
        "willQos": "2",
        "willPayload": "",
        "birthTopic": "",
        "birthQos": "2",
        "birthPayload": ""
    }
]