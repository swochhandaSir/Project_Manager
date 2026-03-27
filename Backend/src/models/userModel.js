import mongoose from "mongoose";

userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:Email,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true
        },
        role: {
            type:String,
            enum:["manager","member"],
            default: "member"
        },
        projects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Project"
            }
        ]
    },
    {timestamps: true}
);

export default mongoose.model("User",userSchema)