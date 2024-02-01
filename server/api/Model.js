let {ProfileSchema}=require("./Schema")
let {mongodb,app} = require("./Setup")

let ProfileModel = mongodb.model("Profile",ProfileSchema);

module.exports = {ProfileModel,ProfileSchema,mongodb,app}