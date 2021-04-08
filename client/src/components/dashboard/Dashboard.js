import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import { Link } from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'


const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return loading && profile == null ? <Spinner />
        : <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i>Welcome {user && user.name}
            </p>
            {profile !== null ? (
                <Fragment>
                    <DashboardActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />
                    <div className='my-2'>
                        <button className="btn btn-danger" onClick={() => deleteAccount()}>
                            <i className="fas fa-user-,imus"></i> Delete Account
                        </button>
                    </div>
                </Fragment> ) : (
                <Fragment>
                    You have not yet setup a profile, please add some info
                    <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
                </Fragment>)}
        </Fragment>;

}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}

const mapStatetoProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStatetoProps, { getCurrentProfile, deleteAccount })(Dashboard)
