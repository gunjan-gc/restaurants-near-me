// Studnet Name: Gunjan Chaudhary     Studnet Id: 000831804
// I acknowledge that all the work has soleley been done by me and I have not copied or shared my file with annyone

$(document).ready(function () {


    //getting user current location
    let id=navigator.geolocation.getCurrentPosition(successCallback);
    function successCallback(position){
        let lat=position.coords.latitude;
        let long=position.coords.longitude;


    $('#loc').html('Finding restaurants near you...');
    $.get(
        'https://csunix.mohawkcollege.ca/tooltime/10244/api/api.php',
        {
            //sending user latitude and longitude
            lat,
            long
        },
        function (data) {
            let response = JSON.parse(data) 
            console.log(response)
            let businesses = response.businesses 

            //text is changed according to the page contents

            $('.location').html('Found these restaurants...');
            $('#spinner').hide();             //pnce the data is received, spinner is hidden
            
            mediaData='';
            businesses.forEach((business) => {
               
                var arr=[];         //array declaration
                //loop to go through categories of each each restaurant
                for(i=0; i< (business.categories).length; i++)
                {
                     arr.push((business.categories[i]));          //adds the categories to the array
                }
    
                //function is used to store the title property of each category into the array and returns it
                function getFields(input, field){
                    var output=[];
                    for(i=0; i<input.length; i++)
                    {
                        output.push(input[i][field]);
                    }
                    return output;
                }
                
                 var result=getFields(arr, 'title');             //each restaurants titles are stored in a variable
                
                 //mediaData is the li of each restaurant
                mediaData+= '<li class="media"><img class="mr-3 mb-10" src='+ business.image_url+' style="padding-bottom:10px" width="250px" height="200px"><div class="media-body"><h5 class="mt-0 mb-1"><strong>'+business.name +'</strong><p>'+result+'<br>'+ business.location.address1 +'<br>' + business.display_phone+'</p></div></li>';
                    
                
            })
            //mediaData for each restaurant is added to .list-unstyled class of media class n (20 in our case) number 
            $('.list-unstyled').html(mediaData);
        })
    }
})