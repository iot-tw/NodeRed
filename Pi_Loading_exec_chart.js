[
    {
        "id": "72fa5a19.1dea94",
        "type": "tab",
        "label": "Pi_Loading_exec_chart",
        "disabled": false,
        "info": ""
    },
    {
        "id": "19500131.352e8f",
        "type": "ui_gauge",
        "z": "72fa5a19.1dea94",
        "name": "",
        "group": "470d6a49.255fc4",
        "order": 2,
        "width": 0,
        "height": 0,
        "gtype": "gage",
        "title": "CPU Temperature",
        "label": "C",
        "format": "{{value}}",
        "min": 0,
        "max": "100",
        "colors": [
            "#00b500",
            "#e6e600",
            "#ca3838"
        ],
        "x": 830.9999885559082,
        "y": 198,
        "wires": []
    },
    {
        "id": "71bfd77f.e7b668",
        "type": "exec",
        "z": "72fa5a19.1dea94",
        "command": "sudo vcgencmd measure_temp",
        "addpay": false,
        "append": "",
        "useSpawn": "",
        "timer": "",
        "oldrc": false,
        "name": "RPi Temp.",
        "x": 470.9999885559082,
        "y": 198,
        "wires": [
            [
                "51f76c2c.4993a4",
                "afb7b483.b0d9f8"
            ],
            [],
            []
        ]
    },
    {
        "id": "9bb3d372.00acb",
        "type": "inject",
        "z": "72fa5a19.1dea94",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "5",
        "crontab": "",
        "once": false,
        "x": 265.4999885559082,
        "y": 206.25,
        "wires": [
            [
                "71bfd77f.e7b668",
                "8ba2d667.dca908",
                "8f67d5a8.7132a8"
            ]
        ]
    },
    {
        "id": "51f76c2c.4993a4",
        "type": "function",
        "z": "72fa5a19.1dea94",
        "name": "",
        "func": "str = msg.payload\nmsg.payload = str.substring(5,9);\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 650.9999885559082,
        "y": 198,
        "wires": [
            [
                "19500131.352e8f",
                "364e2526.57540a"
            ]
        ]
    },
    {
        "id": "364e2526.57540a",
        "type": "ui_chart",
        "z": "72fa5a19.1dea94",
        "name": "",
        "group": "470d6a49.255fc4",
        "order": 3,
        "width": 0,
        "height": 0,
        "label": "",
        "chartType": "line",
        "legend": "false",
        "xformat": "HH:mm:ss",
        "interpolate": "linear",
        "nodata": "",
        "ymin": "",
        "ymax": "",
        "removeOlder": "24",
        "removeOlderPoints": "",
        "removeOlderUnit": "3600",
        "cutout": 0,
        "x": 830.9999885559082,
        "y": 238,
        "wires": [
            [],
            []
        ]
    },
    {
        "id": "8ba2d667.dca908",
        "type": "exec",
        "z": "72fa5a19.1dea94",
        "command": "top -d 0.5 -b -n2 | grep \"Cpu(s)\"|tail -n 1 | awk '{print $2 + $4}'",
        "addpay": false,
        "append": "",
        "useSpawn": "",
        "timer": "",
        "oldrc": false,
        "name": "CPU Load",
        "x": 470.9999885559082,
        "y": 278,
        "wires": [
            [
                "580dd6a7.99dae8",
                "afb7b483.b0d9f8"
            ],
            [],
            []
        ]
    },
    {
        "id": "8f67d5a8.7132a8",
        "type": "exec",
        "z": "72fa5a19.1dea94",
        "command": "free | grep Mem | awk '{print 100*($4+$6+$7)/$2}'",
        "addpay": false,
        "append": "",
        "useSpawn": "",
        "timer": "",
        "oldrc": false,
        "name": "Free Memory",
        "x": 470.9999885559082,
        "y": 358,
        "wires": [
            [
                "38d718ef.4fa518"
            ],
            [],
            []
        ]
    },
    {
        "id": "580dd6a7.99dae8",
        "type": "ui_gauge",
        "z": "72fa5a19.1dea94",
        "name": "",
        "group": "470d6a49.255fc4",
        "order": 1,
        "width": 0,
        "height": 0,
        "gtype": "gage",
        "title": "Processor",
        "label": "CPU",
        "format": "{{value}}",
        "min": 0,
        "max": "100",
        "colors": [
            "#00b500",
            "#e6e600",
            "#ca3838"
        ],
        "x": 830.9999885559082,
        "y": 278,
        "wires": []
    },
    {
        "id": "38d718ef.4fa518",
        "type": "ui_gauge",
        "z": "72fa5a19.1dea94",
        "name": "",
        "group": "ea111276.32381",
        "order": 1,
        "width": 0,
        "height": 0,
        "gtype": "gage",
        "title": "Memory",
        "label": "RAM",
        "format": "{{value.toFixed(1)}}",
        "min": 0,
        "max": "100",
        "colors": [
            "#00b500",
            "#e6e600",
            "#ca3838"
        ],
        "x": 830.9999885559082,
        "y": 358,
        "wires": []
    },
    {
        "id": "ae3abb28.565c38",
        "type": "exec",
        "z": "72fa5a19.1dea94",
        "command": "df -h",
        "addpay": false,
        "append": "",
        "useSpawn": "",
        "timer": "",
        "name": "Disk Usage",
        "x": 470.9999885559082,
        "y": 438,
        "wires": [
            [
                "32f102d9.02d9ee"
            ],
            [],
            []
        ]
    },
    {
        "id": "93233bbe.df3978",
        "type": "ui_gauge",
        "z": "72fa5a19.1dea94",
        "name": "",
        "group": "87209c20.24f24",
        "order": 1,
        "width": 0,
        "height": 0,
        "gtype": "gage",
        "title": "Disk",
        "label": "Usage",
        "format": "{{value}}",
        "min": 0,
        "max": "100",
        "colors": [
            "#00b500",
            "#e6e600",
            "#ca3838"
        ],
        "x": 830.9999885559082,
        "y": 438,
        "wires": []
    },
    {
        "id": "32f102d9.02d9ee",
        "type": "function",
        "z": "72fa5a19.1dea94",
        "name": "",
        "func": "var re = /([0-9]{2})%/\nvar idx = msg.payload.search(re);\nvar str = msg.payload;\nif (idx >=0) {\n str = msg.payload.substring(idx, idx + 2);\n}\nmsg.payload = str;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 650.9999885559082,
        "y": 438,
        "wires": [
            [
                "93233bbe.df3978"
            ]
        ]
    },
    {
        "id": "2305c2ca.58d24e",
        "type": "inject",
        "z": "72fa5a19.1dea94",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "60",
        "crontab": "",
        "once": false,
        "x": 270.9999885559082,
        "y": 438,
        "wires": [
            [
                "ae3abb28.565c38"
            ]
        ]
    },
    {
        "id": "afb7b483.b0d9f8",
        "type": "debug",
        "z": "72fa5a19.1dea94",
        "name": "",
        "active": false,
        "console": "false",
        "complete": "false",
        "x": 643.166675567627,
        "y": 152.7638931274414,
        "wires": []
    },
    {
        "id": "470d6a49.255fc4",
        "type": "ui_group",
        "z": "",
        "name": "Col1",
        "tab": "e765c165.97795",
        "order": 1,
        "disp": false,
        "width": "6"
    },
    {
        "id": "ea111276.32381",
        "type": "ui_group",
        "z": "",
        "name": "Col2",
        "tab": "e765c165.97795",
        "order": 2,
        "disp": false,
        "width": "6"
    },
    {
        "id": "87209c20.24f24",
        "type": "ui_group",
        "z": "",
        "name": "Col3",
        "tab": "e765c165.97795",
        "order": 3,
        "disp": false,
        "width": "6"
    },
    {
        "id": "e765c165.97795",
        "type": "ui_tab",
        "z": "",
        "name": "RPi Control",
        "icon": "dashboard",
        "order": 4
    }
]
