let  {ProfileModel,ProfileSchema,mongodb,app} = require("./api/Model");
const bcrypt = require("bcryptjs");
const multer = require("multer");
let jwt = require("jsonwebtoken");
const { signoutMiddleware,verifyToken } = require("./api/Middle");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "Uploads"); // Destination folder for uploaded images
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`); // Unique filename
    },
  });
  
  const upload = multer({ storage });

  app.post("/signup", upload.single("profileImage"), async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        city,
        country,
        password,
      } = req.body;
  
      // Check if the email already exists in the database
      const existingProfile = await ProfileModel.findOne({ email });
  
      if (existingProfile) {
        // Email is already registered
        return res.status(400).json({ error: "Email is already registered" });
      }
  
      // Hashing the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Creating a new profile instance
      const newProfile = new ProfileModel({
        fname: firstName,
        lname: lastName,
        email: email,
        phone: phone,
        city: city,
        country: country,
        pass: hashedPassword,
        profilePic: req.file.filename, // Save the path to the uploaded image
      });
  
      // Saving the profile to the database
      const savedProfile = await newProfile.save();
  
      res.status(201).json({ message: "Profile created successfully", savedProfile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get('/signin', async (req, res) => {
    const { email, password } = req.query;
    console.log("signin",email)
    try {
      // Find the user by email
      const user = await ProfileModel.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'Wrong credentials' });
      }
  
      // Compare the password
      const isPasswordMatch = await bcrypt.compare(password, user.pass);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ error: 'Wrong credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ _id: user._id }, 'your-secret-key');
  
      // Save the token in the user's profile
      user.tokens = user.tokens.concat({ token });
      await user.save();
      res.cookie('Social', token, { httpOnly: true });
      res.status(200).json({ message: 'Successfully signed in', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post("/signout",signoutMiddleware);

  app.get('/profile', verifyToken, async (req, res) => {
    console.log("s");
  const userId = req.userId;
  try {
    const user = await ProfileModel.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create an absolute URL for the profile picture
    const profilePicUrl = user.profilePic ? `http://localhost:2001/Uploads/${user.profilePic}` : null;
    
    // Include the profile picture URL in the response
    const responseData = {
      user: {
        ...user.toObject(),
        profilePicUrl,
      },
    };
    console.log(responseData);
    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/updateprofile', upload.single('profilePic'), async (req, res) => {
  const { email, fname, lname, phone, city, country } = JSON.parse(req.body.userData);
  const profilePic = req.file;

  try {
    // Prepare the data to update
    const updatedData = {
      fname,
      lname,
      phone,
      city,
      country,
    };

    // If a new profile picture is uploaded, update its URL
    if (profilePic) {
      updatedData.profilePic = req.file.filename;
    }

    // Update the user profile based on the provided data
    await ProfileModel.updateOne({ email }, { $set: updatedData });

    // Fetch and return the updated user profile
    const updatedUser = await ProfileModel.findOne({ email });
    res.json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user profile' });
  }
});

