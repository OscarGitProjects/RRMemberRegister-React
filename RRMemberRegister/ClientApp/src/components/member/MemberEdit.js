import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MemberNotFound } from './MemberNotFound.js';
import { MemberLoading } from './MemberLoading.js';
import { MemberError } from './MemberError.js';
import { ValidationMessage } from '../shared/ValidationMessage.js';
import { ErrorMessage } from '../shared/ErrorMessage.js';
import { InputButton } from '../shared/InputButton.js';
import { Member } from './Member.js';
import { validate } from '../shared/Helpers.js';

// https://www.codementor.io/@blizzerand/building-forms-using-react-everything-you-need-to-know-iz3eyoq4y
// https://www.taniarascia.com/crud-app-in-react-with-hooks/
// https://www.youtube.com/watch?v=yN5qKqLDlpM
// https://reactjs.org/docs/forms.html

class MemberEdit extends Component
{

    //componentWillUpdate(nextProps, nextState) {
    //    console.log("componentWillUpdate MemberEdit");
    //}


    constructor()
    {
        super();

        this.state = {
            error: null,
            isLoaded: false,
            notFound: false,
            id: "0",
            fornamn: "",
            efternamn: "",
            adress: "",
            postnummer: "",
            postort: "",
            skapatdatumasstring: "", 
            hasMember: false,
            requiredMessage: "Nödvändig",
            fornamnValid: true,
            efternamnValid: true,
            adressValid: true,
            postnummerValid: true,
            postortValid: true, 
            activeButton: true,
            updateError: false,
            updateErrorMessage: "Gick inte uppdatera uppgifterna"
        };
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitUpdateMemberForm = this.submitUpdateMemberForm.bind(this);
    }


    componentWillMount()
    {
        let id = this.props.match.params.MemberId;
        let parsedId = parseInt(id)
        if (isNaN(parsedId)) {
            // Det var ingen siffra
        }
        else {
            this.getMember(parsedId);
        } 
    }


