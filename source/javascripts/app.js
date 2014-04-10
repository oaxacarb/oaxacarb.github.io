//= require 'vendor/jquery'
//= require_tree './vendor'
//= require 'foundation'
//= require_tree './foundation'
//= require vendor/socialite

$(document).foundation();

$(document).ready(function(){
  Socialite.load("blog-social");
});
