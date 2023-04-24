console.log("start");
import "./vendor/jquery";
import "./vendor/jquery.cookie";
import "./vendor/fastclick";
import "./vendor/modernizr";
import "./vendor/placeholder";
import "./foundation";
import "./vendor/socialite";

$(document).foundation();

$(document).on("ready", function () {
  Socialite.load("blog-social");
});
console.log("end");
