import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ValidationMessage } from '../shared/ValidationMessage.js';
import { ErrorMessage } from '../shared/ErrorMessage.js';
import { InputButton } from '../shared/InputButton.js';
import { Member } from './Member.js';
import { validate } from '../shared/Helpers.js';




// https://rapidapi.com/blog/how-to-use-an-api-with-react/

/*
 * 
 */
class MemberCreate extends Component {

    //componentWillUpdate(nextProps, nextState) {
    //    console.log("componentWillUpdate MemberCreate");
    //}

    constructor() {
        super();

        this.state = {
            id: "0",
            fornamn: "",
            efternamn: "",
            adress: "",
            postnummer: "",
            postort: "",
            requiredMessage: "Nödvändig",
            fornamnValid: false,
            efternamnValid: false,
            adressValid: false,
            postnummerValid: false,
            postortValid: false,
            activeButton: false,
            createError: false,
            createErrorMessage: "Det gick inte skapa medlemmen"
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitNewMemberForm = this.submitNewMemberForm.bind(this);
    }

    render() {

        return (
            <div className="membercreate">
                <h1>Skapa ny medlem</h1>
                <br />

                <ErrorMessage error={this.state.createError} message={this.state.createErrorMessage} />

                <form id="NewMemberForm" className="member-form" onSubmit={this.submitNewMemberForm} >
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="fornamn" className="control-label">Förnamn *</label>
                                <input type="text" id="fornamn" name="fornamn" className="form-control" placeholder="Ange förnamn" value={this.state.fornamn} onChange={this.handleInputChange} required />
                                <ValidationMessage valid={this.state.fornamnValid} message={this.state.requiredMessage}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="efternamn" className="control-label">Efternamn *</label>
                                <input type="text" id="efternamn" name="efternamn" className="form-control" placeholder="Ange efternamn" value={this.state.efternamn} onChange={this.handleInputChange} required />
                                <ValidationMessage valid={this.state.efternamnValid} message={this.state.requiredMessage} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="adress" className="control-label">Adress *</label>
                                <input type="text" id="adress" name="adress" className="form-control" placeholder="Ange adressen" value={this.state.adress} onChange={this.handleInputChange} required />
                                <ValidationMessage valid={this.state.adressValid} message={this.state.requiredMessage} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="postnummer" className="control-label">Postnummer *</label>
                                <input type="text" id="postnummer" name="postnummer" className="form-control" placeholder="Ange postnummer" value={this.state.postnummer} onChange={this.handleInputChange} required />
                                <ValidationMessage valid={this.state.postnummerValid} message={this.state.requiredMessage} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="postort" className="control-label">Postort *</label>
                                <input type="text" id="postort" name="postort" className="form-control" placeholder="Ange postort" value={this.state.postort} onChange={this.handleInputChange} required />
                                <ValidationMessage valid={this.state.postortValid} message={this.state.requiredMessage} />
                            </div>

                            <div className="form-group">
                                <div className="cols-sm-12">
                                    <InputButton active={this.state.activeButton} text="Spara" />
                                    <Link to={`/memberlist`} className="btn btn-secondary">Tillbaka</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }


    handleInputChange(event) {
        const target = event.target;
        const targetname = target.name;
        const value = target.value;
        let targetnameValid = targetname + "Valid";

        let valid = validate(value);
        let activeBtn = this.validateAllInputHasData(targetnameValid, value);

        if (!valid)
        {            
            this.setState({
                [targetnameValid]: false,
                [targetname]: value,
                activeButton: activeBtn
            });
        }
        else
        {
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


    createMember(member)
    {
        let returnNumber = 0;

        if (member)
        {
            //alert("Stringify: " + JSON.stringify(member));

            fetch("/api/Member", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(member)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Create Data: " + data);

                    if (data)
                    {
                        returnNumber = parseInt(data)

                        if (isNaN(returnNumber)) {
                            this.setState({
                                createError: true
                            });
                        }
                        else {
                            if (returnNumber > 0)
                            {
                                this.props.history.push(`/memberlist/${1}`);
                            }
                            else
                            {
                                this.setState({
                                    createError: true
                                });
                            }
                        }
                    }                     
                },
                (error) => {
                    console.log("Create Error: " + error);

                    this.setState({
                        createError: true
                    });
                })
        }
    }

    submitNewMemberForm(event)
    {
        // Ser till att sidan inte laddas om
        event.preventDefault();

        let member = new Member();
        member.Id = 0;
        member.Fornamn = this.state.fornamn;
        member.Efternamn = this.state.efternamn;
        member.Adress = this.state.adress;
        member.Postort = this.state.postort;
        member.Postnummer = this.state.postnummer;
        //member.Skapatdatum = this.state.skapatdatumasstring;

        //alert(member.ToString());        

        this.createMember(member);
    }
}

export { MemberCreate };