    getMember(id) {
        fetch(`/api/Member/${id}`, { "method": "GET" })
            .then(response => response.json())
            .then(data => {
                //console.log(data);

                //console.log(data.status);
                let notFoundMember = false;
                
                if (data.status && data.status !== 400) {
                    notFoundMember = true;
                }

                this.setState({
                    isLoaded: true,
                    id: data.id,
                    fornamn: data.fornamn,
                    efternamn: data.efternamn,
                    adress: data.adress,
                    postnummer: data.postnummer,
                    postort: data.postort,
                    skapatdatumasstring: data.skapatdatumasstring,
                    notFound: notFoundMember
                });
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error
                });
            }
            );
    }

    render() {
        const { error, isLoaded, notFound } = this.state;

        if (error)
        {
            return (
                <div className="memberedit">
                    <MemberError heading={"Uppdatera uppgifter om ?"} message={error.message} />
                </div>
            );
        }
        else if (!isLoaded)
        {
            return (
                <div className="memberedit">
                    <MemberLoading heading={"Uppdatera uppgifter om ?"} message={"Loading..."} />
                </div>
            );
        }
        else if (notFound)
        {
            return (
                <div className="memberedit">
                    <MemberNotFound heading={"Uppdatera uppgifter om ?"} message={"Hittar inte sökt medlem"} />
                </div>
            );
        }
        else
        {
            return (
                <div className="memberedit" >
                    <h1>Uppdatera uppgifter om {this.state.fornamn + " " + this.state.efternamn}</h1>
                    <br />

                    <ErrorMessage error={this.state.updateError} message={this.state.updateErrorMessage} />

                    <form id="EditMemberForm" className="member-form" onSubmit={this.submitUpdateMemberForm} >
                        <div className="row">
                            <div className="col-md-4">
                                <input type="hidden" id="id" name="id" value={this.state.id} />

                                <div className="form-group">
                                    <label htmlFor="fornamn" className="control-label">Förnamn *</label>
                                    <input type="text" id="fornamn" name="fornamn" className="form-control" placeholder="Ange förnamn" value={this.state.fornamn} onChange={this.handleInputChange} />
                                    <ValidationMessage valid={this.state.fornamnValid} message={this.state.requiredMessage} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="efternamn" className="control-label">Efternamn *</label>
                                    <input type="text" id="efternamn" name="efternamn" className="form-control" placeholder="Ange efternamn" value={this.state.efternamn} onChange={this.handleInputChange} />
                                    <ValidationMessage valid={this.state.efternamnValid} message={this.state.requiredMessage} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="adress" className="control-label">Adress *</label>
                                    <input type="text" id="adress" name="adress" className="form-control" placeholder="Ange adressen" value={this.state.adress} onChange={this.handleInputChange} />
                                    <ValidationMessage valid={this.state.adressValid} message={this.state.requiredMessage} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="postnummer" className="control-label">Postnummer *</label>
                                    <input type="text" id="postnummer" name="postnummer" className="form-control" placeholder="Ange postnummer" value={this.state.postnummer} onChange={this.handleInputChange} />
                                    <ValidationMessage valid={this.state.postnummerValid} message={this.state.requiredMessage} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="postort" className="control-label">Postort *</label>
                                    <input type="text" id="postort" name="postort" className="form-control" placeholder="Ange postort" value={this.state.postort} onChange={this.handleInputChange} />
                                    <ValidationMessage valid={this.state.postortValid} message={this.state.requiredMessage} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="postort" className="control-label">Skapad</label>
                                    <input type="text" id="skapad" name="skapat" className="form-control" readOnly value={this.state.skapatdatumasstring} />
                                </div>

                                <div className="form-group">
                                    <div className="cols-sm-12">
                                        <InputButton active={this.state.activeButton} text="Uppdatera" />
                                        <Link to={`/memberlist`} className="btn btn-secondary">Tillbaka</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
    }


    submitUpdateMemberForm(event) {
        // Ser till att sidan inte laddas om
        event.preventDefault();

        let member = new Member();
        member.Id = this.state.id;
        member.Fornamn = this.state.fornamn;
        member.Efternamn = this.state.efternamn;
        member.Adress = this.state.adress;
        member.Postort = this.state.postort;
        member.Postnummer = this.state.postnummer;
        member.Skapatdatum = this.state.skapatdatumasstring;

        //alert(member.ToString());

        this.updateMember(member);
    }


    updateMember(member)
    {
        let returnNumber = 0;

        if (member)
        {
            fetch(`/api/Member/${member.Id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(member)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Edit Data: " + data);

                    if (data)
                    {
                        returnNumber = parseInt(data)

                        if (isNaN(returnNumber))
                        {
                            this.setState({
                                updateError: true
                            });
                        }
                        else
                        {
                            if (returnNumber > 0)
                            {
                                this.props.history.push(`/memberlist/${2}`);
                            }
                            else
                            {
                                this.setState({
                                    updateError: true
                                });
                            }
                        }
                    }                    
                },
                (error) => {
                    console.log("Edit Error: " + error);

                    this.setState({
                        updateError: true
                    });
                })
        }
    }

    handleInputChange(event) {
        const target = event.target;
        let targetname = target.name; 
        const value = target.value;

        let targetnameValid = targetname + "Valid";

        let valid = validate(value);
        let activeBtn = this.validateAllInputHasData(targetnameValid, value);

        if (!valid) {
            this.setState({
                [targetnameValid]: false,
                [targetname]: value,
                activeButton: activeBtn
            });
        }
        else {
            this.setState({
                [targetnameValid]: true,
                [targetname]: value,
                activeButton: activeBtn
            });
        }
    }


    /* 
     På grund av att targetnameValid inte är uppdaterat med senaste value måste jag skicka med det som parametrar till funktionen
     */
    validateAllInputHasData(targetnameValid, value) {
        let valid = false;

        //const { fornamnValid, efternamnValid, adressValid, postnummerValid, postortValid, activeButton } = this.state;

        let numberOfValidInput = 0;

        if (targetnameValid !== "fornamnValid" && this.state["fornamnValid"] === true)
            numberOfValidInput++;

        if (targetnameValid !== "efternamnValid" && this.state["efternamnValid"] === true)
            numberOfValidInput++;

        if (targetnameValid !== "adressValid" && this.state["adressValid"] === true)
            numberOfValidInput++;

        if (targetnameValid !== "postnummerValid" && this.state["postnummerValid"] === true)
            numberOfValidInput++;

        if (targetnameValid !== "postortValid" && this.state["postortValid"] === true)
            numberOfValidInput++;

        if (validate(value))
            numberOfValidInput++;

        if (numberOfValidInput === 5)
            valid = true;

        return valid;
    }

}

export { MemberEdit };