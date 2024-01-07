const jwt = require("jsonwebtoken")
const key = "krayzen";
const authenticate = async (req, res, next) => {
    let token = req.headers.authorization
    // console.log({token});
    // res.send(token)
    if (!token) {
        res.send("Token is Missing Please Login First")
    }
    else {
        try {
            let verification = jwt.verify(token, key)
            if (verification) {
                // res.send(verification)
                console.log("verification", verification)
                req.body.userId = verification.userId
                next()
            } else {
                res.send("Please Login First")
            }
        } catch (e) {
            res.send(e.message)
        }

    }

}
module.exports = {
    authenticate
};