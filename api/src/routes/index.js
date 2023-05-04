const { Router } = require("express");

const { dogsRouter, temperamentRouter } = require("./Router.js");

const router = Router();

router.use("/dogs", dogsRouter);
router.use("/temperaments", temperamentRouter);

module.exports = router;
