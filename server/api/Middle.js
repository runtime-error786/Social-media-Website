let jwt = require("jsonwebtoken");
let  {ProfileModel,ProfileSchema,mongodb,app} = require("./Model");

const signoutMiddleware = async (req, res, next) => {
    try {
      
      const authToken = req.cookies.Social;
      console.log(authToken);
      if (!authToken) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      // Verify and decode the token
      const decoded = jwt.verify(authToken, 'your-secret-key');
  
      // Find the user by the decoded user ID
      const user = await ProfileModel.findById(decoded._id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Remove the token from the user's token array
      user.tokens = user.tokens.filter((token) => token.token !== authToken);
  
      // Save the updated user profile
      await user.save();
  
      // Clear the cookie on the front end
      res.clearCookie('Social');
  
      next(); // Call the next middleware or route handler
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


const verifyToken = (req, res, next) => {
  const authToken = req.cookies.Social;
  console.log(authToken);
  if (!authToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(authToken, 'your-secret-key');
    req.userId = decoded._id; // Attach user ID to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



  module.exports={signoutMiddleware,verifyToken}