const jwt =  require("jsonwebtoken")
module.exports = async (req,res,next) => {
    try {
            const token = await req.headers.authorization.split(" ")[1]
            const decodeToken = await jwt.verify(token,"RANDOM-TOKEN")
            const user = await decodeToken
            req.user = user
            next()
      }
    catch(err) {
        res.status(401).json({
            err : new Error("Invalid request!")
        })
    }
}
