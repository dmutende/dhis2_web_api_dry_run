console.log(setAuth (AUTHORIZATION_BASIC, 'workforce:Protocol1'));

    // check if the loogin is set to 1
    if (!sessionStorage.getItem('loggedIn') || sessionStorage.getItem('loggedIn') == 0) {
        // $("input[name='url']").val('http://test.hiskenya.org');
        $("#login-modal").modal('show');

    } else {
        alert("yaay");
    }


    $("form[name='login-form']").on('submit', function (e) {
        e.preventDefault();
        
        var username = $("input[name='username']").val();
        var password = $("input[name='password']").val();
        var link = $("input[name='url']").val();


        var ajaxConfig = {
            async : true,
            url : link + "/uaa/oauth/token",
            method :'GET',
            data : {
                paging : "false",
                assumeTrue : "false",
                organisationUnits:"true",
                lastUpdated : "2014-08-01",
            },
            dataType : "json",
            contentType : CONTENT_TYPE_APPLICATION,
            headers : { "Authorization" : setAuth (AUTHORIZATION_BEARER, "d1fea597-9c67-4fca-9721-433d551efd35") },
            loaderId : "loader",
            loaderSize : 20,
            callback : function (response, ajaxConfig) {
                //Storage.clear();
                Storage.write ("data", response)
                Storage.read("data", ajaxConfig, function (res,ajaxConfig) {
                    console.log(res);
                });
                
            }

        }

        


        dhis2ApiPost(ajaxConfig);


    })