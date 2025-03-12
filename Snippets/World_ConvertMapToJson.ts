import * as hz from 'horizon/core';

class ConvertMapToJson extends hz.Component<typeof ConvertMapToJson> {
    private map = new Map<string, string>();

    start() {
        // Initialize the map with some values
        this.map.set("id", (1001).toString());
        this.map.set("name", "Test");

        // Convert the map to a JSON string
        const jsonString = JSON.stringify(this.map);
        console.log(jsonString);
    }
}

hz.Component.register(ConvertMapToJson);