$.ajax({
    url : "js/acme.json",
    dataType:"json",
    success: function(data){
        console.log(data);



        $('.nav-anvils').click(function(){
            $(this).data('clicked', true);

            if($('.nav-anvils').data('clicked')) {
                document.title = 'Anvil | ACME.com';
                $( "#index" ).hide();

                $("#name").html(data.Anvils.name);
                $("#pic").html('<img id="anv-img" src="' + data.Anvils.path + '" alt="acme anvil">');
                $("#summary").html(data.Anvils.description);
                $("#made").html('<h4>Made By:</h4> ' + data.Anvils.manufacturer);
                $("#stars").html('<h4>Reviews:</h4> ' + data.Anvils.reviews + ' stars');
                $("#price").html('<h4>Price:</h4> $' + data.Anvils.price);
            }

        });


        $('.nav-explosives').click(function(){
            $(this).data('clicked', true);

            if($('.nav-explosives').data('clicked')) {
                document.title = 'Explosives | ACME.com';
                $( "#index" ).hide();

                $("#name").html(data.Explosives.name);
                $("#pic").html('<img id="anv-img" src="' + data.Explosives.path + '" alt="acme explosives">');
                $("#summary").html(data.Explosives.description);
                $("#made").html('<h4>Made By:</h4> ' + data.Explosives.manufacturer);
                $("#stars").html('<h4>Reviews:</h4> ' + data.Explosives.reviews + ' stars');
                $("#price").html('<h4>Price:</h4> $' + data.Explosives.price);
            }

        });


        $('.nav-decoys').click(function(){
            $(this).data('clicked', true);

            if($('.nav-decoys').data('clicked')) {
                document.title = 'Decoys | ACME.com';
                $( "#index" ).hide();

                $("#name").html(data.Decoys.name);
                $("#pic").html('<img id="anv-img" src="' + data.Decoys.path + '" alt="acme decoys">');
                $("#summary").html(data.Decoys.description);
                $("#made").html('<h4>Made By:</h4> ' + data.Decoys.manufacturer);
                $("#stars").html('<h4>Reviews:</h4> ' + data.Decoys.reviews + ' stars');
                $("#price").html('<h4>Price:</h4> $' + data.Decoys.price);
            }

        });


        $('.nav-traps').click(function(){
            $(this).data('clicked', true);

            if($('.nav-traps').data('clicked')) {
                document.title = 'Traps | ACME.com';
                $( "#index" ).hide();

                $("#name").html(data.Traps.name);
                $("#pic").html('<img id="anv-img" src="' + data.Traps.path + '" alt="acme traps">');
                $("#summary").html(data.Traps.description);
                $("#made").html('<h4>Made By:</h4> ' + data.Traps.manufacturer);
                $("#stars").html('<h4>Reviews:</h4> ' + data.Traps.reviews + ' stars');
                $("#price").html('<h4>Price:</h4> $' + data.Traps.price);
            }

        });

    }
});
