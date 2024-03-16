function kjop() {
    let antall = document.getElementById("antall").value;
    let fornavn = document.getElementById("fNavn").value;
    let etternavn = document.getElementById("eNavn").value;
    let telefon = document.getElementById("telefonnr").value;
    let epost = document.getElementById("ePost").value;
    let film = document.getElementById("velg").value;
    let feil1 = "";
    let feil2 = "";
    let feil3 = "";
    let feil4 = "";
    let feil5 = "";
    let ut = "";
    const monsternummer = /^\d{8}$/g;
    const monsterEpost = /^[\w-\.]+@[\w-]+\.+[\w-]{2,4}$/g;
    const monsterAntall = /^[1-9]$/g;
    let test = true;

    if (!fornavn) {
        feil1 = "<b>fyll inn med et navn</b>";
        document.getElementById("feilnavn").innerHTML = feil1;
        test = false;
    } else {
        test = true;
        document.getElementById("feilnavn").innerHTML = "";
    }

    if (!etternavn) {
        feil2 = "<b>fyll inn med et navn</b>";
        document.getElementById("feilenavn").innerHTML = feil2;
        test = false;
    } else {
        document.getElementById("feilenavn").innerHTML = "";
    }

    if (!monsternummer.test(telefon) || !telefon) {
        feil3 = "<b>Fyll inn med et gyldig telefonnummer</b>"
        document.getElementById("feilnummer").innerHTML = feil3;
        test = false;
    } else {
        document.getElementById("feilnummer").innerHTML = "";

    }

    if (!monsterEpost.test(epost) || !epost) {
        feil4 = "<b>Fyll inn med en gyldig epost-adresse</b>"
        document.getElementById("feilepost").innerHTML = feil4;
        test = false;
    } else {
        document.getElementById("feilepost").innerHTML = "";
    }

    if (!monsterAntall.test(antall) || !antall) {
        feil5 = "<b>Fyll inn et gyldig antall</b>"
        document.getElementById("feilantall").innerHTML = feil5;
        test = false;
    } else {
        document.getElementById("feilantall").innerHTML = "";
    }

    if (!test) {
        return false;
    }

    let kunde ={
        navn : fornavn + " " + etternavn,
        telefon: telefon,
        epost: epost,
        antall: antall,
        film: film
    };

    $.post("/load", kunde, function () {
        getAll();
    });

    $("#fNavn").val(ut);
    $("#eNavn").val(ut);
    $("#telefonnr").val(ut);
    $("#ePost").val(ut)
    $("#antall").val(ut);

    function getAll() {
        $.get("/getAll", function(data){
           formatData(data);
        });
    }

    //kunder.push(kunde);

    function formatData(customers) {
        for (const customer of customers) {
            ut += "<li>";
            ut += customer.navn + ", ";
            ut += customer.telefon + ", ";
            ut += customer.epost + "<br>";
            ut += customer.antall + "x " + customer.film;
            ut += "</li>"
            console.log(customer.navn);
        }
        $("#customerRegistry").html(ut);
    }
    /*for (let person of kunder) {
        ut += "<li>" + person.navn + ", ";
        ut += person.telefon + ", ";
        ut += person.epost + "<br>";
        ut += person.antall + "x " + person.film + "</li>";
        document.getElementById("customerRegistry").innerHTML = ut;
    }*/

}

function slett() {
    let ut = "";
    $.post("/delete", function () {
        deleteAll();
    });

    function deleteAll() {
        $.get("/deleted", function () {
            $("#customerRegistry").html(ut);
        })
    }
}

/*function slett() {
    $.post("/delete", function (data) {
        $("#customerRegistry").html(ut);
    })
}*/

/*function slett() {
    kunder.splice(0,kunder.length);
    document.getElementById("kunderegister").innerHTML = "";
}*/