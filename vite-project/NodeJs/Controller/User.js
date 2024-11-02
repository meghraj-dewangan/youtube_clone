import User from "../Model/User.js";
 import bcrypt from "bcrypt";
 import jwt from "jsonwebtoken";

// Register User
export const register = async (req, res) => {
   const {username,email,password,avatar} = req.body;
   try{
    const hashedPass = await bcrypt.hash(password,10);
    const user = new User({avatar,username,email,password:hashedPass});
    await user.save();
    res.json({message:'User registed successfully'});

   } catch(error){
    res.status(500).json({message:'Error registering user'})
   }
};

// Log in user
export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not Found" });
        }

         // Check for missing fields
         if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).json({ message: "Invalid Credentials" });

        const token = jwt.sign({ _id: user._id }, "SecretKey", { expiresIn: '30m' });

        return res.status(200).json({ token, username: user.username, email: user.email,message:"Login Successfull" });
    } catch (err) {
        return res.status(500).json({ message: "Server error, please try again later" });
    }
};


// Controller to get username by email
export const getUsernameByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ username: user.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};


// Controller to get user details by email
export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

      
        const { password, ...userDetails } = user.toObject();
        
        res.status(200).json(userDetails); // Return user details without password
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};


// Controller function to get all user details
 export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from the database
      res.status(200).json(users); // Send the user details in response
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
  };