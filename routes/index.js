var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*kibana*/
router.get('/kibana',function(req,res,next){
  res.json(
    {"responses":[{"took":0,"timed_out":false,"_shards":{"total":5,"successful":5,"failed":0},"hits":{"total":20,"max_score":0.0,"hits":[]},"status":200}]}
  );  
})
/*testdate*/
router.get('/artical',function(req,res,next){
  res.json({data:[
    {
    	t:'The Moomins are back, voiced by Taron Egerton and Kate Winslet',
      c:"Kate Winslet, Rosamund Pike and Taron Egerton are among the stars who will provide the voices for a brand new series featuring The Moomins.The beloved children's characters, which were created by Finnish author Tove Jansson, will return in 2019.Gone Girl star Pike will voice mother figure Moominmamma, while comic actor Matt Berry will be Moominpappa.",
      i:"tt001.png",
      h:"四级",
      w:159,
      r:86
    },
    {
    	t:'Apple to Release Re-designed iPhone X on 10 Year Anniversary',
      c:"Apple on Tuesday will unveil the new model of its popular iPhone, 10 years after then-CEO Steve Jobs showed the world the iPhone for the first time.Leaks of the iPhone’s design suggest it will feature a higher resolution display, wireless charging and facial recognition technology, among other improvements.The event Tuesday will take place at Apple’s “spaceship” office in California, though few actual details about the iPhone release are publicly available.",
      i:"tt002.png",
      h:"雅思 六级",
      w:322,
      r:76
    },
    {
      t:'Appl to Release Re-designed iPhone X on 10 Year Anniversary',
      c:"Apple on Tuesday will unveil the new model of its popular iPhone, 10 years after then-CEO Steve Jobs showed the world the iPhone for the first time.Leaks of the iPhone’s design suggest it will feature a higher resolution display, wireless charging and facial recognition technology, among other improvements.The event Tuesday will take place at Apple’s “spaceship” office in California, though few actual details about the iPhone release are publicly available.",
      i:"tt002.png",
      h:"雅思 六级",
      w:322,
      r:76
    },
    {
      t:'App to Release Re-designed iPhone X on 10 Year Anniversary',
      c:"Apple on Tuesday will unveil the new model of its popular iPhone, 10 years after then-CEO Steve Jobs showed the world the iPhone for the first time.Leaks of the iPhone’s design suggest it will feature a higher resolution display, wireless charging and facial recognition technology, among other improvements.The event Tuesday will take place at Apple’s “spaceship” office in California, though few actual details about the iPhone release are publicly available.",
      i:"tt002.png",
      h:"雅思 六级",
      w:322,
      r:76
    },
    {
      t:'Ap to Release Re-designed iPhone X on 10 Year Anniversary',
      c:"Apple on Tuesday will unveil the new model of its popular iPhone, 10 years after then-CEO Steve Jobs showed the world the iPhone for the first time.Leaks of the iPhone’s design suggest it will feature a higher resolution display, wireless charging and facial recognition technology, among other improvements.The event Tuesday will take place at Apple’s “spaceship” office in California, though few actual details about the iPhone release are publicly available.",
      i:"tt002.png",
      h:"雅思 六级",
      w:322,
      r:76
    },
    {
      t:'A to Release Re-designed iPhone X on 10 Year Anniversary',
      c:"Apple on Tuesday will unveil the new model of its popular iPhone, 10 years after then-CEO Steve Jobs showed the world the iPhone for the first time.Leaks of the iPhone’s design suggest it will feature a higher resolution display, wireless charging and facial recognition technology, among other improvements.The event Tuesday will take place at Apple’s “spaceship” office in California, though few actual details about the iPhone release are publicly available.",
      i:"tt002.png",
      h:"雅思 六级",
      w:322,
      r:76
    },
    {
      t:'Appleasd to Release Re-designed iPhone X on 10 Year Anniversary',
      c:"Apple on Tuesday will unveil the new model of its popular iPhone, 10 years after then-CEO Steve Jobs showed the world the iPhone for the first time.Leaks of the iPhone’s design suggest it will feature a higher resolution display, wireless charging and facial recognition technology, among other improvements.The event Tuesday will take place at Apple’s “spaceship” office in California, though few actual details about the iPhone release are publicly available.",
      i:"tt002.png",
      h:"雅思 六级",
      w:322,
      r:76
    },
    {
      t:'Appleasdsad to Release Re-designed iPhone X on 10 Year Anniversary',
      c:"Apple on Tuesday will unveil the new model of its popular iPhone, 10 years after then-CEO Steve Jobs showed the world the iPhone for the first time.Leaks of the iPhone’s design suggest it will feature a higher resolution display, wireless charging and facial recognition technology, among other improvements.The event Tuesday will take place at Apple’s “spaceship” office in California, though few actual details about the iPhone release are publicly available.",
      i:"tt002.png",
      h:"雅思 六级",
      w:322,
      r:76
    }


  ]})
})
module.exports = router;
