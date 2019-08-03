
const Service = {
  
  profilePhoto: function(req, res){
    try {
        if(req.file){
        console.log("req.file", req.file);
        }
        // let response = await Profile.findOneAndUpdate({user: req.params.id}, req.file.patchname, {new: true});
        // res.status(200).json({response});
    } catch (error) {
        res.status(400).send(error.message);
    }
  }

}

module.exports = {Service};