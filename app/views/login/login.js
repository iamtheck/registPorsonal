const Observable = require("data/observable").Observable;
const appSettings=require('application-settings')
const frameModule = require("ui/frame");
const dialogs = require("ui/dialogs")
var page

let setTings={}

let login = new Observable({
        username:'',
        password:'',
        remember:true,
})

exports.pageLoaded=(args)=>{
    page=args.object
    page=bindingContext=login
    settings = JSON.parse(appSettings.getString('settings','{}'))
    login.username=settings.username
}

exports.checkLogin=()=>{
    setTings.username=login.username
    appSettings.setString('settings', JSON.stringify(settings))
    fetch('http://192.168.40.125:3000/login', {
    method: "POST",
    headers: {
      'X-username': login.username,
      'X-password': login.password,
    },
    //  body:JSON.stringify({
    //      username:login.username,
    //      password:login.password,

    // })
  }).then(res => res.json())
    .then((res) => {
      if (!res.status || !res.code) {
        // dialogs
        return
      }
      console.log('code=' + res.code)
      // appSetting to save code
      // navigate with home room
    })

    
}