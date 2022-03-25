
function generateSound(status){
    var listSound=document.getElementById("track");
    listSound.innerHTML="";
    console.log(listSound);
    if(!init){
        init=true;
        track=[];
        fav=[];
        for(let i=0;i<lagu.length;i++){
            track.push(lagu[i]);
        }
        /*var storedNames = JSON.parse(localStorage.getItem("fav"));
        for(let i=0;i<storedNames.length;i++){
            fav.push(storedNames[i]);
        }
        if(storedNames.length!=0){
            generateFav;
        }*/
    }
    if(status!="false"){
        console.log("status: "+status)
        for(let i=0;i<laguSub.length;i++){
            track.push(laguSub[i]);
        }
        
    }
    for(let i=0;i<track.length;i++){
    	var item = document.createElement('li');
        item.appendChild(document.createTextNode(track[i]["nama"]));
        item.id= track[i]["nama"];
        item.onclick=function(){switchLagu(track[i]["path"])};
        item.className="text-li";
        console.log(item);        
        
        var icon= document.createElement('img');
        icon.src="media/pngwing.com.png";
        icon.className="icon";
        icon.onclick=function(){favorite(track[i]["nama"])};
        item.append(icon);
        listSound.append(item);
    }   
    
    
    return track;
}
function resetdata(){
    track=[];
    fav=[];
    sub=localStorage.getItem('sub');
    generateSound(sub);
}
function generateFav(){
    var listSound=document.getElementById("fav");
    listSound.innerHTML="";
    for(let i=0;i<fav.length;i++){
    	var item = document.createElement('li');
        item.appendChild(document.createTextNode(fav[i]["nama"]));
        item.id= fav[i]["nama"];
        item.onclick=function(){switchLagu(fav[i]["path"])};
        item.className="text-li";
        console.log(item);
        
        var icon= document.createElement('img');
        icon.src="media/red-x-emoji-png-png-image-326979.jpeg";
        icon.className="icon2";
        icon.onclick=function(){unfavorite(fav[i]["nama"])};
        item.append(icon);
        listSound.append(item);
    }    
    return fav;
}
function unsub(){
    for(let i=0;i<track.length;i++){
        for(let j=0;j<laguSub.length;j++){
            if(track[i]["nama"]==laguSub[j]["nama"]){
                track.splice(i,1);
                i--;
                break;
            }
        }
    }
    for(let i=0;i<fav.length;i++){
        for(let j=0;j<laguSub.length;j++){
            if(fav[i]["nama"]==laguSub[j]["nama"]){
                fav.splice(i,1);
                i--;
                break;
            }
        }
    }   
    
    generateSound();
    generateFav();
    return track;
}
function subscribe(){
    /*if(!localStorage.getItem('sub')){
        generateSound("sub");
        localStorage.setItem('sub',true);
    }else{
        if(localStorage.getItem('sub')){
            localStorage.setItem('sub',false);
            unsub();
        }else{
            localStorage.setItem('sub',true);
            generateSound("sub");
        }
    }*/
    if(!sub){
        
        localStorage.setItem('sub',true);
        generateSound(sub);
    }else{
        unsub();      
        localStorage.setItem('sub',false);  
    }
    sub=!sub;
}
function favorite(title){
    for(let i=0;i<track.length;i++){
        if(track[i]["nama"]==title){
            fav.push(track.splice(i, 1)[0]);
            break;
        }
    }
    generateSound();
    generateFav();
    
    localStorage.setItem("fav", JSON.stringify(fav));
    return fav;
}

function unfavorite(title){
    for(let i=0;i<fav.length;i++){
        if(fav[i]["nama"]==title){
            track.push(fav.splice(i, 1)[0]);
            break;
        }
    }
    generateSound();
    generateFav();
    localStorage.setItem("fav", JSON.stringify(fav));
    return track;
}

function switchLagu(link){
    let audio=document.getElementById("audio");
    let mp3player=document.getElementById("trackplayer2");
    mp3player.src=link;

    audio.load();
}

function initNama(){
    //console.log("INIT NAMA: "+localStorage.getItem('user'))
    console.log(document.getElementById("namaUser"));
    document.getElementById("namaUser").innerHTML=localStorage.getItem('user');
    sub=localStorage.getItem('sub');
}

function logout(){
    init=false;
    unsub();
    localStorage.clear()
    document.getElementById('containerlogin').style.display = 'block';
    document.getElementById('containermain').style.display = 'none'; 
    document.getElementById('emailHelp1').textContent="We'll never share your email with anyone else."; 
}
const lagu=[{"nama":"bongo","path":"media/bongo.mp3"},{"nama":"s2","path":"media/s2.mp3"},{"nama":"Metallica - Orion","path":"media/Metallica - Orion.mp4"}];
const laguSub=[{"nama":"Coldplay - Fix You","path":"media/Coldplay - Fix You (Official Video).mp4"},{"nama":"AC_DC - Back In Black","path":"media/AC_DC - Back In Black (Official Video).mp4"},{"nama":"The Beatles - Let It Be","path":"media/The Beatles - Let It Be (Official Music Video).mp4"}];

let fav=[];
let track=[];
let init=false;
let sub=localStorage.getItem('sub');
console.log("sub status="+sub);
initNama();
generateSound(sub);
//console.log(generateSound("sub"));
//console.log(favorite("s1"));
//console.log(favorite("s3full"));
//console.log(unfavorite("s1"));
//console.log(unsub());

