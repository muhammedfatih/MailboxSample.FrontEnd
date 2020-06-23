import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { mailActions } from '../_actions';
import {MailComposer} from '../_components';

class ReadPage extends React.Component {
    constructor(props) {
        super(props);
        console.log("a");
    }

    componentDidMount() {
        const mailGuid = this.props.match.params.mailGuid;
        this.props.getMail(mailGuid);
    }

    render() {
        const { mail } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <p>
                    <Link to="/">Back</Link>
                </p>
                {mail.loading && <em>Loading mail...</em>}
                {mail.error && <span className="text-danger">ERROR: {mail.error}</span>}
                {mail.item &&
                    <div>
                        <h3>{mail.item.subject}</h3>
                            <p><strong>From:</strong>{mail.item.fromUserName}</p>
                            <p><strong>To:</strong>{mail.item.toUserName}</p>
                            <p><strong>Sent:</strong>{mail.item.createdAt}</p>
                        <p>{mail.item.content}</p>
                        <MailComposer/>
                    </div>
                    }
            </div>
        );
    }
}

function mapState(state) {
    const { mail } = state;
    return { mail };
}

const actionCreators = {
    getMail: mailActions.read,
}

const connectedReadPage = connect(mapState, actionCreators)(ReadPage);
export { connectedReadPage as ReadPage };