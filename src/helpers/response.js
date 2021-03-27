module.exports = {
  returnSuccessResponse: function(res, payload) {
    return res.json(payload);
  },
  returnFailResponse: function(res, err) {
    return res.status(400).json({
      "message": err,
      "code": "Failed Action"
    });
  }
}