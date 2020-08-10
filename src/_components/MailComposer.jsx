import React from 'react';
import { mailActions } from '../_actions';
import { connect } from 'react-redux';

class MailComposer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mail: {
                subject: '',
                content: '',
                toUserName: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { mail } = this.state;
        this.setState({
            mail: {
                ...mail,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { mail } = this.state;
        if (mail.subject && mail.toUserName) {
            this.props.create(mail);
        }
    }

    render() {
        const { creating } = this.props;
        const { mail, submitted } = this.state;
        return (
            <div className="col-md-12">
                <h2>Compose a mail</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !mail.toUserName ? ' has-error' : '')}>
                        <label htmlFor="toUserName">To</label>
                        <input type="text" className="form-control" name="toUserName" value={mail.toUserName} onChange={this.handleChange} />
                        {submitted && !mail.ToUserName &&
                            <div className="help-block">To user name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !mail.subject ? ' has-error' : '')}>
                        <label htmlFor="subject">Subject</label>
                        <input type="text" className="form-control" name="subject" value={mail.subject} onChange={this.handleChange} />
                        {submitted && !mail.subject &&
                            <div className="help-block">Subject is required</div>
                        }
                    </div>
                    <div className='form-group'>
                        <label htmlFor="content">Content</label>
                        <textarea className="form-control" name="content" value={mail.content} onChange={this.handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Create</button>
                        {creating && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                   </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { creating } = state.compose;
    return { creating };
}

const actionCreators = {
    create: mailActions.create
}

const connectedMailComposerComponent = connect(mapState, actionCreators)(MailComposer);
export { connectedMailComposerComponent as MailComposer };