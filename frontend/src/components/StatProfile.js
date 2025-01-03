function StatProfile(props) {
    const user = props.user;

    return(
        <div className="stat-card">
            <div className="stat-profile-card">
                { user != null && user.displayName != null && <h2>{user.displayName}</h2>}
                { user != null && user.photoURL != null && <img src={user.photoURL}/>}
            </div>
        </div>
    )
}

export default StatProfile;