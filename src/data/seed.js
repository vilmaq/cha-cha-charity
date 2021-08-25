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
        "ggillbef@nature.com",
        "nqueste@nba.com",
        "customerservice@ikea.com",
      ],
      "Fun Dog Show": [
        "tlea@biblegateway.com",
        "fschuler9@gmail.com",
        "customerservice@ikea.com",
      ],
      "The Brilliant Breakfast 2021": ["customerservice@ikea.com"],
      "Cheltenham 10k 2021": [
        "jack.smith@gmail.com",
        "bmortimer@howstuffworks.com",
        "customerservice@ikea.com",
        "rslottc@zdnet.com",
        "kbeccerob@cbslocal.com",
      ],
      "Community Tree Planting": [
        "sarah.james@gmail.com",
        "customerservice@morrisons.com",
        "living.lands@gmail.com",
        "bmortimer@howstuffworks.com",
      ],
      "Volunteer Litter Picking": [
        "roxette.brooks@gmail.com",
        "cwolfersj@salon.com",
        "omossoni@nifty.com",
        "living.lands@gmail.com",
      ],
      "The Way Ahead": [
        "rsmeuinh@php.net",
        "njorin@unicef.org",

        "art.fund@gmail.com",
      ],
      "Placeholder Event Charity": [
        "corporate@pdsa.org.uk",
        "info@battersea.org.uk",
        "media@foe.co.uk",
        "enquiries@nationaltrust.org.uk",
        "enquiries@keepbritaintidy.org",
        "office-ldn@london.msf.org",
        "heretohelp@oxfam.org.uk",
        "general@alzheimers.co.uk",
        "news@acorns.org.uk",
        "heretohelp@bhf.org.uk",
        "info@emmausglasgow.org.uk",
        "office@sifafireside.co.uk",
        "info@theairambulanceservice.org.uk",
        "admin@samaritans.org",
        "info@mind.org.uk",
        "supportercare@savethechildren.org.uk",
        "interc@bdadyslexia.org.uk",
        "hrhelpdesk@princes-trust.org.uk",
        "info@artfund.com",
        "admin@jewishmuseum.org.uk",
        "info@shapearts.org.uk",
        "jack.smith@gmail.com",
      ],
      "Placeholder Event Business": [
        "jack.smith@gmail.com",
        "rgerry0@stanford.com",
        "attopic@typepad.com",
        "recycle@info.com",
        "consulting@sitrus.com",
        "info-portfolio@homecare.com",
        "marshalls@mail.com",
        "drakesplumbing@discovery.com",
        "oakley@cnn.com",
        "pinnacle@hhs.co.uk",
        "bookings@this.com",
        "brainsphereltd@gmail.com",
        "greg9@edgewire.org",
        "adominet@gmail.com",
        "inquire@miles.co.uk",
        "beacons@istockphoto.com",
        "nikorhyno@addthis.com",
        "facultycoffee@gmail.com",
      ],
      "Muddy Dog Challenge 2021": ["info@battersea.org.uk"],
      "Yaba Daba Doo": ["bmortimer@howstuffworks.com"],
      "Abra Cadabra": [],
      "Fundraiser For": [],
      "School is Cool": [],
      "Five a Day": [],
    };

    //mapping events to users
    const userToEventMapper = {
      "jack.smith@gmail.com": [
        "Cheltenham 10k 2021",
        "Placeholder Event Charity",
        "Placeholder Event Business",
      ],
      "sarah.james@gmail.com": ["Community Tree Planting"],
      "roxette.brooks@gmail.com": ["Volunteer Litter Picking"],
      "cwolfersj@salon.com": ["Volunteer Litter Picking"],
      "omossoni@nifty.com": ["Volunteer Litter Picking"],
      "art.fund@gmail.com": ["The Way Ahead"],
      "rsmeuinh@php.net": ["The Way Ahead"],
      "njorin@unicef.org": ["The Way Ahead"],
      "ggillbef@nature.com": ["Photography workshop by Aspire West Sussex"],
      "nqueste@nba.com": ["Photography workshop by Aspire West Sussex"],
      "bmortimer@howstuffworks.com": [
        "Cheltenham 10k 2021",
        "Community Tree Planting",
        "Yaba Daba Doo",
      ],
      "rslottc@zdnet.com": ["Cheltenham 10k 2021"],
      "kbeccerob@cbslocal.com": ["Cheltenham 10k 2021"],
      "tlea@biblegateway.com": ["Fun Dog Show"],
      "fschuler9@gmail.com": ["Fun Dog Show"],
      "corporate@pdsa.org.uk": ["Placeholder Event Charity"],
      "info@battersea.org.uk": [
        "Placeholder Event Charity",
        "Muddy Dog Challenge 2021",
      ],
      "media@foe.co.uk": ["Placeholder Event Charity"],
      "enquiries@nationaltrust.org.uk": ["Placeholder Event Charity"],
      "enquiries@keepbritaintidy.org": ["Placeholder Event Charity"],
      "office-ldn@london.msf.org": ["Placeholder Event Charity"],
      "heretohelp@oxfam.org.uk": ["Placeholder Event Charity"],
      "general@alzheimers.co.uk": ["Placeholder Event Charity"],
      "news@acorns.org.uk": ["Placeholder Event Charity"],
      "heretohelp@bhf.org.uk": ["Placeholder Event Charity"],
      "info@emmausglasgow.org.uk": ["Placeholder Event Charity"],
      "office@sifafireside.co.uk": ["Placeholder Event Charity"],
      "info@theairambulanceservice.org.uk": ["Placeholder Event Charity"],
      "admin@samaritans.org": ["Placeholder Event Charity"],
      "info@mind.org.uk": ["Placeholder Event Charity"],
      "supportercare@savethechildren.org.uk": ["Placeholder Event Charity"],
      "interc@bdadyslexia.org.uk": ["Placeholder Event Charity"],
      "hrhelpdesk@princes-trust.org.uk": ["Placeholder Event Charity"],
      "info@artfund.com": ["Placeholder Event Charity"],
      "admin@jewishmuseum.org.uk": ["Placeholder Event Charity"],
      "info@shapearts.org.uk": ["Placeholder Event Charity"],

      "rgerry0@stanford.com": ["Placeholder Event Business"],
      "attopic@typepad.com": ["Placeholder Event Business"],
      "recycle@info.com": ["Placeholder Event Business"],
      "consulting@sitrus.com": ["Placeholder Event Business"],
      "info-portfolio@homecare.com": ["Placeholder Event Business"],
      "marshalls@mail.com": ["Placeholder Event Business"],
      "drakesplumbing@discovery.com": ["Placeholder Event Business"],
      "oakley@cnn.com": ["Placeholder Event Business"],
      "pinnacle@hhs.co.uk": ["Placeholder Event Business"],
      "bookings@this.com": ["Placeholder Event Business"],
      "brainsphereltd@gmail.com": ["Placeholder Event Business"],
      "greg9@edgewire.org": ["Placeholder Event Business"],
      "adominet@gmail.com": ["Placeholder Event Business"],
      "inquire@miles.co.uk": ["Placeholder Event Business"],
      "beacons@istockphoto.com": ["Placeholder Event Business"],
      "nikorhyno@addthis.com": ["Placeholder Event Business"],
      "facultycoffee@gmail.com": ["Placeholder Event Business"],

      "living.lands@gmail.com": [
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
      "Volunteer Litter Picking": "living.lands@gmail.com",
      "Community Tree Planting": "customerservice@morrisons.com",
      "Cheltenham 10k 2021": "customerservice@morrisons.com",
      "Placeholder Event Charity": "jack.smith@gmail.com",
      "Placeholder Event Business": "art.fund@gmail.com",
      "Muddy Dog Challenge 2021": "info@battersea.org.uk",
      "Yaba Daba Doo": "bmortimer@howstuffworks.com",
      "Abra Cadabra": "office-ldn@london.msf.org",
      "Fundraiser For": "heretohelp@bhf.org.uk",
      "School is Cool": "hrhelpdesk@princes-trust.org.uk",
      "Five a Day": "general@alzheimers.co.uk",
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
