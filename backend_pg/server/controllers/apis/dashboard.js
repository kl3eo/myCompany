'use strict';

const passport = require('passport');
const express = require('express');

const totalService = require('../../services/dashboard/total');
const onlineService = require('../../services/dashboard/online');
const activitiesService = require('../../services/dashboard/activities');

let router = express.Router();

router.get('/count', passport.authenticate('jwt', { session: false }), totalService.employeesCount);
router.get('/online', passport.authenticate('jwt', { session: false }), onlineService.onlineCount);
router.get('/activities', passport.authenticate('jwt', { session: false }), activitiesService.fetchActivities);

module.exports = router;
