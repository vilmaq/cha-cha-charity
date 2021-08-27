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
        "bmortimer@wilty.com",
        "customerservice@ikea.com",
        "rslottc@zdnet.com",
        "kbeccerob@cbslocal.com",
        "tlea@biblegateway.com",
      ],
      "Community Tree Planting": [
        "sarah.james@gmail.com",
        "customerservice@morrisons.com",
        "living.lands@gmail.com",
        "bmortimer@wilty.com",
        "rslottc@zdnet.com",
      ],
      "Volunteer Litter Picking": [
        "roxette.brooks@gmail.com",
        "cwolfersj@salon.com",
        "omossoni@nifty.com",
        "living.lands@gmail.com",
      ],
      "The Way Ahead": [
        "rondas@gmail.com",
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
      "Pottery for Good": [
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
        "bmortimer@wilty.com",
        "rondas@gmail.com",
        "cwolfersj@salon.com",
      ],
      "MSF Scientific Day": ["rondas@gmail.com", "kbeccerob@cbslocal.com"],
      "Acorns Children's Hospice Car Boot Sale": [
        "ggillbef@nature.com",
        "rondas@gmail.com",
        "kbeccerob@cbslocal.com",
      ],
      "Bournemouth Half Marathon": [
        "rondas@gmail.com",
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
    const eventToCreatorMapper = {
      "Photography workshop by Aspire West Sussex": "jack.smith@gmail.com",
      "Fun Dog Show": "sarah.james@gmail.com",
      "The Brilliant Breakfast 2021": "roxette.brooks@gmail.com",
      "The Way Ahead": "art.fund@gmail.com",
      "Volunteer Litter Picking": "living.lands@gmail.com",
      "Community Tree Planting": "customerservice@morrisons.com",
      "Cheltenham 10k 2021": "customerservice@morrisons.com",
      "Crafts Workshop Fundraiser": "jack.smith@gmail.com",
      "Pottery for Good": "art.fund@gmail.com",
      "Muddy Dog Challenge 2021": "info@battersea.org.uk",
      "Royal Parks Foundation Half Marathon": "bmortimer@wilty.com",
      "MSF Scientific Day": "office-ldn@london.msf.org",
      "Acorns Children's Hospice Car Boot Sale": "heretohelp@bhf.org.uk",
      "Bournemouth Half Marathon": "hrhelpdesk@princes-trust.org.uk",
      "Alzheimers UK's Shine Night Walk": "general@alzheimers.co.uk",
    };

    // clear database
    await Event.deleteMany({});
    await User.deleteMany({});

    // seeds users
    const promises = users.map((user) => {
      return User.create(user);
    });

    await Promise.all(promises);

    console.log("--- Successfully seeded users ---");

    const usersFromDb = await User.find({});

    const eventsToSeed = events.map((event) => {
      const email = eventToCreatorMapper[event.name];
      const { _id: creator } = usersFromDb.find((user) => user.email === email);
      const participants = eventToParticipantMapper[event.name].map(
        (participant) => {
          const { _id } = usersFromDb.find(
            (user) => user.email === participant
          );
          return _id;
        }
      );
      return {
        ...event,
        creator,
        participants,
      };
    });

    // seeds events
    await Event.insertMany(eventsToSeed);

    console.log("--- Successfully seeded events ---");

    process.exit(0);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
});
