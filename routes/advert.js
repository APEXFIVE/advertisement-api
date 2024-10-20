import { Router } from "express";
import { addAdverts, deleteAdvert, updateAdverts } from "../controllers/advert-controller.js";
import { advertImageUpload } from "../middlewares/upload.js";

// create router here
const advertRouter = Router();

// routes are defined here
advertRouter.post("/adverts", advertImageUpload.single('image'), addAdverts);

advertRouter.patch("/adverts/:id", updateAdverts );

advertRouter.delete("/adverts/:id", deleteAdvert)

// export router
export default advertRouter;