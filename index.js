const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const fs=require('fs');
const port=4000;

app.use(bodyparser.urlencoded({extended:false}));
// // app.use(loginroute); 
// app.use(msgroute);
app.get('/',(req,res)=>{
    fs.readFile('username.txt',(err,data)=>{
        if(err){
            console.log(err);
            data='no chat exists';
        }
        else{
            res.send(`${data}  <form action="/" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" method="POST">
            <input type="text" id="message" name="message" placeholder="enter your message">
            <input type="hidden" id="username" name="username">
            <button type="submit">send</button>
        </form>`)
        }

    })
   
})

app.post('/',(req,res)=>{
    console.log(req.body.username);
    console.log(req.body.message);
  fs.writeFile('username.txt',`${req.body.username}:${req.body.message}`,{flag:'a'},(err)=>{
    err?console.log(err):res.redirect('/')
  })
});



app.listen(port,()=>{
    console.log(`server is listning http://localhost:${port}`);
})
