[
    {
        "id": "d0fc38e5.608f18",
        "type": "tab",
        "label": "ModBus Meter",
        "disabled": false,
        "info": ""
    },
    {
        "id": "ca1dea5f.a80a58",
        "type": "debug",
        "z": "d0fc38e5.608f18",
        "name": "",
        "active": false,
        "console": "false",
        "complete": "payload",
        "x": 684.0000076293945,
        "y": 95.00000286102295,
        "wires": []
    },
    {
        "id": "98eafa11.57ace8",
        "type": "debug",
        "z": "d0fc38e5.608f18",
        "name": "",
        "active": false,
        "console": "false",
        "complete": "true",
        "x": 394.5,
        "y": 75,
        "wires": []
    },
    {
        "id": "fd560226.b9e79",
        "type": "comment",
        "z": "d0fc38e5.608f18",
        "name": "Add config here",
        "info": "please go to https://cust00-01.giotgateway.com/giot-mqtt/to get your mqtt confugeration",
        "x": 157.00000762939453,
        "y": 201.00000286102295,
        "wires": []
    },
    {
        "id": "fe8c1ffb.5e301",
        "type": "json",
        "z": "d0fc38e5.608f18",
        "name": "",
        "x": 390.00000762939453,
        "y": 318.00000381469727,
        "wires": [
            [
                "11c2c7e4.2e8828",
                "50940a83.479f24"
            ]
        ]
    },
    {
        "id": "fbec2df8.f3391",
        "type": "mqtt in",
        "z": "d0fc38e5.608f18",
        "name": "LoRa Node",
        "topic": "client/200000020/200000020-GIOT-MAKER",
        "qos": "2",
        "broker": "71f422e4.0f062c",
        "x": 156,
        "y": 139,
        "wires": [
            [
                "98eafa11.57ace8",
                "2afa224c.f7538e"
            ]
        ]
    },
    {
        "id": "11c2c7e4.2e8828",
        "type": "debug",
        "z": "d0fc38e5.608f18",
        "name": "",
        "active": false,
        "console": "false",
        "complete": "false",
        "x": 734.0000114440918,
        "y": 307.0000047683716,
        "wires": []
    },
    {
        "id": "2afa224c.f7538e",
        "type": "function",
        "z": "d0fc38e5.608f18",
        "name": "Temperature Hex decode",
        "func": "var res = String.fromCharCode(65);\nvar Js = JSON.parse(msg.payload);\nvar dat = Js.data;\nvar datastring = new Array();\n\n\n//decode hex to string\nvar pm = parseInt(dat.substr(0,4),16)/100;      //Voltage的資訊\n\nvar temp = parseInt(dat.substr(4,2),16);    //Temp.Celsius資訊\n\nmsg.payload = JSON.stringify({\n \n id : Js.macAddr,\n pm : pm,\n tem: temp\n\n });\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 426,
        "y": 175,
        "wires": [
            [
                "fe8c1ffb.5e301",
                "ca1dea5f.a80a58"
            ]
        ]
    },
    {
        "id": "f06bb82d.830348",
        "type": "inject",
        "z": "d0fc38e5.608f18",
        "name": "LoRa test input",
        "topic": "",
        "payload": "{\"id\":\"43c00b0f-fc31-49cd-9563-457cecdc6426\",\"macAddr\":\"0400012c\",\"data\":\"01eb1c\",\"buff\":\"2016-04-29T11:30:21.176Z\",\"recv\":\"2016-04-29T11:30:20.000Z\",\"extra\":{\"gwip\":\"172.16.4.20\",\"gwid\":\"00001c497b3b805e\",\"repeater\":\"00000000ffffffff\",\"systype\":4,\"rssi\":-85,\"snr\":102}}",
        "payloadType": "str",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 164,
        "y": 106,
        "wires": [
            [
                "2afa224c.f7538e",
                "98eafa11.57ace8"
            ]
        ]
    },
    {
        "id": "f7c7ab5a.be7468",
        "type": "ui_chart",
        "z": "d0fc38e5.608f18",
        "name": "",
        "group": "89057f71.75c62",
        "order": 0,
        "width": 0,
        "height": 0,
        "label": "Voltage",
        "chartType": "line",
        "legend": "false",
        "xformat": "%H:%M:%S",
        "interpolate": "linear",
        "nodata": "",
        "dot": false,
        "ymin": "",
        "ymax": "",
        "removeOlder": "5",
        "removeOlderPoints": "",
        "removeOlderUnit": "60",
        "cutout": "",
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
        "x": 760.5000114440918,
        "y": 518.0000095367432,
        "wires": [
            [],
            []
        ]
    },
    {
        "id": "18d74999.649e96",
        "type": "ui_gauge",
        "z": "d0fc38e5.608f18",
        "name": "",
        "group": "89057f71.75c62",
        "order": 0,
        "width": 0,
        "height": 0,
        "gtype": "gage",
        "title": "temperature",
        "label": "units",
        "format": "{{value}}",
        "min": 0,
        "max": "100",
        "colors": [
            "#00b500",
            "#e6e600",
            "#ca3838"
        ],
        "seg1": "",
        "seg2": "",
        "x": 770.5000114440918,
        "y": 416.00000762939453,
        "wires": []
    },
    {
        "id": "acb7e10e.5d488",
        "type": "ui_text",
        "z": "d0fc38e5.608f18",
        "group": "89057f71.75c62",
        "order": 0,
        "width": 0,
        "height": 0,
        "name": "",
        "label": "temperature text",
        "format": "{{msg.payload}}",
        "layout": "col-center",
        "x": 779.5000114440918,
        "y": 466.00000858306885,
        "wires": []
    },
    {
        "id": "50940a83.479f24",
        "type": "function",
        "z": "d0fc38e5.608f18",
        "name": "GetTemp",
        "func": "var tem = { payload:msg.payload.tem }\nvar pm={ payload:msg.payload.pm }\nreturn [tem,pm]",
        "outputs": "2",
        "noerr": 0,
        "x": 507,
        "y": 441,
        "wires": [
            [
                "18d74999.649e96",
                "acb7e10e.5d488"
            ],
            [
                "f7c7ab5a.be7468"
            ]
        ]
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
        "id": "89057f71.75c62",
        "type": "ui_group",
        "z": "",
        "name": "Default",
        "tab": "cd3f5894.72b888",
        "disp": true,
        "width": "6"
    },
    {
        "id": "cd3f5894.72b888",
        "type": "ui_tab",
        "z": "",
        "name": "ModBus Meter",
        "icon": "dashboard"
    }
]
