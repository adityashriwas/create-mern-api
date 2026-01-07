import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponce from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const generateAccessAndRefershTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      'something went wrong while generating refresh and access token',
    );    
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (
    [fullName, email, password].some(field => {
      if (field === undefined || field === null) {
        return true;
      }
    })
  ) {
    throw new ApiError(400, 'All fields are is required');
  }

  const existedUser = await User.findOne({
    $or: [{ email }],
  });

  if (existedUser) {
    throw new ApiError(409, 'User with email already exist');
  }

  const user = await User.create({
    fullName,
    email,
    password,
    refreshToken: null,
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  if (!createdUser) {
    throw new ApiError(500, 'something went wrong while registering a user');
  }

  return res
    .status(201)
    .json(new ApiResponce(201, createdUser, 'User registerd succesfully'));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, 'email is required');
  }

  const user = await User.findOne({
    $or: [{ email }],
  });

  if (!user) {
    throw new ApiError(404, 'User does not exist');
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid user credentials');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefershTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponce(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        'user logged in Successfully'
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      // $set:{
      //     refreshToken:undefined
      // }
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponce(200, {}, 'User logged Out'));
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, 'unauthrized request');
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, 'Invalid Refresh Token');
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, 'Refresh token is expired or used');
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefershTokens(user._id);

    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', newRefreshToken, options)
      .json(
        new ApiResponce(
          200,
          { accessToken, newRefreshToken },
          'Access token refreshed successfully'
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || 'invalid refresh token ');
  }
});

export const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, 'All fields are required');
  }

  const user = await User.findById(req.user?._id).select('+password');

  if (!user) {
    throw new ApiError(404, 'User does not exist');
  }

  const isPasswordValid = await user.isPasswordCorrect(currentPassword);

  if (!isPasswordValid) {
    throw new ApiError(400, 'Invalid password');
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponce(200, {}, 'password changed successfully'));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponce(200, req.user, 'Current user fetched successfully'));
});
