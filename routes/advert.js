import { Router } from "express";
import { addAdverts, deleteAdvert, getAdverts, getOneAdvert, updateAdverts } from "../controllers/advert-controller.js";
import { advertImageUpload } from "../middlewares/upload.js";

// create router here
const advertRouter = Router();

// routes are defined here
advertRouter.post("/adverts", advertImageUpload.single('image'), addAdverts);

advertRouter.get("/adverts", getAdverts);

advertRouter.get("/adverts/:id", getOneAdvert)

advertRouter.patch("/adverts/:id", updateAdverts);

advertRouter.delete("/adverts/:id", deleteAdvert)

// export router
export default advertRouter;