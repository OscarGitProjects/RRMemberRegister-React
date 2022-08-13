
/* Klass med data om en Member */
class Member {
    constructor() {
        this.id = 0;
        this.fornamn = "";
        this.efternamn = "";
        this.adress = "";
        this.postnummer = "";
        this.postort = "";
        this.skapatdatumasstring = "";
    }

    /* Get/Set metoder */
    get Id() {
        return this.id;
    }

    set Id(newId) {
        this.id = newId;
    }

    get Fornamn() {
        return this.fornamn;
    }

    set Fornamn(newFornamn) {
        this.fornamn = newFornamn;
    }

    get Efternamn() {
        return this.efternamn;
    }

    set Efternamn(newEfternamn) {
        this.efternamn = newEfternamn;
    }

    get Adress() {
        return this.adress;
    }

    set Adress(newAdress) {
        this.adress = newAdress;
    }

    get Postnummer() {
        return this.postnummer;
    }

    set Postnummer(newPostnummer) {
        this.postnummer = newPostnummer;
    }

    get Postort() {
        return this.postort;
    }

    set Postort(newPostort) {
        this.postort = newPostort;
    }

    get Skapatdatum() {
        return this.skapatdatumasstring;
    }

    set Skapatdatum(newDatum) {
        this.skapatdatumasstring = newDatum;
    }

    get Namn() {
        return "" + this.fornamn + " " + this.efternamn;
    }

    /* Return information om Member objektet */
    ToString() {
        return "Id: " + this.id +
            ", Namn: " + this.fornamn + " " + this.efternamn +
            ", Adress: " + this.adress +
            " Postadress: " + this.postnummer + " " + this.postort +
            " Skapat datum: " + this.skapatdatumasstring;
    }
}

export { Member };