import { AdvertModel } from "../models/advert.js";
import { addAdvertValidator, updateAdvertVAlidator } from "../validators/advert.js";

export const addAdverts = async (req, res, next) => {
  try {
    // validate user input
    const { error, value } = addAdvertValidator.validate({
      ...req.body,
      image: req.file?.filename
    });
    if (error) {
      return res.status(422).json(error);
    }

    // Add the vendorId to the advert (assuming req.user.id contains the vendor's ID)
    const advertData = {
      ...value,
      user: req.auth.id
    };

    // write ads to the database
    await AdvertModel.create(advertData);

    // respond to request
    res.status(201).json("Advert was created!");
  } catch (error) {
    next(error);
  }
};

export const getAdverts = async (req, res, next) => {
  try {
    const { title, category, price, limit = 0, skip = 0 } = req.query;
    let filter = {};

    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }
    if (category) {
      filter.category = category;
    }
    if (price) {
      filter.price = price;
    }

    // Fetch ads and populate vendor-specific fields from the User model
    const adverts = await AdvertModel
      .find(filter)
      .populate({
        path: 'user',
        select: 'Product businessName category contactNumber' // Choose fields to populate
      })
      .limit(limit)
      .skip(skip);

    res.status(200).json(adverts);
  } catch (error) {
    next(error);
  }
};

export const getOneAdvert = async (req, res, next) => {
  try {
    const advert = await AdvertModel.findById(req.params.id);
    if (!advert) {
      return res.status(404).json({
        message: "Advert not found"
      });
    }
    res.status(200).json(advert);
  } catch (error) {
    next(error);
  }
};

export const updateAdverts = async (req, res, next) => {
  try {
    // validate the input
    const { error, value } = updateAdvertVAlidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }

    // Find the advert and ensure the vendor updating the advert is the owner
    const advert = await AdvertModel.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.auth.id
      },
      value,
      { new: true }
    );
    if (!advert) {
      return res.status(404).json({ message: "Advert not found!" });
    }

    // if (advert.user.toString() !== req.user.id) {
    //   return res.status(403).json({ message: "You are not authorized to update this advert." });
    // }

    // Update the advert
    const updatedAdvert = await AdvertModel.findByIdAndUpdate(req.params.id, value, { new: true });
    res.status(200).json('Advert has been updated!');
  } catch (error) {
    next(error);
  }
};

export const deleteAdvert = async (req, res, next) => {
  try {
    // Find the advert and ensure the vendor deleting the advert is the owner
    const advert = await AdvertModel.findById(req.params.id);
    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }

    // if (advert.vendorId.toString() !== req.user.id) {
    //   return res.status(403).json({ message: "You are not authorized to delete this advert." });
    // }

    // Delete the advert
    await AdvertModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Advert has been successfully deleted!");
  } catch (error) {
    next(error);
  }
};
