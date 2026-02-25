import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { OAuth2Client } from "google-auth-library";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    };
    const file = req.files?.file?.[0];
    let fileUri;
    if(file) {
      fileUri = getDataUri(file);
      // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: 'User already exist with this email.',
        success: false,
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      // profile: {
      //   profilePhoto: cloudResponse.secure_url,
      // }
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error during registration",
      success: false
    });
  }
}
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    };
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      })
    };
    // check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false
      })
    };

    const tokenData = {
      userId: user._id
    }
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }

    return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict'}).json({
      message: `Welcome back ${user.fullname}`,
      user,
      success: true
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error during login",
      success: false
    });
  }
}
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error during logout",
      success: false
    });
  }
}
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills, preferredLocations, jobTitles, workPreference } = req.body;

    // Handle resume file upload
    const resumeFile = req.files?.file?.[0];
    let resumeUploadResponse;

    if (resumeFile) {
      const resumeUri = getDataUri(resumeFile);
      resumeUploadResponse = await cloudinary.uploader.upload(resumeUri.content, { resource_type: "raw"});
    }

    // Handle profile photo upload
    const profilePhotoFile = req.files?.profilePhoto?.[0];
    let profilePhotoUploadResponse;

    if (profilePhotoFile) {
      const photoUri = getDataUri(profilePhotoFile);
      profilePhotoUploadResponse = await cloudinary.uploader.upload(photoUri.content);
    }

    let skillsArray;
    if (skills) {
      if (Array.isArray(skills)) skillsArray = skills;
      else skillsArray = String(skills).split(",").map(s => s.trim()).filter(Boolean);
    }
    let preferredLocationsArray;
    if (preferredLocations) {
      if (Array.isArray(preferredLocations)) preferredLocationsArray = preferredLocations;
      else preferredLocationsArray = String(preferredLocations).split(",").map(s => s.trim()).filter(Boolean);
    }
    let jobTitlesArray;
    if (jobTitles) {
      if (Array.isArray(jobTitles)) jobTitlesArray = jobTitles;
      else jobTitlesArray = String(jobTitles).split(",").map(s => s.trim()).filter(Boolean);
    }
    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false
      })
    }
    // updating data
    if (fullname) user.fullname = fullname
    if (email) user.email = email
    if (phoneNumber) user.phoneNumber = phoneNumber
    if (bio) user.profile.bio = bio
    if (skills) user.profile.skills = skillsArray
    if (preferredLocations) user.profile.preferredLocations = preferredLocationsArray
    if (jobTitles) user.profile.jobTitles = jobTitlesArray
    if (workPreference) user.profile.workPreference = workPreference

    // Update resume
    if (resumeUploadResponse) {
      user.profile.resume = resumeUploadResponse.secure_url;
      user.profile.resumeOriginalName = resumeFile.originalname;
    }

    // Update profile photo
    if (profilePhotoUploadResponse) {
      user.profile.profilePhoto = profilePhotoUploadResponse.secure_url;
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true
    })
  } catch (error) {
  console.log(error);
  return res.status(500).json({
    message: "Profile update failed",
    success: false
  });
}

}
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const googleLogin = async (req, res) => {
  try {
    const { token, role } = req.body;

    if (!token || !role) {
      return res.status(400).json({
        message: "Token or role missing",
        success: false
      });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    // AUTO CREATE IF NOT EXISTS
    if (!user) {
      const hashedPassword = await bcrypt.hash(email + "google", 10);

      user = await User.create({
        fullname: name,
        email,
        phoneNumber: "0000000000",
        password: hashedPassword,
        role,
        profile: {
          profilePhoto: picture
        }
      });
    }

    // CHECK ROLE
    if (user.role !== role) {
      return res.status(400).json({
        message: "Account exists with different role.",
        success: false
      });
    }

    const jwtToken = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    const safeUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    };

    return res
      .status(200)
      .cookie("token", jwtToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: false
      })
      .json({
        message: `Welcome ${safeUser.fullname}`,
        user: safeUser,
        success: true
      });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Google login failed",
      success: false
    });
  }
};