import SpaceModel from '../Models/SpaceModel.js';

// @route   GET /api/spaces
// @desc    Public - list all active spaces with optional filters
export const getAllSpaces = async (req, res) => {
  try {
    const { city, category, search, minPrice, maxPrice } = req.query;

    const filter = { isActive: true };

    if (city) filter.city = { $regex: city, $options: 'i' };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.pricePerHour = {};
      if (minPrice) filter.pricePerHour.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerHour.$lte = Number(maxPrice);
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const spaces = await SpaceModel.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Spaces fetched successfully',
      data: spaces,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Server error',
      error: true,
      success: false,
    });
  }
};

// @route   GET /api/spaces/admin/all
// @desc    Admin - list all spaces including inactive ones
export const getAllSpacesAdmin = async (req, res) => {
  try {
    const spaces = await SpaceModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Spaces fetched successfully',
      data: spaces,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Server error',
      error: true,
      success: false,
    });
  }
};

// @route   GET /api/spaces/:id
export const getSpaceById = async (req, res) => {
  try {
    const space = await SpaceModel.findById(req.params.id);

    if (!space) {
      return res.status(404).json({
        message: 'Space not found',
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: 'Space fetched successfully',
      data: space,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Server error',
      error: true,
      success: false,
    });
  }
};

// @route   POST /api/spaces  (admin only)
export const createSpace = async (req, res) => {
  try {
    const { name, description, category, city, address, pricePerHour, capacity, amenities } = req.body;

    if (!name || !description || !city || !address || !pricePerHour || !capacity) {
      return res.status(400).json({
        message: 'Please provide name, description, city, address, pricePerHour and capacity',
        error: true,
        success: false,
      });
    }

    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(
        (file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
      );
    }

    let parsedAmenities = [];
    if (amenities) {
      parsedAmenities = Array.isArray(amenities)
        ? amenities
        : amenities.split(',').map((a) => a.trim()).filter(Boolean);
    }

    const space = await SpaceModel.create({
      name,
      description,
      category,
      city,
      address,
      pricePerHour: Number(pricePerHour),
      capacity: Number(capacity),
      amenities: parsedAmenities,
      images,
      createdBy: req.userID,
    });

    res.status(201).json({
      message: 'Space created successfully',
      data: space,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Server error',
      error: true,
      success: false,
    });
  }
};

// @route   PUT /api/spaces/:id  (admin only)
export const updateSpace = async (req, res) => {
  try {
    const { name, description, category, city, address, pricePerHour, capacity, amenities, isActive } = req.body;

    const space = await SpaceModel.findById(req.params.id);
    if (!space) {
      return res.status(404).json({
        message: 'Space not found',
        error: true,
        success: false,
      });
    }

    if (name !== undefined) space.name = name;
    if (description !== undefined) space.description = description;
    if (category !== undefined) space.category = category;
    if (city !== undefined) space.city = city;
    if (address !== undefined) space.address = address;
    if (pricePerHour !== undefined) space.pricePerHour = Number(pricePerHour);
    if (capacity !== undefined) space.capacity = Number(capacity);
    if (isActive !== undefined) space.isActive = isActive === 'true' || isActive === true;
    if (amenities !== undefined) {
      space.amenities = Array.isArray(amenities)
        ? amenities
        : amenities.split(',').map((a) => a.trim()).filter(Boolean);
    }

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(
        (file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
      );
      space.images = [...space.images, ...newImages];
    }

    await space.save();

    res.status(200).json({
      message: 'Space updated successfully',
      data: space,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Server error',
      error: true,
      success: false,
    });
  }
};

// @route   DELETE /api/spaces/:id  (admin only)
export const deleteSpace = async (req, res) => {
  try {
    const space = await SpaceModel.findByIdAndDelete(req.params.id);

    if (!space) {
      return res.status(404).json({
        message: 'Space not found',
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: 'Space deleted successfully',
      data: space,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Server error',
      error: true,
      success: false,
    });
  }
};
