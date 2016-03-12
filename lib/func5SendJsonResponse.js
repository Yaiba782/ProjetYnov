/**
 * Created by alex on 12/03/16.
 */
module.exports = function sendJsonResponse (res, status, content) {
    res.status(status);
    res.json(content);
};

