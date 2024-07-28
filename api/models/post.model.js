import mongoose from 'mongoose';
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        'https://i2-prod.manchestereveningnews.co.uk/incoming/article14379834.ece/ALTERNATES/s615/050318_LRR_MEN_WomenTech.jpg',
    },
    category:{
      type: String,
      default: 'uncategorized',

    },
    slug:{
      type:String,
      required: true,
      unique: true
    },
  },
  { timestamps: true }
);
const Post = mongoose.model('Post', postSchema);

export default Post;