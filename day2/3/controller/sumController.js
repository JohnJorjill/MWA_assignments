module.exports = function(req,res){
    var x = 0;
    var y = 0;
    x = parseInt(req.params['x']);
    y = parseInt(req.query.y);
    res.status(200).json(x+y);
}