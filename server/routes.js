import { Router } from "express";
const router = Router();

import {
    getAll,
    postOne,
    getOneUsername,
    deleteByEmail,
    updateByEmail,
} from "../sgbd/controllers.js/index.js";

router.route("/contacts").get(getAll).post(postOne);
router.route("/contacts/:id").get(getOneUsername).delete(deleteByEmail).patch(updateByEmail);

export { router };
