const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // console.log(req.cookies);
        const access_token = req.cookies.accessToken;
        if (access_token) {
            try {
                const decoded = jwt.verify(
                    access_token,
                    process.env.ACCESS_SECRET
                )

                req.user = decoded;
                // console.log(req.user);
                next();
            }
            catch (err) {
                console.log(err);
            }
        }
        else{
            const refresh_token = req.cookies.refreshToken;
            // console.log("refresh "+refresh_token);
            if (!refresh_token) {
                return res.status(401).json({
                    success:false,
                    message: "Please login"
                });
            }
            const decoded = jwt.verify(
                refresh_token,
                process.env.REFRESH_SECRET
            )
            // console.log(decoded.email);
            const new_access_token = jwt.sign(
                {
                    email: decoded.email
                },
                process.env.ACCESS_SECRET,
                {
                    expiresIn: "15m"
                }
            )

            //  console.log(new_access_token);
    
            res.cookie("accessToken", new_access_token, {
                httpOnly: true,
                secure: false, // true in production 
                sameSite: "lax",
                maxAge: 15 * 60 * 1000
            })
    
            req.user = decoded;
            next();
        }


    }
    catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired"
            });
        }

        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Authentication failed",
            error: err.message
        });
    }
};

module.exports = authMiddleware;