const cookieOptions = {
    maxAge: parseInt(process.env.COOKIE_EXPIRES_AT, 10),
    httpOnly: true,
    signed: true,
    path: '/'
}

module.exports = {
    cookieOptions
}