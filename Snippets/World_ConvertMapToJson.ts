import * as hz from 'horizon/core';

class ConvertMapToJson extends hz.Component<typeof ConvertMapToJson> {
  private map = new Map<string, string>();

  start() {
    // Initialize the map with some values
    this.map.set("id", (1001).toString());
    this.map.set("name", "Test");
    this.map.set("value", `${1}`); //Alternative way to convert a number to string

    // Convert the map to a JSON string
    const newObject = Object.fromEntries(this.map.entries());
    const jsonString = JSON.stringify(newObject);
    console.log(jsonString);

    //You can copy the output in the console and save it to a json file on your computer
    //Just open notepad, paste the output and save it as a .json file
  }
}

hz.Component.register(ConvertMapToJson);