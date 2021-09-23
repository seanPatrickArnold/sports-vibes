const { Post } = require("../models");

const postdata = [
  {
    title: "W3",
    post_url: "https://www.w3schools.com/images/w3schools_green.jpg",
    user_id: 1,
  },
  {
    title: "Volleyball",
    post_url: "https://m.media-amazon.com/images/I/71NSH-TidXL._AC_SL1500_.jpg",
    user_id: 2,
  },
  {
    title: "Football",
    post_url:
      "https://shop.wilson.com/media/catalog/product/cache/38/image/9df78eab33525d08d6e5fb8d27136e95/f/1/f1cc270c8ed3d2dd9ec7323cd969ba5f050ac2ab_WTF1100IDBRS_0_NFL_101_Game_Ball_Official.jpeg",
    user_id: 1,
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
