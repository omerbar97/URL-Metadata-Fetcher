"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const metadataController_1 = require("../controller/metadataController");
const router = (0, express_1.Router)();
router.post('/', metadataController_1.fetchMetadataController);
exports.default = router;
