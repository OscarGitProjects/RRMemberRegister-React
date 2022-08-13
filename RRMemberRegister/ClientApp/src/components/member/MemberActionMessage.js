import React, { Component } from 'react';

/* 
 * component som beroende på this.props.action returnerar en row med alert som visar olika meddelanden
 * this.props.action=1 Skapat en ny medlem
 * this.props.action=2 Uppdaterat uppgifter om medlem
 * this.props.action=3 Raderat medlem
 */
class MemberActionMessage extends Component {
    render() {
        let action = this.props.action;
        let actionMessage = "";

        // 1 = created
        // 2 = updated
        // 3 = deleted

        if (action) {
            if (action === 1)       // 1 = created
                actionMessage = "Har sparat uppgifter om en ny medlem";
            else if (action === 2)  // 2 = updated
                actionMessage = "Har uppdaterat uppgifter om en medlem";
            else if (action === 3)  // 3 = deleted
                actionMessage = "Har raderat uppgifter om en medlem";

            return (
                <div className="row">
                    <div className="cols-sm-12 alert alert-success" role="alert">{actionMessage}</div>
                </div>
            );
        }
        else
        {
            return (
                <>
                </>
            );
        }       
    }
}

export { MemberActionMessage };