[
    {
        "id": "ea221805.0f3bf8",
        "type": "tab",
        "label": "Using the function node",
        "disabled": false,
        "info": ""
    },
    {
        "id": "a8923276.0ed3c",
        "type": "debug",
        "z": "ea221805.0f3bf8",
        "name": "Output",
        "active": true,
        "console": "false",
        "complete": "payload",
        "x": 1027,
        "y": 353,
        "wires": []
    },
    {
        "id": "a69df8af.de6648",
        "type": "debug",
        "z": "ea221805.0f3bf8",
        "name": "2nd Output",
        "active": true,
        "console": "false",
        "complete": "payload",
        "x": 1047,
        "y": 433,
        "wires": []
    },
    {
        "id": "4ee71359.fe53fc",
        "type": "debug",
        "z": "ea221805.0f3bf8",
        "name": "3rd Output",
        "active": true,
        "console": "false",
        "complete": "payload",
        "x": 1047,
        "y": 513,
        "wires": []
    },
    {
        "id": "b7c0059d.edd978",
        "type": "function",
        "z": "ea221805.0f3bf8",
        "name": "Array",
        "func": "var msg1 = { payload:\"first message\" };\nvar msg2 = { payload:\"second message\" };\nvar msg3 = { payload:\"third message\" };\nvar msg4 = { payload:\"fourth message\" };\nreturn [msg1, msg2, msg3, msg4];",
        "outputs": 1,
        "noerr": 0,
        "x": 527,
        "y": 253,
        "wires": [
            [
                "a8923276.0ed3c"
            ]
        ]
    },
    {
        "id": "4ee35d47.2f8fa4",
        "type": "function",
        "z": "ea221805.0f3bf8",
        "name": "Array in Array",
        "func": "var msg1 = { payload:\"first message\" };\nvar msg2 = { payload:\"second message\" };\nvar msg3 = { payload:\"third message\" };\nvar msg4 = { payload:\"fourth message\" };\nreturn [[msg1, msg2, msg3, msg4]]",
        "outputs": 1,
        "noerr": 0,
        "x": 497,
        "y": 293,
        "wires": [
            [
                "a8923276.0ed3c"
            ]
        ]
    },
    {
        "id": "a39fd43b.cc4d98",
        "type": "function",
        "z": "ea221805.0f3bf8",
        "name": "Multiple returns",
        "func": "var msg1 = { payload:\"first message\" };\nvar msg2 = { payload:\"second message\" };\nvar msg3 = { payload:\"third message\" };\nvar msg4 = { payload:\"fourth message\" };\nreturn [msg1, msg2, msg3, msg4];\n",
        "outputs": "3",
        "noerr": 0,
        "x": 497,
        "y": 373,
        "wires": [
            [
                "a8923276.0ed3c"
            ],
            [
                "a69df8af.de6648"
            ],
            [
                "4ee71359.fe53fc"
            ]
        ]
    },
    {
        "id": "d306a8fd.9e2648",
        "type": "function",
        "z": "ea221805.0f3bf8",
        "name": "Multiple returns array in array",
        "func": "var msg1 = { payload:\"first message\" };\nvar msg2 = { payload:\"second message\" };\nvar msg3 = { payload:\"third message\" };\nvar msg4 = { payload:\"fourth message\" };\nreturn [msg1, [msg2, msg3], msg4];\n",
        "outputs": "3",
        "noerr": 0,
        "x": 457,
        "y": 433,
        "wires": [
            [
                "a8923276.0ed3c"
            ],
            [
                "a69df8af.de6648"
            ],
            [
                "4ee71359.fe53fc"
            ]
        ]
    },
    {
        "id": "eca80f45.65f3c",
        "type": "function",
        "z": "ea221805.0f3bf8",
        "name": "Create JSON Object",
        "func": "msg.payload = {\"a\" : { \"b\" : \"test\"}};\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 477,
        "y": 513,
        "wires": [
            [
                "a8923276.0ed3c",
                "928ad1df.9ab3b"
            ]
        ]
    },
    {
        "id": "4fff616f.8f6db",
        "type": "function",
        "z": "ea221805.0f3bf8",
        "name": "Create JSON String",
        "func": "msg.payload = '{\"a\" : { \"b\" : \"test\"}}';\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 487,
        "y": 553,
        "wires": [
            [
                "a8923276.0ed3c",
                "928ad1df.9ab3b"
            ]
        ]
    },
    {
        "id": "5458addb.af28b4",
        "type": "function",
        "z": "ea221805.0f3bf8",
        "name": "Create JSON String in msg.payload",
        "func": "msg.payload = '{\"a\" : { \"b\" : \"test\"}}';\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 437,
        "y": 593,
        "wires": [
            [
                "a8923276.0ed3c",
                "8a48c56b.cf9d38"
            ]
        ]
    },
    {
        "id": "29fe9f37.1be02",
        "type": "function",
        "z": "ea221805.0f3bf8",
        "name": "return string in object",
        "func": "return {\"payload\" : \"Hello Coursera\"};",
        "outputs": 1,
        "noerr": 0,
        "x": 477,
        "y": 153,
        "wires": [
            [
                "a8923276.0ed3c"
            ]
        ]
    },
    {
        "id": "8a48c56b.cf9d38",
        "type": "json",
        "z": "ea221805.0f3bf8",
        "name": "",
        "pretty": false,
        "x": 667,
        "y": 593,
        "wires": [
            [
                "a69df8af.de6648",
                "928ad1df.9ab3b"
            ]
        ]
    },
    {
        "id": "928ad1df.9ab3b",
        "type": "function",
        "z": "ea221805.0f3bf8",
        "name": "retrieve data from Object",
        "func": "msg.payload = msg.payload.a.b;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 827,
        "y": 503,
        "wires": [
            [
                "4ee71359.fe53fc"
            ]
        ]
    },
    {
        "id": "7535b573.b4221c",
        "type": "inject",
        "z": "ea221805.0f3bf8",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "none",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 187,
        "y": 253,
        "wires": [
            [
                "b7c0059d.edd978"
            ]
        ]
    },
    {
        "id": "d431dee7.eb69a",
        "type": "inject",
        "z": "ea221805.0f3bf8",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "none",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 187,
        "y": 293,
        "wires": [
            [
                "4ee35d47.2f8fa4"
            ]
        ]
    },
    {
        "id": "ab1c906e.16a8b",
        "type": "inject",
        "z": "ea221805.0f3bf8",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "str",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 187,
        "y": 373,
        "wires": [
            [
                "a39fd43b.cc4d98"
            ]
        ]
    },
    {
        "id": "3fc56c84.d58e24",
        "type": "inject",
        "z": "ea221805.0f3bf8",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "str",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 187,
        "y": 433,
        "wires": [
            [
                "d306a8fd.9e2648"
            ]
        ]
    },
    {
        "id": "ce8fb191.52682",
        "type": "inject",
        "z": "ea221805.0f3bf8",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "none",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 187,
        "y": 513,
        "wires": [
            [
                "eca80f45.65f3c"
            ]
        ]
    },
    {
        "id": "174a58ef.16df27",
        "type": "inject",
        "z": "ea221805.0f3bf8",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "none",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 187,
        "y": 553,
        "wires": [
            [
                "4fff616f.8f6db"
            ]
        ]
    },
    {
        "id": "97b5d79f.ee38d8",
        "type": "inject",
        "z": "ea221805.0f3bf8",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "str",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 187,
        "y": 593,
        "wires": [
            [
                "5458addb.af28b4"
            ]
        ]
    },
    {
        "id": "4c749491.55c04c",
        "type": "inject",
        "z": "ea221805.0f3bf8",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "none",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 187,
        "y": 153,
        "wires": [
            [
                "29fe9f37.1be02"
            ]
        ]
    },
    {
        "id": "e1fa1e9a.41b1c",
        "type": "function",
        "z": "ea221805.0f3bf8",
        "name": "Status and logging functions",
        "func": "node.status({text:\"started\"});\n\nsetTimeout(function() {\n    node.status({fill:\"red\",shape:\"ring\",text:\"stage 1\"});\n    \n    setTimeout(function() {\n        node.status({fill:\"green\",shape:\"dot\",text:\"stage 2\"});\n        node.error(\"This is an error\", {'payload' : 'Caught error'});\n        \n        setTimeout(function() {\n            node.error(\"Second error\");\n            node.status({});\n            node.send({'payload' : 'Completed'});\n        }, 1000);\n        \n    }, 1000);\n    \n}, 1000);\n\nnode.warn(\"Exiting node\");\nreturn;",
        "outputs": 1,
        "noerr": 0,
        "x": 457,
        "y": 653,
        "wires": [
            [
                "a8923276.0ed3c"
            ]
        ]
    },
    {
        "id": "4ffc6d13.dd9764",
        "type": "inject",
        "z": "ea221805.0f3bf8",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "str",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 187,
        "y": 653,
        "wires": [
            [
                "e1fa1e9a.41b1c"
            ]
        ]
    },
    {
        "id": "f7cd0af7.889e38",
        "type": "catch",
        "z": "ea221805.0f3bf8",
        "name": "Catch node",
        "scope": [
            "e1fa1e9a.41b1c"
        ],
        "x": 507,
        "y": 693,
        "wires": [
            [
                "9edb6314.bca76"
            ]
        ]
    },
    {
        "id": "827d0bc7.0af9e8",
        "type": "function",
        "z": "ea221805.0f3bf8",
        "name": "return string",
        "func": "return 'This is a string';",
        "outputs": 1,
        "noerr": 0,
        "x": 507,
        "y": 113,
        "wires": [
            [
                "a8923276.0ed3c"
            ]
        ]
    },
    {
        "id": "8ddd9205.e46a7",
        "type": "inject",
        "z": "ea221805.0f3bf8",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "str",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 187,
        "y": 113,
        "wires": [
            [
                "827d0bc7.0af9e8"
            ]
        ]
    },
    {
        "id": "9edb6314.bca76",
        "type": "debug",
        "z": "ea221805.0f3bf8",
        "name": "entire msg",
        "active": true,
        "console": "false",
        "complete": "true",
        "x": 1047,
        "y": 593,
        "wires": []
    }
]
