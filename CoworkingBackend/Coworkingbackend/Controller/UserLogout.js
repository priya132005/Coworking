const UserLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({
      message: "Logout successful",
      success: true,
      error: false,
      data: [],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Server error",
      success: false,
      error: true,
    });
  }
};

export default UserLogout;
