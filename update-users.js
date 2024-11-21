
const EVENT_RAW = process.env.EVENT_RAW;
// FILE_PATH is not used since we won't be writing to a file
// const FILE_PATH = process.env.FILE_PATH || "./vrchat-kofi-users.txt"

const users = []; // Simulating the user array in memory for this example

try {
    const event_json = JSON.parse(EVENT_RAW.split("\n").join(""));
    console.log(event_json);

    const type = event_json.type;
    let amount = event_json.amount;

    if (type == "Subscription") {
        amount = event_json.amount + "€/mois";
        console.log("Type Subscription");
    } else {
        amount = event_json.amount + "€";
        console.log("Type Donation");
    }

    // Only register the user if they are not already in the user array
    if (!users.find(line => line[0] === event_json.name)) {
        users.push([event_json.name, amount]);
        console.log("user added");
        output = { userAdded: true }; // Indicate that a user was added
    } else {
        console.log("user already exists, not adding");
        output = { userAdded: false }; // Indicate that no user was added
    }
} catch (err) {
    console.error({ err, EVENT_RAW });
    output = { error: err.message }; // Capture any errors
}
