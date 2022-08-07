import User from "../models/user";
import Course from "../models/course";


export const makeInstructor = async(req, res) => {
    try{
        const user = await User.findById(req.user._id).exec();
        res.send("success");
    }catch(err){
        console.log(err);
    }
};

export const getAccountStatus = async(req, res) => {
    try {
        const user = await User.findById(req.user._id).exec();
        const statusUpdated = await User.findByIdAndUpdate(user._id, {
            $addToSet: {role: "Instructor"},
        }, {new: true}).exec();
        statusUpdated.password = undefined;

        res.json(statusUpdated);
    }catch(err) {
        console.log(err);
    }
}

export const currentInstructor = async(req, res) =>{
    try {
        let user = await User.findById(req.user._id).select('-password').exec();
       if(!user.role.includes("Instructor")) {
        return res.sendStatus(403);
       }else {
        res.json({ok:true});
       }
    }catch(err) {
        console.log(err);
    }
};

export const instructorCourses = async(req, res) => {
    try {
        const courses = await Course.find({instructor: req.user._id})
            .sort({createdAt: -1})
            .exec();
        res.json(courses);
    }catch(err){
        console.log(err);
    }
}

export const studentCount = async (req, res) => {
    try{
        const users = await User.find({courses: req.body.courseId}).select("_id").exec();
        res.json(users);
    }catch(err){
        console.log(err);
    }
}