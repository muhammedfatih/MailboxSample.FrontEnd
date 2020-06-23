import { mailConstants } from '../_constants';
import { mailService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const mailActions = {
    create,
    read,
    list,
    numberOfUndreads
};

function create(mail) {
    return dispatch => {
        dispatch(request(mail));

        mailService.create(mail)
            .then(
                mail => { 
                    dispatch(success());
                    // history.push('/');
                    dispatch(alertActions.success('Mail sent successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(mailToCreate) { return { type: mailConstants.CREATE_REQUEST, mailToCreate } }
    function success(mailToCreate) { return { type: mailConstants.CREATE_SUCCESS, mailToCreate } }
    function failure(error) { return { type: mailConstants.CREATE_FAILURE, error } }
}

function list() {
    return dispatch => {
        dispatch(request());

        mailService.list()
            .then(
                mails => dispatch(success(mails)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: mailConstants.GETALL_REQUEST } }
    function success(mails) { return { type: mailConstants.GETALL_SUCCESS, mails } }
    function failure(error) { return { type: mailConstants.GETALL_FAILURE, error } }
}

function numberOfUndreads() {
    return dispatch => {
        dispatch(request());

        mailService.numberOfUndreads()
            .then(
                numberOfUndreadMails => dispatch(success(numberOfUndreadMails)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: mailConstants.GETNROFUNREADS_REQUEST } }
    function success(numberOfUndreadMails) { return { type: mailConstants.GETNROFUNREADS_SUCCESS, numberOfUndreadMails } }
    function failure(error) { return { type: mailConstants.GETNROFUNREADS_FAILURE, error } }
}

function read(guid) {
    return dispatch => {
        dispatch(request(guid));

        mailService.read(guid)
            .then(
                mail => dispatch(success(mail)),
                error => dispatch(failure(guid, error.toString()))
            );
    };

    function request(guid) { return { type: mailConstants.READ_REQUEST, guid } }
    function success(mail) { return { type: mailConstants.READ_SUCCESS, mail } }
    function failure(guid, error) { return { type: mailConstants.READ_FAILURE, guid, error } }
}