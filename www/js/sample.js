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
            "value": -1,
            "logic": 0 //AND
        }, {
            "source": 0,
                "target": 2,
                "value": 1,
                "logic": 0 //AND
        }, {
            "source": 1,
                "target": 3,
                "value": 1,
                "logic": 1 //OR
        }, {
            "source": 2,
                "target": 3,
		"value": 1,
                "logic":0 //AND
        }]
    };

//value: -1 = Inverted
//value: 1 = Not Inverted
