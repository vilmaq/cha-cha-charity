const { connect, disconnect } = require("../db");
const Event = require("../models/Event");
const events = require("./events");
const User = require("../models/User");
const users = require("./users");

const init = async () => {
  await connect();

  // mapping participants (from User) to events
  const eventToParticipantMapper = {
    "Protect the rivers": ["customerservice@ikea.com"],
    "Protect the animals": ["customerservice@ikea.com"],
    "Protect the books": ["customerservice@ikea.com"],
    "Cancer Research UK": ["jack.smith@gmail.com", "customerservice@ikea.com"],
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

  // clear database
  await Event.deleteMany({});
  await User.deleteMany({});

  // seeds events
  await Event.insertMany(events);

  console.log("--- Successfully seeded events without participants ---");

  const eventsFromDb = await Event.find({});

  // seeds users
  const usersToSeed = users.map((user) => {
    const email = user.user.email;
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

  const usersFromDb = await User.find({});
  console.log("userFromDb");

  // // seeds participants
  const participantsToSeed = eventsFromDb.map((event) => {
    const eventName = event.name;
    const participantsForUser = eventToParticipantMapper[eventName];
    // console.log(participantsForUser);
    const participantIds = participantsForUser.map((participantForEvent) => {
      const user = usersFromDb.find((participant) => {
        return participant.user.email === participantForEvent;
      });

      return user["_id"];
    });

    return { eventId: event._id, participants: participantIds };
  });

  const promises = participantsToSeed.map((each) => {
    console.log("each:", each);
    Event.updateOne(
      { _id: each.eventId },
      { $push: { participants: [...each.participants] } }
    );
  });
  await Promise.all(promises);

  console.log("--- Successfully seeded participants ---");

  // seeds users

  // const usersToSeed = users.map((user) => {
  //   const email = user.contact.email;
  //   const eventsForUser = userToEventMapper[email];
  //   const eventIds = eventsForUser.map((eventForUser) => {
  //     const { id } = eventsFromDb.find((event) => {
  //       return event.name === eventForUser;
  //     });
  //     return id;
  //   });
  //   return {
  //     ...user,
  //     events: eventIds,
  //   };
  // });

  // console.log(usersToSeed);
  // await User.insertMany(usersToSeed);

  // console.log("--- Successfully seeded users ---");

  await disconnect();
};

init();
