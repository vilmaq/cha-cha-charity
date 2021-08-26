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
        "njorin@unicef.org",
        "nqueste@nba.com",
      ],
      "The Brilliant Breakfast 2021": [
        "customerservice@ikea.com",
        "tlea@biblegateway.com",
        "cwolfersj@salon.com",
        "njorin@unicef.org",
        "omossoni@nifty.com",
      ],
      "Cheltenham 10k 2021": [
        "jack.smith@gmail.com",
        "bmortimer@howstuffworks.com",
        "customerservice@ikea.com",
        "rslottc@zdnet.com",
        "kbeccerob@cbslocal.com",
        "tlea@biblegateway.com",
      ],
      "Community Tree Planting": [
        "sarah.james@gmail.com",
        "customerservice@morrisons.com",
        "living.lands@gmail.com",
        "bmortimer@howstuffworks.com",
        "rslottc@zdnet.com",
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
        "fschuler9@gmail.com",
        "art.fund@gmail.com",
        "rslottc@zdnet.com",
        "omossoni@nifty.com",
      ],
      "Crafts Workshop Fundraiser": [
        "corporate@RSPCA.org.uk",
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
      "Muddy Dog Challenge 2021": [
        "info@battersea.org.uk",
        "sarah.james@gmail.com",
        "roxette.brooks@gmail.com",
        "omossoni@nifty.com",
        "fschuler9@gmail.com",
      ],
      "Royal Parks Foundation Half Marathon": [
        "bmortimer@howstuffworks.com",
        "rsmeuinh@php.net",
        "cwolfersj@salon.com",
      ],
      "MSF Scientific Day": ["rsmeuinh@php.net", "kbeccerob@cbslocal.com"],
      "Acorns Children's Hospice Car Boot Sale": [
        "ggillbef@nature.com",
        "rsmeuinh@php.net",
        "kbeccerob@cbslocal.com",
      ],
      "Bournemouth Half Marathon": [
        "rsmeuinh@php.net",
        "rslottc@zdnet.com",
        "sarah.james@gmail.com",
      ],
      "Alzheimers UK's Shine Night Walk": [
        "kbeccerob@cbslocal.com",
        "fschuler9@gmail.com",
        "sarah.james@gmail.com",
      ],
    };

    //mapping events to users
    const userToEventMapper = {
      "jack.smith@gmail.com": [
        "Cheltenham 10k 2021",
        "Crafts Workshop Fundraiser",
        "Placeholder Event Business",
      ],
      "sarah.james@gmail.com": [
        "Community Tree Planting",
        "Muddy Dog Challenge 2021",
      ],
      "roxette.brooks@gmail.com": [
        "Volunteer Litter Picking",
        "Muddy Dog Challenge 2021",
        "Bournemouth Half Marathon",
        "Alzheimers UK's Shine Night Walk",
      ],
      "cwolfersj@salon.com": [
        "Volunteer Litter Picking",
        "Royal Parks Foundation Half Marathon",
        "The Brilliant Breakfast 2021",
      ],
      "omossoni@nifty.com": [
        "Volunteer Litter Picking",
        "Muddy Dog Challenge 2021",
        "The Way Ahead",
        "The Brilliant Breakfast 2021",
      ],
      "art.fund@gmail.com": ["The Way Ahead"],
      "rsmeuinh@php.net": [
        "The Way Ahead",
        "Bournemouth Half Marathon",
        "Royal Parks Foundation Half Marathon",
        "MSF Scientific Day",
        "Acorns Children's Hospice Car Boot Sale",
      ],
      "njorin@unicef.org": [
        "The Way Ahead",
        "The Brilliant Breakfast 2021",
        "Fun Dog Show",
      ],
      "ggillbef@nature.com": [
        "Photography workshop by Aspire West Sussex",
        "Acorns Children's Hospice Car Boot Sale",
      ],
      "nqueste@nba.com": [
        "Photography workshop by Aspire West Sussex",
        "Fun Dog Show",
      ],
      "bmortimer@howstuffworks.com": [
        "Cheltenham 10k 2021",
        "Community Tree Planting",
        "Royal Parks Foundation Half Marathon",
      ],
      "rslottc@zdnet.com": [
        "Cheltenham 10k 2021",
        "Community Tree Planting",
        "The Way Ahead",
        "Bournemouth Half Marathon",
      ],
      "kbeccerob@cbslocal.com": [
        "Cheltenham 10k 2021",
        "Alzheimers UK's Shine Night Walk",
        "MSF Scientific Day",
        "Acorns Children's Hospice Car Boot Sale",
      ],
      "tlea@biblegateway.com": [
        "Fun Dog Show",
        "The Brilliant Breakfast 2021",
        "Cheltenham 10k 2021",
      ],
      "fschuler9@gmail.com": [
        "Fun Dog Show",
        "Muddy Dog Challenge 2021",
        "Alzheimers UK's Shine Night Walk",
        "The Way Ahead",
      ],

      // charities //
      "corporate@RSPCA.org.uk": ["Crafts Workshop Fundraiser"],
      "info@battersea.org.uk": [
        "Crafts Workshop Fundraiser",
        "Muddy Dog Challenge 2021",
      ],
      "media@foe.co.uk": ["Crafts Workshop Fundraiser"],
      "enquiries@nationaltrust.org.uk": ["Crafts Workshop Fundraiser"],
      "enquiries@keepbritaintidy.org": ["Crafts Workshop Fundraiser"],
      "office-ldn@london.msf.org": ["Crafts Workshop Fundraiser"],
      "heretohelp@oxfam.org.uk": ["Crafts Workshop Fundraiser"],
      "general@alzheimers.co.uk": ["Crafts Workshop Fundraiser"],
      "news@acorns.org.uk": ["Crafts Workshop Fundraiser"],
      "heretohelp@bhf.org.uk": ["Crafts Workshop Fundraiser"],
      "info@emmausglasgow.org.uk": ["Crafts Workshop Fundraiser"],
      "office@sifafireside.co.uk": ["Crafts Workshop Fundraiser"],
      "info@theairambulanceservice.org.uk": ["Crafts Workshop Fundraiser"],
      "admin@samaritans.org": ["Crafts Workshop Fundraiser"],
      "info@mind.org.uk": ["Crafts Workshop Fundraiser"],
      "supportercare@savethechildren.org.uk": ["Crafts Workshop Fundraiser"],
      "interc@bdadyslexia.org.uk": ["Crafts Workshop Fundraiser"],
      "hrhelpdesk@princes-trust.org.uk": ["Crafts Workshop Fundraiser"],
      "info@artfund.com": ["Crafts Workshop Fundraiser"],
      "admin@jewishmuseum.org.uk": ["Crafts Workshop Fundraiser"],
      "info@shapearts.org.uk": ["Crafts Workshop Fundraiser"],
      // businesses //
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
      "Royal Parks Foundation Half Marathon": "bmortimer@howstuffworks.com",
      "MSF Scientific Day": "office-ldn@london.msf.org",
      "Acorns Children's Hospice Car Boot Sale": "heretohelp@bhf.org.uk",
      "Bournemouth Half Marathon": "hrhelpdesk@princes-trust.org.uk",
      "Cancer Research UK's Shine Night Walk": "general@alzheimers.co.uk",
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
          $set: { creator: creator },
        }
      );
    });
    const usersFromDb = await User.find({});

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

    // const creatorsToSeed = eventsFromDb.map((event) => {
    //   const eventName = event.name;
    //   const creatorForEvent = eventToCreatorMapper[eventName];
    //   const creatorId = creatorForEvent.map((creatorForEvents) => {
    //     const user = usersFromDb.find((creator) => {
    //       return creator.email === creatorForEvents;
    //     });

    //     return user["_id"];
    //   });

    //   return { eventId: event._id, creator: creatorId };
    // });
    // const promiseCreator = creatorsToSeed.map((each) => {
    //   return Event.updateOne(
    //     { _id: each.eventId },
    //     { $push: { creator: { $each: each.creator } } }
    //   );
    // });

    // await Promise.all(promiseCreator);

    console.log("--- Successfully seeded participants ---");

    process.exit(0);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
});
