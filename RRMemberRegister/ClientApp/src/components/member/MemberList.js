import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MemberActionMessage } from './MemberActionMessage.js';

/* https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg */

class MemberList extends Component
{
    constructor()
    {
        super();

        this.state = {
            error: null,
            isLoaded: false,
            members: [],
            showMessage: 0
        };
    }

    //componentWillUpdate(nextProps, nextState) {
    //    console.log("componentWillUpdate MemberList");
    //}
    
    componentWillMount() {
    //componentDidMount() {}
        let id = this.props.match.params.MessageId;
        let parsedId = parseInt(id);

        if (isNaN(parsedId)) {
            // Det var ingen siffra
        }
        else
        {
            this.setState({
                showMessage: parsedId
            });
        }

        this.getMembers();
    }


    getMembers() {
        fetch("/api/Member")
            .then(response => response.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    members: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error,
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, members, showMessage } = this.state;
        const headerText = ["Medlemens id", "Förnamn", "Efternamn", "Adress", "Postnummer", "Postort", "Skapad", " "];

        //alert("error: " + error + " isLoaded: " + isLoaded + " members: " + members);

        if (error) {
            return (
                <div className="memberlist">
                    <h1>Lista medlemmar</h1>
                    <br />

                    <Link to={`/membercreate`} title="Skapa en ny medlem">Skapa ny medlem</Link>

                    <div>Error: {error.message}</div>
                </div>
            );
        }
        else if (!isLoaded) {
            return (
                <div className="memberlist">
                    <h1>Lista medlemmar</h1>
                    <br />

                    <Link to={`/membercreate`} title="Skapa en ny medlem">Skapa ny medlem</Link>

                    <div>Loading...</div>
                </div>
            );
        }
        else
        {
            if (members && members.length > 0) {
                return (
                    <div className="memberlist">
                        <div className="row">
                            <div className="cols-sm-12">
                                <h1>Lista medlemmar</h1>
                            </div>
                        </div>

                        <br />

                        <MemberActionMessage action={showMessage} />

                        <div className="row">
                            <div className="cols-sm-12">
                                <Link to={`/membercreate`} title="Skapa en ny medlem">Skapa ny medlem</Link>
                            </div>
                        </div>

                        <div className="row">
                            <div className="cols-sm-12">
                                <table className="table">
                                    <thead>
                                        <tr>{this.RenderTableHeader(headerText)}</tr>
                                    </thead>
                                    <tbody>
                                        {this.RenderTableBody(members)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            }
            else
            {
                return (
                    <div className="memberlist">
                        <div className="row">
                            <div className="cols-sm-12">
                                <h1>Lista medlemmar</h1>
                            </div>
                        </div>

                        <br />

                        <MemberActionMessage action={showMessage} />

                        <div className="row">
                            <div className="cols-sm-12">
                                <Link to={`/membercreate`} title="Skapa en ny medlem">Skapa ny medlem</Link>
                            </div>
                        </div>

                        <div className="row">
                            <div className="cols-sm-12">
                                Det finns inga medlemmar
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }


    RenderTableHeader(headerTextsArray) {
        return headerTextsArray.map((value, index) => {
            return <th key={index}>{value}</th>
        })
    }


    RenderTableBody(memb) {
        
        if (memb)
        {
            return memb.map((medlem) => {
                const { id, fornamn, efternamn, adress, postnummer, postort, skapatdatumasstring } = medlem;
                return (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{fornamn}</td>
                        <td>{efternamn}</td>
                        <td>{adress}</td>
                        <td>{postnummer}</td>
                        <td>{postort}</td>
                        <td>{skapatdatumasstring}</td>
                        <td><Link to={`/memberdetail/${id}`} title="Se detaljer">Detaljer</Link> | <Link to={`/memberedit/${id}`} title="Ändra information om medlemen">Ändra</Link> | <Link to={`/memberdelete/${id}`} title="Radera medlemen">Radera</Link></td>
                    </tr>
                )
            })
        }
        else {
            return <tr></tr>
        }
    }
}

export { MemberList };