import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
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
        avatar: {
            type: String,
            default: function(){
                return `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.name}`
            }
        },
        projects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Project"
            }
        ],
        refreshTokenHash: {
            type: String,
            default: null,
        },
    },
    {timestamps: true}
);

export default mongoose.model("User",userSchema)