const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const middleware = require('./middleware');
const bmodel = require('../database/blogstore');
const model = require('../database/model')
const check = require('./check')
const sendmail = require('./mailer')
const bmail = require('./mailer')
const admindatas = require('../database/adminschema')
router.post('/login',(req,res)=>{
    const {email,password} = req.body;
    const exist = model.findOne({email},(err,data)=>{
      if(data==null)
      {
         return res.json({"message":"User Not Found"})
      }
      if(data.password!=password)
      {
        return res.json({"message":"Incorrect Password"});
      }
      let payload = {
        user:{
           id:data.id
        }
      }
      const token = jwt.sign(payload,"saiteja",{expiresIn:9999999999999},(err,token)=>{
         if(err)
         {
          res.send(err);
         }
         else
         {
             res.json({"token":token})
         }
      })
    })

    
})


router.get('/dashboard',(req,res)=>{
        console.log(req.user);
        const exist = model.findById(req.user.id,(err,data)=>{
           if(err)
           {
            return res.send({"message":"Error"})
           }
           return res.json(data);
        })
})

router.post('/register',async(req,res)=>{
      const {email,name,password,cpassword} = req.body;
      console.log(req.body)
      const exist = await model.find({email});
      console.log(exist)
      const options = {
        from:"yelagandulasaiteja70@gmail.com",
        to:email,
        subject:name + " Thank you for Registering for us!!!",
        text:"Codefriend.com CODE WANTS TO BE SIMPLE is an initiative to help the upcoming programmers with the code. Scanfcode focuses on providing the most efficient code or snippets as the code wants to be simple. We will help programmers build up concepts in different programming languages that include C, C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and Algorithm."
        
      }
      if(exist.length>0)
      {
        return res.json({"message":"User already exists"})
      }
      else
      {
       const data = new model({
            email:email,
            name:name,
            password:password,
            cpassword:cpassword
          })
          await data.save().then((r)=>{
             sendmail.sendMail(options,(err,res)=>{
             if(err)
              {
                  console.log(err);
              }
              console.log(res);
              })
              return res.send({"message":"Registration Successful"})
          })
          .catch((err)=>{
            console.log(err)
          })
      }
      
})



router.post('/posts',async(req,res)=>{
      console.log(req.body);
      const tk = req.header('token');  
      console.log(tk)
      const ids = jwt.verify(tk,"saiteja")
      const uid  = ids.user.id;
      let em;
      const {btitle,keywords,his,imglinke,imglinks} = req.body;
      if(tk!= null)
      {
           const bm = new bmodel({
                userid:uid,
                btitle:btitle,
                keywords:keywords,
                his:his,
                imglinke:imglinke,
                imglinks:imglinks,
                date:Date(Date.now()) 
          })  
          await bm.save().then((d)=>{
               return res.json({"status":"Blog posted Succesfully"})
          }).catch((err)=>{
               return res.json({"status":"Error"})
          })
      }
      else
      {
          return res.json({"message":"Error in Posting"})
      }
})

router.get('/decode/:tok',async(req,res)=>{
     const exist = jwt.verify(req.params.tok,"saiteja");
     const dat = await model.findById(exist.user.id);
     res.json(dat)
})


router.get('/get/:id',async(req,res)=>{
      const id = req.params.id;
      const dat = await model.findById(id);
      return res.send(dat);
})


router.get('/getp/:ids',async(req,res)=>{
       const ids = req.params.ids;
       console.log(ids);
       const jw = jwt.verify(ids,"saiteja");
       const idv = jw.user.id;
       const bdata = await bmodel.find({userid:idv})
       console.log(bdata);
       res.json(bdata)

})


router.put('/editprofile',middleware,(req, res) => {
      const idv = req.user;
      var password,cpassword;
      const p = model.findById(idv,(err,data)=>{
           if(err)
           {
               return res.json(err);
           }
           console.log(data.name);
          password = req.body.password;
          cpassword = req.body.cpassword;
      });
      var name = req.body.name;
      var email = req.body.email;
      var profilepic = req.body.profilepic;
      var college = req.body.college;
      var sbio = req.body.sbio;
      var linkdeinprofile = req.body.linkdeinprofile;
      model.findAndUpdate({id:idv},{$set:{
          name:name,
          email:email,
          password:password,
          cpassword:cpassword,
          profilepic:profilepic,
          college:college,
          sbio:sbio,
          linkdeinprofile:linkdeinprofile

      }},(err,data)=>{
          if(err)
          {
               res.send(err);
          }
          else
          {
               res.json(data);
          }
      })
})


router.post('/adminlogin',async(req,res)=>{
     const {email,password} = req.body;
    const exist = admindatas.findOne({email},(err,data)=>{
      if(data==null)
      {
         return res.json({"message":"Admin Not Found"})
      }
      if(data.password!=password)
      {
        return res.json({"message":"Incorrect Password"});
      }
      let payload = {
        user:{
           id:data.id
        }
      }
      const token = jwt.sign(payload,"saiteja",{expiresIn:999999999},(err,token)=>{
         if(err)
         {
          res.send(err);
         }
         else
         {
             res.json({"token":token})
         }
      })
    })

     


})

router.get('/getqy/:id',async(req,res)=>{ 
    const ids = req.params.id;
    const exist = bmodel.findById(ids,(err,data)=>{
      if(err)
      {
          return res.json({"message":"Internal server Error"})
      }
      return res.json(data);
    })
})

router.get('/getmore/:ids',(req,res)=>{
   const ids = req.params.ids;
   const ex = model.findById(req.params.ids,(err,data)=>{
        if(err)
        {
          return res.json("error")
        }
        return res.json(data);
   })
})


router.get('/public',(req,res)=>{
      const id = req.params.id;
      
})
router.get('/getblogs',async(req,res)=>{
  const bdata = await bmodel.find({});
  return res.json(bdata);
})
router.get('/getpubl',async(req,res)=>{
  const usersno = await model.find({});
  const bdata = await bmodel.find({})
  var noblogs = bdata.length;
  var usern = usersno.length;
  return res.json({"users":usern,"blogs":noblogs})
})




router.get('/searchblog/:s',async(req,res)=>{
     const sea = req.params.s;
     console.log(req.params.s)
     const bdata = await bmodel.find({btitle:sea})
     return res.json(bdata);
})

module.exports = router;