app.post('/post', verifyToken, upload.single('profileImage'), async (req, res) => {
  const userId = req.userId;

  try {
    // Find the user by userId
    const user = await ProfileModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract data from the request body
    const { title, desc } = req.body;

    // Create a new post object
    const newPost = {
      title,
      desc,
      link: req.file.filename, // Assuming multer gives a filename
    };

    // Add the new post to the user's reel array
    user.reel.push(newPost);

    user.reelcount = user.reelcount + 1;
    // Save the updated user data
    await user.save();

    res.status(200).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/reels', async (req, res) => {
  try {
    const searchTerm = req.query.search;
    const sortAscending = req.query.sort === 'true';
    const currentPage = parseInt(req.query.current) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10; // You can adjust the default pageSize

    // Fetch all profiles with their reels
    const profiles = await ProfileModel.find({}, 'reel');

    // Extract reels from each profile that match the search term
    const matchingReels = profiles.reduce((reels, profile) => {
      const matchingProfileReels = profile.reel.filter((reel) =>
        reel.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return reels.concat(matchingProfileReels);
    }, []);

    // Sort the reels by date using MongoDB query
    const sortedReels = matchingReels.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortAscending) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    // Paginate the results
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    const paginatedReels = sortedReels.slice(startIndex, endIndex);

    res.status(200).json({
      reels: paginatedReels,
      current: currentPage,
      totalPage: Math.ceil(sortedReels.length / pageSize),
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/check',verifyToken, async (req, res) => {
  try {
    console.log("ssddss");
    const { reelId } = req.body;
    const userId = req.userId;
    
    const user = await ProfileModel.findOne({
      _id: userId,
      'sav._id': reelId,
    });
    console.log("userrr",user)
    res.json({ isSaved: !!user });
  } catch (error) {
    console.error('Error checking saved status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/checkl',verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    const { reelId } = req.body;
    const userId = req.userId;

    const user = await ProfileModel.findOne({
      _id: userId,
      'lik._id': reelId,
    });

    res.json({ islike: !!user });
  } catch (error) {
    console.error('Error checking saved status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/save', verifyToken, async (req, res) => {
  try {
    const { reelId, isSaved } = req.body;
    const userId = req.userId;

    console.log("Receiving request to save/retrieve reel with ID:", reelId, "and isSaved:", isSaved);

    // Find the user based on the user ID
    const user = await ProfileModel.findById(userId);

    console.log("User's saved reels:", user.sav);

    // Check if the reelId is present in the sav array
    const isReelSaved = user.sav.some(savedReel => savedReel._id.toString() === reelId);

    console.log("Is reel already saved?", isReelSaved);

    if (isSaved && !isReelSaved) {
      // If isSaved is true and the reel is not saved, add the reelId to the sav array
      user.sav.push(reelId);
    } else if (!isSaved && isReelSaved) {
      // If isSaved is false and the reel is saved, remove the reelId from the sav array
      user.sav = user.sav.filter(savedReelId => savedReelId._id.toString() !== reelId);
    }

    console.log("Updated sav array:", user.sav);

    // Save the updated user object
    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving/releasing reel:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/like', verifyToken, async (req, res) => {
  try {
    const { reelId, isSaved } = req.body;
    const userId = req.userId;

    console.log("Receiving request to save/retrieve reel with ID:", reelId, "and isSaved:", isSaved);

    // Find the user based on the user ID
    const user = await ProfileModel.findById(userId);

    console.log("User's saved reels:", user.sav);

    // Check if the reelId is present in the sav array
    const isReelSaved = user.lik.some(savedReel => savedReel._id.toString() === reelId);

    console.log("Is reel already saved?", isReelSaved);

    if (isSaved && !isReelSaved) {
      // If isSaved is true and the reel is not saved, add the reelId to the sav array
      user.lik.push(reelId);
    } else if (!isSaved && isReelSaved) {
      // If isSaved is false and the reel is saved, remove the reelId from the sav array
      user.lik = user.lik.filter(savedReelId => savedReelId._id.toString() !== reelId);
    }

    console.log("Updated sav array:", user.sav);

    // Save the updated user object
    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving/releasing reel:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/profile1', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { search } = req.query; 
    console.log("sd",search);
    const query = {
      _id: { $ne: userId }, // Exclude the profile of the current user
      fname: { $regex: new RegExp(search, 'i') }
    }
    const profiles = await ProfileModel.find(query);
    res.json({ profiles });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/profile2', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    let { Id } = req.query;
    // Remove colon from Id if present
    Id = Id.replace(':', '');
    const profiles = await ProfileModel.findOne({ _id: Id }).select('fname lname phone email country pass profilePic tokens reel sav lik foll reelcount');
    console.log(profiles);
    res.json({ profiles });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/profile3', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Find the user's profile document
    const userProfile = await ProfileModel.findOne({ _id: userId }).select('sav reel');

    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    // Initialize an empty array to store the reel objects
    const reelsArray = [];

    // Iterate over the sav array IDs
    for (const savItem of userProfile.sav) {
      // Search for the sav ID in the reel array of all documents
      const reels = await ProfileModel.find({ 'reel._id': savItem._id }).select('reel');

      // Iterate over the reel array of each document
      reels.forEach(doc => {
        doc.reel.forEach(reelItem => {
          // If the ID matches, push the reel object into the reelsArray
          if (reelItem._id.toString() === savItem._id.toString()) {
            reelsArray.push(reelItem);
          }
        });
      });
    }

    console.log("00000000000000000000000000000",userProfile.reel.length);
    res.json({ reelsArray, reelCount: userProfile.reel.length });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/cx', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Find the user's profile document
    const userProfile = await ProfileModel.findOne({ _id: userId }).select('sav reel foll');

    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    console.log("User Profile:", userProfile); // Log the userProfile object

    // Check if the reel array exists in the userProfile object
    if (!userProfile.reel) {
      console.log("Reel array not found in userProfile");
      return res.status(404).json({ error: 'Reel array not found in userProfile' });
    }

    console.log(userProfile,"Reel Array Length:", userProfile.foll.length); // Log the length of the reel array

    res.json({ reelCount: userProfile.foll.length });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





app.post('/checkf', verifyToken, async (req, res) => {
  try {
    const { reelId } = req.body;
    const userId = req.userId;
    console.log("----------------------",reelId);
    // Find a user where the fol array contains an object with the given reelId
    const user = await ProfileModel.findOne({
      _id: userId,
      'foll._id': reelId,
    });

    // If user is not null, it means the reelId is present in the fol array
    const isSaved = !!user;
  
    res.json({ isSaved });
  } catch (error) {
    console.error('Error checking saved status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/savef', verifyToken, async (req, res) => {
  try {
    const { folId, isSaved } = req.body;

    // Find the user based on the current user ID
    const userId = req.userId;
    const user = await ProfileModel.findById(userId);

    // Ensure the foll array is initialized
    if (!user.foll) {
      user.foll = [];
    }

    // Check if the folId is already present in the foll array
    const followIndex = user.foll.findIndex(follow => follow._id.toString() === folId);

    if (isSaved && followIndex === -1) {
      // Add the folId to the foll array if it's not already present
      user.foll.push({ _id: folId });
    } else if (!isSaved && followIndex !== -1) {
      // Remove the folId from the foll array if it's present and isSaved is false
      user.foll.splice(followIndex, 1);
    }

    // Save the updated user object
    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving/releasing follow:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/cy', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Find the user's profile document
    const userProfile = await ProfileModel.findOne({ _id: userId }).select('sav reel foll reelcount');

    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    // Array to store details of followers
    const followersDetails = [];

    // Loop through the followers array
    for (const followerId of userProfile.foll) {
      // Find the follower's profile document
      const followerProfile = await ProfileModel.findOne({ _id: followerId });

      // If follower's profile found, add details to followersDetails array
      if (followerProfile) {
        followersDetails.push({
          followerProfile
        });
      }
    }

    console.log("Followers Details:", followersDetails);

    res.json({ userProfile, followersDetails });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/savep', verifyToken, async (req, res) => {
  try {
    console.log("ss666s")
    const { folId } = req.body;
    let isSaved=false;
    // Find the user based on the current user ID
    const userId = req.userId;
    const user = await ProfileModel.findById(userId).select("foll");

    // Ensure the foll array is initialized
    if (!user.foll) {
      user.foll = [];
    }

    // Check if the folId is already present in the foll array
    const followIndex = user.foll.findIndex(follow => follow._id.toString() === folId);

    if (isSaved && followIndex === -1) {
      // Add the folId to the foll array if it's not already present
      user.foll.push({ _id: folId });
    } else if (!isSaved && followIndex !== -1) {
      // Remove the folId from the foll array if it's present and isSaved is false
      user.foll.splice(followIndex, 1);
    }

    // Save the updated user object
    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving/releasing follow:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/role', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Find the user's profile document
    const userProfile = await ProfileModel.findOne({ _id: userId }).select('sav reel foll reelcount');

    if (!userProfile) {
      res.json({f:"Gue"});
    }

    res.json({ f:"Cus" });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/delete', (req, res) => {
  // Clear the cookie by setting its value to an empty string and setting its expiration date to a past date
  res.clearCookie("Social");
  console.log("hello");
  // Send a response to indicate successful deletion
  res.status(200).json({ message: 'Cookie deleted successfully' });
});

app.listen(2001, () => {
    console.log(`Server is running on http://localhost2001`);
  });