    // check if the loogin is set to 1
    if (!sessionStorage.getItem('loggedIn') || sessionStorage.getItem('loggedIn') == 0) {
        // $("input[name='url']").val('http://test.hiskenya.org');
        $("#login-modal").modal('show');

    }


    $("form[name='login-form']").on('submit', function (e) {
        e.preventDefault();
        
        var username = $("input[name='username']").val();
        var password = $("input[name='password']").val();
        var link = $("input[name='url']").val();
        var api_app = {};

        // make a request to get the client id and secret
        $.ajax({
            dataType:'json',
            url : 'https://rapando.co.ke/api.json',
            method: 'GET',
            success : function (res) {
                api_app = res;
                api_auth = res.clientId + ":" + res.secret;
               

                // send the login request from here
                $.ajax({
                    dataType : 'json',
                    type : 'GET',
                    url : link + "/uaa/oauth/token",

                    data : {
                        "grant_type" : "password",
                        "username"   : username,
                        "password" : password
                    },
                    headers : {
                        'Authorization' : setAuth (AUTHORIZATION_BASIC, api_auth),
                        'Accept' : 'application/json'
                    },
                    success  : function (res) {
                        console.log(res);
                    },
                    error : function () {
                        console.log("error occured on login");
                    }
                })

            },
            error : function() {
                // error getting the api details
            }
        })

    })