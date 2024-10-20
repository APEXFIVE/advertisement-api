import { AdvertModel } from "../models/advert.js";
import { addAdvertValidator, updateAdvertVAlidator } from "../validators/advert.js";

export const addAdverts = async (req, res, next) => {
  try {
      // validate user input
      const {error, value} = addAdvertValidator.validate({
        ...req.body,
        image: req.file?.filename
      });
      if (error) {
        return res.status(422).json(error);
      }
      // write ads to the database
      await AdvertModel.create(value);
      // respond to request
      res.status(201).json("Advert was created!");
  } catch (error) {
    next(error);
  };
}

export const updateAdverts = async (req, res, next) => {
   try {
    // validate the input
    const {error, value} = updateAdvertVAlidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    // write updated ads to the database
    const updatedAdvert = await AdvertModel.findByIdAndDelete(req.params.id, req.body, {
      new: true
    });
    if (!updatedAdvert) {
      return res.status(404).json({
        message: "Advert not found!"
      });
    }
    // respond to rquest
     res.status(200).json('Advert has been updated!');
   } catch (error) {
    next(error);
   }
}

export const deleteAdvert = async (req, res, next) => {
  try {
    const deletedAdvert = await AdvertModel.findByIdAndDelete(req.params.id);
    if (!deletedAdvert) {
      return res.status(404).json({
        message: "Advert not found"
      });
    }
    res.status(200).json("Advert has been succesfully deleted!")
  } catch (error) {
    next(error);
  }
};