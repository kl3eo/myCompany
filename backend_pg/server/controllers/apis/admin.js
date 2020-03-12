'use strict';

const passport = require('passport');
const express = require('express');

const newService = require('../../services/admin/new');
const listService = require('../../services/admin/list');
const deactivateService = require('../../services/admin/deactivate');
const searchService = require('../../services/admin/search');
const profileService = require('../../services/admin/profile');

let router = express.Router();

let multer = require('multer');
let md5 = require('js-md5');

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
      	let pieces = file.originalname.split('.');

	const now = new Date()  
	const seconds_10_SinceEpoch = Math.round(now.getTime() / 10000)
	const str = md5(file.originalname + seconds_10_SinceEpoch);
	const chu1 = str.substr(0,8);
	const chu2 = str.substr(8,4);
	const chu3 = str.substr(12,4);
	const chu4 = str.substr(16,4);
	const chu5 = str.substr(20,12);
        const fileName = chu1 + '-' + chu2 + '-' + chu3 + '-' + chu4 + '-' + chu5 + '.' + pieces[pieces.length-1];
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});



router.get('/list', passport.authenticate('jwt', { session: false }), listService.list);
router.post('/new', passport.authenticate('jwt', { session: false }), newService.save);

router.post('/deactivate', passport.authenticate('jwt', { session: false }), deactivateService.deactivate);
router.post('/search', passport.authenticate('jwt', { session: false }), searchService.search);

router.get('/profile', passport.authenticate('jwt', { session: false }), profileService.get);
router.put('/update', passport.authenticate('jwt', { session: false }), profileService.update);


router.post('/profileimg', passport.authenticate('jwt', { session: false }), upload.single('profileimg'), (req, res, next) => {})

module.exports = router;
