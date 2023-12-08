//variables
const searchbar=document.querySelector(".searchbar-container");
const profilecontainer =document.querySelector(".profile-container");
const root =document.documentElement.style;
const get =(param)=>document.getElementById(`${param}`);
const url ="https://api.github.com/users/";
const noresult = get("no-results");
const btnmode =get("btn-mode");
const modetext =get("mode-text");
const modeicon =get("mode-icon");
const btnsubmit =get("submit");
const input =get("input");
const avatar =get("avatar");
const userName =get("name");
const user =get("user");
const date =get("date");
const months =["jan","Feb","Mar","Apr", "May", "jun","Jul","Sep","Oct","Nov","Dec"];
const bio =get("bio");
const repos =get("repos");
const followers =get("followers");
const following =get("following");
const user_location =get("location");
const page =get("page");
const twitter =get("twitter");
const company =get("company");
let darkmode =false;

//Event listeners
btnsubmit.addEventListener("click",function () {
    if(input.value !==""){
        getUserData(url +input.value);
    }
});

input.addEventListener("keydown",
    function(e){
        if(e.key=="Enter"){
            if(input.value !=""){
                getUserData(url +input.value);
            }
        }
    },
    false
);
input.addEventListener("input",function(){
    noresult.style.display="none";
});

btnmode.addEventListener("click",function (){
    if(darkmode==false){
        darkmodeproperty();
    }
    else{
        lightmodeproperty();
    }
});

//FUNCTIONS

//API calls
function getUserData(gitUrl){
    fetch (gitUrl)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        updateProfile(data);
    })
    .catch((error)=>{
        throw error;
    });
}

//RENDER
function updateProfile(data){
    if(data.message !=="Not Found"){
        noresult.style.display ="none";
        function chechNull(param1,param2){
            if(param1===""|| param2===null){
                param2.style.opacity =0.5;
                param2.previousElementSibling.style.opacity=0.5;
                return false;
            }
            else{
                return true;
            }
        }
        avatar.src=`${data.avatar_url}`;
        userName.innerText =data.name ===null?data.login : data.name;
        user.innerText =`${data.login}`;
        user.href =`${data.html_url}`;
        datasegments =data.created_at.split("T").shift().split("-");
        date.innerText =`Joined ${datasegments[2]} ${months[datesegments[1] -1]} ${datasegments[0]}`;
        bio.innerText =data.bio ==null? "This profile has no bio ":`${data.bio}`;
        repos.innerText =`${data.public_repos}`;
        followers.innerText =`${data.followers};`
        following.innerText=`${data.following}`;
        user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
        page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
        page.href = checkNull(data.blog, page) ? data.blog : "#";
        twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
        twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
        company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
        searchbar.classList.toggle("active");
        profilecontainer.classList.toggle("active");
    }else {
        noresult.style.display ="block";
    }
}

//SWITCH TO DARK MODE -activatedarkmode()
function darkmodeproperty(){
    root.setProperty("--lm-bg" ,"#141D2F");
    root.setProperty("--lm-bg-content" ,"#1E2A47");
    root.setProperty("--lm-text","white");
    root.setProperty("--lm-text-all","white");
    root.setProperty("--lm-shadow-xl","rgba(70,88,109,0.15)");
    modetext.innerText="LIGHT";
    modeicon.src="images/sun-icon.svg";
    root.setProperty("--lm-icon-bg","brightness(1000%)");
    darkmode=true;
    localStorage.setItem("dark-mode",true); 
}
//SWITCH TO LIGHT MODE -activatelightmode
function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modetext.innerText = "DARK";
    modeicon.src = "images/moon-icon.svg" ;
    
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkmode = false;
    localStorage.setItem("dark-mode", false);
  }

  //INITIALIZE UI
  function init(){
    darkmode =false;

    const prefersDarkMode =widow.matchMedia && widow.matchMedia("(prefers-color-scheme:dark)").matches;
    if(localStorage.getItem("dark-mode")){
        darkmode=localStorage.getItem("dark-mode");
        darkmodeproperties();
    }
    else{
        localStorage.setItem("dark-mode",prefersDarkMode);
        darkMode=prefersDarkMode;
        lightModeProperties();
    }
    getUserData(url +"thepranaygupta");
  }

  init();