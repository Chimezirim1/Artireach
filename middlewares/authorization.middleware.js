async function isAdmin(req, res, next) {
    const user = req.user;
    if (user.role === "admin") {
        next();
    } else {
        return res.status(403).send({
            status: false,
            message: "Unauthorized: Not an admin"
        })
    }
}

export default isAdmin;