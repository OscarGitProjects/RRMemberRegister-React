import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MemberNotFound } from './MemberNotFound.js';
import { MemberLoading } from './MemberLoading.js';
import { MemberError } from './MemberError.js';
import { ErrorMessage } from '../shared/ErrorMessage.js';
import { Member } from './Member';

class MemberDelete extends Component
{

    //componentWillUpdate(nextProps, nextState) {
    //    console.log("componentWillUpdate MemberDelete");
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
            skapatdatumasstring: "",
            hasMember: false,
            error: null,
            isLoaded: false,
            notFound: false,
            member: null,
            deleteError: false,
            deleteErrorMessage: "Det gick inte radera medlemmen"
        };

        this.submitDeleteMemberForm = this.submitDeleteMemberForm.bind(this);
    }


    componentWillMount() {
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
                    member: data,
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


    submitDeleteMemberForm(event) {
        // Ser till att sidan inte laddas om
        event.preventDefault();
        
        const { error, isLoaded, notFound, member } = this.state;

        this.deleteMember(member);        
    }


    deleteMember(member)
    {
        let returnNumber = 0;

        if (member) { 

            fetch(`/api/Member/${member.id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Deleted Data: " + data);

                    if (data)
                    {
                        returnNumber = parseInt(data)

                        if (isNaN(returnNumber)) {

                            this.setState({
                                deleteError: true
                            });
                        }
                        else
                        {
                            if (returnNumber > 0)
                            {
                                this.props.history.push(`/memberlist/${3}`);
                            }
                            else {
                                this.setState({
                                    deleteError: true
                                });
                            }
                        }
                    }
                },
                (error) => {
                    console.log("Deleted Error: " + error);

                    this.setState({
                        deleteError: true
                    });
                })
        }
    }


    render()
    {
        const { error, isLoaded, notFound, member } = this.state;

        if (error) {
            return (
                <div className="memberdelete">
                    <MemberError heading={"Radera medlemmen ?"} message={error.message} />
                </div>
            );
        }
        else if (!isLoaded) {
            return (
                <div className="memberdelete">
                    <MemberLoading heading={"Radera medlemmen ?"} message={"Loading..."} />
                </div>
            );
        }
        else if (notFound) {
            return (
                <div className="memberdelete">
                    <MemberNotFound heading={"Radera medlemmen ?"} message={"Hittar inte sökt medlem"} />
                </div>
            );
        }
        else
        {
            const { id, fornamn, efternamn, namn, adress, postnummer, postort, skapatdatumasstring } = member;

            return (
                <div className="memberdelete">
                    <h1>Radera medlemmen {namn} </h1>
                    <br />

                    <ErrorMessage error={this.state.deleteError} message={this.state.deleteErrorMessage} />

                    <form id="DeleteMemberForm" className="member-form" onSubmit={this.submitDeleteMemberForm} >
                        <input type="hidden" id="id" name="id" value={id} />

                        <dl className="row">
                            <dt className="col-sm-3">Medlemens id</dt>
                            <dt className="col-sm-9">{id}</dt>

                            <dt className="col-sm-3">Namn</dt>
                            <dt className="col-sm-9">{namn}</dt>

                            <dt className="col-sm-3">Adress</dt>
                            <dt className="col-sm-9">{adress}</dt>

                            <dt className="col-sm-3">Postnummer</dt>
                            <dt className="col-sm-9">{postnummer}</dt>

                            <dt className="col-sm-3">Postort</dt>
                            <dt className="col-sm-9">{postort}</dt>

                            <dt className="col-sm-3">Skapad</dt>
                            <dt className="col-sm-9">{skapatdatumasstring}</dt>
                        </dl>

                        <div className="row">
                            <div className="cols-sm-12">
                                <input type="submit" value="Radera" className="btn btn-danger" />
                                <Link to={`/memberlist`} className="btn btn-secondary">Tillbaka</Link>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }

    }
}

export { MemberDelete };