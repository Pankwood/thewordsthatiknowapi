function BasicAuthentication(req, res, next) {

    // Verify credentials
    if (req.headers.authorization !== process.env.BASIC_AUTH)
        return res.status(401).send('Authentication required.') // Access denied.   

    // Access granted
    next();
}

export default BasicAuthentication;