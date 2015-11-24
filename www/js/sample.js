    var graph = {
	"nodes": [{
            "name": "A",
            "type": "normal"
        }, {
            "name": "B",
            "type": "normal"
        }, {
            "name": "C",
            "type": "logic"
        }, {
            "name": "D",
            "type": "normal"
        }],
            "links": [{
            "source": 0,
                "target": 1,
                "value": -1
        }, {
            "source": 0,
                "target": 2,
                "value": 1
        }, {
            "source": 1,
                "target": 3,
                "value": 1
        }, {
            "source": 2,
                "target": 3,
		"value": 1
        }]
    };

//value: -1 = Inverted
//value: 1 = Not Inverted
