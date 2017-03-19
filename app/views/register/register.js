var page
const Observable = require("data/observable").Observable;
var frameModule = require("ui/frame");
const dialogs = require("ui/dialogs")
var camera = require("nativescript-camera");
var imageModule = require("ui/image");
var bghttp = require("nativescript-background-http");

let pageData = new Observable({
        pcode:'',
        pname:'',
        school:'',
        username:'',
        password:'',
        picture:'',
})

exports.pageLoaded=((args)=>{
    camera.requestPermissions()
    page=args.object
    page.bindingContext=pageData
    
})

exports.saveData=()=>{
   
    //upload image
        var session = bghttp.session("image-upload");
        var request = {
            url: "http://192.168.8.33:3000/upload",
            method: "POST",
            headers: {
                'X-pcode': pageData.pcode,
            },
            description: "{ 'uploading': 'bigpig.jpg' }"
        }

        var task = session.uploadFile(img.android, request);

        task.on("progress", logEvent);
        task.on("error", ()=>{

        })
        task.on("complete", ()=>{
            console.log('UPLOAD DONE')
        })

        function logEvent(e) {
            console.log(e.eventName);
        }
}

exports.takePicture=()=>{
    var opt = { 
        width: 300, 
        height: 300, 
        keepAspectRatio: true, 
        saveToGallery: true,
    }
    camera.takePicture(opt).then((img)=>{
        let myPhoto=page.getViewById('photo')
        myPhoto.src=img
    }).catch((e)=>{
        camera.requestPermissions()
        console.dump('error')
        console.dumo(e)
    })
}