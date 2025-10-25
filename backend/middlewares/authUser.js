import jwt from "jsonwebtoken"

// user authentication middleware
const authUser = async (req, res, next) => {
    try {
        // const { token } = req.headers
        const token = req.headers.token
        console.log(jwt.verify(token, process.env.JWT_SECRET))
        if (!token) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        // const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(token_decode)
        // req.userId = token_decode.id
        // console.log(req.userId)
        // next()
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.id;
            next();
        } catch (tokenError) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid token. Please login again.'
            });
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authUser;