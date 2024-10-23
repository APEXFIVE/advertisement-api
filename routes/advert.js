import { Router } from "express";
import { addAdverts, deleteAdvert, getAdverts, getOneAdvert, updateAdverts } from "../controllers/advert-controller.js";
import { advertImageUpload } from "../middlewares/upload.js";
import { isAuthenticated } from "../middlewares/auth.js";

// create router here
const advertRouter = Router();

// routes are defined here
advertRouter.post("/adverts", isAuthenticated, advertImageUpload.single('image'), addAdverts);

advertRouter.get("/adverts", getAdverts);

advertRouter.get("/adverts/:id", getOneAdvert)

advertRouter.patch("/adverts/:id", isAuthenticated,  updateAdverts);

advertRouter.delete("/adverts/:id", deleteAdvert)

// export router
export default advertRouter;