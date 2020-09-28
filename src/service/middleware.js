const { verifyToken } = require('./autorization');

module.exports = async (req, res, next) => {
  try {
    const { headers } = req;
    if (headers.authorization) {
      const subtoken = headers.authorization.split(' ');
      if (subtoken[0] === 'Bearer') {
        const token = subtoken[1];
        const decode = await verifyToken(token);

        if (decode.data.rolecheck) {
          return res.status(402).send({
            message: 'permission denied',
          });
        }
        return next();
      }
      return res.status(401).send({
        message: 'authentication failed accept Bearer token only',
      });
    }
    return res.status(401).send({
      message: 'authentication failed',
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return res.status(401).send({
      message: 'authentication failed',
    });
  }
};
