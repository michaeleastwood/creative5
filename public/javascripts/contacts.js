$(document).ready(function() {
    /*$("#deleteContacts").click(function() {
        url = "delete"
        $.ajax({
            url: url,
            type: "POST",
            data: {},
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
            }
        })
    });*/

    $("#postContact").click(function() {
        var myobj = { Name: $("#name").val(), Phone: $("#phone").val(),  Email: $("#email").val(), Address: $("#address").val() };
        jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
        var url = "contact";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
            }
        })
    });

    $("#getContacts").click(function() {
        var name = $("#query").val();
        /*if (name == ""){
            var URL = 'contact';
        }
        else{
            var URL = 'contact?q=' + name;
        }*/
        var URL = 'contact';
        console.log("URL: " + URL)
        $.getJSON('contact', function(data) {
            console.log(data);
            var everything = "<ul>";
            for (var contact in data) {
                contact = data[contact];
                everything += "<li> Name: " + contact.Name + " -- Phone Number: " + contact.Phone + " -- Email: " + contact.Email + " -- Address: " + contact.Address + "</li>";
            }
            everything += "</ul>";
            $("#contacts").html(everything);
        })
    })
});
