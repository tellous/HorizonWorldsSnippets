import { Component, Asset } from 'horizon/core';

// This assumes you have a data asset the looks like this
// { 
//  "message": "Hello World!" 
// }
type MyData = {
    message: string;
}

class FetchAsData extends Component<typeof FetchAsData> {
    preStart() {
        const assetId = 0; // Replace with your asset ID
        const asset = new Asset(BigInt(assetId));
        const skipCache = true;
        asset.fetchAsData({
            skipCache: skipCache
        })
            .then((data) => {
                const parsedData = data.asJSON<MyData>();
                if (!parsedData) {
                    console.error('Failed to parse data');
                } else {
                    console.log('Fetched data:', parsedData.message);
                }
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    start() {}
}

Component.register(FetchAsData);
