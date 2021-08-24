const db = require("../config/connection");
const { connect, disconnect } = require("../db");
const Event = require("../models/Event");
const events = require("./events");
const User = require("../models/User");
const users = require("./users");

db.once("open", async () => {
  try {
    // mapping participants (from User) to events
    const eventToParticipantMapper = {
      "Photography workshop by Aspire West Sussex": [
        "customerservice@ikea.com",
      ],
      "Fun Dog Show": ["customerservice@ikea.com"],
      "The Brilliant Breakfast 2021": ["customerservice@ikea.com"],
      "Cheltenham 10k 2021": [
        "jack.smith@gmail.com",
        "customerservice@ikea.com",
      ],
      "Community Tree Planting": [
        "sarah.james@gmail.com",
        "customerservice@morrisons.com",
        "living.lands@gmai.com",
      ],
      "Volunteer Litter Picking": [
        "roxette.brooks@gmail.com",
        "living.lands@gmai.com",
      ],
      "The Way Ahead": ["art.fund@gmail.com"],
    };

    //mapping events to users
    const userToEventMapper = {
      "jack.smith@gmail.com": ["Cheltenham 10k 2021"],
      "sarah.james@gmail.com": ["Community Tree Planting"],
      "roxette.brooks@gmail.com": ["Volunteer Litter Picking"],
      "art.fund@gmail.com": ["The Way Ahead"],
      "living.lands@gmai.com": [
        "Volunteer Litter Picking",
        "Community Tree Planting",
      ],
      "customerservice@morrisons.com": [
        "Community Tree Planting",
        "Volunteer Litter Picking",
      ],
      "customerservice@ikea.com": ["Cheltenham 10k 2021"],
    };

    //mapping events to users
    const eventToCreatorMapper = {
      "Photography workshop by Aspire West Sussex": "jack.smith@gmail.com",
      "Fun Dog Show": "sarah.james@gmail.com",
      "The Brilliant Breakfast 2021": "roxette.brooks@gmail.com",
      "The Way Ahead": "art.fund@gmail.com",
      "Volunteer Litter Picking": "living.lands@gmai.com",
      "Community Tree Planting": "customerservice@morrisons.com",
      "Cheltenham 10k 2021": "customerservice@morrisons.com",
    };

    // clear database
    await Event.deleteMany({});
    await User.deleteMany({});

    // seeds events
    await Event.insertMany(events);

    console.log("--- Successfully seeded events without participants ---");

    const eventsFromDb = await Event.find({});

    // seeds users
    const usersToSeed = users.map((user) => {
      const email = user.email;
      const eventsForUser = userToEventMapper[email];
      const eventIds = eventsForUser.map((eventForUser) => {
        const { id } = eventsFromDb.find((event) => {
          return event.name === eventForUser;
        });
        return id;
      });
      return {
        ...user,
        events: eventIds,
      };
    });

    await User.insertMany(usersToSeed);

    console.log("--- Successfully seeded users ---");

    const creatorsToSeed = eventsFromDb.map(async (event) => {
      const eventName = event.name;
      const creatorForEvent = eventToCreatorMapper[eventName];
      const creator = await User.findOne({ email: creatorForEvent });
      const eventIds = await Event.findByIdAndUpdate(
        event["_id"],

        {
          $set: { creator: creator["_id"] },
        }
      );
    });

    const usersFromDb = await User.find({});
    // // seeds participants
    const participantsToSeed = eventsFromDb.map((event) => {
      const eventName = event.name;
      const participantsForUser = eventToParticipantMapper[eventName];
      const participantIds = participantsForUser.map((participantForEvent) => {
        const user = usersFromDb.find((participant) => {
          return participant.email === participantForEvent;
        });

        return user["_id"];
      });

      return { eventId: event._id, participants: participantIds };
    });

    const promises = participantsToSeed.map((each) => {
      return Event.updateOne(
        { _id: each.eventId },
        { $push: { participants: { $each: each.participants } } }
      );
    });

    await Promise.all(promises);

    console.log("--- Successfully seeded participants ---");

    process.exit(0);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
});
