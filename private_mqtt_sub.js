[{
    "id": "ab7db771.fa0e38",
    "type": "mqtt in",
    "z": "574c9ba5.ef2924",
    "name": "mqtt sub",
    "topic": "#",
    "qos": "2",
    "broker": "3a2f2943.8640a6",
    "x": 190.20001220703125,
    "y": 168,
    "wires": [
        ["afd9cf79.ba28f", "f1e16b5a.b9cc58"]
    ]
}, {
    "id": "afd9cf79.ba28f",
    "type": "debug",
    "z": "574c9ba5.ef2924",
    "name": "All json",
    "active": false,
    "console": "false",
    "complete": "payload",
    "x": 456.2000274658203,
    "y": 168,
    "wires": []
}, {
    "id": "daee5d8d.93dda",
    "type": "function",
    "z": "574c9ba5.ef2924",
    "name": "get payload.data",
    "func": "var payload = msg.payload[0];\nmsg.payload = payload.data;\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 557.2000274658203,
    "y": 219,
    "wires": [
        ["bc298137.ab8b7"]
    ]
}, {
    "id": "f1e16b5a.b9cc58",
    "type": "json",
    "z": "574c9ba5.ef2924",
    "name": "",
    "x": 399.2000274658203,
    "y": 219,
    "wires": [
        ["daee5d8d.93dda"]
    ]
}, {
    "id": "bc298137.ab8b7",
    "type": "debug",
    "z": "574c9ba5.ef2924",
    "name": "json debug",
    "active": true,
    "console": "false",
    "complete": "payload",
    "x": 759.2000274658203,
    "y": 221,
    "wires": []
}, {
    "id": "3062143c.cab28c",
    "type": "comment",
    "z": "574c9ba5.ef2924",
    "name": "GIoT private MQTT Flow",
    "info": "",
    "x": 223.20001220703125,
    "y": 127,
    "wires": []
}, {
    "id": "3a2f2943.8640a6",
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
}]
