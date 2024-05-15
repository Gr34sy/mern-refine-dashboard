import User from '../mongodb/models/user.js';

const getAllUsers = async (req, res) => {
   try {
      const sort = req.query.sort ? req.query.sort : "allProperties";
      const order = req.query.order ? req.query.order : "asc";
      const users = await User.find({}).limit(req.query._end).sort({ [sort]: order});;

      res.status(200).json(users);
   } catch (e){
      console.log(e.message);
      res.status(500).json({message: 'Failed retrieving users'});
   }
};

const createUser = async (req, res) => {
 try{
    const { name, email, avatar} = req.body;
    const userExists = await User.findOne({ email });
   
    if(userExists) return res.status(200).json(userExists);
   
    const newUser = await User.create({name, email, avatar});
   
    res.status(200).json(newUser);
 } catch (err){
    res.status(500).json({message: err.message});
 }
};

const getUserInfoByID = async (req, res) => {
  try{
   const { id } = req.params;
   const user = await User.findOne({_id: id}).populate('allProperties').populate({path: "allReviews", populate: {path: 'property'}});

   if(user){ res.status(200).json(user)}else{
      res.status(404).json({message: 'User not found'});
   };
  }catch(e){
   console.log(e.message);
   res.status(500).json({message: 'Server error'});
  }
};


export {
   getAllUsers,
   createUser,
   getUserInfoByID,
}