const router = require("express").Router();
const controller = require("../controllers/usersController");

async function verifyGoogle(token) {
    const { OAuth2Client } = require('google-auth-library');
    const CLIENT_ID = "671272122112-k2tefs1upkgfcs3e2joi0dj5vmrdge9c.apps.googleusercontent.com"
    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });
    const userInfo = ticket.getPayload();
    const userId = userInfo.sub;
    const firstName = userInfo.given_name;
    const lastName = userInfo.family_name;
    const email = userInfo.email;
    const user = { userId, firstName, lastName, email }
    return user;
}

async function createSession(req, res, userData) {
    const user = await controller.findOrCreateUser(userData);
    req.session.user = userData; 
    res.json({userData});
}

//match /api
router.route("/signin").post((req, res) => {
    verifyGoogle(req.body.token).then(userData => {
        createSession(req, res, userData);
    }).catch(console.error);
}
);

module.exports = router;
