let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'',
  database:'SockChat'
});


var membres = [];

var port = process.env.PORT || 3001;
   
  http.listen(port, function(){
     console.log('listening in http://localhost:' + port);
  });


  io.on('connection', (socket) => {
  
    socket.on('disconnect', function(){
      io.emit('users-changed', {user: socket.nickname, event: 'left'});   
      membres.splice(membres.indexOf({ id: socket.id, pseudo: socket.nickname }), 1);
    });
   
    socket.on('set-nickname', (nickname) => {
      socket.nickname = nickname;
      io.emit('users-changed', {user: nickname, event: 'joined'});    
    });
    
    socket.on('add-message', (message) => {
      io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});   

    });




    socket.on('sett-nickname', (nickname) => {
      socket.nickname = nickname;
      console.log(nickname);
      io.emit('nickname-changed', {user: nickname});
    });


    socket.on('inscription',(infos)=>{
      connection.query(
        {
          sql:'SELECT * FROM membres WHERE mail=? ',
          values: [infos.mail]
        }
        ,function (error, results, fields) {
          if (error){
            throw error;
          }
          if(results.length>0){
            io.sockets.connected[socket.id].emit('status-inscription',{status: false});
          }else{
            connection.query({
              sql:'INSERT INTO membres SET ?',
              values:[{
                mail: infos.mail,
                nickname:infos.nickname,
                mdp:infos.mdp
              }]
            },
            (error, results, fields)=>{
              if (error){
                throw error;
              }
              if(results.affectedRows>0){
                io.sockets.connected[socket.id].emit('status-inscription',{status: true});
              }
            });
          }
        });
      
      
    });

      socket.on('connexion',(infos)=>{

            connection.query(
        {
          sql:'SELECT * FROM membres WHERE nickname=?',
          values: infos.nickname
        }
        ,(error, results, fields)=>{
          if (error){
            throw error;
          }
          if(results.length>0){
            if(infos.mdp==results[0].mdp){
              io.sockets.connected[socket.id].emit('status-connexion',{status: true});
              membres.push({ id: socket.id, nickname: infos.nickname});

            
          }
          else{
            io.sockets.connected[socket.id].emit('status-connexion',{status: false});

          }
          }
          else{
            io.sockets.connected[socket.id].emit('status-connexion',{status: false});

          }
        });
      });
      socket.on('getListUsers',()=>{
        io.emit('userList',{membres});
        console.log("2");
      });
      socket.on('private-message', (infos) => {
        io.to(infos.id_dest).emit('Pmessage', {text: infos.text, from: infos.pseudo, created:new Date()});
        console.log("1",infos.text, infos.id_dest);
        io.to(socket.id).emit('Pmessage', {text: infos.text, from: socket.nickname, created: new Date()});
        console.log("2",infos.text, infos.id);
      });



      socket.on('getuser',(infos)=>{

        connection.query(
    {
      sql:'SELECT nickname FROM membres',
    }
    ,(error, results, fields)=>{
      if (error){
        throw error;
      }
      else  {
              io.sockets.connected[socket.id].emit('status-getuser',{sql : results, status: true});
            }
    });
  });





    })
    