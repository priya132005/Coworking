const UserLogout = async (req, res) => {
  try {
    const isProd = process.env.NODE_ENV === 'production';
    res.clearCookie('token', {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
    });
    res.json({
      message: 'Logout successfully',
      error: false,
      success: true,
      data: [],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Server error',
      error: true,
      success: false,
    });
  }
};

export default UserLogout;
