import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MemberNotFound } from './MemberNotFound.js';
import { MemberLoading } from './MemberLoading.js';
import { MemberError } from './MemberError.js';

class MemberDetail extends Component {    

    //componentWillUpdate(nextProps, nextState) {
    //    console.log("componentWillUpdate MemberDetail");
    //}


    constructor() {
        super();

        this.state = {
            error: null,
            isLoaded: false,
            notFound: false,
            member: null
        };
    }

    componentWillMount() {
        let id = this.props.match.params.MemberId;
        let parsedId = parseInt(id)
        if (isNaN(parsedId)) {
            // Det var ingen siffra
        }
        else
        {
            this.getMember(parsedId);
        }        
    }


    getMember(id) {
        fetch(`/api/Member/${id}`, { "method": "GET"})
            .then(response => response.json())
            .then(data => {
                //console.log(data);

                //console.log(data.status);

                if (data.status && data.status !== 400)
                {
                    this.setState({
                        notFound: true,
                    });
                }

                this.setState({
                    isLoaded: true,
                    member: data
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
        const { error, isLoaded, notFound, member } = this.state;

        if (error)
        {
            return (
                <div className="memberdetail">
                    <MemberError heading={"Detaljer för ?"} message={error.message} />
                </div>
            );
        }
        else if (!isLoaded)
        {
            return (
                <div className="memberdetail">
                    <MemberLoading heading={"Detaljer för ?"} message={"Loading..."} />
                </div>
            );
        }
        else if (notFound)
        {
            return (
                <div className="memberdetail">
                    <MemberNotFound heading={"Detaljer för ?"} message={"Hittar inte sökt medlem"} />
                </div>
            );
        }
        else
        {
            const { id, fornamn, efternamn, namn, adress, postnummer, postort, skapatdatumasstring } = member;
            return (
                <div className="memberdetail">
                    <h1>Detaljer för {namn} </h1>
                    <br />

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
                            <Link to={`/memberlist`} className="btn btn-secondary">Tillbaka</Link>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export { MemberDetail };