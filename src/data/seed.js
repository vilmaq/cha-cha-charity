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
      "Protect the rivers": ["customerservice@ikea.com"],
      "Protect the animals": ["customerservice@ikea.com"],
      "Protect the books": ["customerservice@ikea.com"],
      "Cancer Research UK": [
        "jack.smith@gmail.com",
        "customerservice@ikea.com",
      ],
      "Grand Canyon Trust": [
        "sarah.james@gmail.com",
        "customerservice@morrisons.com",
        "living.lands@gmai.com",
      ],
      "Arizona Poised to Permit Canyon Uranium Mine": [
        "roxette.brooks@gmail.com",
        "living.lands@gmai.com",
      ],
      "BUY ART, GIVE ART": ["art.fund@gmail.com"],
    };

    //mapping events to users
    const userToEventMapper = {
      "jack.smith@gmail.com": ["Cancer Research UK"],
      "sarah.james@gmail.com": ["Grand Canyon Trust"],
      "roxette.brooks@gmail.com": [
        "Arizona Poised to Permit Canyon Uranium Mine",
      ],
      "art.fund@gmail.com": ["BUY ART, GIVE ART"],
      "living.lands@gmai.com": [
        "Arizona Poised to Permit Canyon Uranium Mine",
        "Grand Canyon Trust",
      ],
      "customerservice@morrisons.com": [
        "Grand Canyon Trust",
        "Arizona Poised to Permit Canyon Uranium Mine",
      ],
      "customerservice@ikea.com": ["Cancer Research UK"],
    };

    //mapping events to users
    const eventToCreatorMapper = {
      "Protect the rivers": "jack.smith@gmail.com",
      "Protect the animals": "sarah.james@gmail.com",
      "Protect the books": "roxette.brooks@gmail.com",
      "BUY ART, GIVE ART": "art.fund@gmail.com",
      "Arizona Poised to Permit Canyon Uranium Mine": "living.lands@gmai.com",
      "Grand Canyon Trust": "customerservice@morrisons.com",
      "Cancer Research UK": "customerservice@morrisons.com",
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
      console.log("event", event);
      const eventName = event.name;
      const creatorForEvent = eventToCreatorMapper[eventName];
      const creator = await User.findOne({ email: creatorForEvent });
      console.log("creator here", creator["_id"]);
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
