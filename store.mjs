import fetch from 'node-fetch';

function getStore(userLocation) {
    let res = fetch(
        "http://www.mapquestapi.com/directions/v2/routematrix?key=PM9unQ5sdswrknRGzNISm" +
                "lMpikyVVDdT",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "locations": [
                    userLocation, "23.378732249246667, 85.3160366412092", "23.364586966335754, 85.34531899703113", "23.35233724078064, 85.31640959847162", "23.326090622203424, 85.30733395329207"
                ],
                "options": {
                    "allToAll": false
                }
            })
        }
    )
        .then(res => res.json())
        .then(data => {

            let output = JSON.stringify(data);

            let [s0, s1, s2, s3, s4] = (data.distance);

            console.log(s0, s1, s2, s3, s4)

            destructuring(s1, s2, s3, s4);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    function destructuring(s1, s2, s3, s4) {

        var store = {
            "Cement House,Upper Bazar": s1,
            "Siddhi Vinayak,Kanta Toli": s2,
            "Mishra Traders,Kadru": s3,
            "Sana Traders,Birsa Chowk": s4
        };
        let storeSorted = Object
            .keys(store)
            .sort(function (a, b) {
                return store[a] - store[b]
            })
        console.log(storeSorted[0]);

    }

}
