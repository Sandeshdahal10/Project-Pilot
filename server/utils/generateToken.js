export const generateToken = (user, statusCode, message, res) => {
  const token = user.generateToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
      ), // 7 din samma valid
      httpOnly: true, // client side bata access garna mildaina
    })
    .json({
      success: true,
      user,
      message,
      token,
    });
};
