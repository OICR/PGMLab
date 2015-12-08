    var graph = {
	"nodes": [{
            "name": "A",
            "type": "normal",
            "longname": "longA"
        }, {
            "name": "B",
            "type": "normal",
            "longname": "longB"
        }, {
            "name": "C",
            "type": "logic",
            "longname": "longC"
        }, {
            "name": "D",
            "type": "normal",
            "longname": "longD"
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
