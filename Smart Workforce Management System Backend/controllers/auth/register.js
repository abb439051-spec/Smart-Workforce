const UsersModel = require('../../models/Users.model');
const registerValidation = require('../../services/validation/validation_schema')
const accountCreate = async (req, res) => {
    const registerDetails = await registerValidation.validateAsync(req.body);
    const {email,password,name} = registerDetails
    console.log("registerDetails", registerDetails);

    const checkRegisterDetails = await UsersModel.findOne({
        userEmail:email,
    })
    console.log("checkRegisterDetails",checkRegisterDetails)
    if(checkRegisterDetails){
        return res.status(400).json({ 
        message: "Email Already Exists!!", 
        success: false
    })
    }
    const saveRegisterDetails = new UsersModel({
        userEmail:email,
        password:password,
        name:name,
    })
    await saveRegisterDetails.save()
    return res.status(200).json({ 
        message: "User Created Successfully!!", 
        success: true 
    });
};

module.exports = accountCreate;
