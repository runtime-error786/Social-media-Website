let {mongodb,app} = require("./Setup");
let ProfileSchema = mongodb.Schema(
    {
      fname:String,
      lname:String,
      phone:String,
      email:String,
      city:String,
      country:String,
      pass:String,
      profilePic: String ,
      reelcount: {
        type: Number,
        default: 0,
      },
      tokens:[
        {
            token:String
        }
      ],
      reel:[
        {
          title:String,
          desc:String,
          link:String,
          date: {
            type: Date,
            default: Date.now,
            index: true, // Add an index on the date field
          },
        }
      ],
      sav:[
        {
          title:String,
          desc:String,
          link:String,
          date: {
            type: Date,
            index: true, // Add an index on the date field
          },
        }
      ],
      lik:[
        {
          title:String,
          desc:String,
          link:String,
          date: {
            type: Date,
            index: true, // Add an index on the date field
          },
        }
      ],
      foll:[
        {
      fname:String,
      lname:String,
      phone:String,
      email:String,
      city:String,
      country:String,
      pass:String,
      profilePic: String ,
      reelcount: {
        type: Number,
        default: 0,
      },
        }
      ],
    }
  );

module.exports ={ProfileSchema}