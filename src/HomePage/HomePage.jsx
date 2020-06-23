import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { mailActions } from '../_actions';
import {MailComposer} from '../_components';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getMails();
        this.props.getMailStatistics();
    }

    handleReadMail(guid) {
        return (e) => this.props.readMail(guid);
    }

    render() {
        const { user, mails, mailStatistics } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                <h4>Hi {user.firstName}!</h4>
                {mailStatistics.loading &&  <em>Loading...</em>}
                {mailStatistics.error && <span className="text-danger">ERROR: {mailStatistics.error}</span>}
                <MailComposer/>
                <h3>Recieved Mails ({mailStatistics.numberOfUnreads && <span>{mailStatistics.numberOfUnreads}</span>})</h3>
                {mails.loading && <em>Loading mails...</em>}
                {mails.error && <span className="text-danger">ERROR: {mails.error}</span>}
                {mails.items &&
                    <ul>
                        {mails.items.map((mailItem, index) =>
                            <li key={mailItem.guid}>
                                <strong>{mailItem.subject}</strong><br/>
                        <span>{mailItem.summary}</span>
                                {
                                    mailItem.loading ? <em> - Opening...</em>
                                    : mailItem.error ? <span className="text-danger"> - ERROR: {mailItem.error}</span>
                                    : <span> - <Link to={"/read/"+mailItem.guid} className="btn btn-link">Read</Link></span>
                                }
                            </li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}

function mapState(state) {
    const { authentication, mails, mailStatistics } = state;
    const { user } = authentication;
    return { user, mails, mailStatistics };
}

const actionCreators = {
    getMails: mailActions.list,
    getMailStatistics: mailActions.numberOfUndreads,
    readMail: mailActions.read
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };